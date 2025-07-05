import { supabase } from './supabase'
import type { RealtimeChannel } from '@supabase/supabase-js'

export interface Message {
  id: string
  channel_id: string
  author_id: string
  author_name: string
  content: string
  message_type: 'text' | 'file' | 'call'
  file_data?: {
    id: string
    name: string
    size: number
    type: string
    url: string
  }
  created_at: string
}

export interface TypingIndicator {
  user_id: string
  user_name: string
  channel_id: string
  typing: boolean
}

export class RealtimeService {
  private static channels: Map<string, RealtimeChannel> = new Map()
  private static messageCallbacks: Map<string, (message: Message) => void> = new Map()
  private static typingCallbacks: Map<string, (typing: TypingIndicator) => void> = new Map()

  // S'abonner aux messages d'un canal
  static subscribeToChannel(
    channelId: string,
    onMessage: (message: Message) => void,
    onTyping?: (typing: TypingIndicator) => void
  ): void {
    // Désabonner si déjà abonné
    this.unsubscribeFromChannel(channelId)

    const channel = supabase
      .channel(`channel_${channelId}`)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'messages',
          filter: `channel_id=eq.${channelId}`
        },
        (payload) => {
          const message = payload.new as Message
          onMessage(message)
        }
      )
      .on(
        'broadcast',
        { event: 'typing' },
        (payload) => {
          if (onTyping) {
            onTyping(payload.payload as TypingIndicator)
          }
        }
      )
      .subscribe()

    this.channels.set(channelId, channel)
    this.messageCallbacks.set(channelId, onMessage)
    if (onTyping) {
      this.typingCallbacks.set(channelId, onTyping)
    }
  }

  // Se désabonner d'un canal
  static unsubscribeFromChannel(channelId: string): void {
    const channel = this.channels.get(channelId)
    if (channel) {
      supabase.removeChannel(channel)
      this.channels.delete(channelId)
      this.messageCallbacks.delete(channelId)
      this.typingCallbacks.delete(channelId)
    }
  }

  // Envoyer un message
  static async sendMessage(
    channelId: string,
    authorId: string,
    authorName: string,
    content: string,
    messageType: 'text' | 'file' | 'call' = 'text',
    fileData?: any
  ): Promise<Message> {
    try {
      const { data, error } = await supabase
        .from('messages')
        .insert({
          channel_id: channelId,
          author_id: authorId,
          author_name: authorName,
          content: content,
          message_type: messageType,
          file_data: fileData
        })
        .select()
        .single()

      if (error) {
        throw new Error('Erreur lors de l\'envoi du message')
      }

      return data as Message
    } catch (error) {
      console.error('Send message error:', error)
      throw error
    }
  }

  // Envoyer un message avec fichier
  static async sendFileMessage(
    channelId: string,
    authorId: string,
    authorName: string,
    fileName: string,
    fileData: any
  ): Promise<Message> {
    return this.sendMessage(
      channelId,
      authorId,
      authorName,
      `📎 ${fileName}`,
      'file',
      fileData
    )
  }

  // Envoyer un message d'appel
  static async sendCallMessage(
    channelId: string,
    authorId: string,
    authorName: string,
    callType: 'started' | 'ended',
    duration?: number
  ): Promise<Message> {
    const content = callType === 'started' 
      ? `📞 Appel démarré`
      : `📞 Appel terminé${duration ? ` (${this.formatDuration(duration)})` : ''}`

    return this.sendMessage(
      channelId,
      authorId,
      authorName,
      content,
      'call'
    )
  }

  // Récupérer l'historique des messages
  static async getMessageHistory(
    channelId: string,
    limit: number = 50,
    before?: string
  ): Promise<Message[]> {
    try {
      let query = supabase
        .from('messages')
        .select('*')
        .eq('channel_id', channelId)
        .order('created_at', { ascending: false })
        .limit(limit)

      if (before) {
        query = query.lt('created_at', before)
      }

      const { data, error } = await query

      if (error) {
        throw new Error('Erreur lors de la récupération des messages')
      }

      return (data as Message[]).reverse()
    } catch (error) {
      console.error('Get message history error:', error)
      throw error
    }
  }

  // Indiquer qu'un utilisateur est en train de taper
  static async sendTypingIndicator(
    channelId: string,
    userId: string,
    userName: string,
    typing: boolean
  ): Promise<void> {
    const channel = this.channels.get(channelId)
    if (channel) {
      await channel.send({
        type: 'broadcast',
        event: 'typing',
        payload: {
          user_id: userId,
          user_name: userName,
          channel_id: channelId,
          typing: typing
        }
      })
    }
  }

  // Marquer les messages comme lus
  static async markMessagesAsRead(
    channelId: string,
    userId: string,
    messageIds: string[]
  ): Promise<void> {
    try {
      const { error } = await supabase
        .from('message_read_status')
        .upsert(
          messageIds.map(messageId => ({
            message_id: messageId,
            user_id: userId,
            read_at: new Date().toISOString()
          }))
        )

      if (error) {
        console.error('Mark messages as read error:', error)
      }
    } catch (error) {
      console.error('Mark messages as read error:', error)
    }
  }

  // Obtenir le statut de lecture des messages
  static async getReadStatus(
    channelId: string,
    userId: string
  ): Promise<{[messageId: string]: boolean}> {
    try {
      const { data, error } = await supabase
        .from('message_read_status')
        .select('message_id')
        .eq('user_id', userId)
        .in('message_id', 
          await supabase
            .from('messages')
            .select('id')
            .eq('channel_id', channelId)
            .then(res => res.data?.map(m => m.id) || [])
        )

      if (error) {
        console.error('Get read status error:', error)
        return {}
      }

      const readStatus: {[messageId: string]: boolean} = {}
      data?.forEach(item => {
        readStatus[item.message_id] = true
      })

      return readStatus
    } catch (error) {
      console.error('Get read status error:', error)
      return {}
    }
  }

  // Supprimer un message
  static async deleteMessage(messageId: string, userId: string): Promise<void> {
    try {
      const { error } = await supabase
        .from('messages')
        .delete()
        .eq('id', messageId)
        .eq('author_id', userId) // Seul l'auteur peut supprimer

      if (error) {
        throw new Error('Erreur lors de la suppression du message')
      }
    } catch (error) {
      console.error('Delete message error:', error)
      throw error
    }
  }

  // Modifier un message
  static async editMessage(
    messageId: string,
    userId: string,
    newContent: string
  ): Promise<void> {
    try {
      const { error } = await supabase
        .from('messages')
        .update({ 
          content: newContent,
          edited_at: new Date().toISOString()
        })
        .eq('id', messageId)
        .eq('author_id', userId) // Seul l'auteur peut modifier

      if (error) {
        throw new Error('Erreur lors de la modification du message')
      }
    } catch (error) {
      console.error('Edit message error:', error)
      throw error
    }
  }

  // Nettoyer toutes les connexions
  static cleanup(): void {
    this.channels.forEach((channel, channelId) => {
      supabase.removeChannel(channel)
    })
    this.channels.clear()
    this.messageCallbacks.clear()
    this.typingCallbacks.clear()
  }

  // Utilitaires
  private static formatDuration(seconds: number): string {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`
  }

  // Vérifier si l'utilisateur est en ligne
  static async getUserOnlineStatus(userId: string): Promise<boolean> {
    try {
      const { data, error } = await supabase
        .from('user_presence')
        .select('is_online, last_seen')
        .eq('user_id', userId)
        .single()

      if (error) {
        return false
      }

      // Considérer comme en ligne si dernière activité < 5 minutes
      const lastSeen = new Date(data.last_seen)
      const now = new Date()
      const diff = now.getTime() - lastSeen.getTime()
      
      return data.is_online || diff < 5 * 60 * 1000
    } catch (error) {
      console.error('Get user online status error:', error)
      return false
    }
  }

  // Mettre à jour le statut de présence
  static async updatePresence(
    userId: string,
    isOnline: boolean
  ): Promise<void> {
    try {
      await supabase
        .from('user_presence')
        .upsert({
          user_id: userId,
          is_online: isOnline,
          last_seen: new Date().toISOString()
        })
    } catch (error) {
      console.error('Update presence error:', error)
    }
  }
} 