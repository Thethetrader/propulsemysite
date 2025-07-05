import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export type Database = {
  public: {
    Tables: {
      clients: {
        Row: {
          id: string
          email: string
          name: string
          created_at: string
        }
        Insert: {
          id?: string
          email: string
          name: string
          created_at?: string
        }
        Update: {
          id?: string
          email?: string
          name?: string
          created_at?: string
        }
      }
      projects: {
        Row: {
          id: string
          client_id: string
          name: string
          description: string
          created_at: string
        }
        Insert: {
          id?: string
          client_id: string
          name: string
          description: string
          created_at?: string
        }
        Update: {
          id?: string
          client_id?: string
          name?: string
          description?: string
          created_at?: string
        }
      }
      channels: {
        Row: {
          id: string
          project_id: string
          name: string
          created_at: string
        }
        Insert: {
          id?: string
          project_id: string
          name: string
          created_at?: string
        }
        Update: {
          id?: string
          project_id?: string
          name?: string
          created_at?: string
        }
      }
      messages: {
        Row: {
          id: string
          channel_id: string
          author_id: string
          author_name: string
          content: string
          created_at: string
        }
        Insert: {
          id?: string
          channel_id: string
          author_id: string
          author_name: string
          content: string
          created_at?: string
        }
        Update: {
          id?: string
          channel_id?: string
          author_id?: string
          author_name?: string
          content?: string
          created_at?: string
        }
      }
    }
  }
} 