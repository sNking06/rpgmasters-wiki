import type { Metadata, Viewport } from 'next';
import Link from 'next/link';
import localFont from 'next/font/local';
import type { ReactNode } from 'react';
import Header from '@/components/Header';
import Lightbox from '@/components/Lightbox';
import { Sidebar, Breadcrumbs, SectionNeighbors } from '@/components/WikiNavigation';
import Toc from '@/components/Toc';
import { Icon, Logo } from '@/components/icons';
import { DATA_DATE_LABEL, GAME_URL, SITE_DESCRIPTION, SITE_NAME } from '@/lib/site';
import './globals.css';

const displayFont = localFont({
  src: [
    { path: './fonts/Rowdies-Light.ttf', weight: '300', style: 'normal' },
    { path: './fonts/Rowdies-Regular.ttf', weight: '400', style: 'normal' },
    { path: './fonts/Rowdies-Bold.ttf', weight: '700', style: 'normal' },
  ],
  variable: '--font-display', display: 'swap', fallback: ['Arial', 'sans-serif'],
});
const bodyFont = localFont({
  src: './fonts/Lexend.ttf', weight: '100 900',
  variable: '--font-body', display: 'swap', fallback: ['Segoe UI', 'Arial', 'sans-serif'],
});

export const metadata: Metadata = {
  title: { default: SITE_NAME, template: `%s · ${SITE_NAME}` },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    siteName: SITE_NAME,
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
  },
  twitter: { card: 'summary', title: SITE_NAME, description: SITE_DESCRIPTION },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: '#171005',
  colorScheme: 'dark light',
  width: 'device-width',
  initialScale: 1,
};

/** Posé avant le premier rendu : thème mémorisé, sinon celui du système (aucun flash). */
const THEME_SCRIPT = `(function(){try{var t=localStorage.getItem('theme');if(t!=='light'&&t!=='dark'){t='dark'}document.documentElement.dataset.theme=t}catch(e){}})();`;

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="fr" className={`${displayFont.variable} ${bodyFont.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_SCRIPT }} />
      </head>
      <body>
        <a href="#contenu" className="skip-link">
          Aller au contenu
        </a>
        <Header />
        <div className="shell">
          <Sidebar />
          <main id="contenu" className="main" tabIndex={-1}>
            <Breadcrumbs />
            {children}
            <SectionNeighbors />
          </main>
          <div className="toc-col">
            <Toc />
          </div>
        </div>
        <footer className="site-footer">
          <div className="footer-ornament" aria-hidden="true">
            <span />
            <Icon name="diamond" size={14} />
            <span />
          </div>
          <div className="footer-inner">
            <div className="footer-brand">
              <Logo size={40} id="logo-footer" />
              <div>
                <p className="footer-title">Wiki RpgMasters</p>
                <p className="footer-note">
                  <strong>Wiki de fans non officiel</strong>, non affilié à Ankama Games ni à l’équipe du jeu. Peut contenir des
                  erreurs : vérifiez en jeu.
                </p>
              </div>
            </div>
            <div className="footer-meta">
              <p className="date-chip">
                <Icon name="calendar" size={16} /> {DATA_DATE_LABEL}
              </p>
              <ul className="footer-links">
                <li>
                  <Link href="/a-propos/sources/">Sources et limites</Link>
                </li>
                <li>
                  <Link href="/debuter/faq/">FAQ</Link>
                </li>
                <li>
                  <a href={GAME_URL} rel="noopener noreferrer">
                    Jouer à RpgMasters <Icon name="external" size={14} />
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <p className="footer-legal">
            Aucune image ni ressource du jeu n’est reproduite : pictogrammes et illustrations sont dessinés pour ce wiki.
          </p>
        </footer>
        <Lightbox />
      </body>
    </html>
  );
}
