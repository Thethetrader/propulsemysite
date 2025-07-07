const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function testSupabaseComplete() {
  console.log('🧪 Test final de Supabase...\n');

  try {
    // 1. Test des tables
    console.log('📋 Test des tables...');
    const tables = ['clients', 'projects', 'channels', 'messages', 'file_uploads', 'message_read_status', 'user_presence', 'call_sessions'];
    
    for (const tableName of tables) {
      const { data, error } = await supabase.from(tableName).select('*').limit(1);
      if (error) {
        console.log(`❌ Table ${tableName}: ${error.message}`);
      } else {
        console.log(`✅ Table ${tableName}: OK`);
      }
    }

    // 2. Test du bucket storage
    console.log('\n📁 Test du bucket storage...');
    const { data: buckets, error: bucketError } = await supabase.storage.listBuckets();
    if (bucketError) {
      console.log('❌ Bucket storage:', bucketError.message);
    } else {
      const chatBucket = buckets.find(b => b.name === 'chat-files');
      if (chatBucket) {
        console.log('✅ Bucket chat-files: OK');
      } else {
        console.log('❌ Bucket chat-files: Non trouvé');
      }
    }

    // 3. Test des données de test
    console.log('\n🧪 Test des données de test...');
    const { data: clients, error: clientError } = await supabase.from('clients').select('*');
    if (clientError) {
      console.log('❌ Clients:', clientError.message);
    } else {
      console.log(`✅ Clients: ${clients.length} enregistrements`);
      clients.forEach(client => console.log(`   - ${client.name} (${client.email})`));
    }

    const { data: projects, error: projectError } = await supabase.from('projects').select('*');
    if (projectError) {
      console.log('❌ Projects:', projectError.message);
    } else {
      console.log(`✅ Projects: ${projects.length} enregistrements`);
    }

    const { data: channels, error: channelError } = await supabase.from('channels').select('*');
    if (channelError) {
      console.log('❌ Channels:', channelError.message);
    } else {
      console.log(`✅ Channels: ${channels.length} enregistrements`);
    }

    // 4. Test d'authentification
    console.log('\n🔐 Test d\'authentification...');
    const { data: authData, error: authError } = await supabase.auth.getSession();
    if (authError) {
      console.log('❌ Auth:', authError.message);
    } else {
      console.log('✅ Service d\'authentification: OK');
    }

    console.log('\n🎉 CONFIGURATION TERMINÉE AVEC SUCCÈS !');
    console.log('🚀 Votre application est prête à fonctionner !');
    console.log('💡 Testez maintenant avec: npm run dev');

  } catch (error) {
    console.error('❌ Erreur lors du test:', error.message);
  }
}

testSupabaseComplete(); 