import type { Metadata } from 'next';
import XpChart from '@/components/XpChart';
import { Badge, Callout, Fact, Facts, PageHeader, Section, Src, TableWrap, fmt } from '@/components/ui';
import { MONSTER_XP_REF_KNOWN, XP_SOURCE_POINTS, cumulativeXp, energyPointPrice, energyTotalCost } from '@/lib/xp';

export const metadata: Metadata = {
  title: 'Énergie et XP',
  description: 'Énergie dans RpgMasters (constantes, coût d’achat et sa formule) et courbe d’XP des niveaux (points connus, bonus d’XP).',
};

// Calculs effectués au build (rendu statique).
const COMPUTED = cumulativeXp(MONSTER_XP_REF_KNOWN).filter((p) => p.level >= 2);
const PRICE_POINTS = [1, 600, 601, 700, 800, 900, 1000];
const TOTAL_POINTS = [600, 1000];

export default function EnergieXpPage() {
  return (
    <>
      <PageHeader title="Énergie et XP" lead="Ce que coûtent les combats, comment racheter de l’énergie, et combien d’XP demandent les niveaux." />

      <Section id="energie" title="Énergie">
        <Facts>
          <Fact s="T">
            Maximum <strong>100</strong> points ; <strong>+1 toutes les 6 minutes</strong> (10 par heure), même hors connexion.
          </Fact>
          <Fact s="C">Soit 240 points régénérés par jour.</Fact>
          <Fact s="T">
            Coûts : combat de Chasse ou d’Aventure <strong>1</strong> ; boss ou étage d’Ascension <strong>2</strong> ; descente
            dans les Abysses <strong>20</strong> ; entrée de la Dimension Écarlate 20 (vagues suivantes gratuites).
          </Fact>
          <Fact s="T">
            Arène : la FAQ parle d’<strong>un ticket</strong> par combat ; le code contient <code>pvpCost: 2</code>.
          </Fact>
          <Fact s="D">D’après une note source, l’arène coûterait aussi 2 d’énergie : à vérifier en jeu.</Fact>
          <Fact s="T">On ne peut pas dépasser le maximum. Le perso de saison n’utilise pas d’énergie.</Fact>
          <Fact s="T">FAQ : mieux vaut ne pas laisser l’énergie pleine trop longtemps.</Fact>
        </Facts>
        <TableWrap caption="Constantes ENERGY [TROUVÉ]">
          <thead>
            <tr>
              <th>Constante</th>
              <th className="num">Valeur</th>
            </tr>
          </thead>
          <tbody>
            {[
              ['max', '100'],
              ['periodSec', '360'],
              ['pveCost', '1'],
              ['pvpCost', '2'],
              ['bossCost', '2'],
              ['buyPrice', '300'],
              ['buyDaily', '1000'],
              ['buyRampFrom', '600'],
              ['buyTopPrice', '2000'],
            ].map(([k, v]) => (
              <tr key={k}>
                <td>
                  <code>{k}</code>
                </td>
                <td className="num">{v}</td>
              </tr>
            ))}
          </tbody>
        </TableWrap>
        <Src>txt_faq.txt, rea_classement.md §2, mecaniques.md §8</Src>
      </Section>

      <Section id="achat-energie" title="Coût d’achat de l’énergie">
        <Facts>
          <Fact s="T">
            Achat contre des kamas : <strong>300 kamas le point</strong>, jusqu’à <strong>1 000 points par jour</strong> ; le
            prix monte au-delà de 600 points achetés dans la journée, jusqu’à 2 000.
          </Fact>
          <Fact s="T">
            Prix du point n (n = achats déjà faits aujourd’hui + 1) : 300 si n ≤ 600, sinon :
          </Fact>
        </Facts>
        <code className="formula">prix(n) = round(300 + 1700 × (n − 600) / 400)   → 2 000 à n = 1 000</code>
        <TableWrap caption="Prix d’un point selon son rang dans la journée [calcul sur TROUVÉ]">
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
        <Facts>
          {TOTAL_POINTS.map((n) => (
            <Fact key={n} s="C">
              Acheter {fmt(n)} points dans la journée coûte au total <strong>{fmt(energyTotalCost(n))} kamas</strong>.
            </Fact>
          ))}
          <Fact s="D">
            1 combat PvE ≈ 300 kamas d’énergie achetée (≈ 600 pour un combat à 2 points) : rentable seulement si les kamas sont en
            surplus.
          </Fact>
        </Facts>
        <Src>rea_classement.md §2</Src>
      </Section>

      <Section id="xp" title="XP : d’où elle vient">
        <Facts>
          <Fact s="T">
            L’XP vient des <strong>combats gagnés</strong> : Aventure, Chasse, boss, Ascension… Niveau maximum 200.
          </Fact>
          <Fact s="T">
            La Grotte de l’Aéfka rapporte coffres, kamas et XP pendant l’absence du joueur.
          </Fact>
          <Fact s="T">
            Conseil FAQ : comparer l’XP gagnée en fin de combat entre l’Aventure et la Chasse pour voir ce qui marche le mieux
            avec son niveau et son build.
          </Fact>
          <Fact s="N">
            XP réellement donnée par combat : <strong>non trouvée</strong> (calcul côté serveur). Impossible de calculer le
            nombre exact de combats par niveau.
          </Fact>
        </Facts>
      </Section>

      <Section id="courbe" title="Courbe de niveaux">
        <p>Formule de la table d’XP cumulée trouvée dans le code client <Badge s="T" /> :</p>
        <code className="formula">{`n[0] = n[1] = 0
n[L+1] = n[L] + round(2.5 × MONSTER_XP_REF[L−1] × (2 + 0.12 × L))
Niveau = plus grand L tel que XP ≥ n[L]`}</code>
        <Callout kind="warn">
          <p>
            <Badge s="N" /> La table <code>MONSTER_XP_REF</code> compte 200 valeurs, mais <strong>les sources n’en citent
            que les 5 premières</strong> (16, 52, 104, 171, 251) et la dernière (143 043). La courbe complète n’est donc pas
            recalculée ici : aucune valeur n’est inventée.
          </p>
          <p>
            <Badge s="D" /> Interprétation : la table serait l’« XP de référence d’un monstre du niveau L ».
          </p>
        </Callout>

        <h3>Points connus</h3>
        <TableWrap caption="XP cumulée pour atteindre le niveau">
          <thead>
            <tr>
              <th className="num">Niveau</th>
              <th className="num">XP cumulée</th>
              <th>Statut</th>
            </tr>
          </thead>
          <tbody>
            {COMPUTED.map((p) => (
              <tr key={`c${p.level}`}>
                <td className="num">{p.level}</td>
                <td className="num">{fmt(p.xp)}</td>
                <td>
                  <Badge s="C" /> calculé au build avec la formule et les 5 premières valeurs connues
                </td>
              </tr>
            ))}
            {XP_SOURCE_POINTS.map((p) => (
              <tr key={`s${p.level}`}>
                <td className="num">{p.level}</td>
                <td className="num">{fmt(p.xp)}</td>
                <td>
                  <Badge s="C" /> cité dans les sources (calcul des notes sur la table complète)
                </td>
              </tr>
            ))}
          </tbody>
        </TableWrap>
        <Facts>
          <Fact s="C">Passer du niveau 30 au niveau 31 demande 76 608 XP.</Fact>
        </Facts>

        <XpChart
          points={[
            ...COMPUTED.map((p) => ({ ...p, kind: 'calc' as const })),
            ...XP_SOURCE_POINTS.map((p) => ({ ...p, kind: 'source' as const })),
          ]}
        />
        <Src>rea_classement.md §1</Src>
      </Section>

      <Section id="bonus-xp" title="Bonus d’XP connus">
        <TableWrap caption="Modificateurs d’XP trouvés">
          <thead>
            <tr>
              <th>Bonus</th>
              <th>Effet</th>
              <th>Détail</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Discord lié <Badge s="T" /></td>
              <td>+10 % XP</td>
              <td>À vie tant que le compte reste lié ; aussi +10 % butin, +5 % stats.</td>
            </tr>
            <tr>
              <td>Auto AFK <Badge s="T" /></td>
              <td>×0,5</td>
              <td>
                Moitié moins d’XP, de kamas et de butin (<code>AUTO.rewardMult 0.5</code>). L’« Auto » simple garde les
                récompenses normales.
              </td>
            </tr>
            <tr>
              <td>Saison Héroïque <Badge s="T" /></td>
              <td>×4</td>
              <td>Perso de saison ; ×2 en plus pour un perso recréé après une mort, tant qu’il est sous le niveau du perso tombé.</td>
            </tr>
            <tr>
              <td>Chasse <Badge s="T" /></td>
              <td>niveau −5</td>
              <td>
                Une zone est accessible dès son niveau minimum moins 5 (<code>HUNT_LEVEL_MARGIN 5</code>).
              </td>
            </tr>
          </tbody>
        </TableWrap>
        <Facts>
          <Fact s="T">
            <code>LEVEL_BRACKET: 20</code> existe dans le code, sans usage visible.
          </Fact>
          <Fact s="D">Il s’agirait d’une tranche de niveau de monstres/zones.</Fact>
        </Facts>
        <Src>txt_faq.txt, txt_saison.txt, rea_classement.md §1</Src>
      </Section>
    </>
  );
}
