import type { SectionKey } from '@/components/icons';

export const SITE_NAME = 'Wiki RpgMasters (non officiel)';
export const SITE_DESCRIPTION =
  'Wiki de fans NON OFFICIEL pour RpgMasters : classes, Crâ, caractéristiques, arène, saison, énergie, XP, Prestige. Uniquement des faits relevés sur les pages publiques.';
export const GAME_URL = 'https://rpgmasters.houk.fr';
export const DATA_DATE = '20 oct 2026';
export const DATA_DATE_LABEL = 'Données du 11 au 20 oct 2026';
export const SEASON_NAME = 'Saison Héroïque';
export const SEASON_END = 'lundi 12 oct 08:00 (Paris)';
export const SEASON_DATES = 'du vendredi 9 octobre 2026 à 18:00 au lundi 12 octobre 2026 à 08:00 (heure de Paris)';

export { NAV } from './nav';
import { NAV } from './nav';
export const MAIN_NAV = NAV.map(n=>({href:n.href,label:n.title,icon:n.icon ?? 'home',desc:n.description}));
export const MORE_NAV: typeof MAIN_NAV = [];
export function sectionOf(url:string):SectionKey{return NAV.find(n=>url.startsWith(n.href))?.icon ?? 'home';}
