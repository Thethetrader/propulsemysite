#!/usr/bin/env node

const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

// Configuration
const SUPABASE_URL = 'https://levhtmlnwyhmtupdtbrc.supabase.co';
const SUPABASE_SERVICE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imxldmh0bWxud3lobXR1cGR0YnJjIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1MTgzOTQ3NywiZXhwIjoyMDY3NDE1NDc3fQ.YOUR_SERVICE_KEY_HERE'; // Tu devras remplacer par la vraie clé service

console.log('🚀 Configuration automatique de la base de données Supabase...\n');

// Créer le client Supabase avec la clé service (plus de permissions)
const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);

async function setupDatabase() {
    try {
        console.log('📖 Lecture du script SQL...');
        const sqlScript = fs.readFileSync('./setup-supabase-complete.sql', 'utf8');
        
        console.log('🔧 Exécution du script SQL...');
        
        // Diviser le script en commandes individuelles
        const commands = sqlScript
            .split(';')
            .map(cmd => cmd.trim())
            .filter(cmd => cmd.length > 0 && !cmd.startsWith('--'));
        
        console.log(`📝 ${commands.length} commandes SQL à exécuter...\n`);
        
        let successCount = 0;
        let errorCount = 0;
        
        for (let i = 0; i < commands.length; i++) {
            const command = commands[i];
            
            if (command.includes('RAISE NOTICE')) {
                console.log(`⏭️  Commande ${i + 1}/${commands.length}: Message de notification (ignorée)`);
                continue;
            }
            
            try {
                console.log(`⚡ Commande ${i + 1}/${commands.length}: ${command.substring(0, 50)}...`);
                
                const { data, error } = await supabase.rpc('exec_sql', {
                    sql: command + ';'
                });
                
                if (error) {
                    console.log(`❌ Erreur: ${error.message}`);
                    errorCount++;
                } else {
                    console.log(`✅ Succès`);
                    successCount++;
                }
            } catch (err) {
                console.log(`❌ Erreur d'exécution: ${err.message}`);
                errorCount++;
            }
            
            // Petite pause pour éviter de surcharger
            await new Promise(resolve => setTimeout(resolve, 100));
        }
        
        console.log('\n📊 Résultats:');
        console.log(`✅ Commandes réussies: ${successCount}`);
        console.log(`❌ Commandes échouées: ${errorCount}`);
        
        if (errorCount === 0) {
            console.log('\n🎉 Configuration terminée avec succès !');
            await testDatabase();
        } else {
            console.log('\n⚠️  Configuration terminée avec des erreurs. Vérifiez les logs ci-dessus.');
        }
        
    } catch (error) {
        console.error('💥 Erreur critique:', error.message);
        process.exit(1);
    }
}

async function testDatabase() {
    console.log('\n🧪 Test de la base de données...');
    
    try {
        // Test 1: Vérifier les tables
        console.log('🔍 Vérification des tables...');
        const { data: tables, error: tablesError } = await supabase
            .from('information_schema.tables')
            .select('table_name')
            .eq('table_schema', 'public');
        
        if (tablesError) {
            console.log('❌ Erreur lors de la vérification des tables:', tablesError.message);
        } else {
            console.log(`✅ ${tables.length} tables trouvées`);
        }
        
        // Test 2: Vérifier les clients
        console.log('🔍 Vérification des données de test...');
        const { data: clients, error: clientsError } = await supabase
            .from('clients')
            .select('*');
        
        if (clientsError) {
            console.log('❌ Erreur lors de la vérification des clients:', clientsError.message);
        } else {
            console.log(`✅ ${clients.length} clients trouvés`);
        }
        
        // Test 3: Vérifier les projets
        const { data: projects, error: projectsError } = await supabase
            .from('projects')
            .select('*');
        
        if (projectsError) {
            console.log('❌ Erreur lors de la vérification des projets:', projectsError.message);
        } else {
            console.log(`✅ ${projects.length} projets trouvés`);
        }
        
        console.log('\n🎯 Base de données prête à l\'utilisation !');
        
    } catch (error) {
        console.error('❌ Erreur lors du test:', error.message);
    }
}

// Fonction alternative si rpc n'est pas disponible
async function setupDatabaseAlternative() {
    console.log('🔄 Méthode alternative: Exécution manuelle des commandes principales...\n');
    
    try {
        // Créer les tables une par une
        console.log('📋 Création des tables...');
        
        const tables = [
            {
                name: 'clients',
                sql: `
                CREATE TABLE IF NOT EXISTS clients (
                    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
                    name VARCHAR(255) NOT NULL,
                    email VARCHAR(255) UNIQUE NOT NULL,
                    phone VARCHAR(50),
                    company VARCHAR(255),
                    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
                    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
                );`
            },
            {
                name: 'projects',
                sql: `
                CREATE TABLE IF NOT EXISTS projects (
                    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
                    name VARCHAR(255) NOT NULL,
                    description TEXT,
                    client_id UUID REFERENCES clients(id) ON DELETE CASCADE,
                    status VARCHAR(50) DEFAULT 'active',
                    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
                    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
                );`
            }
        ];
        
        for (const table of tables) {
            console.log(`🔧 Création de la table ${table.name}...`);
            const { error } = await supabase.rpc('exec_sql', { sql: table.sql });
            if (error) {
                console.log(`❌ Erreur: ${error.message}`);
            } else {
                console.log(`✅ Table ${table.name} créée`);
            }
        }
        
        console.log('\n🎉 Tables principales créées !');
        
    } catch (error) {
        console.error('💥 Erreur:', error.message);
        console.log('\n📖 Vous devrez exécuter le script SQL manuellement dans le dashboard Supabase.');
        console.log('📁 Fichier: setup-supabase-complete.sql');
    }
}

// Exécuter le script
if (require.main === module) {
    console.log('🎯 Démarrage de la configuration...\n');
    setupDatabase().catch(error => {
        console.error('💥 Échec de la configuration automatique:', error.message);
        console.log('\n🔄 Tentative avec la méthode alternative...\n');
        setupDatabaseAlternative();
    });
}

module.exports = { setupDatabase, testDatabase }; 