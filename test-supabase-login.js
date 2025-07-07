const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  'https://levhtmlnwyhmtupdtbrc.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imxldmh0bWxud3lobXR1cGR0YnJjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE4Mzk0NzcsImV4cCI6MjA2NzQxNTQ3N30.BSBhyHGTtvtPkcbyhVFM-KNE5Dhfk9a6bYGdgpHzk1c'
);

async function testLogin(email, password) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    console.log('❌ Erreur de connexion:', error.message);
  } else {
    console.log('✅ Connexion réussie !');
    console.log('Session:', data.session);
    console.log('Utilisateur:', data.user);
  }
}

testLogin('al@gmail.com', 'al'); 