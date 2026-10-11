/** Passifs des 19 classes — source : passifs_classes.txt (textes [TROUVÉ], association classe→passif [DÉDUIT] par l'ordre). */
export type ClassPassive = { name: string; slug?: string; passive: string; text: string };

export const CLASSES: ClassPassive[] = [
  { name: 'Féca', passive: 'Armure Féca', text: 'Chaque sort de bouclier, de soin ou de résistance lancé donne 1 charge d’Armure (5 au maximum, pour tout le combat). Chaque charge : −6 % de dégâts subis et +6 % de dégâts infligés (au maximum −30 % et +30 %).' },
  { name: 'Osamodas', passive: 'Dompteur', text: 'Ses invocations infligent +100 % de dégâts. Chaque invocation active (hors bombes) donne +20 % de dégâts à ses sorts et à son arme (3 au maximum : +60 %).' },
  { name: 'Enutrof', passive: 'Avarice', text: 'Chaque sort de 2 PA ou moins lancé rapporte 1 Pièce (10 au maximum, pour tout le combat). Chaque Pièce : +5 % de dégâts (au maximum +50 %).' },
  { name: 'Sram', passive: 'Assassinat', text: 'Ses sorts, son arme et ses pièges infligent +30 % de dégâts à un ennemi sous 50 % de ses PV, et +60 % sous 25 %.' },
  { name: 'Xélor', passive: 'Distorsion temporelle', text: 'Chaque PA qu’il tente de retirer ou de voler (réussi ou esquivé) donne 1 charge (10 au maximum, pour tout le combat). Chaque charge : +6 % de dégâts (au maximum +60 %).' },
  { name: 'Ecaflip', passive: 'Chance d’Ecaflip', text: 'Chaque sort de dégâts a 32 % de chances d’infliger le double de dégâts (coup de chance) et 2 % de chances de n’en infliger que la moitié (coup de malchance).' },
  { name: 'Eniripsa', passive: 'Mots', text: 'Chaque sort de soin ou de bouclier lancé donne 1 Mot (5 au maximum, pour tout le combat). Chaque Mot : +9 % de dégâts et +9 % de soins (au maximum +45 % et +45 %).' },
  { name: 'Iop', passive: 'Enchaînement', text: 'Chaque sort lancé augmente de 15 % les dégâts des sorts suivants du même tour (au maximum +45 %, remis à zéro à chaque tour).' },
  { name: 'Crâ', slug: 'cra', passive: 'Œil de lynx', text: '+26 % de chances de vision spectrale : chaque sort de dégâts peut infliger le double de dégâts (chance totale avec la PO plafonnée à 60 %).' },
  { name: 'Sadida', passive: 'Puissance sylvestre', text: 'Chaque sort de dégâts empoisonne la cible : elle perd 3 % de ses PV max au début de chacun de ses tours pendant 3 tours, cumulable jusqu’à 12 %. Ses sorts de poison s’ajoutent au poison déjà posé au lieu de le remplacer (20 % par tour au maximum ; boss : 3 % au maximum). Pas de poison dans la Faille.' },
  { name: 'Sacrieur', passive: 'Souffrance', text: '+7 % de dégâts par tranche de 10 % de PV manquants (au maximum +63 %, presque mort).' },
  { name: 'Pandawa', passive: 'Ivresse', text: 'Chaque sort lancé donne 1 niveau d’Ivresse (6 au maximum, pour tout le combat). Chaque niveau : +5 % de dégâts, et 1 % de ses PV max récupérés au début de chacun de ses tours (au maximum +30 % et 6 % par tour). Ces soins ne sont jamais réduits ni inversés par les mécaniques anti-soin des boss.' },
  { name: 'Roublard', passive: 'Artificier', text: 'Ses bombes et ses invocations infligent +50 % de dégâts. Chaque bombe qui explose donne +10 % de dégâts à ses sorts et à son arme (au maximum +30 %, pour tout le combat).' },
  { name: 'Zobal', passive: 'Masques', text: 'Change de masque à chaque tour : Classique (+10 % de dégâts, −10 % de dégâts subis), puis Psychopathe (+25 % de dégâts), puis Pleutre (−25 % de dégâts subis), et ainsi de suite. Le masque reste jusqu’à son tour suivant.' },
  { name: 'Steamer', passive: 'Évolution', text: 'À partir de son 2e tour, il évolue au début de chacun de ses tours : +7 % de dégâts par évolution pour ses sorts, son arme et ses invocations (6 évolutions au maximum : +42 %).' },
  { name: 'Eliotrope', passive: 'Portails', text: 'Une attaque sur 2 (sort de dégâts ou arme : la 2e, la 4e… du combat) passe par un portail : +50 % de dégâts.' },
  { name: 'Huppermage', passive: 'Runes élémentaires', text: 'Chaque sort de dégâts pose une rune de son élément, gardée tout le combat. Chaque rune d’un élément différent donne +11 % de dégâts (4 runes au maximum : +44 %).' },
  { name: 'Ouginak', passive: 'Proie', text: 'Le dernier ennemi frappé par ses sorts devient sa Proie : chaque sort qui la frappe ajoute +12 % de dégâts contre elle (au maximum +60 % ; changer de cible remet à zéro). Quand sa Proie meurt pendant son tour, il regagne 2 PA (une fois par tour).' },
  { name: 'Forgelance', passive: 'Lance projetée', text: 'Le premier sort de dégâts de chaque tour inflige +45 % de dégâts.' },
];

/** Cartes exclusives du Crâ — source : mecaniques.md §2 [TROUVÉ]. */
export const CRA_CARDS = [
  { name: 'Flèche Punitive', id: 32456, pa: 4, effect: '23 à 26 dommages, mono-cible', cc: 5, element: 'Terre' },
  { name: 'Tirs Puissants', id: 32466, pa: 1, effect: 'Puissance +100 et Critique +10 % pendant 1 tour (« jusqu’à ton prochain tour »)', cc: null, element: '—' },
  { name: 'Flèche Explosive', id: 32445, pa: 3, effect: '14 à 17 dommages en zone (tous les ennemis)', cc: 5, element: 'Feu' },
] as const;

/** Cartes exclusives du Iop telles qu'affichées sur /classes — source : txt_classes.txt [TROUVÉ]. */
export const IOP_CARDS = [
  { name: 'Épée Céleste', pa: 4, effect: '22 à 25 dommages Air — en zone' },
  { name: 'Puissance', pa: 2, effect: '+80 Puissance (2 tours)' },
  { name: 'Bond', pa: 3, effect: '15 à 17 dommages Terre, +1 PA' },
] as const;
