import React from 'react'
import './globals.css'

export const metadata = {
  title: 'Propulsemysite - Agence de création de sites web',
  description: 'Créez votre site web professionnel avec Propulsemysite',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr">
      <body className="bg-gradient-to-b from-white to-[#f9f7f4] min-h-screen">{children}</body>
    </html>
  )
} 