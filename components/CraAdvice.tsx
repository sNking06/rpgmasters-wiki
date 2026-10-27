import Link from 'next/link';
import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { ClassIcon, ElementIcon, Icon } from '@/components/icons';
import { Essentiel, M, PageEnd, PageHeader, Section, Warn, type Status } from '@/components/ui';

export const metadata: Metadata = {
  title: 'Guide Crâ',
  description: 'Guide Crâ pour RpgMasters : 10 conseils courts fondés sur des éléments vérifiés, et ce qu’il reste à vérifier en jeu.',
};

type Reco = { id: string; icon: ReactNode; title: string; short: ReactNode; s: Status[]; body: ReactNode };

const RECOS: Reco[] = [
  {
    id: 'element',
    icon: <ElementIcon element="terre" size={20} />,
    title: 'Force (Terre) ou Intelligence (Feu)',
    short: 'Force est le choix le plus cohérent : le gros sort mono-cible est Terre.',
    s: ['T', 'D'],
    body: (
      <>
        Ce sont les éléments des sorts de signature (Flèche Punitive = Terre 23-26 ; Flèche Explosive = Feu 14-17 en zone). La
        FAQ dit de mettre les points dans la caractéristique de l’élément des sorts de dégâts. Le gros sort mono-cible (4 PA)
        est Terre → Force est le choix le plus cohérent tant que le deck repose sur lui (déduit, non chiffré). Éviter de
        disperser sur Chance/Agilité, sauf si les cartes communes choisies sont de ces éléments.
      </>
    ),
  },
  {
    id: 'po',
    icon: <Icon name="target" size={20} />,
    title: 'Maximiser la PO',
    short: 'Chaque PO augmente la chance de double dégâts, jusqu’à ≈ 85 PO.',
    s: ['T', 'C', 'D'],
    body: (
      <>
        Le passif donne +26 % de double dégâts (« vision spectrale »), avec +0,4 % par PO (<code>spectralPerPo</code>), plafond
        total 60 % : il reste ~34 points de marge à gagner par la PO (≈ 85 PO d’équipement/bonus). Chiffres calculés ;
        l’application de 0,4 %/PO est déduite. Les bonus de Prestige en PO (+2 à P2, +3 à P5) y contribuent.
      </>
    ),
  },
  {
    id: 'plafond',
    icon: <Icon name="ruler" size={20} />,
    title: 'Respecter le plafond de 60 %',
    short: 'Au-delà de 60 % de vision spectrale, la PO en plus ne sert plus à ça.',
    s: ['T', 'D'],
    body: <>Ne pas sur-investir au-delà du plafond de 60 % de chance de vision spectrale.</>,
  },
  {
    id: 'tirs-puissants',
    icon: <Icon name="bolt" size={20} />,
    title: 'Tirs Puissants en premier',
    short: '1 PA pour +100 Puissance et +10 % de critique jusqu’au prochain tour.',
    s: ['T', 'D'],
    body: <>À lancer en premier chaque tour s’il est dans le deck.</>,
  },
  {
    id: 'deck',
    icon: <Icon name="cards" size={20} />,
    title: 'Deck',
    short: '10 cartes dont les 3 exclusives, complétées par des dégâts du même élément.',
    s: ['T'],
    body: (
      <>
        Toutes les autres cartes se partagent entre classes. Garder au moins 7 cartes. PA total plafonné à 12 (puis 13/14/15
        selon le Prestige).
      </>
    ),
  },
  {
    id: 'objets',
    icon: <Icon name="shield" size={20} />,
    title: 'Objets',
    short: 'Fusionner par 3 et viser le Rayonnant (+20 % → +45 %) sur les pièces fortes.',
    s: ['T', 'D'],
    body: (
      <>
        PA/PM/PO ne sont pas multipliés par la fusion → privilégier les objets qui donnent directement des PO/PA (valeur
        brute) ; les stats élémentaires, elles, sont multipliées.
      </>
    ),
  },
  {
    id: 'multiplicateurs',
    icon: <Icon name="gift" size={20} />,
    title: 'Bonus permanents gratuits',
    short: 'Lier Discord, monter le Bouclier de forge et le Compagnon.',
    s: ['T'],
    body: (
      <>
        Discord : +10 % XP, +10 % butin, +5 % stats. Bouclier de forge : briser les objets, jusqu’à 8 000 orbes/jour. Compagnon :
        croquettes.
      </>
    ),
  },
  {
    id: 'arene',
    icon: <Icon name="swords" size={20} />,
    title: 'Arène tous les jours',
    short: '10 tickets gratuits : chaque victoire donne +1 stat (jusqu’à 300 par stat).',
    s: ['T', 'D'],
    body: (
      <>
        Utiliser tous les tickets chaque jour. Éviter de rejouer le même adversaire : gain ×0,5 puis ×0,25 puis 0 dans les
        24 h (déduit).
      </>
    ),
  },
  {
    id: 'progression',
    icon: <Icon name="star" size={20} />,
    title: 'Progression',
    short: 'Pas de Prestige avant le niveau 200 ; le Prestige 4 supprime les pertes.',
    s: ['T'],
    body: <>Les PO/PA/PM de Prestige servent directement le Crâ (P2 +2 PO, P5 +3 PO).</>,
  },
  {
    id: 'saison',
    icon: <Icon name="trophy" size={20} />,
    title: 'Saison',
    short: 'Aucun Crâ dans le top 30 affiché : n’en rien conclure sur la classe.',
    s: ['T', 'D'],
    body: (
      <>
        La saison Héroïque finit le lundi 12 octobre 2026 à 08:00 (données du 11 oct 2026). Aucun Crâ dans le haut du
        classement affiché (top 30) : n’en rien conclure de fiable sur la force de la classe.
      </>
    ),
  },
];

export default function CraAdvice(){ return <section id="conseils"><h2>Guide Crâ : conseils</h2><Essentiel id="conseils-essentiel-h">
        <li>
          <strong>Force (Terre)</strong> et <strong>PO jusqu’au plafond de 60 %</strong> de vision spectrale. <M s={['T', 'D']} />
        </li>
        <li>
          <strong>Tirs Puissants</strong> en premier à chaque tour. <M s="D" />
        </li>
        <li>
          <strong>Tous les tickets d’arène</strong>, chaque jour. <M s="T" />
        </li>
      </Essentiel>

      <Warn title="Bots et scripts interdits">
        <p>
          « Pas de triche : scripts, robots ou exploitation de bugs (signale-les plutôt !). » Les comptes en infraction peuvent
          être supprimés. <M s="T" />
        </p>
        <p>Seuls les modes « Auto » et « Auto AFK » intégrés au jeu sont prévus. Un seul compte et un seul personnage par personne.</p>
      </Warn>

      <p>
        <ClassIcon name="Crâ" size={18} className="inline-ico" /> Fiche de la classe : <Link href="/personnage/classes/cra/">Crâ</Link>.
      </p>

      <Section id="conseils-recommandations" title="Les 10 conseils">
        <ol className="cards">
          {RECOS.map((r, i) => (
            <li key={r.id} className="card" id={`reco-${i + 1}`}>
              <h3>
                <span className="medal" aria-hidden="true">
                  {r.icon}
                </span>
                <span>
                  <span className="card-num">{i + 1}.</span> {r.title}
                </span>
              </h3>
              <p>
                {r.short} <M s={r.s} />
              </p>
              <details className="more">
                <summary>
                  <span>Détail</span>
                  <Icon name="chevron" size={18} className="sum-chev" />
                </summary>
                <div className="more-body">
                  <p>{r.body}</p>
                </div>
              </details>
            </li>
          ))}
        </ol>
      </Section>

      <Section id="conseils-a-verifier" title="À vérifier en jeu">
        <p>Non accessible sans connexion ; à contrôler en jeu :</p>
        <ul>
          <li>
            Fiche Personnage : effet réel de la Force sur les dégâts, plafond de caractéristique. <M s="N" />
          </li>
          <li>
            Bonus de panoplies. <M s="N" />
          </li>
          <li>
            Bonus des cartes communes de dégâts Terre/Feu. <M s="N" />
          </li>
          <li>
            XP Aventure vs Chasse (à comparer en fin de combat, comme le conseille la FAQ). <M s="N" />
          </li>
        </ul>
      </Section>

      </section>; }
