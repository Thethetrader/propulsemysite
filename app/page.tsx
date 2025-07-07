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
            <button 
              className="text-2xl font-bold text-black hover:text-gray-600 transition-colors cursor-pointer"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
              Propulsemysite
            </button>
            <button className="md:hidden ml-auto p-2" onClick={() => setMenuOpen(true)}>
              <span className="block w-6 h-0.5 bg-black mb-1"></span>
              <span className="block w-6 h-0.5 bg-black mb-1"></span>
              <span className="block w-6 h-0.5 bg-black"></span>
            </button>
            <nav className="hidden md:flex items-center space-x-8">
              <a href="#services" className="text-gray-600 hover:text-black transition">Services</a>
              <a href="#prix" className="text-gray-600 hover:text-black transition">Prix</a>
              <a href="#contact" className="text-gray-600 hover:text-black transition" onClick={() => {
                document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
              }}>Contact</a>
              <a href="/chat" className="bg-black text-white px-6 py-2 rounded-full hover:bg-gray-800 transition">
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
            <a href="#contact" className="text-lg font-medium text-gray-800" onClick={() => {
              setMenuOpen(false);
              setTimeout(() => {
                document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
              }, 100);
            }}>Contact</a>
            <a href="/chat" className="bg-black text-white px-6 py-2 rounded-full text-center font-medium hover:bg-gray-800 transition" onClick={() => setMenuOpen(false)}>Connexion</a>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <main className="pt-24 w-full min-h-screen flex items-center relative overflow-hidden">
        {/* Images défilantes */}
        <div className="absolute right-0 top-0 h-full w-1/3 hidden md:flex flex-col overflow-hidden">
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
        
        <div className="w-full md:w-2/3 px-8 py-20">
          <div className="text-center">
            <h1 className="text-4xl md:text-8xl font-bold text-black mb-8 leading-tight">
              Passez de l'idée à l'impact.
            </h1>
            <p className="text-base md:text-xl text-gray-600 mb-12 max-w-xl mx-auto leading-relaxed">
              Transformez votre vision en réalité digitale. Des sites web modernes, rapides et optimisés pour votre succès.
            </p>
            <button className="bg-black text-white px-10 py-4 rounded-full text-lg font-medium hover:bg-gray-800 transition-all duration-300 transform hover:scale-105"
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}>
              Commencer maintenant
            </button>
          </div>
        </div>
      </main>

      {/* Section mobile uniquement - Photos défilantes verticales */}
      <section className="md:hidden py-8 bg-white">
        <div className="w-full overflow-hidden" style={{height: '1008px'}}>
          <div className="animate-slide-up-mobile flex flex-col">
            {/* Premier set d'images */}
            <div className="w-full h-60 mb-4 rounded-lg overflow-hidden shadow-lg mx-auto">
              <img src="/site1.png?v=2024" alt="Site 1" className="w-full h-full object-cover" />
            </div>
            <div className="w-full h-60 mb-4 rounded-lg overflow-hidden shadow-lg mx-auto">
              <img src="/site2.png?v=2024" alt="Site 2" className="w-full h-full object-cover" />
            </div>
            <div className="w-full h-60 mb-4 rounded-lg overflow-hidden shadow-lg mx-auto">
              <img src="/site3.png?v=2024" alt="Site 3" className="w-full h-full object-cover" />
            </div>
            <div className="w-full h-60 mb-4 rounded-lg overflow-hidden shadow-lg mx-auto">
              <img src="/site4.png?v=2024" alt="Site 4" className="w-full h-full object-cover" />
            </div>
            <div className="w-full h-60 mb-4 rounded-lg overflow-hidden shadow-lg mx-auto">
              <img src="/site5.png?v=2024" alt="Site 5" className="w-full h-full object-cover" />
            </div>
            {/* Deuxième set d'images */}
            <div className="w-full h-60 mb-4 rounded-lg overflow-hidden shadow-lg mx-auto">
              <img src="/site1.png?v=2024" alt="Site 1" className="w-full h-full object-cover" />
            </div>
            <div className="w-full h-60 mb-4 rounded-lg overflow-hidden shadow-lg mx-auto">
              <img src="/site2.png?v=2024" alt="Site 2" className="w-full h-full object-cover" />
            </div>
            <div className="w-full h-60 mb-4 rounded-lg overflow-hidden shadow-lg mx-auto">
              <img src="/site3.png?v=2024" alt="Site 3" className="w-full h-full object-cover" />
            </div>
            <div className="w-full h-60 mb-4 rounded-lg overflow-hidden shadow-lg mx-auto">
              <img src="/site4.png?v=2024" alt="Site 4" className="w-full h-full object-cover" />
            </div>
            <div className="w-full h-60 mb-4 rounded-lg overflow-hidden shadow-lg mx-auto">
              <img src="/site5.png?v=2024" alt="Site 5" className="w-full h-full object-cover" />
            </div>
            {/* Troisième set d'images */}
            <div className="w-full h-60 mb-4 rounded-lg overflow-hidden shadow-lg mx-auto">
              <img src="/site1.png?v=2024" alt="Site 1" className="w-full h-full object-cover" />
            </div>
            <div className="w-full h-60 mb-4 rounded-lg overflow-hidden shadow-lg mx-auto">
              <img src="/site2.png?v=2024" alt="Site 2" className="w-full h-full object-cover" />
            </div>
            <div className="w-full h-60 mb-4 rounded-lg overflow-hidden shadow-lg mx-auto">
              <img src="/site3.png?v=2024" alt="Site 3" className="w-full h-full object-cover" />
            </div>
            <div className="w-full h-60 mb-4 rounded-lg overflow-hidden shadow-lg mx-auto">
              <img src="/site4.png?v=2024" alt="Site 4" className="w-full h-full object-cover" />
            </div>
            <div className="w-full h-60 mb-4 rounded-lg overflow-hidden shadow-lg mx-auto">
              <img src="/site5.png?v=2024" alt="Site 5" className="w-full h-full object-cover" />
            </div>
            {/* Quatrième set d'images */}
            <div className="w-full h-60 mb-4 rounded-lg overflow-hidden shadow-lg mx-auto">
              <img src="/site1.png?v=2024" alt="Site 1" className="w-full h-full object-cover" />
            </div>
            <div className="w-full h-60 mb-4 rounded-lg overflow-hidden shadow-lg mx-auto">
              <img src="/site2.png?v=2024" alt="Site 2" className="w-full h-full object-cover" />
            </div>
            <div className="w-full h-60 mb-4 rounded-lg overflow-hidden shadow-lg mx-auto">
              <img src="/site3.png?v=2024" alt="Site 3" className="w-full h-full object-cover" />
            </div>
            <div className="w-full h-60 mb-4 rounded-lg overflow-hidden shadow-lg mx-auto">
              <img src="/site4.png?v=2024" alt="Site 4" className="w-full h-full object-cover" />
            </div>
            <div className="w-full h-60 mb-4 rounded-lg overflow-hidden shadow-lg mx-auto">
              <img src="/site5.png?v=2024" alt="Site 5" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
      </section>


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
          
          <div className="grid md:grid-cols-3 gap-8 items-stretch">
            {/* Formule Starter */}
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-black-glow transition-all duration-300 transform hover:scale-105 flex flex-col h-full">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-semibold text-black mb-2">Starter</h3>
                <p className="text-sm text-gray-500 mb-4">Parfait pour débuter</p>
                <div className="text-4xl font-bold text-gray-800">
                  799€
                </div>
              </div>
              
              <ul className="text-left space-y-3 text-gray-600 flex-grow mb-8">
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span><strong>Site vitrine professionnel</strong><br/>
                  <span className="text-sm text-gray-500">5 pages optimisées</span></span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span><strong>Design responsive premium</strong><br/>
                  <span className="text-sm text-gray-500">Adapté mobile et desktop</span></span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span><strong>Hébergement sécurisé inclus</strong><br/>
                  <span className="text-sm text-gray-500">12 mois + domaine offert</span></span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span><strong>Support technique</strong><br/>
                  <span className="text-sm text-gray-500">Assistance email sous 24h</span></span>
                </li>
              </ul>
              
              <button className="w-full bg-black text-white py-3 rounded-full hover:bg-gray-800 transition font-medium"
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}>
                Démarrer mon projet
              </button>
            </div>

            {/* Formule Pro */}
            <div className="bg-white rounded-2xl p-8 shadow-xl border-2 border-black relative flex flex-col h-full hover:shadow-black-glow transition-all duration-300 transform hover:scale-105">
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <div className="bg-black text-white text-sm px-4 py-1 rounded-full">
                  🔥 Recommandé
                </div>
              </div>
              
              <div className="text-center mb-6 mt-4">
                <h3 className="text-2xl font-semibold text-black mb-2">Pro</h3>
                <p className="text-sm text-gray-500 mb-4">Pour entreprises ambitieuses</p>
                <div className="text-4xl font-bold text-gray-800">
                  1299€
                </div>
              </div>
              
              <ul className="text-left space-y-3 text-gray-600 flex-grow mb-8">
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span><strong>Site web professionnel</strong><br/>
                  <span className="text-sm text-gray-500">Jusqu'à 10 pages + blog</span></span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span><strong>Design sur mesure</strong><br/>
                  <span className="text-sm text-gray-500">Identité visuelle personnalisée</span></span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span><strong>Espace client Discord</strong><br/>
                  <span className="text-sm text-gray-500">Suivi projet temps réel</span></span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span><strong>Module e-commerce</strong><br/>
                  <span className="text-sm text-gray-500">Boutique en ligne + paiements</span></span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span><strong>Optimisation SEO</strong><br/>
                  <span className="text-sm text-gray-500">Référencement Google</span></span>
                </li>
              </ul>
              
              <button className="w-full bg-black text-white py-3 rounded-full hover:bg-gray-800 transition font-medium"
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}>
                Accélérer ma croissance
              </button>
            </div>

            {/* Formule Premium */}
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-black-glow transition-all duration-300 transform hover:scale-105 flex flex-col h-full">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-semibold text-black mb-2">Premium</h3>
                <p className="text-sm text-gray-500 mb-4">Solution complète sur mesure</p>
                <div className="text-4xl font-bold text-gray-800">
                  1999€
                </div>
              </div>
              
              <ul className="text-left space-y-3 text-gray-600 flex-grow mb-8">
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span><strong>Plateforme web illimitée</strong><br/>
                  <span className="text-sm text-gray-500">Pages illimitées + architecture</span></span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span><strong>Design 100% unique</strong><br/>
                  <span className="text-sm text-gray-500">Identité visuelle complète</span></span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span><strong>E-commerce avancé</strong><br/>
                  <span className="text-sm text-gray-500">Gestion stocks + analytics</span></span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span><strong>SEO professionnel</strong><br/>
                  <span className="text-sm text-gray-500">Audit SEO + stratégie</span></span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span><strong>Accompagnement VIP</strong><br/>
                  <span className="text-sm text-gray-500">Chef projet + formations</span></span>
                </li>
              </ul>
              
              <button className="w-full bg-black text-white py-3 rounded-full hover:bg-gray-800 transition font-medium"
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}>
                Dominer mon marché
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Formulaire de contact (sous la landing page, avant le footer) */}
      <div id="contact">
        <ContactForm />
      </div>

      {/* Section Témoignages */}
      <section className="py-16 bg-gray-100">
        <div className="max-w-6xl mx-auto px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-black mb-4">
              Ce que disent nos clients
            </h2>
            <p className="text-gray-600 text-lg">
              Découvrez l'expérience de nos clients satisfaits
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {/* Avis 1 */}
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-black-glow transition-all duration-300 transform hover:scale-105">
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-gray-700 mb-4 italic">
                "Service exceptionnel ! Mon site e-commerce a été livré en temps record et dépasse toutes mes attentes. Le design est magnifique et les ventes ont explosé dès le premier mois."
              </p>
              <div className="flex items-center">
                <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-sm mr-3">
                  M
                </div>
                <div>
                  <p className="font-semibold text-black">Marie Dubois</p>
                  <p className="text-gray-500 text-sm">Boutique en ligne - Mode</p>
                </div>
              </div>
            </div>

            {/* Avis 2 */}
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-black-glow transition-all duration-300 transform hover:scale-105">
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-gray-700 mb-4 italic">
                "Une équipe incroyable ! Ils ont su comprendre ma vision et créer un site qui reflète parfaitement mon entreprise. L'accompagnement Discord est un vrai plus."
              </p>
              <div className="flex items-center">
                <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-white font-bold text-sm mr-3">
                  J
                </div>
                <div>
                  <p className="font-semibold text-black">Julien Martin</p>
                  <p className="text-gray-500 text-sm">Consultant en marketing</p>
                </div>
              </div>
            </div>

            {/* Avis 3 */}
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-black-glow transition-all duration-300 transform hover:scale-105">
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-gray-700 mb-4 italic">
                "Résultat au-delà de mes espérances ! Site rapide, design moderne et SEO optimisé. Je recommande vivement, c'est du travail de professionnel."
              </p>
              <div className="flex items-center">
                <div className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center text-white font-bold text-sm mr-3">
                  S
                </div>
                <div>
                  <p className="font-semibold text-black">Sophie Leroy</p>
                  <p className="text-gray-500 text-sm">Architecte d'intérieur</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

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
  const [projectName, setProjectName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [projectDescription, setProjectDescription] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent('Demande de contact depuis Propulsemysite');
    const body = encodeURIComponent(`Nom complet: ${name}\nEmail: ${email}\nNom du projet: ${projectName}\nNuméro de téléphone: ${phoneNumber}\n\nDescription du projet:\n${projectDescription}`);
    window.location.href = `mailto:contact@propulsemysite.com?subject=${subject}&body=${body}`;
  };

  return (
    <div className="flex items-center justify-center bg-white px-4 py-16">
      <form onSubmit={handleSubmit} className="bg-white rounded-3xl shadow-xl p-8 w-full max-w-3xl hover:shadow-black-glow transition-all duration-300 transform hover:scale-105">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-4 text-black">Contact / Réserver un appel</h2>
          <p className="text-gray-600 leading-relaxed">
            Pour nous contacter, veuillez remplir le formulaire ci-dessous.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block text-gray-800 font-semibold mb-2">Nom complet</label>
            <input 
              type="text" 
              value={name} 
              onChange={e => setName(e.target.value)} 
              placeholder="Jean Dupont"
              required 
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-black bg-gray-50" 
            />
          </div>
          
          <div>
            <label className="block text-gray-800 font-semibold mb-2">Email</label>
            <input 
              type="email" 
              value={email} 
              onChange={e => setEmail(e.target.value)} 
              placeholder="jean@email.com"
              required 
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-black bg-gray-50" 
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block text-gray-800 font-semibold mb-2">Nom du projet</label>
            <input 
              type="text" 
              value={projectName} 
              onChange={e => setProjectName(e.target.value)} 
              placeholder="Nom de votre projet"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-black bg-gray-50" 
            />
          </div>
          
          <div>
            <label className="block text-gray-800 font-semibold mb-2">Numéro de téléphone</label>
            <input 
              type="tel" 
              value={phoneNumber} 
              onChange={e => setPhoneNumber(e.target.value)} 
              placeholder="06 12 34 56 78"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-black bg-gray-50" 
            />
          </div>
        </div>

        <div className="mb-8">
          <label className="block text-gray-800 font-semibold mb-2">Expliquez brièvement votre projet</label>
          <textarea 
            value={projectDescription} 
            onChange={e => setProjectDescription(e.target.value)} 
            placeholder="Décrivez en quelques lignes votre projet, vos besoins ou vos attentes..."
            required 
            rows={5} 
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-black bg-gray-50 resize-none" 
          />
        </div>

        <button 
          type="submit" 
          className="w-full bg-black text-white py-4 rounded-full font-semibold text-lg hover:bg-gray-800 transition-colors"
        >
          Envoyer
        </button>
      </form>
    </div>
  );
} 