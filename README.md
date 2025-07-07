# Propulsemysite

## Configuration Supabase

### 1. Créer un fichier .env.local à la racine du projet :

```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key_here
```

### 2. Tables à créer dans Supabase :

#### Table `clients`
```sql
CREATE TABLE clients (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

#### Table `projects`
```sql
CREATE TABLE projects (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  client_id UUID REFERENCES clients(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

#### Table `channels`
```sql
CREATE TABLE channels (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

#### Table `messages`
```sql
CREATE TABLE messages (
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
```

#### Table `file_uploads`
```sql
CREATE TABLE file_uploads (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  channel_id UUID REFERENCES channels(id) ON DELETE CASCADE,
  file_name TEXT NOT NULL,
  file_size INTEGER NOT NULL,
  file_type TEXT NOT NULL,
  file_path TEXT NOT NULL,
  file_url TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

#### Table `message_read_status`
```sql
CREATE TABLE message_read_status (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  message_id UUID REFERENCES messages(id) ON DELETE CASCADE,
  user_id TEXT NOT NULL,
  read_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(message_id, user_id)
);
```

#### Table `user_presence`
```sql
CREATE TABLE user_presence (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id TEXT UNIQUE NOT NULL,
  is_online BOOLEAN DEFAULT false,
  last_seen TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

#### Table `call_sessions`
```sql
CREATE TABLE call_sessions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  channel_id UUID REFERENCES channels(id) ON DELETE CASCADE,
  caller_id TEXT NOT NULL,
  caller_name TEXT NOT NULL,
  participants JSONB DEFAULT '[]',
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'ended')),
  started_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  ended_at TIMESTAMP WITH TIME ZONE
);
```

### 3. Buckets Supabase Storage

#### Créer le bucket pour les fichiers de chat :
```sql
-- Dans l'interface Supabase Storage, créer un bucket nommé 'chat-files'
-- Ou via SQL :
INSERT INTO storage.buckets (id, name, public) VALUES ('chat-files', 'chat-files', true);
```

#### Politiques pour le bucket chat-files :
```sql
-- Permettre l'upload de fichiers
CREATE POLICY "Allow authenticated uploads" ON storage.objects 
FOR INSERT WITH CHECK (bucket_id = 'chat-files' AND auth.role() = 'authenticated');

-- Permettre la lecture publique des fichiers
CREATE POLICY "Allow public access" ON storage.objects 
FOR SELECT USING (bucket_id = 'chat-files');

-- Permettre la suppression par le propriétaire
CREATE POLICY "Allow delete own files" ON storage.objects 
FOR DELETE USING (bucket_id = 'chat-files' AND auth.uid()::text = (storage.foldername(name))[1]);
```

### 4. Politiques de sécurité (RLS)

Activer Row Level Security sur toutes les tables et créer les politiques appropriées.

```sql
-- Activer RLS sur toutes les tables
ALTER TABLE clients ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE channels ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE file_uploads ENABLE ROW LEVEL SECURITY;
ALTER TABLE message_read_status ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_presence ENABLE ROW LEVEL SECURITY;
ALTER TABLE call_sessions ENABLE ROW LEVEL SECURITY;

-- Politiques pour les messages (exemple)
CREATE POLICY "Users can view messages in their channels" ON messages
FOR SELECT USING (
  channel_id IN (
    SELECT c.id FROM channels c
    JOIN projects p ON c.project_id = p.id
    JOIN clients cl ON p.client_id = cl.id
    WHERE cl.email = auth.jwt() ->> 'email'
  )
);
```

### 5. Installation

```bash
# Installer les dépendances
npm install

# Ajouter les nouveaux packages pour les intégrations
npm install simple-peer socket.io-client react-hot-toast lucide-react

# Types TypeScript optionnels
npm install -D @types/simple-peer

# Démarrer en développement
npm run dev
```

### 6. Configuration des Intégrations

#### Permissions du navigateur requises :
- **Caméra et micro** : pour les appels vidéo
- **Notifications** : pour les alertes en temps réel
- **Partage d'écran** : pour la collaboration

#### Variables d'environnement (.env.local) :
```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key_here

# Optionnel : Configuration WebRTC
NEXT_PUBLIC_STUN_SERVERS=stun:stun.l.google.com:19302
NEXT_PUBLIC_TURN_SERVERS=your_turn_server_if_needed
```

## 🚨 HISTORIQUE DES MODIFICATIONS IMPORTANTES - SAUVEGARDE DE RÉCUPÉRATION

### ⚠️ ÉTAT STABLE ACTUEL (Point de restauration)
**Date:** Décembre 2024
**Version:** Stable après modifications majeures de design et navigation

### 📋 TOUTES LES MODIFICATIONS EFFECTUÉES (pour restauration si bugs)

#### 1. **LAYOUT MOBILE - PHOTOS DÉFILANTES**
- **Section mobile uniquement** : Photos défilantes verticales ajoutées
- **Localisation** : `app/page.tsx` - Section `md:hidden py-8 bg-white`
- **Hauteur** : 1008px pour afficher 4 photos simultanément
- **Images** : 4 sets de 5 photos (site1.png à site5.png) pour scroll infini
- **Animation** : CSS `animate-slide-up-mobile` à 180 secondes

#### 2. **NAVIGATION ET REDIRECTIONS**
- **Bouton "Commencer maintenant"** : Redirige vers formulaire de contact (#contact)
- **Tous les boutons de prix** : 
  - "Démarrer mon projet" (Starter)
  - "Accélérer ma croissance" (Pro) 
  - "Dominer mon marché" (Premium)
- **Boutons "Contact"** : Menu desktop et mobile
- **Méthode** : `document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })`

#### 3. **FORMULAIRE DE CONTACT**
- **ID ajouté** : `<div id="contact">` pour les redirections
- **Texte simplifié** : Suppression de la phrase sur "l'appel de découverte"
- **Localisation** : Composant `ContactForm()` dans `app/page.tsx`

#### 4. **ANIMATIONS ET EFFETS**
- **Hover effects** : `hover:shadow-black-glow` sur cartes prix et formulaire
- **CSS ajouté** : Animation pulsante avec ombres noires dans `app/globals.css`
- **Transitions** : Durée 300ms pour tous les effets

#### 5. **RESPONSIVITÉ MOBILE**
- **Images desktop** : `hidden md:flex` pour masquer sur mobile
- **Largeur principale** : `w-full md:w-2/3` pour pleine largeur mobile
- **Chat mobile** : Header et input fixés, messages scrollables
- **Sidebar chat** : Toggle repositionné à gauche

#### 6. **FICHIERS MODIFIÉS**
- `app/page.tsx` : Layout principal, redirections, formulaire
- `app/globals.css` : Animations et effets hover
- `app/chat/page.tsx` : Interface chat mobile

### 🔧 COMMENT RESTAURER EN CAS DE BUG

#### Étape 1 - Vérifier les redirections
```javascript
// Vérifier que tous les boutons ont cette fonction :
onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
```

#### Étape 2 - Vérifier l'ID du formulaire
```html
<!-- S'assurer que le formulaire a cet ID : -->
<div id="contact">
  <ContactForm />
</div>
```

#### Étape 3 - Vérifier la section mobile
```javascript
// Section mobile doit avoir cette hauteur :
<div className="w-full overflow-hidden" style={{height: '1008px'}}>
```

#### Étape 4 - Vérifier les classes CSS
```css
/* Dans globals.css, vérifier présence de : */
.hover\:shadow-black-glow:hover {
  animation: black-glow-pulse 2s infinite !important;
}

@keyframes black-glow-pulse {
  0%, 100% {
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.3) !important;
    transform: scale(1.1) !important;
  }
  50% {
    box-shadow: 0 0 40px rgba(0, 0, 0, 0.6) !important;
    transform: scale(1.15) !important;
  }
}
```

### 🎯 FONCTIONNALITÉS VALIDÉES
- ✅ 4 photos visibles simultanément sur mobile
- ✅ Tous les boutons redirigent vers le formulaire
- ✅ Animations hover sur cartes et formulaire
- ✅ Menu mobile fonctionnel
- ✅ Chat mobile avec header/input fixes
- ✅ Scroll fluide vers formulaire de contact

### 💾 DERNIÈRE SAUVEGARDE GITHUB
**Commit:** "Fix mobile layout and add contact form redirects"
**Hash:** 1a9adce

---

## Fonctionnalités Complètes

### Interface de Chat
- Interface type Discord avec sidebars
- Messages temps réel via Supabase Realtime
- Indicateurs de frappe en temps réel
- Statut en ligne/hors ligne des utilisateurs
- Historique des messages avec pagination

### Système d'Appels Vidéo
- Appels vidéo WebRTC peer-to-peer
- Contrôles audio/vidéo (mute, caméra)
- Partage d'écran intégré
- Interface d'appel moderne avec contrôles
- Messages automatiques pour les appels

### Upload de Fichiers
- Drag & drop de fichiers multiples
- Upload vers Supabase Storage
- Aperçu des fichiers avec icônes
- Support photos, vidéos, documents
- Limite de taille (10MB par fichier)
- Métadonnées stockées en base

### Notifications
- Notifications push du navigateur
- Sons de notification personnalisés
- Toast notifications en temps réel
- Badges de messages non lus
- Indicateurs de présence

### Sécurité
- Authentification via Supabase Auth
- Row Level Security (RLS) activé
- Politiques de sécurité granulaires
- Sessions sécurisées

## Structure

- `/` - Landing page avec présentation et prix
- `/chat` - Interface Discord pour les clients connectés
- `/login` - Page de connexion
- `/admin` - Interface d'administration (pour Propulsemysite) 