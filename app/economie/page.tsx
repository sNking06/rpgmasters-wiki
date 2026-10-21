import Link from 'next/link';
import type { Metadata } from 'next';
import { Icon, SectionIcon } from '@/components/icons';
import GameCapture from '@/components/GameCapture';
import { Stat, Bars, Essentiel, Fiche, M, More, PageEnd, PageHeader, Section, TableWrap, Tip, fmt, Contra, Disc, Officiel } from '@/components/ui';

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
          ['Taxe HDV', '8 / 12 / 15 %'],
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
        <GameCapture id="inventaire-coffres" caption="Page Coffres : ouverture par 1, 10 ou 50 et coffres cadeaux en réserve" />
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
          Jusqu’à <strong>100 par jour et par type</strong> (classique, chanceux, épique), remise à zéro à minuit (Paris) : du 1er au
          20e coffre du jour, prix normal ; du 21e au 50e, <strong>×1,5</strong> ; du 51e au 100e, <strong>×2</strong>. <Disc d="08/10" /> Depuis le 20/10,
          le prix affiché est le prix facturé, et si le butin n’est pas livré, les coffres sont rendus. <Disc d="20/10" />
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

      <Section id="coffres-choix" title="Coffres de choix et objets légendaires">
        <ul>
          <li>Les coffres de choix ne tombent que des coffres gratuits du jour et des coffres cadeaux Légendaire, Royal et Bonus, plus jamais des coffres achetés : <strong>10 %</strong> de coffre d’équipement au choix et <strong>10 %</strong> de coffre de sort au choix par coffre ouvert. <Disc d="08/10" /></li>
          <li>La rareté du coffre de choix suit celle de l’objet remplacé ; 0,5 % sont des Coffres Rayonnant au choix (+0 à +5 au hasard). <Disc d="08/10" /></li>
          <li>Coffres de sort en plus du contenu normal : 0,5 % Rare, 0,2 % Épique, 0,05 % Légendaire. <Disc d="08/10" /></li>
          <li><strong>9 objets légendaires</strong> (un par catégorie) : 1 chance sur 1 000 000 par victoire sur le perso principal, 10 au plus par jour et par objet sur tout le serveur ; ni brisables, ni fusionnables, ni vendables au marchand, mais vendables à l’HDV et conservés au Prestige. <Disc d="14/10 → 16/10" /></li>
        </ul>
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
        <Officiel title="Fusion repensée, puis Dofus jusqu’à Rayonnant +5" d="08/10">
          <ul>
            <li>Rayonnant dès le T3 (9 objets au lieu de 81), puis +1 à +5 jusqu’à +45 % de stats (81 objets pour un +5). Les Rayonnants de boss et de coffres tombent entre +0 et +5.</li>
            <li>Depuis le 16/10, les Dofus et trophées montent jusqu’à <strong>Rayonnant +5</strong> (au lieu de +2) et deviennent des Dofus Rayonnants : <strong>+100 %</strong> sur leurs stats ; PA et PM au plus doublés. <Disc d="16/10" /></li>
          </ul>
        </Officiel>
        <Contra title="Fusion des Dofus">
          <p>Le code client relevé plus tôt donnait une fusion max de 4 pour les Dofus ; l’annonce du 16/10 parle de Rayonnant +5. Les deux sont gardés, la règle du 16/10 étant la plus récente.</p>
        </Contra>
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
        <Officiel title="Forgemagie : l’XP de l’Infini" d="08/10">
          <ul>
            <li>Fini les échecs : <strong>chaque orbe versée donne 1 XP</strong> de l’Infini au Bouclier de forge (verser 1, 10 ou tout).</li>
            <li><strong>Niveau 200 en 14 jours</strong> au maximum d’orbes par jour, soit <strong>35 000 XP</strong> au total ; bonus de <strong>+150 % au niveau 200</strong>.</li>
            <li>Les succès de Forgemagie vont jusqu’au niveau 400. <Disc d="10/10" /> Le bonus de forge s’applique aussi aux runes. <Disc d="12/10" /></li>
          </ul>
        </Officiel>
        <Contra title="Orbes par jour">
          <p>Le jeu affiche un maximum de 8 000 orbes par jour ; or 35 000 XP en 14 jours font 2 500 orbes par jour. Le plafond a pu changer depuis le 08/10 : à vérifier en jeu.</p>
        </Contra>
        <GameCapture id="economie-forge" caption="Page Forgemagie : briser des objets et verser les orbes dans le Bouclier de forge" />
      </Section>

      <Section id="compagnon" title="Compagnon">
        <ul>
          <li>
            <strong>+0,2 %</strong> à tout l’équipement par niveau, jusqu’à <strong>+79,8 % au niveau 400</strong>, en plus du
            Prestige et du Bouclier. Deux fois plus long à monter que le Bouclier. <M s="T" />
          </li>
          <li>
            <strong>Croquette</strong> : 10 % par combat gagné, tous modes, Auto compris (FAQ du 20 oct 2026). 100
            données par jour max, le reste en stock. <M s="T" />
          </li>
        </ul>
        <More title="Limites du compagnon">
          <p>
            La Prospection ne change pas la chance de croquette. N’agit pas aux Abysses ni sur PA, PM, PO, invocations. Lié au
            perso principal ; niveau et croquettes gardés au Prestige. <M s="T" />
          </p>
        </More>
        <More title="Historique officiel du Compagnon">
          <ul>
            <li>10/10, 22:39 : 5 % de croquette par victoire, pas en Auto ni en AFK ; jusqu’à +100 % au niveau 400. <Disc d="10/10" /></li>
            <li>10/10, 23:24 : <strong>+0,2 % par niveau</strong> (jusqu’à +79,8 % au niveau 400) ; croquettes aussi en Auto, pas en AFK. <Disc d="10/10" /></li>
            <li>12/10 : croquettes à <strong>10 %</strong> par victoire (au lieu de 5 %). <Disc d="12/10" /></li>
            <li>18/10 : les croquettes tombent aussi en Auto (enchaîne). <Disc d="18/10" /></li>
          </ul>
        </More>
        <GameCapture id="economie-compagnon" caption="Page Compagnon : croquettes à donner (100 par jour) et choix du compagnon" />
      </Section>

      <Section id="kamas" title="Kamas et HDV">
        <div className="economy-figure"><Stat icon="kamas" value="1 000" label="kamas · Chasse ciblée" /><span className="stat-note">Par combat · 19 oct 2026</span></div>
        <ul>
          <li>
            <strong>Vente aux PNJ</strong> : 10 kamas × niveau de l’objet, max <strong>2 000</strong>. <M s="T" />
          </li>
          <li>
            <strong>HDV</strong> : taxe de <strong>8 %</strong> jusqu’à 100 000 kamas, <strong>12 %</strong> jusqu’à 1 000 000, <strong>15 %</strong> au-delà (FAQ du 20 oct 2026), <strong>20 ventes</strong> à la fois, objet acheté lié{' '}
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

      <Section id="hdv-officiel" title="HDV : ce qui a changé">
        <ul>
          <li>08/10 : taxe de l’HDV à <strong>8 %</strong> (au lieu de 2 %), revente PNJ divisée par deux. <Disc d="08/10" /></li>
          <li>20/10 : filtre par niveau de fusion (T1, T2, Rayonnant, R+1 à R+5), Dofus / Trophées / Prysmaradites séparés, onglet Historique des ventes (25 par page). <Disc d="20/10" /></li>
        </ul>
        <Contra title="Taxe de l’HDV">
          <p>L’annonce du 08/10 donne une taxe unique de 8 % ; la FAQ du jeu relevée le 20/10 donne 8 / 12 / 15 % par paliers. La FAQ, plus récente, est gardée dans la fiche.</p>
        </Contra>
      </Section>

      <Section id="chasse-ciblee" title="Chasse ciblée">
        <ul>
          <li>Chasse → zone → bloc « Chasse ciblée » : on coche <strong>jusqu’à 3 objets</strong>. Chaque combat coûte <strong>1 000 kamas</strong>, remboursés si le combat ne démarre pas. <Disc d="16/10" /></li>
          <li><strong>5 % de drop par victoire</strong>, réparti au hasard entre les objets choisis ; un Dofus n’est gardé qu’une fois sur cinq (1 %). Objets : drops de la zone et Dofus jusqu’au niveau de la zone +20, aucun légendaire. <Disc d="16/10" /></li>
          <li>On garde l’XP ; on renonce aux kamas, coffres, cartes, butin bonus et drops légendaires. Prospection et événements de drop ne changent pas les 5 %. Indisponible en saison. <Disc d="16/10" /></li>
          <li><strong>Pity</strong> : l’objet ciblé tombe automatiquement tous les <strong>100 combats</strong> en chasse ciblée, tous les <strong>200</strong> en Auto AFK. <Disc d="date non relevée" /></li>
        </ul>
        <GameCapture id="patch-2026-10-16-chasse-ciblee" caption="Patch note de la Chasse ciblée (16/10)" />
      </Section>

      <Section id="roue-bouftou" title="Roue Bouftou">
        <p>Menu « Plus » → Roue Bouftou : <strong>un tour toutes les 3 heures</strong> par compte, perso principal uniquement. <Disc d="17/10" /> Depuis le 20/10, la roue ne tourne qu’après <strong>10 victoires</strong>. <Disc d="20/10" /></p>
        <TableWrap caption="Lots de la Roue Bouftou (17/10)">
          <thead><tr><th>Lot</th><th className="num">Chance</th></tr></thead>
          <tbody>
            {[['2 000 kamas','30 %'],['5 Boules de capture','20 %'],['3 tickets d’arène','18 %'],['10 000 kamas','12 %'],['Coffre bonus','10 %'],['50 000 kamas','5 %'],['Coffre épique','3,5 %'],['Coffre royal','1 %'],['Jackpot : un objet de la pano Mehdi','0,01 %']].map(([l,c])=><tr key={l}><td>{l}</td><td className="num">{c}</td></tr>)}
          </tbody>
        </TableWrap>
        <p>Pano Mehdi (11 objets) : +20 % de stats par objet porté (hors PA, PM, PO) et +2 % de dégâts de sorts chacun. <Disc d="17/10" /></p>
      </Section>

      <Section id="runes" title="Runes">
        <ul>
          <li>Après chaque victoire, Auto compris : rune classique <strong>1 %</strong>, épique <strong>0,5 %</strong>, légendaire <strong>0,1 %</strong>. Boss des Abysses : ×5. <Disc d="12/10" /></li>
          <li>2 runes au plus par objet ; pour en graver une 3e, on choisit laquelle détruire. <Disc d="12/10" /></li>
          <li>Classiques : Vitalité, caractéristiques, Sagesse, Prospection, Initiative, résistances, Tacle, Fuite. Épiques : Puissance, Dommages, Critique, Soins, % de dommages aux sorts, Rune d’Éclat (+5 % de toutes les stats de l’objet). <Disc d="12/10" /></li>
          <li>Légendaires : +1 PO, +1 PM, +1 Invocation, +1 PA (une seule par personnage), % de dommages critiques, <strong>Rune d’Éveil (+15 % de toutes les stats de l’objet)</strong>, Rune Élémentaire (double les dommages élémentaires de l’objet). <Disc d="12/10" /></li>
          <li>Les bonus de Prestige, de Forgemagie et de Compagnon s’appliquent aux runes, jusqu’à +100 %. Un objet runé se porte ou se revend à l’HDV avec ses runes. Réservées au perso principal. <Disc d="12/10" /></li>
          <li>Rune de Fureur : +8 % → <strong>+2 %</strong> de dégâts critiques. Un objet runé peut monter en fusion. <Disc d="14/10" /></li>
        </ul>
      </Section>

      <Section id="discord" title="Bonus Discord">
        <p>
          Liez votre Discord (Tableau de bord, compte sauvegardé) : <strong>+10 % XP, +10 % butin, +5 % stats</strong>, à vie
          tant que le compte reste lié, partout, arène comprise. Partagé avec le perso de saison. <M s="T" />
        </p>
        <Officiel title="Bonus Discord et règle anti-bot" d="20/10">
          <ul>
            <li>Bonus du compte lié : +10 % d’XP et de butin, +5 % aux caractéristiques, aussi pour le perso de saison. <Disc d="08/10" /></li>
            <li>Depuis le 20/10 : <strong>pour tout débloquer, il faut lier un compte Discord de plus de 3 jours</strong>. Sans lien, les invités n’ont accès qu’à l’Aventure et à la Chasse. Les comptes déjà inscrits restent débloqués. Un seul compte par adresse e-mail.</li>
            <li>Le support peut délier un Discord si le compte invité est perdu.</li>
          </ul>
        </Officiel>
      </Section>

      <PageEnd
        current="/economie/"
        see={[
          { href: '/personnage/prestige/', label: 'Prestige' },
          { href: '/personnage/caracteristiques/#objets', label: 'Stats des objets' },
          { href: '/debuter/energie-xp/#achat-energie', label: 'Acheter de l’énergie' },
        ]}
        sources="txt_faq.txt, mecaniques.md §3, §4, §8 ; Discord officiel, annonces du 08/10 au 20/10"
      />
    </>
  );
}
