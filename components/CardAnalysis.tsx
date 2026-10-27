import Link from 'next/link';
import cardsJson from '@/data/cards.json';
import { ADDED_SINCE_15_OCT, SPECIAL_CARD, analyzeCards, type Card } from '@/lib/card-stats';
import { Bars, Constat, Fiche, Info, KeyFigures, M, More, Section, TableWrap, Tip, Warn } from '@/components/ui';

const cards = cardsJson as Card[];
const byName = new Map(cards.map((card) => [card.name, card]));
const stats = analyzeCards(cards);

function requireCard(name: string): Card {
  const card = byName.get(name);
  if (!card) throw new Error(`Carte absente du relevé du 26/10/2026 : ${name}`);
  return card;
}

function effectSentence(effect: string) {
  return /[.!?]$/.test(effect) ? effect : `${effect}.`;
}

function spellText(card: Card) {
  const element = card.element ? card.element.replaceAll(';', ', ') : 'sans élément';
  const stack = card.stack_bonus_pct.trim()
    ? ` Valeurs avec stacks du compte relevé (+${card.stack_bonus_pct} %).`
    : '';
  return `${card.rarity}, ${card.pa_cost} PA, ${element}. ${effectSentence(card.effect)}${stack}`;
}

function SpellList({ names }: { names: readonly string[] }) {
  return (
    <ul>
      {names.map((name) => {
        const card = requireCard(name);
        return (
          <li key={name}>
            <strong>{card.name}</strong>: {spellText(card)}
          </li>
        );
      })}
    </ul>
  );
}

const maxOf = (items: { value: number }[]) => Math.max(...items.map((item) => item.value), 1);

export function CardAnalysis() {
  if (cards.length !== 253) {
    throw new Error(`Catalogue : ${cards.length} cartes, 253 attendues au relevé du 26/10/2026.`);
  }
  for (const name of ADDED_SINCE_15_OCT) requireCard(name);
  const special = requireCard(SPECIAL_CARD);
  const stacked = stats.stacked;
  const plain = stats.total - stacked;

  return (
    <>
      <Constat title="Collection complète" d="26/10/2026">
        <ul>
          <li>« Ma collection » → Sorts : <strong>252 / 252</strong> obtenues. Le filtre Manquants est vide.</li>
          <li>/deck indique <strong>253</strong> possédées. Les 6 cartes Classe et Incarné, toujours possédées, sont dans ce total.</li>
          <li>
            L’écart avec les 252 est <strong>{special.name}</strong> ({special.rarity}, {special.pa_cost} PA) : elle est sur /deck et hors de la liste standard.
          </li>
        </ul>
      </Constat>

      <KeyFigures
        items={[
          { icon: 'sorts', value: String(stats.total), label: 'Cartes au catalogue', note: 'Export du 26/10/2026' },
          { icon: 'record', value: '252 / 252', label: 'Ma collection', note: '0 manquante' },
          { icon: 'pa', value: String(stacked), label: 'Avec stacks', note: 'Valeurs du compte relevé' },
          { icon: 'tours', value: String(stats.inDeck.length), label: 'Dans un deck', note: 'Coche du relevé' },
        ]}
      />

      <Fiche
        title="Lecture du relevé"
        rows={[
          ['Date', '26/10/2026 (Europe/Paris)'],
          ['Source', 'Export /deck, recoupé avec « Ma collection »'],
          ['Liste standard', '252 / 252, 0 sort non découvert'],
          ['Hors liste', special.name],
          ['Effets avec stacks', `${stacked} cartes`],
          ['Sans pourcentage de stack', `${plain} cartes`],
          ['Ancien fichier wiki', '241 cartes le 15/10/2026, 12 noms en plus, aucun nom retiré'],
        ]}
      />

      <Warn title="Valeurs avec stacks du compte relevé">
        <p>
          Sur {stacked} cartes, le fichier indique un bonus de doublons. Les fourchettes recopiées sont celles des tooltips de /deck pour ce compte.
          « Ma collection » affiche les valeurs de base : elles ne figurent pas dans cet export, et le wiki ne les reconstitue pas.
        </p>
        <p>
          {plain} cartes n’ont pas de pourcentage de stack dans le fichier. Le wiki recopie leur texte tel quel, sans les présenter comme une valeur de base séparée.
        </p>
      </Warn>

      <Section id="repartition" title="Répartition">
        <p>
          Les {stats.total} lignes du fichier, regroupées par rareté, par élément nommé et par coût en PA. Une carte à plusieurs éléments compte une fois, dans « Plusieurs éléments ». <M s="C" />
        </p>
        <Bars
          label="Cartes par rareté"
          caption="Rareté affichée dans l’export, avec la casse du wiki (Commun, Rare, Épique…)."
          max={maxOf(stats.byRarity)}
          items={stats.byRarity.map((item) => ({ name: item.name, value: item.value, display: String(item.value), hl: item.name === 'Commun' }))}
        />
        <Bars
          label="Cartes par élément"
          caption="L’élément est celui de la colonne du relevé. « Sans élément nommé » regroupe boucliers, soins en % de PV, gains de PA et le sort spécial."
          max={maxOf(stats.byElement)}
          items={stats.byElement.map((item) => ({ name: item.name, value: item.value, display: String(item.value) }))}
        />
        <Bars
          label="Cartes par coût en PA"
          caption="Coût indiqué sur la carte. Le seul sort à 6 PA est Maîtrise des Popokémons."
          max={maxOf(stats.byPa)}
          items={stats.byPa.map((item) => ({ name: item.name, value: item.value, display: String(item.value), hl: item.name === '3 PA' }))}
        />
      </Section>

      <Section id="roles" title="Rôles dérivés des effets">
        <p>
          Une carte entre dans chaque rôle qui correspond à au moins une ligne de son texte. Les totaux se recouvrent : une Traversée est à la fois dégâts, zone et multi-élément. <M s="C" />
        </p>
        <Bars
          label="Cartes par rôle"
          max={maxOf(stats.byRole)}
          items={stats.byRole.map((role) => ({ name: role.label, value: role.value, display: String(role.value) }))}
        />
        <TableWrap caption="Règle de chaque rôle, appliquée au texte du 26/10/2026">
          <thead>
            <tr>
              <th scope="col">Rôle</th>
              <th scope="col">Cartes</th>
              <th scope="col">Règle</th>
            </tr>
          </thead>
          <tbody>
            {stats.byRole.map((role) => (
              <tr key={role.id}>
                <td>{role.label}</td>
                <td className="num">{role.value}</td>
                <td>{role.rule}</td>
              </tr>
            ))}
          </tbody>
        </TableWrap>
        <p>
          {stats.uncovered.length === 1 ? (
            <>
              Une carte ne rentre dans aucun de ces rôles : <strong>{stats.uncovered[0].name}</strong>. {effectSentence(stats.uncovered[0].effect)}
            </>
          ) : (
            <>Cartes hors de ces rôles : {stats.uncovered.map((card) => card.name).join(', ') || 'aucune'}.</>
          )}
        </p>
        <More title="Exemples par rôle">
          <ul>
            {stats.byRole.map((role) => (
              <li key={role.id}>
                <strong>{role.label}</strong> ({role.value}): {role.names.slice(0, 8).join(', ')}
                {role.names.length > 8 ? '…' : ''}
              </li>
            ))}
          </ul>
        </More>
      </Section>

      <Section id="utilitaires" title="Sorts utiles dans le catalogue">
        <p>Les effets ci-dessous sont recopiés du relevé. Quand un pourcentage de stack est présent, la phrase le rappelle.</p>
        <h3>PA, boucliers et résistance</h3>
        <SpellList names={['Précipitation', 'Odorat', 'Flou Temporel', 'Entraide', "Masque de l'Intrépide", 'Bouclier Féca', 'Vertu', 'Rempart', 'Carnavalo']} />
        <h3>Multi-élément et lignes multiples</h3>
        <SpellList names={['Bluff', 'Traversée', 'Tromperie', 'Transfusion', 'Surcharge Runique']} />
        <h3>Bombes</h3>
        <SpellList names={stats.bombs.map((card) => card.name)} />
        <p>
          Ces trois cartes disent qu’elles explosent quand Kaboom les déclenche. Kaboom n’est pas une ligne de cet export : le catalogue ne l’ajoute pas.
        </p>
        <Info title={`${special.name}, hors des 252`}>
          <p>
            {special.rarity}, {special.pa_cost} PA. {effectSentence(special.effect)} Elle reste dans le catalogue avec cette note : présente sur /deck, absente de « Ma collection » (252/252). Le journal du 14 au 16/10 la décrit déjà comme un sort de fin de Faille du Kralamoure, une fois par personnage.
          </p>
        </Info>
      </Section>

      <Section id="reperes" title="Repères Féca, Ascension et Kralamoure">
        <p>Ces repères renvoient vers les pages déjà sourcées. Aucun nouveau total de dégâts n’est calculé ici.</p>
        <h3>Féca</h3>
        <p>
          Les trois cartes de classe du fichier sont Bouclier Féca, Bulle et Rempart. Vertu (Incarné) est un bouclier en pourcentage des PV max. Le{' '}
          <Link href="/personnage/classes/feca/">guide Féca</Link> décrit l’Armure et les charges observées en combat. Ici, le plan défensif s’appuie sur les sorts de bouclier, de soin et de résistance du catalogue, sans nouveau chiffre.
        </p>
        <SpellList names={['Bouclier Féca', 'Bulle', 'Rempart', 'Vertu', 'Secourisme']} />
        <h3>Ascension</h3>
        <p>
          Les pages <Link href="/contenus/ascension/">Ascension</Link> et <Link href="/contenus/strategies-ascension/">Stratégies de l’Ascension</Link> décrivent déjà les contraintes observées : peu de cartes par tour, alterner les éléments, garder un bouclier. Les outils cités là-bas et présents dans ce fichier comprennent Vertu, Bouclier Féca, Rempart, Précipitation, Odorat et Carnavalo. Bluff et Traversée sont multi-lignes : les pages de combat signalent qu’un sort multi-lignes coupe le bonus « une ligne ».
        </p>
        <h3>Kralamoure</h3>
        <p>
          La page <Link href="/contenus/kralamoure/">Kralamoure</Link> garde les decks et les scores déjà relevés. Au 26/10, sept cartes sont cochées dans un deck :{' '}
          {stats.inDeck.map((card) => card.name).join(', ')}. {special.name} reste le sort spécial de la Faille, à 6 PA, sans nouveau score de combat sur cette page.
        </p>
        <Tip title="Lire un effet stacké">
          <p>
            Comparez le nom et le rôle dans le tableau, puis traitez la fourchette comme celle du compte relevé dès que la note contient « Valeurs avec stacks du compte relevé ».
          </p>
        </Tip>
      </Section>

      <Section id="nouveautes" title="Noms absents du fichier du 15 octobre">
        <p>
          L’ancien CSV du wiki avait 241 cartes. Le relevé du 26/10 en a 253 : les 12 noms ci-dessous s’ajoutent, et aucun ancien nom ne disparaît. <M s="T" />
        </p>
        <TableWrap caption="12 cartes absentes du fichier du 15/10/2026">
          <thead>
            <tr>
              <th scope="col">Carte</th>
              <th scope="col">Rareté</th>
              <th scope="col">PA</th>
              <th scope="col">Effet du 26/10</th>
            </tr>
          </thead>
          <tbody>
            {ADDED_SINCE_15_OCT.map((name) => {
              const card = requireCard(name);
              return (
                <tr key={name}>
                  <td>
                    <strong>{card.name}</strong>
                  </td>
                  <td>{card.rarity}</td>
                  <td>{card.pa_cost}</td>
                  <td className="item-notes">
                    {effectSentence(card.effect)}
                    {card.stack_bonus_pct.trim() ? ` Valeurs avec stacks du compte relevé (+${card.stack_bonus_pct} %).` : ''}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </TableWrap>
      </Section>
    </>
  );
}
