/** Rôles dérivés du relevé du 26/10/2026. Aucune valeur de combat n’est calculée ici. */

export type Card = {
  name: string;
  class_or_general: string;
  rarity: string;
  pa_cost: string;
  element: string;
  effect: string;
  lines: string;
  notes: string;
  zone: string;
  stack_bonus_pct: string;
  in_deck: string;
};

const NOT_HIT = /dommages critiques|dommages aux sorts|dommages à la cible/i;
const DAMAGE_ELEMENT = /dommages?\s+(terre|feu|eau|air|neutre|du meilleur)/i;
const BUFF_WORD = /puissance|critique|résistance|retrait|esquive|affaiblie/i;
// Pas de \b après « é » : en JavaScript, les lettres accentuées ne sont pas des caractères de mot.
const BUFF_STAT = /(?:vole|[+\-−])\s*\d+\s*(?:force|intelligence|chance|agilité)(?!\p{L})/iu;
const BUFF_FLAT_DAMAGE = /[+\-−]\s*\d+\s*dommages\b/i;
const PA_DELTA = /[+\-−]\s*\d+\s*PA\b/;
const BOMB = /\bbombe\b/i;
const LIFE_STEAL = /vol de vie/i;
const HEAL = /soigne/i;
const SHIELD = /bouclier/i;
const ZONE_TEXT = /en zone/i;

export const RARITY_ORDER = ['Classe', 'Incarné', 'Légendaire', 'Mythique', 'Épique', 'Rare', 'Peu commun', 'Commun'] as const;

export const ELEMENT_ORDER = [
  'Terre',
  'Feu',
  'Eau',
  'Air',
  'Meilleur élément',
  'Neutre',
  'Plusieurs éléments',
  'Sans élément nommé',
] as const;

export const ROLE_DEFS = [
  {
    id: 'dégâts',
    label: 'Dégâts',
    rule: 'Au moins une ligne « dommages » Terre, Feu, Eau, Air, Neutre ou du meilleur élément.',
  },
  { id: 'zone', label: 'Zone', rule: 'La colonne zone du relevé vaut yes, ou l’effet dit « en zone ».' },
  {
    id: 'buff/debuff',
    label: 'Buff / debuff',
    rule: 'Puissance, Critique, Résistance, Retrait, Esquive, Force, Intelligence, Chance ou Agilité, attaque de monstre « affaiblie », ou bonus de Dommages sans élément.',
  },
  { id: 'vol de vie', label: 'Vol de vie', rule: 'Le texte contient « vol de vie ».' },
  { id: 'soin', label: 'Soin', rule: 'Le texte contient « Soigne ».' },
  {
    id: '±PA',
    label: '± PA',
    rule: 'Une ligne donne ou retire des PA (+N PA ou −N PA). Retrait PA et Esquive PA restent dans buff / debuff.',
  },
  { id: 'bouclier', label: 'Bouclier', rule: 'Le texte contient « Bouclier ».' },
  {
    id: 'multi-élément',
    label: 'Multi-élément',
    rule: 'Au moins deux éléments dans la colonne élément. « Meilleur élément » est un cas à part.',
  },
  { id: 'bombe', label: 'Bombe', rule: 'Le texte contient « Bombe ».' },
] as const;

export type RoleId = (typeof ROLE_DEFS)[number]['id'];

/** Noms présents le 26/10 et absents du fichier wiki du 15/10 (241 cartes). */
export const ADDED_SINCE_15_OCT = [
  'Boliche',
  'Extinction',
  "Flèche d'Expiation",
  "Force de l'Âge",
  'Félintion',
  'Hécatombe',
  'Inoculation',
  'Maîtrise des Popokémons',
  'Noa',
  'Raillerie',
  'Torpeur',
  'Épée du Destin',
] as const;

export const SPECIAL_CARD = 'Maîtrise des Popokémons';

export function effectLines(effect: string): string[] {
  return effect.split(' / ').map((part) => part.trim()).filter(Boolean);
}

export function isDamageLine(line: string): boolean {
  if (NOT_HIT.test(line)) return false;
  return DAMAGE_ELEMENT.test(line);
}

export function isBuffLine(line: string): boolean {
  if (BUFF_WORD.test(line)) return true;
  if (NOT_HIT.test(line)) return true;
  // « 1 chance sur 6 » (Topkaj) n’est pas la caractéristique Chance.
  if (BUFF_STAT.test(line)) return true;
  if (BUFF_FLAT_DAMAGE.test(line) && !DAMAGE_ELEMENT.test(line)) return true;
  return false;
}

export function cardRoles(card: Card): RoleId[] {
  const found = new Set<RoleId>();
  const effect = card.effect || '';
  if (card.zone === 'yes' || ZONE_TEXT.test(effect)) found.add('zone');
  const elems = card.element.split(/[;+]/).map((part) => part.trim()).filter(Boolean);
  if (elems.length >= 2) found.add('multi-élément');
  for (const line of effectLines(effect)) {
    if (BOMB.test(line)) found.add('bombe');
    if (LIFE_STEAL.test(line)) found.add('vol de vie');
    if (HEAL.test(line)) found.add('soin');
    if (SHIELD.test(line)) found.add('bouclier');
    if (PA_DELTA.test(line)) found.add('±PA');
    if (isBuffLine(line)) found.add('buff/debuff');
    if (isDamageLine(line)) found.add('dégâts');
  }
  return ROLE_DEFS.map((role) => role.id).filter((id) => found.has(id));
}

export function elementBucket(card: Card): string {
  const el = card.element.trim();
  if (!el) return 'Sans élément nommé';
  if (el.split(/[;+]/).filter(Boolean).length >= 2) return 'Plusieurs éléments';
  if (el.toLowerCase() === 'meilleur élément') return 'Meilleur élément';
  if (el.toLowerCase() === 'neutre') return 'Neutre';
  return el;
}

function orderedCounts(cards: Card[], order: readonly string[], key: (card: Card) => string) {
  const counts = new Map<string, number>();
  for (const card of cards) {
    const bucket = key(card);
    counts.set(bucket, (counts.get(bucket) ?? 0) + 1);
  }
  const known = order.filter((label) => counts.has(label)).map((label) => ({ name: label, value: counts.get(label) ?? 0 }));
  const extra = [...counts.keys()]
    .filter((label) => !order.includes(label))
    .sort((a, b) => a.localeCompare(b, 'fr'))
    .map((label) => ({ name: label, value: counts.get(label) ?? 0 }));
  return [...known, ...extra];
}

export function analyzeCards(cards: Card[]) {
  const byRole = ROLE_DEFS.map((role) => ({
    ...role,
    value: cards.filter((card) => cardRoles(card).includes(role.id)).length,
    names: cards.filter((card) => cardRoles(card).includes(role.id)).map((card) => card.name),
  }));
  const uncovered = cards.filter((card) => cardRoles(card).length === 0);
  return {
    total: cards.length,
    byRarity: orderedCounts(cards, RARITY_ORDER, (card) => card.rarity),
    byElement: orderedCounts(cards, ELEMENT_ORDER, elementBucket),
    byPa: orderedCounts(
      [...cards].sort((a, b) => Number(a.pa_cost) - Number(b.pa_cost)),
      [...new Set(cards.map((card) => card.pa_cost))].sort((a, b) => Number(a) - Number(b)).map((pa) => `${pa} PA`),
      (card) => `${card.pa_cost} PA`,
    ),
    byRole,
    uncovered,
    stacked: cards.filter((card) => card.stack_bonus_pct.trim()).length,
    inDeck: cards.filter((card) => card.in_deck === 'yes'),
    bombs: cards.filter((card) => cardRoles(card).includes('bombe')),
  };
}
