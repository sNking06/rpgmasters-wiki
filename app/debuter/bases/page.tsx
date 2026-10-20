import Link from 'next/link';
import {PageHeader, M} from '@/components/ui';
export default function Page(){return <><PageHeader href="/debuter/bases/" title="Les bases" intro="Les mécaniques de RpgMasters, en clair et en bref."/><p>Pour commencer, consultez les <Link href="/personnage/classes/">classes et leurs passifs</Link>, les <Link href="/personnage/caracteristiques/">caractéristiques</Link> et le fonctionnement de <Link href="/debuter/energie-xp/">l’énergie et de l’XP</Link>.</p><p>La <Link href="/debuter/faq/">FAQ</Link> répond aux questions fréquentes. Les <Link href="/a-propos/sources/">sources et limites</Link> précisent la provenance des informations.</p>
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

</>;}