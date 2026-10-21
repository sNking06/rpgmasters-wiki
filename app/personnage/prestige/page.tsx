import Link from 'next/link';
import type { Metadata } from 'next';
import { Icon, SectionIcon } from '@/components/icons';
import GameCapture from '@/components/GameCapture';
import { Contra, Disc, Essentiel, Fiche, M, More, Officiel, PageEnd, PageHeader, Section, TableWrap, Tip, Warn } from '@/components/ui';

export const metadata: Metadata = {
  title: 'Prestige',
  description: 'Prestige dans RpgMasters : +25 % de stats par Prestige, conditions P1 à P20, ce qu’on perd et garde, objet éternel, plafond de PA.',
};

type Row = { p: number; cond: string; bonus: string; pa: number };

const paCap = (p: number) => (p >= 8 ? 15 : p >= 5 ? 14 : p >= 2 ? 13 : 12);

const ROWS: Row[] = [
  { p: 1, cond: 'Niveau 200', bonus: '+1 PA' },
  { p: 2, cond: 'Niveau 200', bonus: '+2 PO' },
  { p: 3, cond: 'Niveau 200', bonus: '+2 PM' },
  { p: 4, cond: 'Étage 20 de l’Ascension terminé', bonus: '+1 PA' },
  { p: 5, cond: 'Étage 30 de l’Ascension · plus de condition Kralamoure depuis le 18/10 (avant : 500 000 dégâts cumulés)', bonus: '+3 PO' },
  { p: 6, cond: 'Étage 40 de l’Ascension · plus de condition Kralamoure depuis le 18/10 (avant : 1 000 000 dégâts cumulés)', bonus: '+3 PM' },
  { p: 7, cond: 'Étage 40 de l’Ascension terminé', bonus: '+1 PA' },
  { p: 8, cond: 'Niveau 200 + étage 60 de l’Ascension terminé (relevé du 21 oct 2026)', bonus: '—' },
  { p: 9, cond: 'Étage 80 de l’Ascension terminé', bonus: '—' },
  { p: 10, cond: 'Étage 110 de l’Ascension terminé', bonus: '—' },
  { p: 11, cond: 'Étage 140 de l’Ascension terminé', bonus: '—' },
  { p: 12, cond: 'Étage 170 de l’Ascension terminé', bonus: '—' },
  { p: 13, cond: 'Étage 200 de l’Ascension terminé', bonus: '—' },
  { p: 14, cond: 'Étage 230 de l’Ascension terminé', bonus: '—' },
  { p: 15, cond: 'Étage 260 de l’Ascension terminé + record de 130 étages dans les Abysses', bonus: '—' },
  { p: 16, cond: 'Record de 260 étages dans les Abysses', bonus: '—' },
  { p: 17, cond: 'Record de 390 étages dans les Abysses', bonus: '—' },
  { p: 18, cond: 'Record de 520 étages dans les Abysses', bonus: '—' },
  { p: 19, cond: 'Record de 650 étages dans les Abysses', bonus: '—' },
  { p: 20, cond: 'Record de 780 étages dans les Abysses', bonus: '—' },
].map((r) => ({ ...r, pa: paCap(r.p) }));

const MILESTONES: { head: string; tag?: string; key?: boolean; text: string }[] = [
  { head: 'P1 → P3', text: 'Niveau 200. Bonus : +1 PA, +2 PO, +2 PM. PA max 13 dès P2.' },
  { head: 'P4', tag: 'plus aucune perte', key: true, text: 'Étage 20 de l’Ascension. +1 PA.' },
  { head: 'P5', text: 'Étage 30. Plus de condition de dégâts sur le Kralamoure depuis le 18/10 (Discord officiel). +3 PO. PA max 14.' },
  { head: 'P6 → P7', text: 'Étage 40 (plus de condition Kralamoure pour P6 depuis le 18/10). +3 PM, +1 PA.' },
  { head: 'P8', text: 'Niveau 200 + étage 60 de l’Ascension terminé (relevé du 21 oct 2026). PA max 15.' },
  { head: 'P9 → P10', text: 'Étage 80, puis étage 110 (badge aux ailes rouges).' },
  { head: 'P15', text: 'Étage 260 + record de 130 étages dans les Abysses.' },
  { head: 'P16 → P20', tag: 'maximum actuel', key: true, text: 'Records Abysses : 260, 390, 520, 650 puis 780 étages. Les suivants : « bientôt disponibles ».' },
];

export default function PrestigePage() {
  return (
    <>
      <PageHeader href="/personnage/prestige/" section="prestige" title="Prestige" intro="Au niveau 200, repartir au niveau 1 avec un équipement plus fort." />

      <Essentiel>
        <li>
          <strong>+25 % de stats</strong> sur tout l’équipement porté, à chaque Prestige (cumulable). <M s="T" />
        </li>
        <li>
          <strong>+1 carte</strong> dans les decks par Prestige ; l’<strong>Ascension</strong> s’ouvre. <M s="T" />
        </li>
        <li>
          <strong>Avant le Prestige 4</strong> : équipement, inventaire et kamas sont perdus (sauf l’objet gardé). <M s="T" />
        </li>
        <li>
          <strong>Dès le Prestige 4</strong> : plus aucune perte. <M s="T" />
        </li>
        <li>
          Maximum : <strong>Prestige 20</strong>, aussi en saison (FAQ du 20 oct 2026). <M s="T" />
        </li>
      </Essentiel>

      <Fiche
        title="Fiche Prestige"
        icon={<SectionIcon section="prestige" size={20} />}
        rows={[
          ['Condition', 'niveau 200 (puis Ascension)'],
          ['Équipement', '+25 % par Prestige'],
          ['Deck', '+1 carte par Prestige'],
          ['Plus de pertes', 'dès P4'],
          ['PA max', '12 → 13 (P2) → 14 (P5) → 15 (P8)'],
          ['Maximum', 'P20 (saison comprise)'],
        ]}
      />

      <Section id="principe" title="Comment faire">
        <ul>
          <li>
            Page Personnage, bouton « Faire Prestige », puis tapez <strong>« PRESTIGE »</strong> pour confirmer. <M s="T" />
          </li>
          <li>
            Rien n’oblige à le faire tout de suite au niveau 200. <M s="T" />
          </li>
          <li>
            À partir du Prestige 1, un sort en double <strong>renforce le sort</strong> au lieu d’être converti en kamas.{' '}
            <M s="T" />
          </li>
        </ul>
        <GameCapture id="prestige" caption="Bloc Prestige de la fiche perso (P7) : bonus cumulés, objets éternels et conditions du P8" />
      </Section>

      <Section id="conditions" title="Les étapes P1 → P20">
        <ol className="timeline">
          {MILESTONES.map((m) => (
            <li key={m.head} className={m.key ? 'is-key' : undefined}>
              <span className="tl-head">{m.head}</span>
              {m.tag ? <span className="tl-tag">{m.tag}</span> : null}
              <p>{m.text}</p>
            </li>
          ))}
        </ol>
        <p>
          Conditions et plafonds de PA <M s="T" /> ; bonus de combat (+1 PA, +2 PO…) <M s="T" /> attribués aux numéros de Prestige
          dans l’ordre du tableau du code <M s="D" />.
        </p>
        <Tip title="Conditions du P8 — relevé du 21 oct 2026">
          <p>
            Bloc Prestige (Personnage et inventaire &gt; Caractéristiques et classe) : « Pour passer Prestige 8 : »{' '}
            <strong>Niveau 200</strong> + <strong>« Étage 60 de l’Ascension terminé »</strong>. Aucune condition de dégâts sur le
            Kralamoure n’est affichée pour le P8. <M s="T" />
          </p>
          <p>
            La page Ascension indique : « Objectif : terminer l’étage 60 pour pouvoir passer Prestige 8 (obligatoire à partir du
            Prestige 3) ». <M s="T" />
          </p>
        </Tip>
        <Contra title="Seuils Kralamoure P5 / P6 : supprimés le 18/10">
          <p>
            Ce wiki indiquait 500 000 (P5) et 1 000 000 (P6) dégâts cumulés sur le Kralamoure, d’après des relevés antérieurs. Le patch du
            18/10 dit : « Les Prestiges 5 et 6 n’ont plus de condition de dégâts à la Faille ». <Disc d="18/10" /> Le relevé en jeu du
            21/10 n’affiche d’ailleurs aucune condition Kralamoure pour le P8.
          </p>
        </Contra>
        <Tip>
          <p>
            Les étages d’Ascension atteints sont <strong>conservés</strong> après un Prestige. Chaque étage coûte 2 d’énergie.{' '}
            <M s="T" />
          </p>
        </Tip>
        <More title="Tableau complet P1 → P20">
          <TableWrap caption="Conditions, bonus de combat et plafond de PA par Prestige">
            <thead>
              <tr>
                <th className="num">Prestige</th>
                <th>Condition</th>
                <th>Bonus</th>
                <th className="num">PA max</th>
              </tr>
            </thead>
            <tbody>
              {ROWS.map((r) => (
                <tr key={r.p}>
                  <td className="num">P{r.p}</td>
                  <td>{r.cond}</td>
                  <td>{r.bonus}</td>
                  <td className="num">{r.pa}</td>
                </tr>
              ))}
            </tbody>
          </TableWrap>
          <ul>
            <li>
              <code>PRESTIGE.combat</code> : +1 PA, +2 PO, +2 PM, +1 PA, +3 PO, +3 PM, +1 PA (Prestiges 1 à 7). <M s="T" />
            </li>
            <li>
              <code>PRESTIGE.gearPct: 25</code> ; <code>seasonMax: 10</code>. PA, PM, PO et Invocations des objets ne sont pas
              multipliés. Plafond de PA hors Abysses. <M s="T" />
            </li>
          </ul>
        </More>
      </Section>

      <Section id="officiel" title="Ce qu’a annoncé le développeur">
        <Officiel title="Le Prestige ne dépend plus que de l’Ascension" d="08/10">
          <p>
            « Plus aucune condition d’Abysses pour passer Prestige : seule l’Ascension compte (Prestige 7 : étage 40, 8 : 60, 9 : 80). »
            Le Prestige 10 demande l’étage 110 et donne un badge aux ailes rouges. Le Prestige garde l’objet choisi en Rayonnant.
          </p>
        </Officiel>
        <ul>
          <li><strong>P7 : étage 40 · P8 : étage 60 · P9 : étage 80 · P10 : étage 110</strong>. <Disc d="08/10" /></li>
          <li><strong>P15 et plus</strong> : conditions liées aux Abysses (records d’étages), comme dans la FAQ du jeu. <M s="T" /></li>
          <li><strong>P5 et P6</strong> : plus de condition de dégâts à la Faille du Kralamoure. <Disc d="18/10" /></li>
          <li>Plafond de <strong>PA : 12, puis 13 (P2), 14 (P5), 15 (P8)</strong>, comme le tableau ci-dessus.</li>
          <li>Le Colisée est retiré des prérequis du Prestige tant qu’il est en travaux. <Disc d="14/10" /></li>
          <li>Un objet runé peut être gardé au Prestige : il devient éternel avec ses runes. Les autres objets runés disparaissent, mais leurs runes reviennent dans le stock. <Disc d="14/10" /> <Disc d="12/10" /></li>
          <li>Les 9 objets légendaires (1 sur 1 000 000) sont conservés au Prestige. <Disc d="14/10 → 16/10" /></li>
          <li>Badges : pour les Prestiges 11 et plus, le chiffre est au centre de l’ornement. Les succès couvrent les Prestiges 11 à 15. <Disc d="12/10" /> <Disc d="10/10" /></li>
          <li><strong>Prestige de classe</strong> : il existe d’après le relevé du Discord du 21/10, mais ses règles n’ont pas été recopiées ici. <M s="N" /></li>
        </ul>
        <More title="En saison (Saison Héroïque, 09/10)">
          <p>
            Chaque palier de Prestige donne un objet Rayonnant au tier max, <strong>une seule fois par compte et par palier</strong> : on est
            récompensé quand on dépasse son record, pas quand on le refait. <Disc d="09/10" />
          </p>
        </More>
      </Section>

      <Section id="pertes" title="Ce qu’on perd, ce qu’on garde">
        <div className="cards">
          <div className="card">
            <h3>
              <span className="state-ico state-lost" aria-hidden="true">
                <Icon name="close" size={18} strokeWidth={2.2} />
              </span>
              Toujours perdu
            </h3>
            <ul>
              <li>Niveau</li>
              <li>Points de caractéristiques répartis</li>
              <li>Étape de l’Aventure</li>
            </ul>
          </div>
          <div className="card">
            <h3>
              <span className="state-ico state-kept" aria-hidden="true">
                <Icon name="check" size={18} strokeWidth={2.2} />
              </span>
              Toujours gardé
            </h3>
            <ul>
              <li>Cartes et decks, album / collection</li>
              <li>Coffres non ouverts, énergie, Elo</li>
              <li>Records et étage d’Ascension</li>
              <li>Parchemins, Bouclier de forge, Compagnon</li>
            </ul>
          </div>
        </div>
        <Warn title="Avant le Prestige 4">
          <p>
            Vous perdez <strong>équipement, inventaire, ventes en cours à l’HDV et kamas</strong> — sauf l’objet choisi et les
            objets éternels. <M s="T" />
          </p>
          <p>
            Un coffre ouvert juste avant donne un objet perdu avec l’inventaire ; les coffres <strong>non ouverts</strong> sont
            gardés. <M s="T" />
          </p>
        </Warn>
        <More title="Détail de ce qui est gardé">
          <ul>
            <li>
              Cartes de sort et decks, album/collection, coffres (non ouverts), énergie, Elo, records (Abysses, Ascension), étage
              d’Ascension. <M s="T" />
            </li>
            <li>
              Parchemins de caractéristique (d’arène ou en objet), niveau et XP du Bouclier de forge. <M s="T" />
            </li>
            <li>
              Niveau et croquettes du Compagnon. <M s="T" />
            </li>
            <li>
              À partir du Prestige 4, l’équipement revient dans l’inventaire et les kamas sont conservés. <M s="T" />
            </li>
          </ul>
        </More>
      </Section>

      <Section id="objet-eternel" title="L’objet éternel">
        <ul>
          <li>
            À chaque Prestige, vous choisissez un objet (porté ou en inventaire) : il devient <strong>éternel</strong>. <M s="T" />
          </li>
          <li>
            Lié à vie, invendable, il revient à chaque Prestige et passe <strong>au moins Rayonnant</strong>. <M s="T" />
          </li>
        </ul>
        <Tip>
          <p>
            Choisissez un objet durable : un Dofus, une pièce forte du build… (FAQ). Un objet en vente à l’HDV peut aussi être
            gardé avant le Prestige 4. <M s="T" />
          </p>
        </Tip>
        <More title="En saison">
          <p>
            L’objet éternel n’est donné que si le Prestige dépasse le record déjà récompensé sur le compte ; si le perso de
            saison meurt, les objets éternels sont mis à l’abri dans la Banque. <M s="T" /> Voir{' '}
            <Link href="/contenus/saison/#banque">Saison</Link>.
          </p>
        </More>
      </Section>

      <PageEnd
        current="/personnage/prestige/"
        see={[
          { href: '/personnage/caracteristiques/', label: 'Caractéristiques' },
          { href: '/contenus/saison/', label: 'Saison' },
          { href: '/economie/#fusion', label: 'Fusion et Rayonnant' },
          { href: '/personnage/classes/cra/', label: 'Guide Crâ' },
        ]}
        sources="txt_faq.txt, txt_saison.txt, mecaniques.md §5, rea_classement.md §5 ; Discord officiel, annonces des 08/10, 09/10, 12/10, 14/10 et 18/10"
      />
    </>
  );
}
