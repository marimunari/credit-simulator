// system
import React from 'react';

// contexts
import { ThemeProvider } from '@/src/contexts/ThemeContext/ThemeContext';

// internal components
import Header from '@/src/components/Header/Header';
import Footer from '@/src/components/Footer/Footer';

// fonts
import { Roboto } from 'next/font/google';

// styles
import './globals.css';

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-roboto'
});

export const metadata = {
  title: 'Simulador de Crédito',
  description: 'Simulador de crédito da Creditas',
  icons: [
    {
      url: '/icons/icon-192x192.png',
      sizes: '192x192',
      type: 'image/png'
    }
  ]
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="pt-BR" data-scroll-behavior="smooth">
      <body className={`${roboto.variable} font-sans antialiased min-h-screen flex flex-col`}>
        <ThemeProvider>
          <Header />
          <main className="flex-grow">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
