import Link from 'next/link';
import type { Metadata } from 'next';
import Illustration from '@/components/Illustration';
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
    <div className="home">
      <header className="hero">
        <Illustration name="home" alt="" priority className="banner-art" />
        <div className="hero-content">
          <p className="eyebrow">
            <Icon name="sparkle" size={14} /> Wiki de fans
          </p>
          <h1>Wiki RpgMasters</h1>
          <p className="hero-sub">
            Les mécaniques du jeu <a href={GAME_URL} rel="noopener noreferrer">RpgMasters</a>, en clair et en bref.
          </p>
          <div className="hero-cta">
            <Link href="/personnage/classes/" className="btn btn-primary">
              Découvrir les classes <Icon name="arrowRight" size={18} />
            </Link>
            <OpenSearchButton className="btn btn-ghost">
              <Icon name="search" size={18} /> Rechercher <kbd aria-hidden="true">/</kbd>
            </OpenSearchButton>
          </div>
          <p className="hero-note">
            <span>
              <Icon name="warning" size={16} />
              <span>
                <strong>Non officiel.</strong> Wiki de fans, non affilié au jeu ni à Ankama Games. Peut contenir des erreurs :
                vérifiez en jeu.
              </span>
            </span>
            <span className="date-chip">
              <Icon name="calendar" size={16} /> {DATA_DATE_LABEL}
            </span>
          </p>
        </div>
      </header>

      <nav aria-labelledby="sujets-h" className="home-section">
        <div className="section-head">
          <div>
            <p className="section-kicker">Les sujets clés</p>
            <h2 id="sujets-h">Par où commencer ?</h2>
          </div>
        </div>
        <ul className="hub">
          {MAIN_NAV.map((n) => (
            <li key={n.href}>
              <Link href={n.href} className="hub-card">
                <Illustration name={illustrationFor(n.href)} alt="" className="card-thumbnail" sizes="(max-width: 640px) 100vw, 450px" />
                <span className="medal" aria-hidden="true">
                  <SectionIcon section={n.icon} size={26} />
                </span>
                <span className="hub-title">{n.label}</span>
                <span className="hub-desc">{n.desc}</span>
                {n.href === '/contenus/' ? (
                  <span className="date-badge">
                    <Icon name="calendar" size={15} /> {DATA_DATE_LABEL} · fin {SEASON_END}
                  </span>
                ) : null}
                <span className="hub-arrow" aria-hidden="true">
                  Lire <Icon name="arrowRight" size={16} />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>

    </div>
  );
}
