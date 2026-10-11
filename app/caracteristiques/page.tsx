import Link from 'next/link';
import type { Metadata } from 'next';
import { Fact, Facts, PageHeader, Section, Src, TableWrap } from '@/components/ui';

export const metadata: Metadata = {
  title: 'Caractéristiques',
  description: 'Caractéristiques, constantes de combat, deck, doublons, raretés et fusion d’objets dans RpgMasters, avec les lacunes connues.',
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
      <PageHeader
        title="Caractéristiques et constantes de combat"
        lead="Ce que le code client public expose sur les stats, le deck et les objets — et ce qu’il ne dit pas."
      />

      <Section id="points" title="Points et caractéristiques">
        <Facts>
          <Fact s="T">
            <strong>5 points</strong> de caractéristique par niveau (<code>POINTS_PER_LEVEL: 5</code>) ; niveau maximum{' '}
            <strong>200</strong> (<code>MAX_LEVEL: 200</code>).
          </Fact>
          <Fact s="T">
            Six caractéristiques à répartir : Vitalité, Sagesse, Force, Intelligence, Chance, Agilité (page Personnage).
          </Fact>
          <Fact s="T">
            Conseil de la FAQ : choisir la caractéristique de l’élément de ses sorts de dégâts.
          </Fact>
          <Fact s="T">Éléments (index) : 0 Neutre, 1 Terre, 2 Feu, 3 Eau, 4 Air.</Fact>
          <Fact s="D">
            Force = Terre, Intelligence = Feu, Chance = Eau, Agilité = Air (déduit de couleurs identiques dans le code : Force
            et Terre #b98a4a, Intelligence #d9665f = Feu, Chance #5f8fd6 = Eau, Agilité #5fb07a = Air ; très probable).
          </Fact>
          <Fact s="T">Au Prestige, les points répartis sont remis à zéro ; les parchemins restent.</Fact>
        </Facts>
        <Src>mecaniques.md §1, txt_faq.txt</Src>
      </Section>

      <Section id="parchemins" title="Parchemins">
        <Facts>
          <Fact s="T">
            Parchemins d’arène : <strong>+1</strong> à une caractéristique au hasard (Force, Intelligence, Chance ou Agilité)
            par victoire d’arène, jusqu’à <strong>+300</strong> par caractéristique (<code>ARENA_SCROLL cap: 300</code>).
            Définitifs, conservés après Prestige.
          </Fact>
          <Fact s="T">
            Parchemins en objet (<code>STAT_SCROLL</code>) : valeur 10, plafond 300, pour les 6 caractéristiques (dont Vitalité
            et Sagesse), rareté 4.
          </Fact>
        </Facts>
        <Src>mecaniques.md §1</Src>
      </Section>

      <Section id="combat" title="Constantes de combat">
        <p>
          Constantes <code>COMBAT_STATS</code> trouvées dans le code client. Leur sens exact n’est pas documenté ; la colonne
          « Lecture » ne fait que reprendre le nom.
        </p>
        <TableWrap caption="COMBAT_STATS [TROUVÉ, sens exact non documenté]">
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
        <Facts>
          <Fact s="T">
            Fonction d’esquive : <code>dodgeChance = min(50, max(0, 3 + PM) × 1)</code> → esquive en %, liée aux PM, plafond
            50 %.
          </Fact>
          <Fact s="D">« Esquive de quoi » exactement : non précisé, c’est une interprétation.</Fact>
          <Fact s="D">
            <code>spectralPerPo: 0.4</code> = +0,4 % de chance de vision spectrale (double dégâts) par point de PO (lien avec
            le passif du Crâ).
          </Fact>
          <Fact s="T">
            Résistance en % d’un joueur plafonnée à <strong>50</strong> (<code>RES_PCT_CAP_PLAYER: 50</code>).
          </Fact>
          <Fact s="T">
            PA total plafonné : <strong>12</strong> de base, 13 dès le Prestige 2, 14 dès P5, 15 dès P8 (hors Abysses).
          </Fact>
          <Fact s="T">
            <code>SUSTAIN {'{maxPctHp: 25, perTurn: 2, extraBreeds: [11, 7], extra: 1}'}</code> : sens non documenté.
          </Fact>
          <Fact s="D">Probablement un plafond de soin / vol de vie.</Fact>
        </Facts>
        <Src>mecaniques.md §1, rea_classement.md §4</Src>
      </Section>

      <Section id="stats-objets" title="Stats d’objets">
        <Facts>
          <Fact s="T">
            Ordre des stats d’objets (<code>STAT_ORDER</code>) : PA, PM, PO, invocations, PV, vitalité, sagesse, force,
            intelligence, chance, agilité, puissance, critique, dommages (+ par élément, critiques, poussée), soins,
            prospection, initiative, résistances (% et fixes), tacle, fuite, retrait/esquive PA/PM, renvoi, % dommages
            sorts/armes, pénétration, réduction de dégâts, pods.
          </Fact>
        </Facts>
      </Section>

      <Section id="deck" title="Cartes, sorts et deck">
        <Facts>
          <Fact s="T">
            Deck : <strong>10 sorts</strong> au départ, <strong>+1 par Prestige</strong> (<code>DECK_SIZE 10</code>,{' '}
            <code>DECK_PER_PRESTIGE 1</code>), <strong>minimum 7</strong> pour combattre, <strong>6 decks</strong>{' '}
            préparables (FAQ ; <code>GEAR_PRESETS count 6</code> pour les équipements).
          </Fact>
          <Fact s="T">
            Pioches supplémentaires : 4 au maximum (<code>EXTRA_DRAW_MAX</code>).
          </Fact>
          <Fact s="T">
            Doublons : à partir du Prestige 1, un doublon renforce le sort (
            <code>SPELL_STACK {'{fromPrestige: 1, perStack: 3, pct: 3, maxStacks: 50}'}</code>,{' '}
            <code>spellStacks(n) = min(50, floor(n/3))</code>). Avant P1 : converti en <strong>3 000 kamas</strong> (
            <code>DUPLICATE_CARD_KAMAS</code>).
          </Fact>
          <Fact s="D">
            Soit +3 % par tranche de 3 doublons, jusqu’à 50 paliers (= +150 %).
          </Fact>
          <Fact s="T">
            Les cartes ont une rareté (Commun… Légendaire) ; chance d’obtenir une carte par coffre : 20 % (
            <code>CHEST.cardChance</code>).
          </Fact>
          <Fact s="T">
            Types d’effets existants : dégâts, vol, soin, bouclier, buff/debuff, invocation, bombe, piège, étourdissement,
            pioche, poison, renforcement, retour arrière, gain/retrait de PA…
          </Fact>
        </Facts>
        <Src>mecaniques.md §3</Src>
      </Section>

      <Section id="objets" title="Objets : raretés, fusion, multiplicateurs">
        <Facts>
          <Fact s="T">
            Raretés : Commun, Peu commun, Rare, Épique, Mythique, Légendaire (poids de tirage :{' '}
            <Link href="/economie/#raretes">Économie</Link>).
          </Fact>
          <Fact s="T">
            Fusion : 3 exemplaires du même objet au même tiers. Bonus de stats (<code>FUSION.bonusPct</code>) de +10 % (T2) à
            +45 % (Rayonnant +5) — détail dans <Link href="/economie/#fusion">Économie</Link>.
          </Fact>
          <Fact s="T">
            PA, PM, PO et Invocations ne sont <strong>pas multipliés</strong> par la fusion ni par le Prestige (
            <code>excluded</code>).
          </Fact>
          <Fact s="T">
            Dofus : fusion max 4 (<code>dofusMax: 4</code>), Dofus Rayonnant = +100 % (<code>dofusRadiantPct: 100</code>), PA
            compris (<code>radiantPa: 2</code>). Chance de drop d’un Dofus ≤ 2 %, tous bonus compris.
          </Fact>
          <Fact s="T">
            Prestige : <strong>+25 %</strong> de stats sur tout l’équipement porté, par Prestige, cumulable (
            <code>PRESTIGE.gearPct: 25</code>).
          </Fact>
          <Fact s="T">
            Panoplies : au moins 2 pièces différentes portées → bonus croissant avec le nombre de pièces.
          </Fact>
          <Fact s="T">
            Autres multiplicateurs : Bouclier de forge (jusqu’à +300 % au niveau 400), Compagnon (+0,2 %/niveau, jusqu’à
            +79,8 %), Discord (+5 % stats). Voir <Link href="/economie/">Économie</Link>.
          </Fact>
        </Facts>
        <Src>mecaniques.md §4</Src>
      </Section>

      <Section id="lacunes" title="Lacunes">
        <Facts>
          <Fact s="N">
            Aucune formule Force / Intelligence / Chance / Agilité → dégâts, Vitalité → PV, ni effet de la Sagesse, de
            l’Initiative, de la Puissance ou du Critique : le calcul de combat semble fait côté serveur.
          </Fact>
          <Fact s="N">Les cartes parlent de « Puissance » et de « critique », mais aucun coefficient n’est donné.</Fact>
          <Fact s="N">Plafond d’une caractéristique de base (hors parchemins).</Fact>
          <Fact s="N">Valeurs des bonus de panoplies (visibles uniquement page Personnage, connexion requise).</Fact>
          <Fact s="N">Stats de la table d’objets.</Fact>
        </Facts>
        <Src>mecaniques.md §1 et §9</Src>
      </Section>
    </>
  );
}
