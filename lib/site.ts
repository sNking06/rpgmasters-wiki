import type { SectionKey } from '@/components/icons';

export const SITE_NAME = 'Wiki RpgMasters (non officiel)';
export const SITE_DESCRIPTION =
  'Wiki de fans NON OFFICIEL pour RpgMasters : classes, Crâ, caractéristiques, arène, saison, énergie, XP, Prestige. Uniquement des faits relevés sur les pages publiques.';
export const GAME_URL = 'https://rpgmasters.houk.fr';
export const DATA_DATE = '11 oct 2026';
export const DATA_DATE_LABEL = 'Données du 11 oct 2026';
export const SEASON_NAME = 'Saison Héroïque';
export const SEASON_END = 'lundi 12 oct 08:00 (Paris)';
export const SEASON_DATES = 'du vendredi 9 octobre 2026 à 18:00 au lundi 12 octobre 2026 à 08:00 (heure de Paris)';

export type NavItem = { href: string; label: string; short?: string; icon: SectionKey; desc: string };

/** Les 6 sujets principaux : cartes de l'accueil et entrées directes du header. */
export const MAIN_NAV: NavItem[] = [
  { href: '/classes/', label: 'Classes', icon: 'classes', desc: 'Les 19 classes et leur passif, fiche Crâ détaillée.' },
  { href: '/caracteristiques/', label: 'Caractéristiques', short: 'Stats', icon: 'stats', desc: 'Points par niveau, éléments, parchemins, deck et objets.' },
  { href: '/arene/', label: 'Arène', icon: 'arene', desc: '10 tickets par jour, +1 stat par victoire, Elo et reset du vendredi.' },
  { href: '/saison/', label: 'Saison', icon: 'saison', desc: 'Saison Héroïque : XP ×4, mort définitive face aux boss, récompenses.' },
  { href: '/energie-xp/', label: 'Énergie & XP', short: 'Énergie/XP', icon: 'energie', desc: '100 d’énergie, +1 toutes les 6 min, coût des combats et niveaux.' },
  { href: '/prestige/', label: 'Prestige', icon: 'prestige', desc: 'Repartir niveau 1 plus fort : bonus, conditions P1→P15, pertes.' },
];

/** Pages secondaires : menu « Plus ▾ ». */
export const MORE_NAV: NavItem[] = [
  { href: '/economie/', label: 'Économie', icon: 'economie', desc: 'Coffres, kamas, fusion, bris, compagnon.' },
  { href: '/guide-cra/', label: 'Guide Crâ', icon: 'guide', desc: '10 conseils vérifiés pour jouer Crâ.' },
  { href: '/faq/', label: 'FAQ', icon: 'faq', desc: 'Questions fréquentes, en bref.' },
  { href: '/sources/', label: 'Sources & limites', icon: 'sources', desc: 'Méthode, légende des pastilles, lacunes.' },
];

/** Icône de section d'une URL du site (résultats de recherche). */
export function sectionOf(url: string): SectionKey {
  const path = url.split('#')[0];
  if (path.startsWith('/classes/')) return 'classes';
  const hit = [...MAIN_NAV, ...MORE_NAV].find((n) => path.startsWith(n.href));
  return hit ? hit.icon : 'home';
}

/** Ordre de lecture pour la navigation précédent / suivant. */
export const PAGE_ORDER: { href: string; label: string }[] = [
  { href: '/classes/', label: 'Classes' },
  { href: '/classes/cra/', label: 'Crâ' },
  { href: '/caracteristiques/', label: 'Caractéristiques' },
  { href: '/arene/', label: 'Arène' },
  { href: '/saison/', label: 'Saison' },
  { href: '/energie-xp/', label: 'Énergie & XP' },
  { href: '/prestige/', label: 'Prestige' },
  { href: '/economie/', label: 'Économie' },
  { href: '/guide-cra/', label: 'Guide Crâ' },
  { href: '/faq/', label: 'FAQ' },
  { href: '/sources/', label: 'Sources & limites' },
];
