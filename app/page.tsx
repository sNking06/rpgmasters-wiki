import Link from 'next/link';
import type { Metadata } from 'next';
import HeroArt from '@/components/HeroArt';
import { OpenSearchButton } from '@/components/Search';
import { Icon, SectionIcon } from '@/components/icons';
import { M } from '@/components/ui';
import { DATA_DATE_LABEL, GAME_URL, MAIN_NAV, MORE_NAV, SEASON_END } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Accueil',
  description: 'Wiki de fans non officiel de RpgMasters : classes, caractéristiques, arène, saison, énergie, XP et Prestige, en bref.',
};

export default function Home() {
  return (
    <div className="home">
      <header className="hero">
        <HeroArt />
        <div className="hero-content">
          <p className="eyebrow">
            <Icon name="sparkle" size={14} /> Wiki de fans
          </p>
          <h1>Wiki RpgMasters</h1>
          <p className="hero-sub">
            Les mécaniques du jeu <a href={GAME_URL} rel="noopener noreferrer">RpgMasters</a>, en clair et en bref.
          </p>
          <div className="hero-cta">
            <Link href="/classes/" className="btn btn-primary">
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
                <span className="medal" aria-hidden="true">
                  <SectionIcon section={n.icon} size={26} />
                </span>
                <span className="hub-title">{n.label}</span>
                <span className="hub-desc">{n.desc}</span>
                {n.href === '/saison/' ? (
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

      <section id="astuces" className="section home-section">
        <div className="tips-layout">
          <div className="tips-aside">
            <p className="section-kicker">Quoi faire en premier</p>
            <h2>Les 5 astuces pour grimper vite</h2>
            <p className="section-lead">Tirées de la FAQ publique du jeu.</p>
          </div>
          <ol className="tips">
            <li>
              <div>
                <strong>Lie ton Discord <M s="T" /></strong>
                <p>+10 % XP, +10 % butin, +5 % stats. À vie, partout, arène comprise.</p>
              </div>
            </li>
            <li>
              <div>
                <strong>Ne laisse pas l’énergie pleine <M s="T" /></strong>
                <p>+1 toutes les 6 min, même hors ligne, 100 au maximum. Dépense-la avant qu’elle soit pleine.</p>
              </div>
            </li>
            <li>
              <div>
                <strong>Compare l’XP Aventure vs Chasse <M s="T" /></strong>
                <p>Regarde l’XP de fin de combat : c’est le conseil de la FAQ pour savoir ce qui paie à ton niveau.</p>
              </div>
            </li>
            <li>
              <div>
                <strong>Ouvre tes coffres gratuits avant 6 <M s="T" /></strong>
                <p>1 coffre toutes les 20 min, réserve de 6 : pleine, la recharge s’arrête.</p>
              </div>
            </li>
            <li>
              <div>
                <strong>Joue tes 10 tickets d’arène chaque jour <M s="T" /></strong>
                <p>Non cumulables. Chaque victoire : +1 à une stat au hasard (jusqu’à +300 par stat), gardé au Prestige.</p>
              </div>
            </li>
          </ol>
        </div>
      </section>

      <section id="plus" className="section home-section">
        <h2>Aller plus loin</h2>
        <ul className="links-secondary">
          {MORE_NAV.map((n) => (
            <li key={n.href}>
              <Link href={n.href}>
                <SectionIcon section={n.icon} size={18} /> {n.label}
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
