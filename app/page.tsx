import Link from 'next/link';
import type { Metadata } from 'next';
import Illustration from '@/components/Illustration';
import GameCapture from '@/components/GameCapture';
import { illustrationFor } from '@/lib/illustrations';
import { OpenSearchButton } from '@/components/Search';
import { Icon, SectionIcon } from '@/components/icons';
import { DATA_DATE_LABEL, GAME_URL, MAIN_NAV, SEASON_END } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Accueil',
  description: 'Wiki de fans non officiel de RpgMasters : classes, caractéristiques, arène, saison, énergie, XP et Prestige, en bref.',
};

export default function Home() {
  return (
    <>
      <header className="hero">
        <div className="mast-grid">
          <div className="mast-copy">
            <h1>Wiki RpgMasters</h1>
            <p className="hero-sub">
              Les mécaniques du jeu <a href={GAME_URL} rel="noopener noreferrer">RpgMasters</a>, en clair et en bref.
            </p>
            <div className="hero-cta">
              <Link href="/personnage/classes/" className="btn btn-primary">
                Découvrir les classes
              </Link>
              <OpenSearchButton className="btn btn-ghost">
                Rechercher <kbd aria-hidden="true">/</kbd>
              </OpenSearchButton>
            </div>
            <p className="date-chip">
              <Icon name="calendar" size={16} /> {DATA_DATE_LABEL}
            </p>
            <p className="hero-note">
              <Icon name="warning" size={16} />
              <span>
                <strong>Non officiel.</strong> Wiki de fans, non affilié au jeu ni à Ankama Games. Peut contenir des erreurs :
                vérifiez en jeu.
              </span>
            </p>
          </div>
          <Illustration name="home" alt="" priority className="banner-art hero-plate" />
        </div>

      <section aria-labelledby="sujets-h" className="home-index">
          <h2 id="sujets-h">Par où commencer ?</h2>
          <p className="index-label">Les sujets clés</p>
          <nav aria-label="Sujets clés">
          <ul className="hub">
            {MAIN_NAV.map((n) => (
              <li key={n.href}>
                <Link href={n.href} className="hub-card">
                  <Illustration name={illustrationFor(n.href)} alt="" className="card-thumbnail" sizes="72px" />
                  <span className="hub-copy">
                    <span className="medal" aria-hidden="true">
                      <SectionIcon section={n.icon} size={18} />
                    </span>
                    <span className="hub-title">{n.label}</span>
                    <span className="hub-desc">{n.desc}</span>
                    {n.href === '/contenus/' ? (
                      <span className="date-badge">
                        <Icon name="calendar" size={15} /> {DATA_DATE_LABEL}, fin {SEASON_END}
                      </span>
                    ) : null}
                  </span>
                  <span className="hub-arrow">Lire</span>
                </Link>
              </li>
            ))}
          </ul>
          </nav>
      </section>
      </header>

      <section aria-labelledby="en-jeu-h" className="home-section">
        <h2 id="en-jeu-h">À quoi ressemble le jeu ?</h2>
        <GameCapture id="tableau-de-bord" caption="En jeu. Le tableau de bord : saison en cours, progression et quêtes du jour" />
      </section>
    </>
  );
}
