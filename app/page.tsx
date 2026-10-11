import Link from 'next/link';
import type { Metadata } from 'next';
import { M } from '@/components/ui';
import { DATA_DATE_LABEL, GAME_URL, MAIN_NAV, MORE_NAV, SEASON_END } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Accueil',
  description: 'Wiki de fans non officiel de RpgMasters : classes, caractéristiques, arène, saison, énergie, XP et Prestige, en bref.',
};

export default function Home() {
  return (
    <>
      <header className="page-header">
        <h1>Wiki RpgMasters</h1>
        <p className="intro">
          Les mécaniques du jeu <a href={GAME_URL} rel="noopener noreferrer">RpgMasters</a>, en clair et en bref.
        </p>
      </header>

      <div className="callout callout-warn">
        <p>
          <strong>Non officiel.</strong> Wiki de fans, non affilié au jeu ni à Ankama Games. Peut contenir des erreurs :
          vérifiez en jeu. <span className="date-chip">📅 {DATA_DATE_LABEL}</span>
        </p>
      </div>

      <nav aria-label="Sujets principaux">
        <ul className="hub">
          {MAIN_NAV.map((n) => (
            <li key={n.href}>
              <Link href={n.href}>
                <span className="hub-icon" aria-hidden="true">
                  {n.icon}
                </span>
                <span>
                  <span className="hub-title">{n.label}</span>
                  <span className="hub-desc">{n.desc}</span>
                  {n.href === '/saison/' ? (
                    <span className="date-badge">
                      📅 {DATA_DATE_LABEL} · fin {SEASON_END}
                    </span>
                  ) : null}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <section id="astuces" className="section">
        <h2>Les 5 astuces pour grimper vite</h2>
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
      </section>

      <section id="plus" className="section">
        <h2>Aller plus loin</h2>
        <ul className="links-secondary">
          {MORE_NAV.map((n) => (
            <li key={n.href}>
              <Link href={n.href}>
                <span aria-hidden="true">{n.icon}</span> {n.label}
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
