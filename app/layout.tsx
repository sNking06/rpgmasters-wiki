import type { Metadata, Viewport } from 'next';
import Link from 'next/link';
import type { ReactNode } from 'react';
import Header from '@/components/Header';
import { DATA_DATE_LABEL, GAME_URL, SITE_NAME } from '@/lib/site';
import './globals.css';

export const metadata: Metadata = {
  title: { default: SITE_NAME, template: `%s · ${SITE_NAME}` },
  description:
    'Wiki de fans NON OFFICIEL pour RpgMasters : classes, Crâ, Prestige, arène, saison, énergie, XP, économie. Uniquement des faits relevés sur les pages publiques.',
};

export const viewport: Viewport = {
  themeColor: '#14171c',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="fr">
      <body>
        <a href="#contenu" className="skip-link">
          Aller au contenu
        </a>
        <Header />
        <main id="contenu" className="container">
          {children}
        </main>
        <footer className="site-footer container">
          <p>
            <strong>Wiki non officiel</strong>, réalisé par des fans à partir des pages publiques de{' '}
            <a href={GAME_URL} rel="noopener noreferrer">
              rpgmasters.houk.fr
            </a>
            . Non affilié à Ankama Games ni à l’équipe du jeu. Peut contenir des erreurs. {DATA_DATE_LABEL}.
          </p>
          <p>
            <Link href="/sources/">Sources et limites</Link>
          </p>
        </footer>
      </body>
    </html>
  );
}
