import Link from 'next/link';
import type { Metadata } from 'next';
import { Fact, Facts, PageHeader, Section, Src, TableWrap, fmt } from '@/components/ui';

export const metadata: Metadata = {
  title: 'Économie',
  description: 'Coffres (gratuits, boutique, Élan, raretés et poids de tirage), kamas, HDV, fusion et Rayonnant, bris, compagnon, Discord dans RpgMasters.',
};

const RARITIES: [string, number][] = [
  ['Commun', 46],
  ['Peu commun', 28],
  ['Rare', 15],
  ['Épique', 7.5],
  ['Mythique', 3],
  ['Légendaire', 0.5],
];
const RARITY_TOTAL = RARITIES.reduce((s, [, w]) => s + w, 0);
const RARITY_MAX = Math.max(...RARITIES.map(([, w]) => w));

const FUSION: [string, number][] = [
  ['Tiers 1 (base)', 0],
  ['Tiers 2', 10],
  ['Rayonnant +0', 20],
  ['Rayonnant +1', 25],
  ['Rayonnant +2', 30],
  ['Rayonnant +3', 35],
  ['Rayonnant +4', 40],
  ['Rayonnant +5', 45],
];

const pct = (n: number) => n.toLocaleString('fr-FR') + ' %';

export default function EconomiePage() {
  return (
    <>
      <PageHeader title="Économie" lead="Coffres, kamas, fusion, bris d’objets, compagnon et autres multiplicateurs." />

      <Section id="coffres-gratuits" title="Coffres gratuits">
        <Facts>
          <Fact s="T">
            <strong>1 coffre toutes les 20 minutes</strong> (3 par heure, <code>periodSec: 1200</code>), réserve de{' '}
            <strong>6 au maximum</strong> : au-delà, la recharge s’arrête jusqu’à ce qu’on en ouvre.
          </Fact>
          <Fact s="T">
            Coffres gagnés (sans limite de réserve) : environ <strong>5 %</strong> de chance par combat gagné, étages de
            l’Ascension (plus gros coffre tous les 5 étages), récompenses d’arène, de Faille et de saison.
          </Fact>
          <Fact s="T">
            Un coffre donne un équipement du niveau du personnage au moment de l’ouverture. Les coffres non ouverts restent après
            un Prestige.
          </Fact>
        </Facts>
        <Src>txt_faq.txt, mecaniques.md §8</Src>
      </Section>

      <Section id="boutique" title="Boutique de coffres">
        <TableWrap caption="Coffres achetables contre des kamas [TROUVÉ]">
          <thead>
            <tr>
              <th>Coffre</th>
              <th className="num">Prix</th>
              <th>Particularité</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Classique</td>
              <td className="num">{fmt(5000)} k</td>
              <td>—</td>
            </tr>
            <tr>
              <td>Chanceux</td>
              <td className="num">{fmt(10000)} k</td>
              <td>Chances de bonnes raretés ×3</td>
            </tr>
            <tr>
              <td>Épique</td>
              <td className="num">{fmt(20000)} k</td>
              <td>Objet Épique ou mieux garanti</td>
            </tr>
          </tbody>
        </TableWrap>
        <Facts>
          <Fact s="T">
            Jusqu’à <strong>100 par jour et par type</strong> ; les 20 premiers au prix normal, puis le prix augmente.
          </Fact>
          <Fact s="N">Barème de hausse du prix après le 20e achat : non trouvé.</Fact>
        </Facts>
      </Section>

      <Section id="elan" title="Élan et autres sources">
        <Facts>
          <Fact s="T">
            Élan : chaque combat remplit une jauge ; <strong>25 combats = 1 Coffre Épique</strong>, 3 par jour au plus.
          </Fact>
          <Fact s="T">3 défis courts par jour (« 3 boss d’affilée », « 5 victoires sans mourir »…) rapportent des kamas.</Fact>
          <Fact s="T">
            Parrainage : quand l’ami atteint le niveau 30, le parrain reçoit 1 Coffre Royal et 2 Coffres Épiques (une fois par
            ami, 5 parrainages valides par semaine au plus).
          </Fact>
          <Fact s="T">Série de connexion : calendrier de 7 jours avec un coffre de plus en plus gros (perso principal).</Fact>
        </Facts>
        <Src>txt_faq.txt</Src>
      </Section>

      <Section id="types-recompense" title="Types de coffres de récompense">
        <Facts>
          <Fact s="T">Royal : objet Épique ou mieux, carte Rare ou mieux.</Fact>
          <Fact s="T">Légendaire : objet Mythique ou mieux, carte Épique ou mieux, 5 % de Rayonnant.</Fact>
          <Fact s="T">Ultime : Rayonnant ou Dofus.</Fact>
          <Fact s="T">Rayonnant +5 au choix (et d’autres types non détaillés dans les notes).</Fact>
          <Fact s="T">
            Rayonnant en coffre : <strong>1 %</strong> de base (<code>CHEST.radiantPct: 1</code>), plus avec un Coffre
            chanceux. Chance de carte par coffre : 20 %.
          </Fact>
        </Facts>
        <Src>mecaniques.md §3 et §8 (GIFT_CHESTS)</Src>
      </Section>

      <Section id="raretes" title="Raretés et poids de tirage">
        <p>
          Poids de tirage en coffre (<code>RARITIES.chestWeight</code>) [TROUVÉ]. Le total vaut {fmt(RARITY_TOTAL)}, donc
          chaque poids se lit aussi comme un pourcentage [calcul].
        </p>
        <figure className="chart">
          <ul className="bars" aria-label="Poids de tirage par rareté">
            {RARITIES.map(([name, w]) => (
              <li key={name} title={`${name} : poids ${pct(w)}`}>
                <span className="bar-label">{name}</span>
                <span className="bar-track">
                  <span className="bar-fill" style={{ width: `${(w / RARITY_MAX) * 100}%` }} />
                </span>
                <span className="bar-val">{w.toLocaleString('fr-FR')}</span>
              </li>
            ))}
          </ul>
          <figcaption>Poids de tirage d’une rareté dans un coffre classique (avant bonus de Coffre chanceux/Épique).</figcaption>
        </figure>
      </Section>

      <Section id="fusion" title="Fusion et Rayonnant">
        <Facts>
          <Fact s="T">
            Dans l’Inventaire : 3 exemplaires du même objet au même tiers. 3 Tiers 1 → 1 Tiers 2 ; 3 Tiers 2 → 1 Rayonnant.
            Bouton « Tout fusionner ».
          </Fact>
          <Fact s="T">
            Un Rayonnant monte de +0 à +5 en lui ajoutant des Rayonnants +0 du même objet : 1 pour les premiers niveaux, 2
            ensuite (<code>radiantFeed</code> : &lt;2 → 0, &lt;4 → 1, sinon 2).
          </Fact>
          <Fact s="T">
            <code>FUSION.bonusPct = [0, 10, 20, 25, 30, 35, 40, 45]</code> (<code>max: 7</code>, <code>copies: 3</code>). FAQ :
            « 20 % de stats en plus au départ jusqu’à 45 % à +5 ».
          </Fact>
          <Fact s="D">Alignement des valeurs sur les niveaux de fusion (tableau ci-dessous).</Fact>
          <Fact s="T">PA, PM, PO et Invocations ne sont pas multipliés par la fusion.</Fact>
          <Fact s="T">
            Dofus : fusion max 4, Dofus Rayonnant = +100 %, PA compris. Drop d’un Dofus ≤ 2 % tous bonus compris.
          </Fact>
        </Facts>
        <TableWrap caption="Bonus de stats par niveau de fusion [TROUVÉ + alignement DÉDUIT]">
          <thead>
            <tr>
              <th>Niveau</th>
              <th className="num">Bonus de stats</th>
            </tr>
          </thead>
          <tbody>
            {FUSION.map(([n, b]) => (
              <tr key={n}>
                <td>{n}</td>
                <td className="num">+{b} %</td>
              </tr>
            ))}
          </tbody>
        </TableWrap>
        <Src>mecaniques.md §4, txt_faq.txt</Src>
      </Section>

      <Section id="bris" title="Bris d’objets et Bouclier de forge">
        <Facts>
          <Fact s="T">
            Briser un objet donne des orbes : <strong>1</strong> sous le niveau 70, <strong>2</strong> jusqu’au 139,{' '}
            <strong>3</strong> au-delà, <strong>×3</strong> pour un Rayonnant ; <strong>8 000 orbes par jour</strong> au
            maximum.
          </Fact>
          <Fact s="T">
            Les orbes alimentent le Bouclier de forge (page Forgemagie) : il monte sans aucun échec et renforce tout
            l’équipement, jusqu’à <strong>+300 % au niveau 400</strong>. Conservé après Prestige.
          </Fact>
          <Fact s="T">Un objet verrouillé (cadenas) est protégé contre la vente et le bris.</Fact>
        </Facts>
      </Section>

      <Section id="compagnon" title="Compagnon">
        <Facts>
          <Fact s="T">
            +<strong>0,2 %</strong> à tout l’équipement par niveau, jusqu’à <strong>+79,8 % au niveau 400</strong>, en plus du
            Prestige et du Bouclier de forge. Deux fois plus long à monter que le Bouclier.
          </Fact>
          <Fact s="T">
            Croquette : 5 % de chance par combat gagné (tous modes ; la Prospection n’y change rien). Aucune en Auto AFK (l’Auto
            normal en donne). 100 croquettes données par jour au plus, le reste en stock.
          </Fact>
          <Fact s="T">
            N’agit pas aux Abysses ni sur PA, PM, PO, invocations. Lié au perso principal ; niveau et croquettes gardés au
            Prestige.
          </Fact>
        </Facts>
      </Section>

      <Section id="kamas" title="Kamas">
        <Facts>
          <Fact s="T">
            Vente aux PNJ : <strong>10 kamas × niveau</strong> de l’objet, maximum <strong>2 000</strong>.
          </Fact>
          <Fact s="T">
            HDV : taxe de <strong>8 %</strong> sur le prix de vente, <strong>20 ventes</strong> simultanées au plus, objet
            acheté lié <strong>24 h</strong>. Objets éternels et verrouillés invendables. HDV séparé pour la saison.
          </Fact>
          <Fact s="T">
            Changement de classe : 1er gratuit, puis <strong>300 000 kamas</strong>.
          </Fact>
          <Fact s="T">
            Énergie : 300 kamas le point (prix croissant au-delà de 600 points/jour) — voir{' '}
            <Link href="/energie-xp/#achat-energie">Énergie et XP</Link>.
          </Fact>
          <Fact s="T">Doublon de carte avant le Prestige 1 : converti en 3 000 kamas.</Fact>
          <Fact s="T">Avant le Prestige 4, les kamas sont perdus au Prestige.</Fact>
        </Facts>
        <Src>txt_faq.txt, mecaniques.md §3–4</Src>
      </Section>

      <Section id="discord" title="Bonus Discord">
        <Facts>
          <Fact s="T">
            Lier son Discord (depuis le Tableau de bord, compte sauvegardé) : <strong>+10 % XP, +10 % butin, +5 % stats</strong>,
            à vie tant que le compte reste lié, partout, arène comprise. Partagé avec le perso de saison.
          </Fact>
        </Facts>
        <Src>txt_faq.txt</Src>
      </Section>
    </>
  );
}
