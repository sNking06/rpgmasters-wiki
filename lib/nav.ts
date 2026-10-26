import bosses from '@/data/boss.json';
import zones from '@/data/zones.json';
import items from '@/data/items.json';
import type { SectionKey } from '@/components/icons';
export type NavNode = { href: string; title: string; description: string; icon?: SectionKey; children?: NavNode[] };
export const normalizePath = (path: string) => path === '/' ? '/' : `/${path.split('/').filter(Boolean).join('/')}/`;
export function slugify(value: string) { return value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/œ/g,'oe').replace(/æ/g,'ae').replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'') || 'fiche'; }
/** Stable order from the source file, with collision checks even for numbered names. */
export function withSlugs<T extends { name: string }>(rows: T[]) { const used = new Set<string>(); return rows.map(row => { const base = slugify(row.name); let slug = base, n = 2; while(used.has(slug)) slug = `${base}-${n++}`; used.add(slug); return {...row, slug}; }); }
export const bossEntries = withSlugs(bosses);
export const zoneEntries = withSlugs(zones);
export const hasSets = items.some(i => 'set_bonus' in i && i.set_bonus);
const node = (href:string,title:string,description:string,children?:NavNode[]):NavNode => ({href,title,description,children});
export const NAV: NavNode[] = [
 {...node('/debuter/','Débuter','Les bases, les réponses et la progression.',[node('/debuter/bases/','Bases','Premiers repères et liens utiles.'),node('/debuter/faq/','FAQ','Questions fréquentes.'),node('/debuter/energie-xp/','Énergie & XP','Énergie, combats et niveaux.')]),icon:'energie'},
 {...node('/personnage/','Personnage','Caractéristiques, Prestige et classes.',[node('/personnage/caracteristiques/','Caractéristiques','Points, éléments et bonus.'),node('/personnage/prestige/','Prestige','Conditions, bonus et pertes.'),node('/personnage/classes/','Classes','Les classes et leurs passifs.',[node('/personnage/classes/cra/','Crâ','Fiche et conseils Crâ.'),node('/personnage/classes/feca/','Féca','Armure et cartes exclusives.')])]),icon:'classes'},
 {...node('/equipement/','Équipement','Objets, Dofus, panoplies et cartes.',[node('/equipement/objets/','Objets','Tableau des objets existants.'),node('/equipement/dofus/','Dofus','Dofus relevés dans les objets.'),...(hasSets?[node('/equipement/panoplies/','Panoplies','Bonus de panoplie relevés.')]:[]),node('/equipement/cartes/','Cartes','253 cartes au 26 oct 2026, rôles et filtres.')]),icon:'stats'},
 {...node('/monde/','Monde','Zones, monstres et boss.',[node('/monde/zones/','Zones','Zones et monstres.',zoneEntries.map(z=>node(`/monde/zones/${z.slug}/`,z.name,`Niveaux ${z.level}`))),node('/monde/boss/','Boss','Mécaniques et butins.',bossEntries.map(b=>node(`/monde/boss/${b.slug}/`,b.name,`Niveau ${b.level} · ${b.location}`)))]),icon:'arene'},
 {...node('/contenus/','Contenus','Ascension, Abysses, arène, saison et Kralamoure.',[node('/contenus/ascension/','Ascension','Étages 29–42 et méthode observée.'),node('/contenus/strategies-ascension/','Stratégies de l’Ascension','Étages 105 à 260 : conseils de joueurs, non officiels.'),node('/contenus/abysses/','Abysses','Étages, reprise et récompenses.'),node('/contenus/arene/','Arène','Tickets, statistiques et classement.'),node('/contenus/saison/','Saison','Saison des Cartes et récompenses.'),node('/contenus/kralamoure/','Kralamoure','Boss de guilde et deck observé.')]),icon:'prestige'},
 {...node('/economie/','Économie','Kamas, coffres, fusion et compagnon.'),icon:'economie'},
 {...node('/a-propos/','À propos','Sources et limites du wiki de fans.',[node('/a-propos/sources/','Sources et limites','Méthode, relevés et lacunes.'),node('/a-propos/journal/','Journal des mises à jour','Patch notes officiels datés.')]),icon:'sources'},
];
export function trailFor(path: string, nodes = NAV): NavNode[] { const pathKey=normalizePath(path); for(const n of nodes){if(n.href===pathKey)return [n];if(n.children){const trail=trailFor(pathKey,n.children);if(trail.length)return [n,...trail];}}return []; }
export function siblingsFor(path:string){const trail=trailFor(path);return trail.length>1?trail[trail.length-2].children??[]:NAV;}
