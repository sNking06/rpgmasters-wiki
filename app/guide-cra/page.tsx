import Link from 'next/link';
import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { Badge, Callout, Fact, Facts, PageHeader, Section, Src, type Status } from '@/components/ui';

export const metadata: Metadata = {
  title: 'Guide Crâ',
  description: 'Guide Crâ pour RpgMasters : 10 recommandations d’optimisation fondées uniquement sur des éléments vérifiés, et points à vérifier en jeu.',
};

type Reco = { title: string; s: Status[]; body: ReactNode };

const RECOS: Reco[] = [
  {
    title: 'Choisir Force (Terre) ou Intelligence (Feu)',
    s: ['T', 'D'],
    body: (
      <>
        Ce sont les éléments des sorts de signature (Flèche Punitive = Terre 23–26 ; Flèche Explosive = Feu 14–17 en zone). La
        FAQ dit de mettre les points dans la caractéristique de l’élément des sorts de dégâts. Le gros sort mono-cible (4 PA)
        est Terre → Force est le choix le plus cohérent tant que le deck repose sur lui <em>[déduit du tableau, non chiffré]</em>.
        Éviter de disperser sur Chance/Agilité, sauf si les cartes communes choisies sont de ces éléments.
      </>
    ),
  },
  {
    title: 'Maximiser la PO',
    s: ['T', 'C', 'D'],
    body: (
      <>
        Le passif ajoute +26 % de double dégâts (« vision spectrale »), avec +0,4 % par PO (<code>spectralPerPo</code>), plafond
        total 60 % : il reste donc ~34 points de marge à gagner par la PO (≈ 85 PO d’équipement/bonus){' '}
        <em>[chiffres calculés ; l’applicabilité de 0,4 %/PO est déduite]</em>. Les bonus de Prestige en PO (+2 à P2, +3 à P5) y
        contribuent.
      </>
    ),
  },
  {
    title: 'Respecter le plafond de 60 %',
    s: ['T', 'D'],
    body: <>Ne pas sur-investir au-delà du plafond de 60 % de chance de vision spectrale.</>,
  },
  {
    title: 'Tirs Puissants (1 PA) en premier',
    s: ['T', 'D'],
    body: (
      <>
        +100 Puissance et +10 % de critique pour 1 PA, jusqu’au prochain tour : à lancer en premier chaque tour s’il est dans le
        deck.
      </>
    ),
  },
  {
    title: 'Deck',
    s: ['T'],
    body: (
      <>
        10 cartes dont les 3 exclusives ; compléter avec des cartes de dégâts du même élément (toutes les autres cartes se
        partagent entre classes). Garder au moins 7 cartes. PA total plafonné à 12 (puis 13/14/15 selon le Prestige).
      </>
    ),
  },
  {
    title: 'Objets',
    s: ['T', 'D'],
    body: (
      <>
        Fusionner par 3 ; viser le Rayonnant (+20 % → +45 % à +5) sur les pièces fortes. PA/PM/PO ne sont pas multipliés par la
        fusion → privilégier les objets qui donnent directement des PO/PA (valeur brute) ; les stats élémentaires, elles, sont
        multipliées.
      </>
    ),
  },
  {
    title: 'Multiplicateurs permanents gratuits',
    s: ['T'],
    body: (
      <>
        Lier Discord (+10 % XP, +10 % butin, +5 % stats) ; faire avancer le Bouclier de forge (briser les objets, jusqu’à 8 000
        orbes/jour) et le Compagnon (croquettes).
      </>
    ),
  },
  {
    title: 'Arène',
    s: ['T', 'D'],
    body: (
      <>
        10 tickets gratuits par jour ; chaque victoire donne +1 stat aléatoire (parchemin) jusqu’à 300 par stat → utiliser tous
        les tickets chaque jour. Éviter de rejouer le même adversaire (gain ×0,5 puis ×0,25 puis 0 dans les 24 h,{' '}
        <em>déduit</em>).
      </>
    ),
  },
  {
    title: 'Progression',
    s: ['T'],
    body: (
      <>
        Pas de Prestige avant le niveau 200 ; à long terme, le Prestige 4 supprime les pertes ; les PO/PA/PM de Prestige servent
        directement le Crâ (P2 +2 PO, P5 +3 PO).
      </>
    ),
  },
  {
    title: 'Saison',
    s: ['T', 'D'],
    body: (
      <>
        La saison Héroïque finit le lundi 12 octobre 2026 à 08:00 (données du 11 oct 2026). Aucun Crâ dans le haut du classement
        affiché (top 30) : n’en rien conclure de fiable sur la force de la classe. Ne pas utiliser de script/bot (interdit par
        les règles).
      </>
    ),
  },
];

export default function GuideCraPage() {
  return (
    <>
      <PageHeader
        title="Guide Crâ"
        lead="Dix recommandations d’optimisation fondées uniquement sur des éléments vérifiés, avec leurs réserves."
      />

      <Callout kind="warn">
        <p>
          <strong>Règles du jeu :</strong> « Pas de triche : scripts, robots ou exploitation de bugs (signale-les plutôt !). »
          et « Un seul compte et un seul personnage par personne. » Les comptes en infraction peuvent être supprimés{' '}
          <Badge s="T" />. Seuls les modes « Auto » et « Auto AFK » intégrés au jeu sont prévus.
        </p>
      </Callout>

      <p>
        Fiche de la classe : <Link href="/classes/cra/">Crâ</Link>. Les mentions <em>[déduit]</em> et les badges indiquent les
        parties qui ne sont pas écrites telles quelles dans le jeu.
      </p>

      <Section id="recommandations" title="Recommandations d’optimisation">
        <ol className="facts">
          {RECOS.map((r, i) => (
            <li key={i} className="fact" id={`reco-${i + 1}`}>
              <span className="fact-badges">
                {r.s.map((s) => (
                  <Badge key={s} s={s} />
                ))}
              </span>
              <span className="fact-text">
                <strong>
                  {i + 1}. {r.title}.
                </strong>{' '}
                {r.body}
              </span>
            </li>
          ))}
        </ol>
        <Src>mecaniques.md, « Recommandations d’optimisation pour un Crâ »</Src>
      </Section>

      <Section id="a-verifier" title="À vérifier dans le jeu">
        <p>Points non accessibles sans connexion, à contrôler en jeu par un humain :</p>
        <Facts>
          <Fact s="N">Fiche Personnage : valeurs réelles Force → dégâts, plafond de caractéristique.</Fact>
          <Fact s="N">Bonus de panoplies.</Fact>
          <Fact s="N">Bonus des cartes communes de dégâts Terre/Feu.</Fact>
          <Fact s="N">XP Aventure vs Chasse (à comparer en fin de combat, comme le conseille la FAQ).</Fact>
        </Facts>
        <Src>mecaniques.md, « À vérifier dans le jeu »</Src>
      </Section>
    </>
  );
}
