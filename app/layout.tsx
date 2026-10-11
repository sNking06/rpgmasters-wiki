import type { Metadata, Viewport } from 'next';
import Link from 'next/link';
import type { ReactNode } from 'react';
import Header from '@/components/Header';
import { DATA_DATE_LABEL, GAME_URL, SITE_NAME } from '@/lib/site';
import './globals.css';

export const metadata: Metadata = {
  title: { default: SITE_NAME, template: `%s · ${SITE_NAME}` },
  description:
    'Wiki de fans NON OFFICIEL pour RpgMasters : classes, Crâ, caractéristiques, arène, saison, énergie, XP, Prestige. Uniquement des faits relevés sur les pages publiques.',
};

export const viewport: Viewport = {
  themeColor: '#121419',
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
        <footer className="site-footer">
          <div className="container">
            <p>
              <strong>Wiki de fans non officiel</strong>, non affilié à Ankama Games ni à l’équipe du jeu. Peut contenir des
              erreurs. {DATA_DATE_LABEL}.
            </p>
            <p>
              <a href={GAME_URL} rel="noopener noreferrer">
                Jouer à RpgMasters
              </a>{' '}
              · <Link href="/sources/">Sources et limites</Link>
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
