/**
 * Courbe d'XP — formule [TROUVÉ] (rea_classement.md §1) :
 *   n[0] = n[1] = 0 ;  n[L+1] = n[L] + round(2.5 × MONSTER_XP_REF[L-1] × (2 + 0.12 × L))
 * La table MONSTER_XP_REF (200 valeurs) n'est PAS dans les sources : seules ses 5 premières
 * valeurs y sont citées. On ne calcule donc que ce qu'elles permettent (niveaux 2 à 6).
 */
export const MONSTER_XP_REF_KNOWN = [16, 52, 104, 171, 251];

/** XP cumulée pour atteindre chaque niveau, calculée au build tant que MONSTER_XP_REF est connu. */
export function cumulativeXp(ref: number[]): { level: number; xp: number }[] {
  const n: number[] = [0, 0];
  for (let L = 1; L <= ref.length; L++) {
    n[L + 1] = n[L] + Math.round(2.5 * ref[L - 1] * (2 + 0.12 * L));
  }
  return n.map((xp, level) => ({ level, xp })).slice(1);
}

/** Points chiffrés écrits dans les sources (XP cumulée pour atteindre le niveau) — [calcul sur TROUVÉ] dans rea_classement.md. */
export const XP_SOURCE_POINTS = [
  { level: 10, xp: 18_674 },
  { level: 20, xp: 173_323 },
  { level: 30, xp: 661_088 },
  { level: 31, xp: 737_696 },
  { level: 50, xp: 3_736_485 },
  { level: 100, xp: 42_231_421 },
  { level: 200, xp: 509_344_483 },
];

/** Énergie : prix du n-ième point acheté dans la journée (n à partir de 1) — formule [TROUVÉ] rea_classement.md §2. */
export const ENERGY = { max: 100, periodSec: 360, pveCost: 1, pvpCost: 2, bossCost: 2, buyPrice: 300, buyDaily: 1000, buyRampFrom: 600, buyTopPrice: 2000 };

export function energyPointPrice(n: number): number {
  if (n <= ENERGY.buyRampFrom) return ENERGY.buyPrice;
  return Math.round(
    ENERGY.buyPrice + ((ENERGY.buyTopPrice - ENERGY.buyPrice) * (n - ENERGY.buyRampFrom)) / (ENERGY.buyDaily - ENERGY.buyRampFrom),
  );
}

/** Coût total de l'achat des points 1..n dans la journée. */
export function energyTotalCost(n: number): number {
  let s = 0;
  for (let i = 1; i <= n; i++) s += energyPointPrice(i);
  return s;
}
