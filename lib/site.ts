export const SITE_NAME = 'Wiki RpgMasters (non officiel)';
export const GAME_URL = 'https://rpgmasters.houk.fr';
export const DATA_DATE = '11 oct 2026';
export const DATA_DATE_LABEL = 'Données du 11 oct 2026';
export const SEASON_NAME = 'Saison Héroïque';
export const SEASON_DATES = 'du vendredi 9 octobre 2026 à 18:00 au lundi 12 octobre 2026 à 08:00 (heure de Paris)';

export type NavItem = { href: string; label: string; desc: string };

export const NAV: NavItem[] = [
  { href: '/classes/', label: 'Classes', desc: 'Les 19 classes et leur passif.' },
  { href: '/classes/cra/', label: 'Crâ', desc: 'Passif Œil de lynx, cartes exclusives, PO et vision spectrale.' },
  { href: '/caracteristiques/', label: 'Caractéristiques', desc: 'Stats, constantes de combat, deck, objets.' },
  { href: '/prestige/', label: 'Prestige', desc: 'Bonus, conditions P1→P15, pertes et objet éternel.' },
  { href: '/arene/', label: 'Arène', desc: 'Elo, tickets, reset hebdo, classements.' },
  { href: '/saison/', label: 'Saison', desc: 'Saison Héroïque : règles, banque, récompenses.' },
  { href: '/energie-xp/', label: 'Énergie & XP', desc: 'Énergie, coût d’achat, courbe de niveaux.' },
  { href: '/economie/', label: 'Économie', desc: 'Coffres, kamas, fusion, bris, compagnon.' },
  { href: '/guide-cra/', label: 'Guide Crâ', desc: 'Recommandations vérifiées pour jouer Crâ.' },
  { href: '/faq/', label: 'FAQ', desc: 'Questions fréquentes, en bref.' },
  { href: '/sources/', label: 'Sources & limites', desc: 'Méthode, légende, lacunes, fichiers sources.' },
];
