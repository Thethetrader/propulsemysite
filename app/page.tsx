import React from 'react'

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header Navigation */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="text-2xl font-bold text-black">
              Propulsemysite
            </div>
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

      {/* Hero Section */}
      <main className="pt-24 w-full min-h-screen flex items-center relative overflow-hidden">
        {/* Images défilantes */}
        <div className="absolute right-0 top-0 h-full w-1/3 flex flex-col overflow-hidden">
          <div className="animate-slide-up flex flex-col">
            <div className="w-4/5 h-96 mb-4 rounded-lg overflow-hidden shadow-lg hover:shadow-glow transition-all duration-300 mx-auto">
              <img src="/site1.png" alt="Site 1" className="w-full h-full object-cover" />
            </div>
            <div className="w-4/5 h-96 mb-4 rounded-lg overflow-hidden shadow-lg hover:shadow-glow transition-all duration-300 mx-auto">
              <img src="/site2.png" alt="Site 2" className="w-full h-full object-cover" />
            </div>
            <div className="w-4/5 h-96 mb-4 rounded-lg overflow-hidden shadow-lg hover:shadow-glow transition-all duration-300 mx-auto">
              <img src="/site3.png" alt="Site 3" className="w-full h-full object-cover" />
            </div>
            <div className="w-4/5 h-96 mb-4 rounded-lg overflow-hidden shadow-lg hover:shadow-glow transition-all duration-300 mx-auto">
              <img src="/site4.png" alt="Site 4" className="w-full h-full object-cover" />
            </div>
            <div className="w-4/5 h-96 mb-4 rounded-lg overflow-hidden shadow-lg hover:shadow-glow transition-all duration-300 mx-auto">
              <img src="/site5.png" alt="Site 5" className="w-full h-full object-cover" />
            </div>
            {/* Duplicate pour le loop */}
            <div className="w-4/5 h-96 mb-4 rounded-lg overflow-hidden shadow-lg hover:shadow-glow transition-all duration-300 mx-auto">
              <img src="/site1.png" alt="Site 1" className="w-full h-full object-cover" />
            </div>
            <div className="w-4/5 h-96 mb-4 rounded-lg overflow-hidden shadow-lg hover:shadow-glow transition-all duration-300 mx-auto">
              <img src="/site2.png" alt="Site 2" className="w-full h-full object-cover" />
            </div>
            <div className="w-4/5 h-96 mb-4 rounded-lg overflow-hidden shadow-lg hover:shadow-glow transition-all duration-300 mx-auto">
              <img src="/site3.png" alt="Site 3" className="w-full h-full object-cover" />
            </div>
            <div className="w-4/5 h-96 mb-4 rounded-lg overflow-hidden shadow-lg hover:shadow-glow transition-all duration-300 mx-auto">
              <img src="/site4.png" alt="Site 4" className="w-full h-full object-cover" />
            </div>
            <div className="w-4/5 h-96 mb-4 rounded-lg overflow-hidden shadow-lg hover:shadow-glow transition-all duration-300 mx-auto">
              <img src="/site5.png" alt="Site 5" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
        
        <div className="w-2/3 px-8 py-20">
          <div className="text-center">
            <h1 className="text-6xl md:text-7xl font-light text-black mb-8 leading-tight">
              Créez votre site web professionnel
            </h1>
            <p className="text-xl text-gray-600 mb-12 max-w-xl mx-auto leading-relaxed">
              Transformez votre vision en réalité digitale. Des sites web modernes, rapides et optimisés pour votre succès.
            </p>
            <button className="bg-black text-white px-10 py-4 rounded-full text-lg font-medium hover:bg-gray-800 transition-all duration-300 transform hover:scale-105">
              Commencer maintenant
            </button>
          </div>
        </div>
      </main>


      {/* Section Prix */}
      <section id="prix" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-8">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-light text-black mb-6">
              Nos solutions digitales
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Des packages complets adaptés à votre ambition entrepreneuriale. 
              Développement professionnel, accompagnement personnalisé et résultats garantis.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {/* Formule Starter */}
            <div className="bg-white rounded-2xl p-8 border border-gray-200 hover:shadow-lg transition-all duration-300">
              <div className="text-center">
                <h3 className="text-2xl font-semibold text-black mb-2">Starter</h3>
                <p className="text-sm text-gray-500 mb-4">Parfait pour débuter</p>
                <div className="text-4xl font-bold text-gray-800 mb-6">
                  799€
                </div>
                <ul className="text-left space-y-4 text-gray-600 mb-8">
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
                <button className="w-full bg-black text-white py-3 rounded-full hover:bg-gray-800 transition font-medium">
                  Démarrer mon projet
                </button>
              </div>
            </div>

            {/* Formule Pro */}
            <div className="bg-white rounded-2xl p-8 border-2 border-black hover:shadow-lg transition-all duration-300 transform scale-105">
              <div className="text-center">
                <div className="bg-black text-white text-sm px-4 py-1 rounded-full inline-block mb-4">
                  🔥 Recommandé
                </div>
                <h3 className="text-2xl font-semibold text-black mb-2">Pro</h3>
                <p className="text-sm text-gray-500 mb-4">Pour entreprises ambitieuses</p>
                <div className="text-4xl font-bold text-gray-800 mb-6">
                  1299€
                </div>
                <ul className="text-left space-y-4 text-gray-600 mb-8">
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
            <div className="bg-white rounded-2xl p-8 border border-gray-200 hover:shadow-lg transition-all duration-300">
              <div className="text-center">
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
    </div>
  )
} 