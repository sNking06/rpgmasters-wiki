export const SITE_NAME = 'Wiki RpgMasters (non officiel)';
export const GAME_URL = 'https://rpgmasters.houk.fr';
export const DATA_DATE = '11 oct 2026';
export const DATA_DATE_LABEL = 'Données du 11 oct 2026';
export const SEASON_NAME = 'Saison Héroïque';
export const SEASON_END = 'lundi 12 oct 08:00 (Paris)';
export const SEASON_DATES = 'du vendredi 9 octobre 2026 à 18:00 au lundi 12 octobre 2026 à 08:00 (heure de Paris)';

export type NavItem = { href: string; label: string; short?: string; icon: string; desc: string };

/** Les 6 sujets principaux : cartes de l'accueil et entrées directes du header. */
export const MAIN_NAV: NavItem[] = [
  { href: '/classes/', label: 'Classes', icon: '🧙', desc: 'Les 19 classes et leur passif, fiche Crâ détaillée.' },
  { href: '/caracteristiques/', label: 'Caractéristiques', short: 'Stats', icon: '📊', desc: 'Points par niveau, éléments, parchemins, deck et objets.' },
  { href: '/arene/', label: 'Arène', icon: '⚔️', desc: '10 tickets par jour, +1 stat par victoire, Elo et reset du vendredi.' },
  { href: '/saison/', label: 'Saison', icon: '🏆', desc: 'Saison Héroïque : XP ×4, mort définitive face aux boss, récompenses.' },
  { href: '/energie-xp/', label: 'Énergie & XP', short: 'Énergie/XP', icon: '⚡', desc: '100 d’énergie, +1 toutes les 6 min, coût des combats et niveaux.' },
  { href: '/prestige/', label: 'Prestige', icon: '⭐', desc: 'Repartir niveau 1 plus fort : bonus, conditions P1→P15, pertes.' },
];

/** Pages secondaires : menu « Plus ▾ ». */
export const MORE_NAV: NavItem[] = [
  { href: '/economie/', label: 'Économie', icon: '💰', desc: 'Coffres, kamas, fusion, bris, compagnon.' },
  { href: '/guide-cra/', label: 'Guide Crâ', icon: '🏹', desc: '10 conseils vérifiés pour jouer Crâ.' },
  { href: '/faq/', label: 'FAQ', icon: '❓', desc: 'Questions fréquentes, en bref.' },
  { href: '/sources/', label: 'Sources & limites', icon: '📚', desc: 'Méthode, légende des pastilles, lacunes.' },
];

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
