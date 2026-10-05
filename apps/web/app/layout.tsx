import type { Metadata } from 'next';
import './globals.css';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { Providers } from '@/components/providers';
import { SITE_CONFIG } from '@govcalc/config';

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  title: {
    default: 'Hisobchi — Rasmiy to‘lovlarni tushunish va hisoblash oson',
    template: '%s | Hisobchi',
  },
  description:
    'Sud boji, soliq, notarius, avtomobil, uy-joy va boshqa rasmiy xarajatlarni tushunarli tarzda hisoblang.',
  keywords: [
    'Hisobchi',
    'Uzbekistan',
    'davlat boji',
    'sud boji',
    'notarius',
    'bhm',
    'avtomobil bojxona',
    'soliq hisoblash',
    'lexuz',
  ],
  authors: [{ name: SITE_CONFIG.author }],

  openGraph: {
    title: 'Hisobchi — Rasmiy to‘lovlarni tushunish va hisoblash oson',
    description:
      'Sud boji, soliq, notarius, avtomobil, uy-joy va boshqa rasmiy xarajatlarni tushunarli tarzda hisoblang.',
    url: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
    siteName: 'Hisobchi',
    locale: 'uz_UZ',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Hisobchi — O‘zbekiston Rasmiy To‘lovlar Platformasi',
    description: 'Rasmiy to‘lovlar, davlat boji va soliqlarni tushunarli hisoblang.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="uz" className="scroll-smooth">
      <body className="min-h-screen flex flex-col bg-white text-brand-900 font-sans antialiased selection:bg-brand-900 selection:text-white">
        <Providers>
          <a href="#main-content" className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50 focus:bg-white focus:p-3">Asosiy mazmunga o‘tish</a>
          <Navbar />
          <main id="main-content" className="flex-1">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
