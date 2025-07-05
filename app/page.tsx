"use client";

import React, { useState } from 'react'

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white">
      {/* Header Navigation */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="text-2xl font-bold text-black">
              Propulsemysite
            </div>
            <button className="md:hidden ml-auto p-2" onClick={() => setMenuOpen(true)}>
              <span className="block w-6 h-0.5 bg-black mb-1"></span>
              <span className="block w-6 h-0.5 bg-black mb-1"></span>
              <span className="block w-6 h-0.5 bg-black"></span>
            </button>
            <nav className="hidden md:flex items-center space-x-8">
              <a href="#services" className="text-gray-600 hover:text-black transition">Services</a>
              <a href="#prix" className="text-gray-600 hover:text-black transition">Prix</a>
              <a href="#contact" className="text-gray-600 hover:text-black transition">Contact</a>
              <a href="/login" className="bg-black text-white px-6 py-2 rounded-full hover:bg-gray-800 transition">
                Connexion
              </a>
            </nav>
          </div>
        </div>
      </header>

      {menuOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-end md:hidden">
          <div className="w-2/3 max-w-xs bg-white h-full p-8 flex flex-col space-y-8 shadow-2xl">
            <button className="self-end mb-8" onClick={() => setMenuOpen(false)}>
              <span className="block w-6 h-0.5 bg-black mb-1 rotate-45 translate-y-1.5"></span>
              <span className="block w-6 h-0.5 bg-black -rotate-45 -translate-y-1.5"></span>
            </button>
            <a href="#services" className="text-lg font-medium text-gray-800" onClick={() => setMenuOpen(false)}>Services</a>
            <a href="#prix" className="text-lg font-medium text-gray-800" onClick={() => setMenuOpen(false)}>Prix</a>
            <a href="#contact" className="text-lg font-medium text-gray-800" onClick={() => setMenuOpen(false)}>Contact</a>
            <a href="/login" className="bg-black text-white px-6 py-2 rounded-full text-center font-medium hover:bg-gray-800 transition" onClick={() => setMenuOpen(false)}>Connexion</a>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <main className="pt-24 w-full min-h-screen flex items-center relative overflow-hidden">
        {/* Images défilantes */}
        <div className="absolute right-0 top-0 h-full w-1/3 flex flex-col overflow-hidden">
          <div className="animate-slide-up flex flex-col">
            <div className="w-full h-40 md:w-4/5 md:h-96 mb-4 rounded-lg overflow-hidden shadow-lg hover:shadow-glow transition-all duration-300 mx-auto">
              <img src="/site1.png" alt="Site 1" className="w-full h-full object-cover" />
            </div>
            <div className="w-full h-40 md:w-4/5 md:h-96 mb-4 rounded-lg overflow-hidden shadow-lg hover:shadow-glow transition-all duration-300 mx-auto">
              <img src="/site2.png" alt="Site 2" className="w-full h-full object-cover" />
            </div>
            <div className="w-full h-40 md:w-4/5 md:h-96 mb-4 rounded-lg overflow-hidden shadow-lg hover:shadow-glow transition-all duration-300 mx-auto">
              <img src="/site3.png" alt="Site 3" className="w-full h-full object-cover" />
            </div>
            <div className="w-full h-40 md:w-4/5 md:h-96 mb-4 rounded-lg overflow-hidden shadow-lg hover:shadow-glow transition-all duration-300 mx-auto">
              <img src="/site4.png" alt="Site 4" className="w-full h-full object-cover" />
            </div>
            <div className="w-full h-40 md:w-4/5 md:h-96 mb-4 rounded-lg overflow-hidden shadow-lg hover:shadow-glow transition-all duration-300 mx-auto">
              <img src="/site5.png" alt="Site 5" className="w-full h-full object-cover" />
            </div>
            {/* Duplicate pour le loop */}
            <div className="w-full h-40 md:w-4/5 md:h-96 mb-4 rounded-lg overflow-hidden shadow-lg hover:shadow-glow transition-all duration-300 mx-auto">
              <img src="/site1.png" alt="Site 1" className="w-full h-full object-cover" />
            </div>
            <div className="w-full h-40 md:w-4/5 md:h-96 mb-4 rounded-lg overflow-hidden shadow-lg hover:shadow-glow transition-all duration-300 mx-auto">
              <img src="/site2.png" alt="Site 2" className="w-full h-full object-cover" />
            </div>
            <div className="w-full h-40 md:w-4/5 md:h-96 mb-4 rounded-lg overflow-hidden shadow-lg hover:shadow-glow transition-all duration-300 mx-auto">
              <img src="/site3.png" alt="Site 3" className="w-full h-full object-cover" />
            </div>
            <div className="w-full h-40 md:w-4/5 md:h-96 mb-4 rounded-lg overflow-hidden shadow-lg hover:shadow-glow transition-all duration-300 mx-auto">
              <img src="/site4.png" alt="Site 4" className="w-full h-full object-cover" />
            </div>
            <div className="w-full h-40 md:w-4/5 md:h-96 mb-4 rounded-lg overflow-hidden shadow-lg hover:shadow-glow transition-all duration-300 mx-auto">
              <img src="/site5.png" alt="Site 5" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
        
        <div className="w-2/3 px-8 py-20">
          <div className="text-center">
            <h1 className="text-3xl md:text-6xl font-light text-black mb-8 leading-tight">
              Créez votre site web professionnel
            </h1>
            <p className="text-base md:text-xl text-gray-600 mb-12 max-w-xl mx-auto leading-relaxed">
              Transformez votre vision en réalité digitale. Des sites web modernes, rapides et optimisés pour votre succès.
            </p>
            <button className="bg-black text-white px-10 py-4 rounded-full text-lg font-medium hover:bg-gray-800 transition-all duration-300 transform hover:scale-105"
              onClick={() => window.location.href = '/contact'}>
              Commencer maintenant
            </button>
          </div>
        </div>
      </main>


      {/* Section Prix */}
      <section id="prix" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-8">
          <div className="text-center mb-16">
            <h2 className="text-2xl md:text-5xl font-light text-black mb-6">
              Nos solutions digitales
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Des packages complets adaptés à votre ambition entrepreneuriale. 
              Développement professionnel, accompagnement personnalisé et résultats garantis.
            </p>
          </div>
          
          <div className="flex md:grid md:grid-cols-3 gap-8 overflow-x-auto md:overflow-visible pb-4 md:pb-0">
            {/* Formule Starter */}
            <div className="relative bg-white rounded-2xl p-4 md:p-8 border-4 border-transparent md:hover:border-4 md:hover:border-transparent md:hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-2xl md:hover:shadow-lg group overflow-hidden min-w-[240px] max-w-xs mx-2 md:min-w-0 md:max-w-none md:mx-0"
              style={{boxShadow: '0 0 0 4px transparent'}}>
              <div className="relative z-20 text-center md:text-center">
                <h3 className="text-base md:text-2xl font-semibold text-black mb-2">Starter</h3>
                <p className="text-xs md:text-sm text-gray-500 mb-4">Parfait pour débuter</p>
                <div className="text-xl md:text-4xl font-bold text-gray-800 mb-6">
                  799€
                </div>
                <ul className="text-left md:text-left space-y-4 text-gray-600 mb-8 text-xs md:text-base">
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span><strong>Site vitrine professionnel</strong><br/>
                    <span className="text-sm text-gray-500">5 pages optimisées (Accueil, Services, À propos, Contact, Mentions légales)</span></span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span><strong>Design responsive premium</strong><br/>
                    <span className="text-sm text-gray-500">Adapté mobile, tablette et desktop</span></span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span><strong>Hébergement sécurisé inclus</strong><br/>
                    <span className="text-sm text-gray-500">12 mois + nom de domaine offert</span></span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span><strong>Support technique</strong><br/>
                    <span className="text-sm text-gray-500">Assistance par email sous 24h</span></span>
                  </li>
                </ul>
                <button className="w-full bg-black text-white py-2 md:py-3 rounded-full hover:bg-gray-800 transition font-medium text-xs md:text-base">
                  Démarrer mon projet
                </button>
              </div>
            </div>

            {/* Formule Pro */}
            <div className="relative bg-white rounded-2xl p-4 md:p-8 border-4 border-transparent md:hover:border-4 md:hover:border-transparent md:hover:scale-110 transition-all duration-300 shadow-2xl group overflow-hidden min-w-[240px] max-w-xs mx-2 md:min-w-0 md:max-w-none md:mx-0"
              style={{boxShadow: '0 0 0 4px transparent'}}>
              <div className="relative z-20 text-center md:text-center">
                <div className="bg-black text-white text-sm px-4 py-1 rounded-full inline-block mb-4">
                  🔥 Recommandé
                </div>
                <h3 className="text-base md:text-2xl font-semibold text-black mb-2">Pro</h3>
                <p className="text-xs md:text-sm text-gray-500 mb-4">Pour entreprises ambitieuses</p>
                <div className="text-4xl font-bold text-gray-800 mb-6">
                  1299€
                </div>
                <ul className="text-left space-y-4 text-gray-600 mb-8 text-xs md:text-base">
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span><strong>Site web professionnel</strong><br/>
                    <span className="text-sm text-gray-500">Jusqu'à 10 pages + blog intégré</span></span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span><strong>Design sur mesure</strong><br/>
                    <span className="text-sm text-gray-500">Identité visuelle personnalisée</span></span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span><strong>Espace client Discord</strong><br/>
                    <span className="text-sm text-gray-500">Suivi projet en temps réel</span></span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span><strong>Module e-commerce basique</strong><br/>
                    <span className="text-sm text-gray-500">Boutique en ligne + paiements</span></span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span><strong>Optimisation SEO</strong><br/>
                    <span className="text-sm text-gray-500">Référencement Google de base</span></span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span><strong>Référencement LLMFind</strong><br/>
                    <span className="text-sm text-gray-500">Indexation sur moteur IA spécialisé</span></span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span><strong>Support prioritaire</strong><br/>
                    <span className="text-sm text-gray-500">Assistance sous 4h ouvrées</span></span>
                  </li>
                </ul>
                <button className="w-full bg-black text-white py-3 rounded-full hover:bg-gray-800 transition font-medium">
                  Accélérer ma croissance
                </button>
              </div>
            </div>

            {/* Formule Premium */}
            <div className="relative bg-white rounded-2xl p-4 md:p-8 border-4 border-transparent md:hover:border-4 md:hover:border-transparent md:hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-2xl md:hover:shadow-lg group overflow-hidden min-w-[240px] max-w-xs mx-2 md:min-w-0 md:max-w-none md:mx-0"
              style={{boxShadow: '0 0 0 4px transparent'}}>
              <div className="relative z-20 text-center md:text-center">
                <h3 className="text-2xl font-semibold text-black mb-2">Premium</h3>
                <p className="text-sm text-gray-500 mb-4">Solution complète sur mesure</p>
                <div className="text-4xl font-bold text-gray-800 mb-6">
                  1999€
                </div>
                <ul className="text-left space-y-4 text-gray-600 mb-8">
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span><strong>Plateforme web illimitée</strong><br/>
                    <span className="text-sm text-gray-500">Pages illimitées + architecture sur mesure</span></span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span><strong>Design 100% unique & premium</strong><br/>
                    <span className="text-sm text-gray-500">Identité visuelle complète + charte graphique</span></span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span><strong>E-commerce avancé complet</strong><br/>
                    <span className="text-sm text-gray-500">Gestion stocks, factures, analytics, multi-devises</span></span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span><strong>SEO professionnel + marketing</strong><br/>
                    <span className="text-sm text-gray-500">Audit SEO complet + stratégie de contenu</span></span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span><strong>Référencement LLMFind Premium</strong><br/>
                    <span className="text-sm text-gray-500">Indexation prioritaire + optimisation IA</span></span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span><strong>Accompagnement VIP dédié</strong><br/>
                    <span className="text-sm text-gray-500">Chef de projet + formations + consultations</span></span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span><strong>Maintenance premium 24 mois</strong><br/>
                    <span className="text-sm text-gray-500">Évolutions illimitées + support 24h/7j</span></span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span><strong>Fonctionnalités avancées</strong><br/>
                    <span className="text-sm text-gray-500">CRM intégré, automatisations, API custom</span></span>
                  </li>
                </ul>
                <button className="w-full bg-black text-white py-3 rounded-full hover:bg-gray-800 transition font-medium">
                  Dominer mon marché
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Formulaire de contact (sous la landing page, avant le footer) */}
      <ContactForm />

      {/* Footer */}
      <footer className="bg-white border-t border-gray-100 mt-16">
        <div className="max-w-4xl mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-4 gap-8 text-gray-700">
          <div>
            <h2 className="font-bold text-lg mb-2">Propulsemysite</h2>
            <p className="text-sm mb-4">Boostez votre présence en ligne. Création de sites web modernes, accompagnement et conseils personnalisés.</p>
            <div className="flex space-x-3">
              <a href="mailto:contact@propulsemysite.com" className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition"><span aria-label="email" role="img">✉️</span></a>
              <a href="https://www.propulsemysite.com" target="_blank" rel="noopener noreferrer" className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition"><span aria-label="site" role="img">🌐</span></a>
            </div>
          </div>
          <div>
            <h3 className="font-semibold mb-3">Produit</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:underline">Accueil</a></li>
              <li><a href="#" className="hover:underline">Fonctionnalités</a></li>
              <li><a href="#" className="hover:underline">Tarifs</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-3">Entreprise</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:underline">Contact</a></li>
              <li><a href="#" className="hover:underline">Support</a></li>
              <li><a href="#" className="hover:underline">À propos</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-3">Légal</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:underline">Politique de confidentialité</a></li>
              <li><a href="#" className="hover:underline">Mentions légales</a></li>
            </ul>
          </div>
        </div>
        <div className="text-center text-xs text-gray-400 py-4 border-t border-gray-100">© {new Date().getFullYear()} Propulsemysite. Tous droits réservés.</div>
      </footer>
    </div>
  )
}

function ContactForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent('Demande de contact depuis Propulsemysite');
    const body = encodeURIComponent(`Nom: ${name}\nEmail: ${email}\n\n${message}`);
    window.location.href = `mailto:contact@propulsemysite.com?subject=${subject}&body=${body}`;
  };

  return (
    <div className="flex items-center justify-center bg-gray-50 px-4 pt-2 pb-8">
      <form onSubmit={handleSubmit} className="bg-white rounded-3xl shadow-2xl p-12 w-full max-w-xl border border-gray-100">
        <h2 className="text-3xl font-extrabold mb-8 text-center text-black tracking-tight">Contactez-nous</h2>
        <div className="mb-6">
          <label className="block text-gray-700 mb-2 text-lg">Nom</label>
          <input type="text" value={name} onChange={e => setName(e.target.value)} required className="w-full px-5 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-black bg-gray-50 text-base" />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 mb-2 text-lg">Email</label>
          <input type="email" value={email} onChange={e => setEmail(e.target.value)} required className="w-full px-5 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-black bg-gray-50 text-base" />
        </div>
        <div className="mb-8">
          <label className="block text-gray-700 mb-2 text-lg">Message</label>
          <textarea value={message} onChange={e => setMessage(e.target.value)} required rows={6} className="w-full px-5 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-black bg-gray-50 text-base resize-none" />
        </div>
        <button type="submit" className="w-full bg-black text-white py-4 rounded-full font-bold text-lg shadow hover:bg-gray-800 transition">Envoyer</button>
      </form>
    </div>
  );
} 