-- =============================================================================
-- SETUP COMPLET SUPABASE POUR PROPULSEMYSITE
-- =============================================================================

-- Activer les extensions nécessaires
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =============================================================================
-- 1. CRÉATION DES TABLES
-- =============================================================================

-- Table des clients
CREATE TABLE IF NOT EXISTS clients (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    phone VARCHAR(50),
    company VARCHAR(255),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Table des projets
CREATE TABLE IF NOT EXISTS projects (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    description TEXT,
    client_id UUID REFERENCES clients(id) ON DELETE CASCADE,
    status VARCHAR(50) DEFAULT 'active',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Table des canaux de communication
CREATE TABLE IF NOT EXISTS channels (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
    type VARCHAR(50) DEFAULT 'text', -- text, voice, video
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Table des messages
CREATE TABLE IF NOT EXISTS messages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    content TEXT NOT NULL,
    channel_id UUID REFERENCES channels(id) ON DELETE CASCADE,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    message_type VARCHAR(50) DEFAULT 'text', -- text, file, image, video
    file_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Table des uploads de fichiers
CREATE TABLE IF NOT EXISTS file_uploads (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    filename VARCHAR(255) NOT NULL,
    original_name VARCHAR(255) NOT NULL,
    file_size INTEGER NOT NULL,
    mime_type VARCHAR(100) NOT NULL,
    file_path TEXT NOT NULL,
    uploaded_by UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Table du statut de lecture des messages
CREATE TABLE IF NOT EXISTS message_read_status (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    message_id UUID REFERENCES messages(id) ON DELETE CASCADE,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    read_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(message_id, user_id)
);

-- Table de présence des utilisateurs
CREATE TABLE IF NOT EXISTS user_presence (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    channel_id UUID REFERENCES channels(id) ON DELETE CASCADE,
    status VARCHAR(50) DEFAULT 'online', -- online, offline, away
    last_seen TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(user_id, channel_id)
);

-- Table des sessions d'appels
CREATE TABLE IF NOT EXISTS call_sessions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    channel_id UUID REFERENCES channels(id) ON DELETE CASCADE,
    initiator_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    call_type VARCHAR(50) DEFAULT 'video', -- audio, video
    status VARCHAR(50) DEFAULT 'active', -- active, ended
    started_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    ended_at TIMESTAMP WITH TIME ZONE,
    duration INTEGER -- en secondes
);

-- =============================================================================
-- 2. CRÉATION DES INDEX POUR LES PERFORMANCES
-- =============================================================================

CREATE INDEX IF NOT EXISTS idx_clients_email ON clients(email);
CREATE INDEX IF NOT EXISTS idx_projects_client_id ON projects(client_id);
CREATE INDEX IF NOT EXISTS idx_channels_project_id ON channels(project_id);
CREATE INDEX IF NOT EXISTS idx_messages_channel_id ON messages(channel_id);
CREATE INDEX IF NOT EXISTS idx_messages_user_id ON messages(user_id);
CREATE INDEX IF NOT EXISTS idx_messages_created_at ON messages(created_at);
CREATE INDEX IF NOT EXISTS idx_file_uploads_project_id ON file_uploads(project_id);
CREATE INDEX IF NOT EXISTS idx_file_uploads_uploaded_by ON file_uploads(uploaded_by);
CREATE INDEX IF NOT EXISTS idx_message_read_status_message_id ON message_read_status(message_id);
CREATE INDEX IF NOT EXISTS idx_message_read_status_user_id ON message_read_status(user_id);
CREATE INDEX IF NOT EXISTS idx_user_presence_user_id ON user_presence(user_id);
CREATE INDEX IF NOT EXISTS idx_user_presence_channel_id ON user_presence(channel_id);
CREATE INDEX IF NOT EXISTS idx_call_sessions_channel_id ON call_sessions(channel_id);

-- =============================================================================
-- 3. CONFIGURATION RLS (ROW LEVEL SECURITY)
-- =============================================================================

-- Activer RLS sur toutes les tables
ALTER TABLE clients ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE channels ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE file_uploads ENABLE ROW LEVEL SECURITY;
ALTER TABLE message_read_status ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_presence ENABLE ROW LEVEL SECURITY;
ALTER TABLE call_sessions ENABLE ROW LEVEL SECURITY;

-- Politiques RLS pour les clients
CREATE POLICY "Users can view all clients" ON clients FOR SELECT USING (true);
CREATE POLICY "Users can insert clients" ON clients FOR INSERT WITH CHECK (true);
CREATE POLICY "Users can update clients" ON clients FOR UPDATE USING (true);

-- Politiques RLS pour les projets
CREATE POLICY "Users can view all projects" ON projects FOR SELECT USING (true);
CREATE POLICY "Users can insert projects" ON projects FOR INSERT WITH CHECK (true);
CREATE POLICY "Users can update projects" ON projects FOR UPDATE USING (true);

-- Politiques RLS pour les canaux
CREATE POLICY "Users can view all channels" ON channels FOR SELECT USING (true);
CREATE POLICY "Users can insert channels" ON channels FOR INSERT WITH CHECK (true);
CREATE POLICY "Users can update channels" ON channels FOR UPDATE USING (true);

-- Politiques RLS pour les messages
CREATE POLICY "Users can view all messages" ON messages FOR SELECT USING (true);
CREATE POLICY "Users can insert messages" ON messages FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own messages" ON messages FOR UPDATE USING (auth.uid() = user_id);

-- Politiques RLS pour les uploads
CREATE POLICY "Users can view all file uploads" ON file_uploads FOR SELECT USING (true);
CREATE POLICY "Users can insert file uploads" ON file_uploads FOR INSERT WITH CHECK (auth.uid() = uploaded_by);
CREATE POLICY "Users can update their own file uploads" ON file_uploads FOR UPDATE USING (auth.uid() = uploaded_by);

-- Politiques RLS pour le statut de lecture
CREATE POLICY "Users can view all read status" ON message_read_status FOR SELECT USING (true);
CREATE POLICY "Users can insert their own read status" ON message_read_status FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own read status" ON message_read_status FOR UPDATE USING (auth.uid() = user_id);

-- Politiques RLS pour la présence
CREATE POLICY "Users can view all presence" ON user_presence FOR SELECT USING (true);
CREATE POLICY "Users can insert their own presence" ON user_presence FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own presence" ON user_presence FOR UPDATE USING (auth.uid() = user_id);

-- Politiques RLS pour les sessions d'appels
CREATE POLICY "Users can view all call sessions" ON call_sessions FOR SELECT USING (true);
CREATE POLICY "Users can insert call sessions" ON call_sessions FOR INSERT WITH CHECK (auth.uid() = initiator_id);
CREATE POLICY "Users can update call sessions" ON call_sessions FOR UPDATE USING (true);

-- =============================================================================
-- 4. FONCTIONS ET TRIGGERS
-- =============================================================================

-- Fonction pour mettre à jour automatiquement updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Triggers pour updated_at
CREATE TRIGGER update_clients_updated_at BEFORE UPDATE ON clients FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_projects_updated_at BEFORE UPDATE ON projects FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_channels_updated_at BEFORE UPDATE ON channels FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_messages_updated_at BEFORE UPDATE ON messages FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- =============================================================================
-- 5. DONNÉES DE TEST
-- =============================================================================

-- Insertion de clients de test
INSERT INTO clients (name, email, phone, company) VALUES
('Jean Dupont', 'jean.dupont@example.com', '+33123456789', 'Tech Solutions'),
('Marie Martin', 'marie.martin@example.com', '+33987654321', 'Digital Agency'),
('Pierre Durand', 'pierre.durand@example.com', '+33555666777', 'Startup Inc')
ON CONFLICT (email) DO NOTHING;

-- Insertion de projets de test
INSERT INTO projects (name, description, client_id, status) VALUES
('Site Web E-commerce', 'Développement d''une plateforme e-commerce moderne', 
 (SELECT id FROM clients WHERE email = 'jean.dupont@example.com'), 'active'),
('Application Mobile', 'Création d''une app mobile iOS/Android', 
 (SELECT id FROM clients WHERE email = 'marie.martin@example.com'), 'active'),
('Refonte Site Corporate', 'Modernisation du site web corporate', 
 (SELECT id FROM clients WHERE email = 'pierre.durand@example.com'), 'active');

-- Insertion de canaux de test
INSERT INTO channels (name, project_id, type) VALUES
('Général', (SELECT id FROM projects WHERE name = 'Site Web E-commerce'), 'text'),
('Développement', (SELECT id FROM projects WHERE name = 'Site Web E-commerce'), 'text'),
('Réunions', (SELECT id FROM projects WHERE name = 'Site Web E-commerce'), 'video'),
('Général', (SELECT id FROM projects WHERE name = 'Application Mobile'), 'text'),
('Design', (SELECT id FROM projects WHERE name = 'Application Mobile'), 'text'),
('Général', (SELECT id FROM projects WHERE name = 'Refonte Site Corporate'), 'text');

-- =============================================================================
-- 6. VUES UTILES
-- =============================================================================

-- Vue pour les projets avec informations client
CREATE OR REPLACE VIEW projects_with_client AS
SELECT 
    p.id,
    p.name as project_name,
    p.description,
    p.status,
    p.created_at,
    p.updated_at,
    c.name as client_name,
    c.email as client_email,
    c.company as client_company
FROM projects p
JOIN clients c ON p.client_id = c.id;

-- Vue pour les messages avec informations du canal
CREATE OR REPLACE VIEW messages_with_channel AS
SELECT 
    m.id,
    m.content,
    m.message_type,
    m.file_url,
    m.created_at,
    m.user_id,
    ch.name as channel_name,
    ch.type as channel_type,
    p.name as project_name
FROM messages m
JOIN channels ch ON m.channel_id = ch.id
JOIN projects p ON ch.project_id = p.id
ORDER BY m.created_at DESC;

-- =============================================================================
-- FIN DU SCRIPT
-- =============================================================================

-- Afficher un message de confirmation
DO $$
BEGIN
    RAISE NOTICE 'Base de données Supabase configurée avec succès !';
    RAISE NOTICE 'Tables créées: clients, projects, channels, messages, file_uploads, message_read_status, user_presence, call_sessions';
    RAISE NOTICE 'RLS activé avec politiques de sécurité';
    RAISE NOTICE 'Données de test insérées';
    RAISE NOTICE 'Vues utiles créées';
END
$$; 