-- 🚀 Script SQL complet pour Supabase
-- Copiez-collez ce script ENTIER dans l'éditeur SQL de Supabase

-- 1. Créer toutes les tables
CREATE TABLE IF NOT EXISTS clients (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS projects (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  client_id UUID REFERENCES clients(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS channels (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS messages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  channel_id UUID REFERENCES channels(id) ON DELETE CASCADE,
  author_id TEXT NOT NULL,
  author_name TEXT NOT NULL,
  content TEXT NOT NULL,
  message_type TEXT DEFAULT 'text' CHECK (message_type IN ('text', 'file', 'call')),
  file_data JSONB,
  edited_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS file_uploads (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  channel_id UUID REFERENCES channels(id) ON DELETE CASCADE,
  file_name TEXT NOT NULL,
  file_size INTEGER NOT NULL,
  file_type TEXT NOT NULL,
  file_path TEXT NOT NULL,
  file_url TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS message_read_status (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  message_id UUID REFERENCES messages(id) ON DELETE CASCADE,
  user_id TEXT NOT NULL,
  read_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(message_id, user_id)
);

CREATE TABLE IF NOT EXISTS user_presence (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id TEXT UNIQUE NOT NULL,
  is_online BOOLEAN DEFAULT false,
  last_seen TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS call_sessions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  channel_id UUID REFERENCES channels(id) ON DELETE CASCADE,
  caller_id TEXT NOT NULL,
  caller_name TEXT NOT NULL,
  participants JSONB DEFAULT '[]',
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'ended')),
  started_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  ended_at TIMESTAMP WITH TIME ZONE
);

-- 2. Créer le bucket storage (peut échouer si existe déjà - normal)
INSERT INTO storage.buckets (id, name, public) 
VALUES ('chat-files', 'chat-files', true)
ON CONFLICT (id) DO NOTHING;

-- 3. Activer Row Level Security
ALTER TABLE clients ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE channels ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE file_uploads ENABLE ROW LEVEL SECURITY;
ALTER TABLE message_read_status ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_presence ENABLE ROW LEVEL SECURITY;
ALTER TABLE call_sessions ENABLE ROW LEVEL SECURITY;

-- 4. Créer les politiques de sécurité (permissives pour le développement)
-- Politiques pour clients
CREATE POLICY "Enable read access for all users" ON clients FOR SELECT USING (true);
CREATE POLICY "Enable insert for authenticated users only" ON clients FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Enable update for authenticated users only" ON clients FOR UPDATE USING (auth.role() = 'authenticated');

-- Politiques pour projects
CREATE POLICY "Enable read access for all users" ON projects FOR SELECT USING (true);
CREATE POLICY "Enable insert for authenticated users only" ON projects FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Enable update for authenticated users only" ON projects FOR UPDATE USING (auth.role() = 'authenticated');

-- Politiques pour channels
CREATE POLICY "Enable read access for all users" ON channels FOR SELECT USING (true);
CREATE POLICY "Enable insert for authenticated users only" ON channels FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Enable update for authenticated users only" ON channels FOR UPDATE USING (auth.role() = 'authenticated');

-- Politiques pour messages
CREATE POLICY "Enable read access for all users" ON messages FOR SELECT USING (true);
CREATE POLICY "Enable insert for authenticated users only" ON messages FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Enable update for authenticated users only" ON messages FOR UPDATE USING (auth.role() = 'authenticated');

-- Politiques pour file_uploads
CREATE POLICY "Enable read access for all users" ON file_uploads FOR SELECT USING (true);
CREATE POLICY "Enable insert for authenticated users only" ON file_uploads FOR INSERT WITH CHECK (auth.role() = 'authenticated');

-- Politiques pour message_read_status
CREATE POLICY "Enable read access for all users" ON message_read_status FOR SELECT USING (true);
CREATE POLICY "Enable insert for authenticated users only" ON message_read_status FOR INSERT WITH CHECK (auth.role() = 'authenticated');

-- Politiques pour user_presence
CREATE POLICY "Enable read access for all users" ON user_presence FOR SELECT USING (true);
CREATE POLICY "Enable insert for authenticated users only" ON user_presence FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Enable update for authenticated users only" ON user_presence FOR UPDATE USING (auth.role() = 'authenticated');

-- Politiques pour call_sessions
CREATE POLICY "Enable read access for all users" ON call_sessions FOR SELECT USING (true);
CREATE POLICY "Enable insert for authenticated users only" ON call_sessions FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Enable update for authenticated users only" ON call_sessions FOR UPDATE USING (auth.role() = 'authenticated');

-- 5. Politiques pour le Storage
CREATE POLICY "Allow authenticated uploads" ON storage.objects 
FOR INSERT WITH CHECK (bucket_id = 'chat-files' AND auth.role() = 'authenticated');

CREATE POLICY "Allow public access" ON storage.objects 
FOR SELECT USING (bucket_id = 'chat-files');

CREATE POLICY "Allow delete own files" ON storage.objects 
FOR DELETE USING (bucket_id = 'chat-files' AND auth.uid()::text = (storage.foldername(name))[1]);

-- 6. Insérer des données de test
INSERT INTO clients (email, name) VALUES 
('test@example.com', 'Client Test'),
('admin@example.com', 'Admin Test'),
('brey.theodore4@gmail.com', 'Theodore Brey')
ON CONFLICT (email) DO NOTHING;

INSERT INTO projects (client_id, name, description) 
SELECT c.id, 'Projet Test', 'Description du projet test'
FROM clients c WHERE c.email = 'test@example.com'
ON CONFLICT DO NOTHING;

INSERT INTO channels (project_id, name) 
SELECT p.id, 'Général'
FROM projects p WHERE p.name = 'Projet Test'
ON CONFLICT DO NOTHING;

-- Message de confirmation
SELECT 'Configuration Supabase terminée avec succès !' as message;
SELECT 'Tables créées: clients, projects, channels, messages, file_uploads, message_read_status, user_presence, call_sessions' as tables;
SELECT 'Bucket créé: chat-files' as storage;
SELECT 'RLS activé avec politiques de base' as security;
SELECT 'Données de test insérées' as test_data; 