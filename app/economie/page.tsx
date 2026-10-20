import Link from 'next/link';
import type { Metadata } from 'next';
import { Icon, SectionIcon } from '@/components/icons';
import { Stat, Bars, Essentiel, Fiche, M, More, PageEnd, PageHeader, Section, TableWrap, Tip, fmt } from '@/components/ui';

export const metadata: Metadata = {
  title: 'Économie',
  description: 'Coffres (gratuits, boutique, Élan, raretés), fusion et Rayonnant, bris et Bouclier de forge, compagnon, kamas, HDV, Discord dans RpgMasters.',
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

const FUSION: [string, number][] = [
  ['Tiers 1', 0],
  ['Tiers 2', 10],
  ['Rayonnant +0', 20],
  ['Rayonnant +1', 25],
  ['Rayonnant +2', 30],
  ['Rayonnant +3', 35],
  ['Rayonnant +4', 40],
  ['Rayonnant +5', 45],
];

export default function EconomiePage() {
  return (
    <>
      <PageHeader href="/economie/" section="economie" title="Économie" intro="Coffres, fusion, bris d’objets, compagnon et kamas : où trouver du stuff et des bonus." />

      <Essentiel>
        <li>
          <strong>1 coffre gratuit toutes les 20 min</strong>, réserve de 6 : ouvrez-les avant qu’elle soit pleine. <M s="T" />
        </li>
        <li>
          <strong>Fusion</strong> : 3 objets identiques → tiers supérieur ; Rayonnant de <strong>+20 % à +45 %</strong>.{' '}
          <M s="T" />
        </li>
        <li>
          <strong>Briser</strong> des objets nourrit le Bouclier de forge (jusqu’à <strong>+300 %</strong>). <M s="T" />
        </li>
        <li>
          <strong>Discord</strong> lié : +10 % XP, +10 % butin, +5 % stats. <M s="T" />
        </li>
      </Essentiel>

      <Fiche
        title="Fiche économie"
        icon={<SectionIcon section="economie" size={20} />}
        rows={[
          ['Coffre gratuit', '1 toutes les 20 min'],
          ['Réserve max', '6'],
          ['Coffre par combat', '≈ 5 %'],
          ['Élan', '25 combats = 1 Épique'],
          ['Orbes', '8 000 max par jour'],
          ['Taxe HDV', '8 %'],
          ['Vente PNJ', '10 k × niveau (max 2 000)'],
          ['Changer de classe', '300 000 k (1er gratuit)'],
        ]}
      />

      <Section id="coffres-gratuits" title="Coffres gratuits">
        <ul className="kpis">
          <li>
            <span className="kpi-val">
              <Icon name="gift" size={24} /> ×3 / h
            </span>
            <span className="kpi-lab">1 toutes les 20 min</span>
          </li>
          <li>
            <span className="kpi-val">6 max</span>
            <span className="kpi-lab">en réserve, puis la recharge s’arrête</span>
          </li>
        </ul>
        <Tip>
          <p>
            Réserve pleine en 2 h <M s="C" /> : ouvrez vos coffres avant pour ne pas perdre de recharge. <M s="T" />
          </p>
        </Tip>
        <ul>
          <li>
            <strong>Coffres gagnés</strong> (sans limite de réserve) : ≈ 5 % par combat gagné, étages d’Ascension (plus gros tous
            les 5 étages), arène, Faille, saison. <M s="T" />
          </li>
          <li>
            Un coffre donne un équipement <strong>du niveau du perso à l’ouverture</strong>. Les coffres non ouverts restent
            après un Prestige. <M s="T" />
          </li>
        </ul>
      </Section>

      <Section id="boutique" title="Boutique de coffres">
        <TableWrap caption="Coffres achetables contre des kamas">
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
              <td>Bonnes raretés ×3</td>
            </tr>
            <tr>
              <td>Épique</td>
              <td className="num">{fmt(20000)} k</td>
              <td>Épique ou mieux garanti</td>
            </tr>
          </tbody>
        </TableWrap>
        <p>
          Jusqu’à <strong>100 par jour et par type</strong> ; les 20 premiers au prix normal, puis plus cher. <M s="T" /> Barème
          de la hausse : non trouvé. <M s="N" />
        </p>
      </Section>

      <Section id="elan" title="Élan et autres sources">
        <ul>
          <li>
            <strong>Élan</strong> : chaque combat remplit une jauge ; <strong>25 combats = 1 Coffre Épique</strong>, 3 par jour
            au plus. <M s="T" />
          </li>
          <li>
            <strong>3 défis courts</strong> par jour (« 3 boss d’affilée », « 5 victoires sans mourir »…) rapportent des kamas.{' '}
            <M s="T" />
          </li>
          <li>
            <strong>Série de connexion</strong> : calendrier de 7 jours, coffre de plus en plus gros (perso principal). <M s="T" />
          </li>
        </ul>
        <More title="Parrainage">
          <p>
            Quand l’ami atteint le niveau 30, le parrain reçoit 1 Coffre Royal et 2 Coffres Épiques (une fois par ami, 5
            parrainages valides par semaine au plus). <M s="T" />
          </p>
        </More>
      </Section>

      <Section id="types-recompense" title="Coffres de récompense">
        <ul>
          <li>
            <strong>Royal</strong> : objet Épique ou mieux, carte Rare ou mieux. <M s="T" />
          </li>
          <li>
            <strong>Légendaire</strong> : objet Mythique ou mieux, carte Épique ou mieux, 5 % de Rayonnant. <M s="T" />
          </li>
          <li>
            <strong>Ultime</strong> : Rayonnant ou Dofus. <M s="T" />
          </li>
        </ul>
        <More title="Autres coffres et chances">
          <ul>
            <li>
              Rayonnant +5 au choix (et d’autres types non détaillés dans les notes, <code>GIFT_CHESTS</code>). <M s="T" />
            </li>
            <li>
              Rayonnant en coffre : <strong>1 %</strong> de base (<code>CHEST.radiantPct: 1</code>), plus avec un Coffre
              chanceux. Chance de carte par coffre : 20 %. <M s="T" />
            </li>
          </ul>
        </More>
      </Section>

      <Section id="raretes" title="Raretés">
        <Bars
          label="Poids de tirage par rareté dans un coffre"
          max={46}
          items={RARITIES.map(([name, w]) => ({ name, value: w, display: `${w.toLocaleString('fr-FR')} %` }))}
          caption={
            <>
              Poids de tirage en coffre (<code>RARITIES.chestWeight</code>) <M s="T" />. Total = {fmt(RARITY_TOTAL)}, donc chaque
              poids se lit comme un % <M s="C" />. Avant bonus de Coffre chanceux/Épique.
            </>
          }
        />
      </Section>

      <Section id="fusion" title="Fusion et Rayonnant">
        <ul>
          <li>
            Dans l’Inventaire : <strong>3 T1 → 1 T2</strong> ; <strong>3 T2 → 1 Rayonnant</strong>. Bouton « Tout fusionner ».{' '}
            <M s="T" />
          </li>
          <li>
            Un Rayonnant monte de <strong>+0 à +5</strong> en ajoutant des Rayonnants +0 du même objet (1 pour les premiers
            niveaux, 2 ensuite). <M s="T" />
          </li>
        </ul>
        <Bars
          label="Bonus de stats par niveau de fusion"
          max={45}
          items={FUSION.map(([n, b]) => ({ name: n, value: b, display: `+${b} %`, hl: n === 'Rayonnant +0' || n === 'Rayonnant +5' }))}
          caption={
            <>
              FAQ : « 20 % de stats en plus au départ jusqu’à 45 % à +5 » <M s="T" /> ; alignement des valeurs sur chaque niveau{' '}
              <M s="D" />.
            </>
          }
        />
        <Tip title="À savoir">
          <p>
            PA, PM, PO et Invocations <strong>ne sont pas multipliés</strong> par la fusion. <M s="T" />
          </p>
        </Tip>
        <More title="Détails du code et Dofus">
          <ul>
            <li>
              <code>FUSION.bonusPct = [0, 10, 20, 25, 30, 35, 40, 45]</code> (<code>max: 7</code>, <code>copies: 3</code>) ;{' '}
              <code>radiantFeed</code> : &lt;2 → 0, &lt;4 → 1, sinon 2. <M s="T" />
            </li>
            <li>
              Dofus : fusion max 4, Dofus Rayonnant = +100 %, PA compris. Drop d’un Dofus ≤ 2 % tous bonus compris. <M s="T" />
            </li>
          </ul>
        </More>
      </Section>

      <Section id="bris" title="Bris d’objets et Bouclier de forge">
        <ul>
          <li>
            Orbes par objet brisé : <strong>1</strong> sous le niveau 70, <strong>2</strong> jusqu’au 139, <strong>3</strong>{' '}
            au-delà, <strong>×3</strong> pour un Rayonnant ; <strong>8 000 par jour</strong> max. <M s="T" />
          </li>
          <li>
            Le <strong>Bouclier de forge</strong> (page Forgemagie) monte sans échec et renforce tout l’équipement, jusqu’à{' '}
            <strong>+300 % au niveau 400</strong>. Gardé au Prestige. <M s="T" />
          </li>
          <li>
            Un objet <strong>verrouillé</strong> (cadenas) est protégé contre la vente et le bris. <M s="T" />
          </li>
        </ul>
      </Section>

      <Section id="compagnon" title="Compagnon">
        <ul>
          <li>
            <strong>+0,2 %</strong> à tout l’équipement par niveau, jusqu’à <strong>+79,8 % au niveau 400</strong>, en plus du
            Prestige et du Bouclier. Deux fois plus long à monter que le Bouclier. <M s="T" />
          </li>
          <li>
            <strong>Croquette</strong> : 5 % par combat gagné, tous modes ; aucune en Auto AFK (l’Auto normal en donne). 100
            données par jour max, le reste en stock. <M s="T" />
          </li>
        </ul>
        <More title="Limites du compagnon">
          <p>
            La Prospection ne change pas la chance de croquette. N’agit pas aux Abysses ni sur PA, PM, PO, invocations. Lié au
            perso principal ; niveau et croquettes gardés au Prestige. <M s="T" />
          </p>
        </More>
      </Section>

      <Section id="kamas" title="Kamas et HDV">
        <div className="economy-figure"><Stat icon="kamas" value="1 000" label="kamas · Chasse ciblée" /><span className="stat-note">Par combat · 19 oct 2026</span></div>
        <ul>
          <li>
            <strong>Vente aux PNJ</strong> : 10 kamas × niveau de l’objet, max <strong>2 000</strong>. <M s="T" />
          </li>
          <li>
            <strong>HDV</strong> : taxe de <strong>8 %</strong>, <strong>20 ventes</strong> à la fois, objet acheté lié{' '}
            <strong>24 h</strong>. <M s="T" />
          </li>
          <li>
            Avant le Prestige 4, les kamas sont <strong>perdus</strong> au Prestige. <M s="T" />
          </li>
        </ul>
        <More title="Autres dépenses et sources de kamas">
          <ul>
            <li>
              Objets éternels et verrouillés invendables. HDV séparé pour la saison. <M s="T" />
            </li>
            <li>
              Changement de classe : 1er gratuit, puis 300 000 kamas. <M s="T" />
            </li>
            <li>
              Énergie : 300 kamas le point (plus cher au-delà de 600 points/jour) —{' '}
              <Link href="/debuter/energie-xp/#achat-energie">Énergie & XP</Link>. <M s="T" />
            </li>
            <li>
              <strong>Chasse ciblée</strong> : 1 000 kamas par combat (relevé le 19 oct 2026). <M s="T" />
            </li>
            <li>
              Aucun historique des kamas ni des transactions n’a été trouvé en jeu (HDV, Guilde, banque vérifiés le 19 oct 2026).{' '}
              <M s="T" />
            </li>
            <li>
              Doublon de carte avant le Prestige 1 : converti en 3 000 kamas. <M s="T" />
            </li>
          </ul>
        </More>
      </Section>

      <Section id="discord" title="Bonus Discord">
        <p>
          Liez votre Discord (Tableau de bord, compte sauvegardé) : <strong>+10 % XP, +10 % butin, +5 % stats</strong>, à vie
          tant que le compte reste lié, partout, arène comprise. Partagé avec le perso de saison. <M s="T" />
        </p>
      </Section>

      <PageEnd
        current="/economie/"
        see={[
          { href: '/personnage/prestige/', label: 'Prestige' },
          { href: '/personnage/caracteristiques/#objets', label: 'Stats des objets' },
          { href: '/debuter/energie-xp/#achat-energie', label: 'Acheter de l’énergie' },
        ]}
        sources="txt_faq.txt, mecaniques.md §3, §4, §8"
      />
    </>
  );
}
