/**
 * Passifs des 19 classes — source : passifs_classes.txt (textes [TROUVÉ], association classe→passif [DÉDUIT] par l'ordre).
 * `short` : résumé d'une ligne pour la grille, chiffres repris du texte complet `text`.
 */
export type ClassPassive = { name: string; slug?: string; passive: string; short: string; text: string };

export const CLASSES: ClassPassive[] = [
  { name: 'Féca', passive: 'Armure Féca', short: 'Charges d’Armure : jusqu’à −30 % de dégâts subis et +30 % de dégâts.', text: 'Chaque sort de bouclier, de soin ou de résistance lancé donne 1 charge d’Armure (5 au maximum, pour tout le combat). Chaque charge : −6 % de dégâts subis et +6 % de dégâts infligés (au maximum −30 % et +30 %).' },
  { name: 'Osamodas', passive: 'Dompteur', short: 'Invocations +100 % ; jusqu’à +60 % pour ses sorts et son arme.', text: 'Ses invocations infligent +100 % de dégâts. Chaque invocation active (hors bombes) donne +20 % de dégâts à ses sorts et à son arme (3 au maximum : +60 %).' },
  { name: 'Enutrof', passive: 'Avarice', short: 'Sorts de 2 PA ou moins → Pièces : jusqu’à +50 % de dégâts.', text: 'Chaque sort de 2 PA ou moins lancé rapporte 1 Pièce (10 au maximum, pour tout le combat). Chaque Pièce : +5 % de dégâts (au maximum +50 %).' },
  { name: 'Sram', passive: 'Assassinat', short: '+30 % de dégâts sous 50 % de PV ennemis, +60 % sous 25 %.', text: 'Ses sorts, son arme et ses pièges infligent +30 % de dégâts à un ennemi sous 50 % de ses PV, et +60 % sous 25 %.' },
  { name: 'Xélor', passive: 'Distorsion temporelle', short: 'Retirer ou voler des PA → jusqu’à +60 % de dégâts.', text: 'Chaque PA qu’il tente de retirer ou de voler (réussi ou esquivé) donne 1 charge (10 au maximum, pour tout le combat). Chaque charge : +6 % de dégâts (au maximum +60 %).' },
  { name: 'Ecaflip', passive: 'Chance d’Ecaflip', short: '32 % de chances de double dégâts, 2 % de demi-dégâts.', text: 'Chaque sort de dégâts a 32 % de chances d’infliger le double de dégâts (coup de chance) et 2 % de chances de n’en infliger que la moitié (coup de malchance).' },
  { name: 'Eniripsa', passive: 'Mots', short: 'Soins et boucliers → jusqu’à +45 % de dégâts et +45 % de soins.', text: 'Chaque sort de soin ou de bouclier lancé donne 1 Mot (5 au maximum, pour tout le combat). Chaque Mot : +9 % de dégâts et +9 % de soins (au maximum +45 % et +45 %).' },
  { name: 'Iop', passive: 'Enchaînement', short: '+15 % par sort lancé dans le tour, jusqu’à +45 %.', text: 'Chaque sort lancé augmente de 15 % les dégâts des sorts suivants du même tour (au maximum +45 %, remis à zéro à chaque tour).' },
  { name: 'Crâ', slug: 'cra', passive: 'Œil de lynx', short: '+26 % de chances de double dégâts, 60 % max avec la PO.', text: '+26 % de chances de vision spectrale : chaque sort de dégâts peut infliger le double de dégâts (chance totale avec la PO plafonnée à 60 %).' },
  { name: 'Sadida', passive: 'Puissance sylvestre', short: 'Ses sorts de dégâts empoisonnent : 3 % des PV max par tour.', text: 'Chaque sort de dégâts empoisonne la cible : elle perd 3 % de ses PV max au début de chacun de ses tours pendant 3 tours, cumulable jusqu’à 12 %. Ses sorts de poison s’ajoutent au poison déjà posé au lieu de le remplacer (20 % par tour au maximum ; boss : 3 % au maximum). Pas de poison dans la Faille.' },
  { name: 'Sacrieur', passive: 'Souffrance', short: '+7 % de dégâts par 10 % de PV manquants, jusqu’à +63 %.', text: '+7 % de dégâts par tranche de 10 % de PV manquants (au maximum +63 %, presque mort).' },
  { name: 'Pandawa', passive: 'Ivresse', short: 'Chaque sort : jusqu’à +30 % de dégâts et 6 % de PV par tour.', text: 'Chaque sort lancé donne 1 niveau d’Ivresse (6 au maximum, pour tout le combat). Chaque niveau : +5 % de dégâts, et 1 % de ses PV max récupérés au début de chacun de ses tours (au maximum +30 % et 6 % par tour). Ces soins ne sont jamais réduits ni inversés par les mécaniques anti-soin des boss.' },
  { name: 'Roublard', passive: 'Artificier', short: 'Bombes et invocations +50 % ; jusqu’à +30 % pour ses sorts et son arme.', text: 'Ses bombes et ses invocations infligent +50 % de dégâts. Chaque bombe qui explose donne +10 % de dégâts à ses sorts et à son arme (au maximum +30 %, pour tout le combat).' },
  { name: 'Zobal', passive: 'Masques', short: 'Un masque par tour : Classique, Psychopathe (+25 %), Pleutre (−25 % subis).', text: 'Change de masque à chaque tour : Classique (+10 % de dégâts, −10 % de dégâts subis), puis Psychopathe (+25 % de dégâts), puis Pleutre (−25 % de dégâts subis), et ainsi de suite. Le masque reste jusqu’à son tour suivant.' },
  { name: 'Steamer', passive: 'Évolution', short: 'Dès son 2e tour, +7 % par évolution, jusqu’à +42 %.', text: 'À partir de son 2e tour, il évolue au début de chacun de ses tours : +7 % de dégâts par évolution pour ses sorts, son arme et ses invocations (6 évolutions au maximum : +42 %).' },
  { name: 'Eliotrope', passive: 'Portails', short: 'Une attaque sur 2 passe par un portail : +50 % de dégâts.', text: 'Une attaque sur 2 (sort de dégâts ou arme : la 2e, la 4e… du combat) passe par un portail : +50 % de dégâts.' },
  { name: 'Huppermage', passive: 'Runes élémentaires', short: '+11 % par élément différent utilisé, jusqu’à +44 %.', text: 'Chaque sort de dégâts pose une rune de son élément, gardée tout le combat. Chaque rune d’un élément différent donne +11 % de dégâts (4 runes au maximum : +44 %).' },
  { name: 'Ouginak', passive: 'Proie', short: '+12 % par sort sur la même cible, jusqu’à +60 %.', text: 'Le dernier ennemi frappé par ses sorts devient sa Proie : chaque sort qui la frappe ajoute +12 % de dégâts contre elle (au maximum +60 % ; changer de cible remet à zéro). Quand sa Proie meurt pendant son tour, il regagne 2 PA (une fois par tour).' },
  { name: 'Forgelance', passive: 'Lance projetée', short: 'Premier sort de dégâts du tour : +45 %.', text: 'Le premier sort de dégâts de chaque tour inflige +45 % de dégâts.' },
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
