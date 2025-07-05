import { supabase } from './supabase'

export interface UploadedFile {
  id: string
  name: string
  size: number
  type: string
  url: string
  uploadedAt: Date
}

export class FileUploadService {
  private static readonly BUCKET_NAME = 'chat-files'
  private static readonly MAX_FILE_SIZE = 10 * 1024 * 1024 // 10MB

  static async uploadFile(file: File, channelId: string): Promise<UploadedFile> {
    try {
      // Vérifier la taille du fichier
      if (file.size > this.MAX_FILE_SIZE) {
        throw new Error('Le fichier est trop volumineux (max 10MB)')
      }

      // Générer un nom de fichier unique
      const fileExtension = file.name.split('.').pop()
      const fileName = `${channelId}/${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExtension}`

      // Upload vers Supabase Storage
      const { data, error } = await supabase.storage
        .from(this.BUCKET_NAME)
        .upload(fileName, file, {
          cacheControl: '3600',
          upsert: false
        })

      if (error) {
        console.error('Upload error:', error)
        throw new Error('Erreur lors de l\'upload du fichier')
      }

      // Obtenir l'URL publique du fichier
      const { data: urlData } = supabase.storage
        .from(this.BUCKET_NAME)
        .getPublicUrl(fileName)

      // Insérer les métadonnées dans la base de données
      const { data: fileRecord, error: dbError } = await supabase
        .from('file_uploads')
        .insert({
          channel_id: channelId,
          file_name: file.name,
          file_size: file.size,
          file_type: file.type,
          file_path: fileName,
          file_url: urlData.publicUrl
        })
        .select()
        .single()

      if (dbError) {
        console.error('Database error:', dbError)
        // Supprimer le fichier uploadé en cas d'erreur DB
        await supabase.storage.from(this.BUCKET_NAME).remove([fileName])
        throw new Error('Erreur lors de l\'enregistrement du fichier')
      }

      return {
        id: fileRecord.id,
        name: file.name,
        size: file.size,
        type: file.type,
        url: urlData.publicUrl,
        uploadedAt: new Date(fileRecord.created_at)
      }
    } catch (error) {
      console.error('File upload error:', error)
      throw error
    }
  }

  static async uploadMultipleFiles(files: File[], channelId: string): Promise<UploadedFile[]> {
    const uploadPromises = files.map(file => this.uploadFile(file, channelId))
    
    try {
      const results = await Promise.allSettled(uploadPromises)
      const uploadedFiles: UploadedFile[] = []
      const errors: string[] = []

      results.forEach((result, index) => {
        if (result.status === 'fulfilled') {
          uploadedFiles.push(result.value)
        } else {
          errors.push(`${files[index].name}: ${result.reason.message}`)
        }
      })

      if (errors.length > 0 && uploadedFiles.length === 0) {
        throw new Error(`Tous les uploads ont échoué:\n${errors.join('\n')}`)
      }

      if (errors.length > 0) {
        console.warn('Certains fichiers n\'ont pas pu être uploadés:', errors)
      }

      return uploadedFiles
    } catch (error) {
      console.error('Multiple file upload error:', error)
      throw error
    }
  }

  static async deleteFile(fileId: string): Promise<void> {
    try {
      // Récupérer les infos du fichier
      const { data: fileRecord, error: fetchError } = await supabase
        .from('file_uploads')
        .select('file_path')
        .eq('id', fileId)
        .single()

      if (fetchError) {
        throw new Error('Fichier non trouvé')
      }

      // Supprimer le fichier du storage
      const { error: storageError } = await supabase.storage
        .from(this.BUCKET_NAME)
        .remove([fileRecord.file_path])

      if (storageError) {
        console.error('Storage deletion error:', storageError)
      }

      // Supprimer l'enregistrement de la base de données
      const { error: dbError } = await supabase
        .from('file_uploads')
        .delete()
        .eq('id', fileId)

      if (dbError) {
        throw new Error('Erreur lors de la suppression du fichier')
      }
    } catch (error) {
      console.error('File deletion error:', error)
      throw error
    }
  }

  static async getChannelFiles(channelId: string): Promise<UploadedFile[]> {
    try {
      const { data, error } = await supabase
        .from('file_uploads')
        .select('*')
        .eq('channel_id', channelId)
        .order('created_at', { ascending: false })

      if (error) {
        throw new Error('Erreur lors de la récupération des fichiers')
      }

      return data.map(record => ({
        id: record.id,
        name: record.file_name,
        size: record.file_size,
        type: record.file_type,
        url: record.file_url,
        uploadedAt: new Date(record.created_at)
      }))
    } catch (error) {
      console.error('Get channel files error:', error)
      throw error
    }
  }

  static formatFileSize(bytes: number): string {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  static getFileIcon(type: string): string {
    if (type.startsWith('image/')) return '🖼️'
    if (type.startsWith('video/')) return '🎥'
    if (type.startsWith('audio/')) return '🎵'
    if (type.includes('pdf')) return '📄'
    if (type.includes('word') || type.includes('document')) return '📝'
    if (type.includes('excel') || type.includes('spreadsheet')) return '📊'
    if (type.includes('zip') || type.includes('rar')) return '📦'
    return '📁'
  }

  static isImageFile(type: string): boolean {
    return type.startsWith('image/')
  }

  static isVideoFile(type: string): boolean {
    return type.startsWith('video/')
  }

  static isAudioFile(type: string): boolean {
    return type.startsWith('audio/')
  }
} 