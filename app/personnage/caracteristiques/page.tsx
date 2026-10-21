import GameCapture from '@/components/GameCapture';
import Link from 'next/link';
import type { Metadata } from 'next';
import { SectionIcon } from '@/components/icons';
import { El, Essentiel, Fiche, M, Meter, More, PageEnd, PageHeader, Section, TableWrap, Tip, Contra, Disc, Officiel } from '@/components/ui';

export const metadata: Metadata = {
  title: 'Caractéristiques',
  description: 'Caractéristiques dans RpgMasters : 5 points par niveau, éléments, parchemins (+300 max), constantes de combat, deck et objets.',
};

const COMBAT_STATS: [string, string, string][] = [
  ['basePm', '3', 'PM de base utilisés dans le calcul d’esquive'],
  ['dodgePerPm', '1', 'Esquive par PM'],
  ['dodgeMax', '50', 'Plafond d’esquive'],
  ['spectralPerPo', '0.4', 'Vision spectrale par point de PO (voir Crâ)'],
  ['perforationPerPoint', '0.05', '—'],
  ['perforationMax', '25', '—'],
  ['erosionPerPoint', '0.05', '—'],
  ['erosionMax', '25', '—'],
  ['penetrationPerPoint', '0.8', '—'],
  ['penetrationMax', '50', '—'],
  ['dmgReductionMax', '50', '—'],
];

export default function CaracteristiquesPage() {
  return (
    <>
      <PageHeader href="/personnage/caracteristiques/" section="stats" title="Caractéristiques" intro="Où mettre vos points, les parchemins, le deck et ce qui compte sur les objets." />

      <Essentiel>
        <li>
          <strong>5 points par niveau</strong>, niveau max <strong>200</strong>. <M s="T" />
        </li>
        <li>
          Mettez vos points dans la <strong>stat de l’élément de vos sorts de dégâts</strong> (conseil de la FAQ). <M s="T" />
        </li>
        <li>
          <strong>Parchemins d’arène</strong> : +1 par victoire, jusqu’à <strong>+300 par stat</strong>, gardés au Prestige.{' '}
          <M s="T" />
        </li>
        <li>
          Au Prestige, les <strong>points répartis</strong> sont remis à zéro ; les <strong>parchemins restent</strong>.{' '}
          <M s="T" />
        </li>
      </Essentiel>

      <GameCapture id="feca-caracteristiques" caption="Caractéristiques d’un Féca niveau 200" />

      <Fiche
        title="Fiche caractéristiques"
        icon={<SectionIcon section="stats" size={20} />}
        rows={[
          ['Points par niveau', '5'],
          ['Niveau max', '200'],
          ['Parchemins', '+300 max par stat'],
          ['Résistance max', '50 %'],
          ['Esquive max', '50 %'],
          ['PA max', '12 → 15 (Prestige)'],
          ['Deck', '10 cartes (+1 par Prestige)'],
          ['Decks préparables', '8'],
        ]}
      />

      <Section id="points" title="Les 6 caractéristiques">
        <p>
          Vitalité, Sagesse, Force, Intelligence, Chance, Agilité (page Personnage). <M s="T" />
        </p>
        <p>Les 4 stats de dégâts correspondent chacune à un élément :</p>
        <ul className="chips" aria-label="Correspondance caractéristique → élément">
          <li>
            <El kind="terre">Force = Terre</El>
          </li>
          <li>
            <El kind="feu">Intelligence = Feu</El>
          </li>
          <li>
            <El kind="eau">Chance = Eau</El>
          </li>
          <li>
            <El kind="air">Agilité = Air</El>
          </li>
        </ul>
        <p>
          Correspondance déduite de couleurs identiques dans le code (très probable). <M s="D" />
        </p>
        <More title="Détail : éléments et couleurs">
          <ul>
            <li>
              Éléments (index) : 0 Neutre, 1 Terre, 2 Feu, 3 Eau, 4 Air. <M s="T" />
            </li>
            <li>
              Force et Terre #b98a4a, Intelligence #d9665f = Feu, Chance #5f8fd6 = Eau, Agilité #5fb07a = Air. <M s="D" />
            </li>
          </ul>
        </More>
      </Section>

      <Section id="parchemins" title="Parchemins">
        <Meter
          max={300}
          label="Parchemins d’arène : +1 par victoire, jusqu’à +300 par caractéristique."
          segments={[{ value: 300, kind: 'a', legend: <>+1 par victoire d’arène, plafond +300 par stat <M s="T" /></> }]}
          ticks={[
            { at: 0, label: '0' },
            { at: 300, label: '+300' },
          ]}
        />
        <ul>
          <li>
            <strong>D’arène</strong> : +1 à une stat au hasard (Force, Intelligence, Chance ou Agilité) par victoire. Définitifs,
            gardés après Prestige. <M s="T" />
          </li>
          <li>
            <strong>En objet</strong> : valeur 10, plafond 300, pour les 6 stats (dont Vitalité et Sagesse), rareté 4.{' '}
            <M s="T" />
          </li>
        </ul>
        <Tip>
          <p>
            Les 10 tickets d’arène gratuits par jour ne se cumulent pas : jouez-les pour gagner des parchemins.{' '}
            <Link href="/contenus/arene/">Arène</Link>
          </p>
        </Tip>
        <More title="Noms dans le code">
          <p>
            <code>ARENA_SCROLL cap: 300</code> ; <code>STAT_SCROLL</code> (value 10, cap 300). <M s="T" />
          </p>
        </More>
      </Section>

      <Section id="combat" title="Plafonds de combat">
        <ul>
          <li>
            <strong>Esquive</strong> = 3 + PM, en %, plafonnée à <strong>50 %</strong>. <M s="T" /> « Esquive de quoi » : non
            précisé. <M s="D" />
          </li>
          <li>
            <strong>Résistance</strong> d’un joueur plafonnée à <strong>50 %</strong>. <M s="T" />
          </li>
          <li>
            <strong>PA total</strong> plafonné : 12 de base, 13 dès le Prestige 2, 14 dès P5, 15 dès P8 (hors Abysses).{' '}
            <M s="T" />
          </li>
          <li>
            <strong>Vision spectrale</strong> : +0,4 % de double dégâts par PO (voir <Link href="/personnage/classes/cra/">Crâ</Link>).{' '}
            <M s="D" />
          </li>
        </ul>
        <Officiel title="Soins et boucliers : 40 % des PV max, 2 sorts par tour" d="16/10">
          <ul>
            <li>14/10 : mêmes limites partout (25 % des PV max, 2 sorts par tour), Ascension, Dimension Écarlate et Colisée compris. <Disc d="14/10" /></li>
            <li>14 → 16/10 : plafond des <strong>boucliers</strong> 25 % → <strong>40 %</strong> des PV max ; soins restés à 25 %. <Disc d="14/10 → 16/10" /></li>
            <li>16/10 : plafond des <strong>soins</strong> 25 % → <strong>40 %</strong>. Toujours <strong>2 sorts de soin ou de bouclier par tour</strong> ; l’Eniripsa et le Sacrieur en gardent 3. <Disc d="16/10" /></li>
          </ul>
        </Officiel>
        <Contra title="Code client : 25 %">
          <p>La constante <code>SUSTAIN</code> du code client relevé plus tôt vaut <code>maxPctHp: 25, perTurn: 2</code>, avec 1 sort de plus pour deux classes : c’était la règle du 14/10. Le plafond de 40 % du bouclier a été constaté en jeu au Kralamoure.</p>
        </Contra>
        <Officiel title="Bonus de combat du 12/10 (hors Abysses)" d="12/10">
          <ul>
            <li><strong>Initiative</strong> : seule la ligne « Initiative » de l’équipement compte (Prestige, forge et compagnon compris). En arène, le plus rapide joue en premier ; ailleurs, jusqu’à 25 % de chances que les ennemis passent leur premier tour.</li>
            <li><strong>Sorts à une ligne</strong> : tant qu’aucun sort à plusieurs lignes de dégâts n’est lancé, +50 % de dégâts, puis +20 % par tour, jusqu’à +150 %. Les lignes de boost (Précipitation…) ne cassent pas le bonus (précision du 12/10, 10:44).</li>
            <li><strong>Grands decks</strong> : chaque carte au-delà de 7 donne +5 % de dégâts aux sorts, jusqu’à +25 %.</li>
            <li><strong>Esquive PA/PM</strong> : 0,02 % de chances par point de gagner +1 PM ; <strong>Retrait PA/PM</strong> : 0,02 % par point de gagner +1 PA (au-delà du plafond) ou +1 pioche.</li>
          </ul>
        </Officiel>
        <More title="Constantes de combat du code (11)">
          <p>
            Constantes <code>COMBAT_STATS</code> du code client. Leur sens exact n’est pas documenté ; « Lecture » ne fait que
            reprendre le nom. <M s="T" />
          </p>
          <TableWrap caption="COMBAT_STATS">
            <thead>
              <tr>
                <th>Constante</th>
                <th className="num">Valeur</th>
                <th>Lecture</th>
              </tr>
            </thead>
            <tbody>
              {COMBAT_STATS.map(([k, v, d]) => (
                <tr key={k}>
                  <td>
                    <code>{k}</code>
                  </td>
                  <td className="num">{v}</td>
                  <td>{d}</td>
                </tr>
              ))}
            </tbody>
          </TableWrap>
          <ul>
            <li>
              <code>dodgeChance = min(50, max(0, 3 + PM) × 1)</code>. <M s="T" />
            </li>
            <li>
              <code>RES_PCT_CAP_PLAYER: 50</code>. <M s="T" />
            </li>
            <li>
              <code>SUSTAIN {'{maxPctHp: 25, perTurn: 2, extraBreeds: [11, 7], extra: 1}'}</code> : sens non documenté{' '}
              <M s="T" />, probablement un plafond de soin / vol de vie. <M s="D" />
            </li>
          </ul>
        </More>
        <More title="Ordre des stats d’objets">
          <p>
            PA, PM, PO, invocations, PV, vitalité, sagesse, force, intelligence, chance, agilité, puissance, critique, dommages
            (+ par élément, critiques, poussée), soins, prospection, initiative, résistances (% et fixes), tacle, fuite,
            retrait/esquive PA/PM, renvoi, % dommages sorts/armes, pénétration, réduction de dégâts, pods (
            <code>STAT_ORDER</code>). <M s="T" />
          </p>
        </More>
      </Section>

      <Section id="deck" title="Cartes et deck">
        <ul>
          <li>
            <strong>10 sorts</strong> au départ, <strong>+1 par Prestige</strong>, <strong>7 minimum</strong> pour combattre,{' '}
            <strong>8 decks</strong> préparables (FAQ du 20 oct 2026). <M s="T" />
          </li>
          <li>
            <strong>Doublons</strong> : avant le Prestige 1, convertis en <strong>3 000 kamas</strong> ; ensuite, ils
            renforcent le sort. <M s="T" />
          </li>
          <li>
            Soit +3 % par tranche de 3 doublons, jusqu’à 50 paliers (= +150 %). <M s="D" />
          </li>
          <li>
            Chance d’obtenir une carte par coffre : <strong>20 %</strong>. <M s="T" />
          </li>
        </ul>
        <More title="Détails du code (doublons, pioches, effets)">
          <ul>
            <li>
              <code>DECK_SIZE 10</code>, <code>DECK_PER_PRESTIGE 1</code> ; <code>GEAR_PRESETS count 6</code> pour les
              équipements ; la FAQ du 20 oct 2026 annonce 8 decks. <M s="T" />
            </li>
            <li>
              Pioches supplémentaires : 4 au maximum (<code>EXTRA_DRAW_MAX</code>). <M s="T" />
            </li>
            <li>
              <code>SPELL_STACK {'{fromPrestige: 1, perStack: 3, pct: 3, maxStacks: 50}'}</code>,{' '}
              <code>spellStacks(n) = min(50, floor(n/3))</code>, <code>DUPLICATE_CARD_KAMAS</code> 3 000. <M s="T" />
            </li>
            <li>
              Les cartes ont une rareté (Commun… Légendaire) ; <code>CHEST.cardChance</code>. <M s="T" />
            </li>
            <li>
              Types d’effets : dégâts, vol, soin, bouclier, buff/debuff, invocation, bombe, piège, étourdissement, pioche,
              poison, renforcement, retour arrière, gain/retrait de PA… <M s="T" />
            </li>
          </ul>
        </More>
      </Section>

      <Section id="objets" title="Objets : ce qui multiplie vos stats">
        <ul>
          <li>
            <strong>Fusion</strong> : 3 exemplaires identiques → de +10 % (T2) à +45 % (Rayonnant +5).{' '}
            <Link href="/economie/#fusion">Détail</Link> <M s="T" />
          </li>
          <li>
            <strong>Prestige</strong> : +25 % sur tout l’équipement porté, par Prestige, cumulable. <M s="T" />
          </li>
          <li>
            <strong>Bouclier de forge</strong> jusqu’à +300 %, <strong>Compagnon</strong> jusqu’à +79,8 %,{' '}
            <strong>Discord</strong> +5 %. <M s="T" />
          </li>
          <li>
            <strong>Panoplies</strong> : dès 2 pièces différentes portées, bonus croissant. <M s="T" />
          </li>
        </ul>
        <Tip title="À savoir">
          <p>
            PA, PM, PO et Invocations des objets ne sont <strong>pas multipliés</strong> par la fusion ni par le Prestige.{' '}
            <M s="T" />
          </p>
        </Tip>
        <More title="Raretés et Dofus">
          <ul>
            <li>
              Raretés : Commun, Peu commun, Rare, Épique, Mythique, Légendaire (poids de tirage :{' '}
              <Link href="/economie/#raretes">Économie</Link>). <M s="T" />
            </li>
            <li>
              Dofus : fusion max 4 (<code>dofusMax: 4</code>), Dofus Rayonnant = +100 % (<code>dofusRadiantPct: 100</code>), PA
              compris (<code>radiantPa: 2</code>). Chance de drop ≤ 2 %, tous bonus compris. <M s="T" />
            </li>
            <li>
              <code>FUSION.bonusPct</code>, <code>PRESTIGE.gearPct: 25</code>, <code>excluded</code> (PA, PM, PO, Invocations).{' '}
              <M s="T" />
            </li>
          </ul>
        </More>
      </Section>

      <Section id="lacunes" title="Ce qu’on ne sait pas">
        <More title="Lacunes des sources (4)">
          <ul>
            <li>
              Aucune formule Force / Intelligence / Chance / Agilité → dégâts, Vitalité → PV, ni effet de la Sagesse, de
              l’Initiative, de la Puissance ou du Critique : le combat semble calculé côté serveur. <M s="N" />
            </li>
            <li>
              Les cartes parlent de « Puissance » et de « critique », mais sans coefficient. <M s="N" />
            </li>
            <li>
              Plafond d’une caractéristique de base (hors parchemins). <M s="N" />
            </li>
            <li>
              Stats des objets et bonus de panoplies : désormais relevés en jeu (15 oct 2026), voir{' '}
              <a href="/equipement/objets/">Objets end-game</a>. <M s="T" />
            </li>
          </ul>
        </More>
      </Section>

      <PageEnd
        current="/personnage/caracteristiques/"
        see={[
          { href: '/contenus/arene/', label: 'Arène (parchemins)' },
          { href: '/personnage/prestige/', label: 'Prestige' },
          { href: '/economie/#fusion', label: 'Fusion' },
          { href: '/personnage/classes/cra/', label: 'Crâ' },
        ]}
        sources="mecaniques.md §1, §3, §4, §9, rea_classement.md §4, txt_faq.txt"
      />
    </>
  );
}
