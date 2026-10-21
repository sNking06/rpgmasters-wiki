import type { Metadata } from 'next';
import EnergyPriceChart from '@/components/EnergyPriceChart';
import XpChart from '@/components/XpChart';
import GameCapture from '@/components/GameCapture';
import { Icon, SectionIcon } from '@/components/icons';
import { KeyFigures, Bars, Essentiel, Fiche, M, Meter, More, PageEnd, PageHeader, Section, TableWrap, Tip, Warn, fmt } from '@/components/ui';
import { ENERGY, MONSTER_XP_REF_KNOWN, XP_SOURCE_POINTS, cumulativeXp, energyPointPrice, energyTotalCost } from '@/lib/xp';

export const metadata: Metadata = {
  title: 'Énergie et XP',
  description: 'Énergie dans RpgMasters (100 max, +1 toutes les 6 min, coût des combats, achat) et XP (sources, bonus, courbe des niveaux).',
};

// Calculs effectués au build (rendu statique).
const COMPUTED = cumulativeXp(MONSTER_XP_REF_KNOWN).filter((p) => p.level >= 2);
const PRICE_POINTS = [1, 600, 601, 700, 800, 900, 1000];
const TOTAL_POINTS = [600, 1000];

export default function EnergieXpPage() {
  return (
    <>
      <PageHeader href="/debuter/energie-xp/" section="energie" title="Énergie & XP" intro="Ce que coûte un combat, comment recharger, et combien d’XP demandent les niveaux." />

      <Essentiel>
        <li>
          <strong>100 d’énergie max</strong>, <strong>+1 toutes les 6 min</strong>, même hors ligne. <M s="T" />
        </li>
        <li>
          Chasse ou Aventure <strong>1</strong> · boss ou étage d’Ascension <strong>2</strong> · Abysses <strong>20</strong>.{' '}
          <M s="T" />
        </li>
        <li>
          L’XP vient des <strong>combats gagnés</strong> ; comparez l’XP Aventure vs Chasse en fin de combat. <M s="T" />
        </li>
        <li>
          Bonus : <strong>Discord +10 % XP</strong> ; <strong>Auto AFK ×0,5</strong> ; saison <strong>×4</strong>. <M s="T" />
        </li>
      </Essentiel>

      <Section id="energie" title="Énergie">
        <Meter
          max={100}
          label="Jauge d’énergie : 100 au maximum, +1 toutes les 6 minutes, 10 heures pour remplir une jauge vide."
          segments={[
            {
              value: 100,
              kind: 'a',
              legend: (
                <>
                  +1 toutes les 6 min, soit 10 par heure <M s="T" />
                </>
              ),
            },
          ]}
          ticks={[
            { at: 0, label: '0' },
            { at: 50, label: '50' },
            { at: 100, label: '100 max' },
          ]}
          caption={
            <>
              Vide → plein : 10 h ; 240 points régénérés par jour. <M s="C" />
            </>
          }
        />
        <Fiche
          title="Coût en énergie"
          icon={<SectionIcon section="energie" size={20} />}
          rows={[
            ['Chasse / Aventure', '1'],
            ['Boss / étage d’Ascension', '2'],
            ['Abysses (descente)', '20'],
            ['Dimension Écarlate', '20 à l’entrée, vagues suivantes gratuites'],
            ['Arène', '1 ticket (voir plus bas)'],
            ['Perso de saison', 'aucune énergie'],
          ]}
        />
        <Tip>
          <p>
            Ne laissez pas l’énergie pleine trop longtemps (conseil de la FAQ). On ne peut pas dépasser le maximum. <M s="T" />
          </p>
        </Tip>
        <More title="Arène : ticket ou énergie ? · Constantes ENERGY">
          <ul>
            <li>
              La FAQ parle d’<strong>un ticket</strong> par combat d’arène ; le code contient <code>pvpCost: 2</code>. <M s="T" />
            </li>
            <li>
              D’après une note source, l’arène coûterait aussi 2 d’énergie : à vérifier en jeu. <M s="D" />
            </li>
          </ul>
          <p>
            <code>
              ENERGY = {'{'}max: {ENERGY.max}, periodSec: {ENERGY.periodSec}, pveCost: {ENERGY.pveCost}, pvpCost: {ENERGY.pvpCost},
              bossCost: {ENERGY.bossCost}, buyPrice: {ENERGY.buyPrice}, buyDaily: {ENERGY.buyDaily}, buyRampFrom:{' '}
              {ENERGY.buyRampFrom}, buyTopPrice: {ENERGY.buyTopPrice}
              {'}'}
            </code>{' '}
            <M s="T" />
          </p>
        </More>
      </Section>

      <Section id="achat-energie" title="Acheter de l’énergie">
        <ul>
          <li>
            <strong>300 kamas le point</strong>, jusqu’à <strong>1 000 points par jour</strong>. <M s="T" />
          </li>
          <li>
            Au-delà de <strong>600 points</strong> achetés dans la journée, le prix monte jusqu’à <strong>2 000</strong>.{' '}
            <M s="T" />
          </li>
        </ul>
        <p>
          Le menu Énergie propose aussi une option <strong>« ILLIMITÉE 24 H » à 1 000 000 kamas</strong> (vue le 20 oct 2026, non
          achetée). <M s="T" />
        </p>
        <EnergyPriceChart />
        <Warn>
          <p>
            1 combat PvE ≈ 300 kamas d’énergie achetée (≈ 600 pour un combat à 2 points) : rentable seulement si vos kamas sont
            en surplus. <M s="D" />
          </p>
        </Warn>
        <More title="Formule et prix détaillés">
          <p>
            Prix du point n (n = achats déjà faits aujourd’hui + 1) : 300 si n ≤ 600, sinon : <M s="T" />
          </p>
          <code className="formula">prix(n) = round(300 + 1700 × (n − 600) / 400)</code>
          <TableWrap caption="Prix d’un point selon son rang dans la journée (calcul)">
            <thead>
              <tr>
                <th className="num">n-ième point</th>
                <th className="num">Prix (kamas)</th>
              </tr>
            </thead>
            <tbody>
              {PRICE_POINTS.map((n) => (
                <tr key={n}>
                  <td className="num">{fmt(n)}</td>
                  <td className="num">{fmt(energyPointPrice(n))}</td>
                </tr>
              ))}
            </tbody>
          </TableWrap>
          <ul>
            {TOTAL_POINTS.map((n) => (
              <li key={n}>
                Acheter {fmt(n)} points dans la journée coûte au total <strong>{fmt(energyTotalCost(n))} kamas</strong>.{' '}
                <M s="C" />
              </li>
            ))}
          </ul>
        </More>
      </Section>

      <Section id="xp" title="XP : d’où elle vient">
        <ul>
          <li>
            Des <strong>combats gagnés</strong> : Aventure, Chasse, boss, Ascension… Niveau max <strong>200</strong>. <M s="T" />
          </li>
          <li>
            La <strong>Grotte de l’Aéfka</strong> rapporte coffres, kamas et XP pendant votre absence. <M s="T" />
          </li>
          <li>
            À la Chasse, une zone est accessible dès son niveau minimum <strong>moins 5</strong>. <M s="T" />
          </li>
        </ul>
        <Tip>
          <p>
            Comparez l’XP de fin de combat entre l’Aventure et la Chasse : c’est le meilleur moyen de voir ce qui marche à votre
            niveau et avec votre build (FAQ). <M s="T" />
          </p>
        </Tip>
        <GameCapture id="tableau-de-bord" caption="Progression (Chemin, Abysses) et quêtes du jour sur le tableau de bord" />
        <p>
          XP réellement donnée par combat : <strong>inconnue</strong> (calcul côté serveur), donc pas de nombre exact de combats
          par niveau. <M s="N" />
        </p>
      </Section>

      <Section id="bonus-xp" title="Bonus d’XP">
        <Bars
          label="Multiplicateurs d’XP connus"
          max={4}
          items={[
            { name: 'Saison (×4)', value: 4, display: '×4' },
            { name: 'Discord lié', value: 1.1, display: '+10 %', hl: true },
            { name: 'Normal / Auto', value: 1, display: '×1' },
            { name: 'Auto AFK', value: 0.5, display: '×0,5' },
          ]}
          caption={
            <>
              Tous trouvés dans la FAQ, la page Saison ou le code. <M s="T" />
            </>
          }
        />
        <Tip title="Événement en cours — relevé du 21 oct 2026">
          <p>
            À 10 h, la bannière « Événement » affichait <strong>XP ×2</strong> et <strong>Butin ×2</strong>, sans date de fin
            exacte. <M s="T" />
          </p>
        </Tip>
        <More title="Détails des bonus">
          <ul>
            <li>
              <strong>Discord</strong> : +10 % XP à vie tant que le compte reste lié ; aussi +10 % butin, +5 % stats. <M s="T" />
            </li>
            <li>
              <strong>Auto AFK</strong> : moitié moins d’XP, de kamas et de butin (<code>AUTO.rewardMult 0.5</code>). L’« Auto »
              simple garde les récompenses normales. <M s="T" />
            </li>
            <li>
              <strong>Saison</strong> : ×4 ; ×2 en plus pour un perso recréé après une mort, tant qu’il est sous le niveau du perso
              tombé. <M s="T" />
            </li>
            <li>
              <code>HUNT_LEVEL_MARGIN 5</code> (Chasse) ; <code>LEVEL_BRACKET: 20</code> existe sans usage visible <M s="T" />,
              probablement une tranche de niveau de monstres/zones. <M s="D" />
            </li>
          </ul>
        </More>
      </Section>

      <Section id="auto-inactivite" title="Farm en Auto et inactivité">
        <KeyFigures items={[
          {icon:'damage', value:'~840', label:'Combats', note:'19 oct 2026 · séries cumulées'},
          {icon:'xp', value:'≈5 Md', label:'XP', note:'Dernière série · 19 oct 2026'},
          {icon:'objets', value:'273', label:'Objets', note:'Dernière série'},
          {icon:'sorts', value:'82', label:'Sorts', note:'Dernière série'},
          {icon:'coffres', value:'23', label:'Coffres', note:'Dernière série'},
        ]} />
        <ul>
          <li>
            Après environ <strong>10 min</strong> sans action, le compte est renvoyé vers <code>/file-attente?afk=1</code> ; le bouton{' '}
            <strong>« Je suis là, je reviens »</strong> rétablit la session. Une vérification « Es-tu toujours là ? » à pavé de chiffres
            peut aussi apparaître. <M s="T" />
          </li>
          <li>
            L’Auto s’arrête sur <strong>« Le serveur ne répond pas »</strong>, sur <strong>« Aucun groupe à refaire »</strong> (les
            groupes de monstres sont renouvelés <strong>toutes les 3 min</strong>) et sur une défaite. <M s="T" />
          </li>
          <li>
            En Auto normal (récompenses pleines), le bouton de lancement s’appelle quand même « Attaquer en AFK » ; seule
            l’option « Enchaîner en AFK » applique le −50 %. <M s="T" />
          </li>
        </ul>
        <Tip title="Exemple de farm — 19 oct 2026">
          <p>
            Jardins d’Hiver en Auto normal, Féca niveau 200, sans aucune défaite sur la journée : au moins{' '}
            <strong>~840 combats</strong>. La dernière série (212/212) affichait <strong>≈5 Md d’XP</strong>, 63 873 kamas,{' '}
            <strong>273 objets</strong>, <strong>82 sorts</strong> et <strong>23 coffres</strong>, avec l’événement XP ×2 / Butin ×2
            actif. <M s="T" />
          </p>
        </Tip>
      </Section>

      <Section id="courbe" title="Combien d’XP par niveau ?">
        <Fiche
          title="XP cumulée pour atteindre…"
          icon={<Icon name="chart" size={20} />}
          rows={[
            ['Niveau 10', `${fmt(18_674)} XP`],
            ['Niveau 30', `${fmt(661_088)} XP`],
            ['Niveau 100', `${fmt(42_231_421)} XP`],
            ['Niveau 200', `${fmt(509_344_483)} XP`],
          ]}
        />
        <p>
          Valeurs calculées dans les notes sources sur la table complète du jeu. <M s="C" /> Passer du niveau 30 au 31 demande{' '}
          <strong>{fmt(76_608)} XP</strong>. <M s="C" />
        </p>
        <XpChart
          points={[
            ...COMPUTED.map((p) => ({ ...p, kind: 'calc' as const })),
            ...XP_SOURCE_POINTS.map((p) => ({ ...p, kind: 'source' as const })),
          ]}
        />
        <More title="Tous les points connus (12) et la formule">
          <TableWrap caption="XP cumulée pour atteindre le niveau">
            <thead>
              <tr>
                <th className="num">Niveau</th>
                <th className="num">XP cumulée</th>
                <th>Origine</th>
              </tr>
            </thead>
            <tbody>
              {COMPUTED.map((p) => (
                <tr key={`c${p.level}`}>
                  <td className="num">{p.level}</td>
                  <td className="num">{fmt(p.xp)}</td>
                  <td>
                    calculé au build (5 premières valeurs) <M s="C" />
                  </td>
                </tr>
              ))}
              {XP_SOURCE_POINTS.map((p) => (
                <tr key={`s${p.level}`}>
                  <td className="num">{p.level}</td>
                  <td className="num">{fmt(p.xp)}</td>
                  <td>
                    cité dans les sources <M s="C" />
                  </td>
                </tr>
              ))}
            </tbody>
          </TableWrap>
          <p>
            Formule de la table d’XP cumulée, trouvée dans le code client : <M s="T" />
          </p>
          <code className="formula">{`n[0] = n[1] = 0
n[L+1] = n[L] + round(2.5 × MONSTER_XP_REF[L−1] × (2 + 0.12 × L))
Niveau = plus grand L tel que XP ≥ n[L]`}</code>
          <ul>
            <li>
              La table <code>MONSTER_XP_REF</code> compte 200 valeurs, mais les sources n’en citent que les 5 premières (16, 52,
              104, 171, 251) et la dernière (143 043) : la courbe complète n’est pas recalculée ici. <M s="N" />
            </li>
            <li>
              Cette table serait l’« XP de référence d’un monstre du niveau L ». <M s="D" />
            </li>
          </ul>
        </More>
      </Section>

      <PageEnd
        current="/debuter/energie-xp/"
        see={[
          { href: '/economie/#kamas', label: 'Kamas' },
          { href: '/contenus/saison/', label: 'Saison (XP ×4)' },
          { href: '/personnage/prestige/', label: 'Prestige' },
          { href: '/debuter/faq/#progresser', label: 'FAQ : progresser' },
        ]}
        sources="txt_faq.txt, txt_saison.txt, rea_classement.md §1–2, mecaniques.md §8"
      />
    </>
  );
}
