/**
 * Pictogrammes SVG maison (aucun asset du jeu) : traits 24×24 en `currentColor`,
 * utilisables côté serveur comme côté client. Décoratifs par défaut (aria-hidden),
 * ou porteurs de sens avec `title`.
 */
import type { ReactNode } from 'react';

type SvgProps = { size?: number | string; className?: string; title?: string; strokeWidth?: number };

function Svg({ size = 24, className, title, strokeWidth = 1.7, children }: SvgProps & { children: ReactNode }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      className={className ? `ico ${className}` : 'ico'}
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden={title ? undefined : true}
      role={title ? 'img' : undefined}
      aria-label={title}
      focusable="false"
    >
      {title ? <title>{title}</title> : null}
      {children}
    </svg>
  );
}

/** Contour d'engrenage calculé une fois (déterministe : identique serveur / client). */
function gearPath(cx: number, cy: number, rOut: number, rIn: number, teeth: number): string {
  const pts: string[] = [];
  const step = (Math.PI * 2) / teeth;
  for (let i = 0; i < teeth; i++) {
    const a = i * step;
    const seq: [number, number][] = [
      [rIn, a - step * 0.5],
      [rIn, a - step * 0.22],
      [rOut, a - step * 0.14],
      [rOut, a + step * 0.14],
      [rIn, a + step * 0.22],
    ];
    for (const [r, t] of seq) pts.push(`${(cx + r * Math.cos(t)).toFixed(2)},${(cy + r * Math.sin(t)).toFixed(2)}`);
  }
  return `M${pts.join('L')}Z`;
}
const GEAR = gearPath(12, 12, 9, 6.8, 8);

const dot = (cx: number, cy: number, r = 1.25) => <circle cx={cx} cy={cy} r={r} fill="currentColor" stroke="none" />;

/* ---------- Icônes d'interface ---------- */
const UI = {
  search: (
    <>
      <circle cx="11" cy="11" r="6.5" />
      <path d="M16 16l4.5 4.5" />
    </>
  ),
  sun: (
    <>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2.5v2M12 19.5v2M4.6 4.6 6 6M18 18l1.4 1.4M2.5 12h2M19.5 12h2M4.6 19.4 6 18M18 6l1.4-1.4" />
    </>
  ),
  moon: <path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5z" />,
  menu: <path d="M4 7h16M4 12h16M4 17h16" />,
  close: <path d="M6 6l12 12M18 6 6 18" />,
  check: <path d="m5 12.5 4.5 4.5L19 7.5" />,
  chevron: <path d="m6 9 6 6 6-6" />,
  arrowRight: <path d="M5 12h14M13 6l6 6-6 6" />,
  arrowLeft: <path d="M19 12H5M11 6l-6 6 6 6" />,
  calendar: (
    <>
      <rect x="3.5" y="5" width="17" height="15" rx="2" />
      <path d="M3.5 10h17M8 3v4M16 3v4" />
    </>
  ),
  bulb: <path d="M9 18h6M10 21h4M12 3a6 6 0 0 0-3.5 10.9c.6.5 1 1.2 1 2.1h5c0-.9.4-1.6 1-2.1A6 6 0 0 0 12 3z" />,
  warning: (
    <>
      <path d="M12 3.5 2.5 20h19z" />
      <path d="M12 10v4.5" />
      {dot(12, 17.3, 1.1)}
    </>
  ),
  info: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 11v5.5" />
      {dot(12, 7.8, 1.1)}
    </>
  ),
  eye: (
    <>
      <path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12z" />
      <circle cx="12" cy="12" r="3" />
    </>
  ),
  target: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <circle cx="12" cy="12" r="5" />
      {dot(12, 12, 1.6)}
    </>
  ),
  ruler: (
    <>
      <path d="M3 16.5 16.5 3 21 7.5 7.5 21z" />
      <path d="m7 12.5 2 2M10 9.5l2 2M13 6.5l2 2" />
    </>
  ),
  cards: (
    <>
      <rect x="9" y="3" width="11" height="15" rx="2" />
      <path d="m6 6.5-1.8.5a2 2 0 0 0-1.4 2.4l2.9 10.6a2 2 0 0 0 2.4 1.4L13 20" />
      <path d="m14.5 7.5 2 3-2 3-2-3z" />
    </>
  ),
  shield: <path d="M12 3l7.5 3v5.5c0 4.6-3.2 8-7.5 9.5-4.3-1.5-7.5-4.9-7.5-9.5V6z" />,
  gift: (
    <>
      <rect x="3.5" y="8" width="17" height="4" rx="1" />
      <path d="M5 12v8.5h14V12M12 8v12.5M12 8c-1.5-3.5-5.5-4-5.5-1.5S10 8 12 8zm0 0c1.5-3.5 5.5-4 5.5-1.5S14 8 12 8z" />
    </>
  ),
  swords: (
    <>
      <path d="M4 3.5h3.2L16 12.3l-3.7 3.7L3.5 7.2z" />
      <path d="m10.3 14 5.7 5.7M17.8 15.3l-2.5 2.5M17.8 19.3l2.7 2.7" />
      <path d="M20 3.5h-3.2l-5.4 5.4M14.2 11.7 20.5 6.8V3.5M8 15.3l-2.5 2.5M5.8 17.8l-2.7 2.7M6.2 14l4.2 4.2" />
    </>
  ),
  star: <path d="m12 3 2.6 5.6 6.1.7-4.5 4.2 1.2 6L12 16.6l-5.4 2.9 1.2-6-4.5-4.2 6.1-.7z" />,
  trophy: (
    <>
      <path d="M7 3.5h10v5.5a5 5 0 0 1-10 0z" />
      <path d="M7 5.5H4v1.5A3.5 3.5 0 0 0 7.5 10.5M17 5.5h3v1.5a3.5 3.5 0 0 1-3.5 3.5M12 14v3.5M8 21h8M9.5 17.5h5V21h-5z" />
    </>
  ),
  bolt: <path d="M13 2.5 5 13.5h6l-1 8 8-11h-6z" />,
  sparkle: <path d="M12 3c.8 4.2 2.8 6.2 7 7-4.2.8-6.2 2.8-7 7-.8-4.2-2.8-6.2-7-7 4.2-.8 6.2-2.8 7-7z" />,
  external: <path d="M14 4h6v6M20 4l-9 9M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5" />,
  hash: <path d="M5 9h14M5 15h14M10 4 8 20M16 4l-2 16" />,
  diamond: <path d="m12 3 9 9-9 9-9-9z" />,
  enter: <path d="M20 5v6a3 3 0 0 1-3 3H5M9 10l-4 4 4 4" />,
  arrows: <path d="M8 4v16M4 8l4-4 4 4M16 20V4M12 16l4 4 4-4" />,
  book: (
    <>
      <path d="M4 5.5C6.5 4 9.5 4 12 6c2.5-2 5.5-2 8-.5V19c-2.5-1.5-5.5-1.5-8 .5-2.5-2-5.5-2-8-.5z" />
      <path d="M12 6v13.5" />
    </>
  ),
  home: (
    <>
      <path d="M3.5 11 12 4l8.5 7M6 9.5V20h12V9.5" />
      <path d="M10 20v-5h4v5" />
    </>
  ),
  crest: (
    <>
      <path d="M4.5 19v-5a7.5 7.5 0 0 1 15 0v5h-5v-4h-5v4z" />
      <path d="M12 6.5V3M9.5 3h5M4.5 14h15" />
    </>
  ),
  radar: (
    <>
      <path d="m12 3 7.8 4.5v9L12 21l-7.8-4.5v-9z" />
      <path d="m12 7.5 4 3-1.3 5H9.5l-1.5-5z" fill="currentColor" fillOpacity=".22" />
      <path d="M12 3v18M4.2 7.5l15.6 9M19.8 7.5l-15.6 9" strokeOpacity=".35" />
    </>
  ),
  bag: (
    <>
      <path d="M9 3.5h6L13.5 7h-3z" />
      <path d="M10.5 7h3c3.5 2.5 6.5 6 6.5 9.5a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4C4 13 7 9.5 10.5 7z" />
      <path d="M14 11.5h-2.5a1.5 1.5 0 0 0 0 3h1a1.5 1.5 0 0 1 0 3H10M12 10.5v1M12 17.5v1" />
    </>
  ),
  compass: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="m15.5 8.5-2 5-5 2 2-5z" />
    </>
  ),
  question: (
    <>
      <path d="M4 5h16v11H9.5L4 20z" />
      <path d="M10 9a2 2 0 1 1 2.8 1.8c-.5.3-.8.7-.8 1.2" />
      {dot(12, 13.8, 1.05)}
    </>
  ),
  scroll: (
    <>
      <path d="M8 4h10.5A1.5 1.5 0 0 1 20 5.5V7h-3.5" />
      <path d="M16.5 7v11.5A2 2 0 0 1 14.5 20.5H6A2 2 0 0 1 4 18.5V17h10.5M8 4a2 2 0 0 0-2 2v11" />
      <path d="M9.5 9h4M9.5 12.5h4" />
    </>
  ),
  chart: (
    <>
      <path d="M4 4v16h16" />
      <path d="m7 15 4-5 3 3 5-6" />
    </>
  ),
};
export type IconName = keyof typeof UI;

export function Icon({ name, ...p }: SvgProps & { name: IconName }) {
  return <Svg {...p}>{UI[name]}</Svg>;
}

/* ---------- Sections du wiki ---------- */
export type SectionKey =
  | 'home'
  | 'classes'
  | 'stats'
  | 'arene'
  | 'saison'
  | 'energie'
  | 'prestige'
  | 'economie'
  | 'guide'
  | 'faq'
  | 'sources';

const SECTION_ICON: Record<SectionKey, IconName> = {
  home: 'home',
  classes: 'crest',
  stats: 'radar',
  arene: 'swords',
  saison: 'trophy',
  energie: 'bolt',
  prestige: 'star',
  economie: 'bag',
  guide: 'compass',
  faq: 'question',
  sources: 'scroll',
};

export function SectionIcon({ section, ...p }: SvgProps & { section: SectionKey }) {
  return <Svg {...p}>{UI[SECTION_ICON[section]]}</Svg>;
}

/* ---------- Éléments ---------- */
export type ElementKey = 'terre' | 'feu' | 'eau' | 'air' | 'neutre';

const ELEMENTS: Record<ElementKey, ReactNode> = {
  terre: (
    <>
      <path d="M2.5 19.5 9 8.5l4 6.5 2.5-3.5 6 8z" />
      <path d="m7.2 11.5 1.8 1.3 1.6-1" />
    </>
  ),
  feu: (
    <>
      <path d="M12 21a6 6 0 0 0 6-6c0-4-3-6.5-4.5-10-1 2.5-2 3.5-3.5 4.5C8.5 10.8 6 12.5 6 15a6 6 0 0 0 6 6z" />
      <path d="M12 21a2.5 2.5 0 0 0 2.5-2.5c0-1.8-1.5-2.7-2.5-4.5-1 1.8-2.5 2.7-2.5 4.5A2.5 2.5 0 0 0 12 21z" />
    </>
  ),
  eau: (
    <>
      <path d="M12 3c3 4.5 6 7.6 6 11a6 6 0 0 1-12 0c0-3.4 3-6.5 6-11z" />
      <path d="M8.8 15c1 .8 2.2.8 3.2 0s2.2-.8 3.2 0" />
    </>
  ),
  air: <path d="M3 9h11a3 3 0 1 0-3-3M3 15h14a3 3 0 1 1-3 3M3 12h7.5" />,
  neutre: UI.sparkle,
};

export function ElementIcon({ element, ...p }: SvgProps & { element: ElementKey }) {
  return <Svg {...p}>{ELEMENTS[element]}</Svg>;
}

/* ---------- Classes (pictogrammes originaux, un thème par classe) ---------- */
const CLASS_ICONS: Record<string, ReactNode> = {
  // Bouclier dans le bouclier : armure
  Féca: (
    <>
      {UI.shield}
      <path d="m12 7.5 4 1.6v2.9c0 2.4-1.7 4.3-4 5.2-2.3-.9-4-2.8-4-5.2V9.1z" />
    </>
  ),
  // Empreinte de bête : dompteur
  Osamodas: (
    <>
      <path d="M12 12c2.6 0 4.4 2.1 4.4 4.3 0 1.9-1.5 3.2-4.4 3.2s-4.4-1.3-4.4-3.2C7.6 14.1 9.4 12 12 12z" />
      <circle cx="6" cy="10.8" r="1.8" />
      <circle cx="9.4" cy="6.6" r="1.8" />
      <circle cx="14.6" cy="6.6" r="1.8" />
      <circle cx="18" cy="10.8" r="1.8" />
    </>
  ),
  // Pièce : avarice
  Enutrof: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <circle cx="12" cy="12" r="5.6" strokeOpacity=".55" />
      <path d="m12 9 3 3-3 3-3-3z" />
    </>
  ),
  // Dague : assassinat
  Sram: (
    <>
      <path d="m20 4-1.2 4.5-7.3 7.3-2.3-2.3 7.3-7.3z" />
      <path d="m7.5 12 4.5 4.5M9.8 14.2 4 20" />
    </>
  ),
  // Sablier : temps
  Xélor: (
    <>
      <path d="M6.5 3h11M6.5 21h11" />
      <path d="M8 3v2.5a4 4 0 0 0 1.6 3.2L12 12l2.4-3.3A4 4 0 0 0 16 5.5V3M8 21v-2.5a4 4 0 0 1 1.6-3.2L12 12l2.4 3.3a4 4 0 0 1 1.6 3.2V21" />
      <path d="M10 19h4" />
    </>
  ),
  // Dé : chance
  Ecaflip: (
    <>
      <rect x="4" y="4" width="16" height="16" rx="3.5" />
      {dot(8.5, 8.5)}
      {dot(15.5, 8.5)}
      {dot(12, 12)}
      {dot(8.5, 15.5)}
      {dot(15.5, 15.5)}
    </>
  ),
  // Plume : les Mots
  Eniripsa: (
    <>
      <path d="M19.5 4.5C12 4.5 7.5 9.5 7.5 17 15 17 19.5 12 19.5 4.5z" />
      <path d="M15.5 8.5 4.5 19.5M11 13h3.5M13.2 10.8V8" />
    </>
  ),
  // Épée : guerrier
  Iop: (
    <>
      <path d="M12 2.5 14 5v10.5h-4V5z" />
      <path d="M7 15.5h10M12 15.5v4" />
      <circle cx="12" cy="20.8" r="1" />
    </>
  ),
  // Arc et flèche : archer
  Crâ: (
    <>
      <path d="M7.5 3.5c6 2.5 6 14.5 0 17" />
      <path d="M7.5 3.5v17" strokeOpacity=".55" />
      <path d="M3.5 12h16M17 9.5l2.5 2.5-2.5 2.5M3.5 12 2 10.5M3.5 12 2 13.5" />
    </>
  ),
  // Feuille : nature, poison
  Sadida: (
    <>
      <path d="M5 19.5C5 11 10.5 5 20 4.5 19.5 14 13.5 19.5 5 19.5z" />
      <path d="m5 19.5 9.5-9.5M10 14.5h3.5M12.5 12V8.8" />
    </>
  ),
  // Cœur fêlé : souffrance
  Sacrieur: (
    <>
      <path d="M12 20s-8-4.8-8-10.5A4.5 4.5 0 0 1 12 6.8a4.5 4.5 0 0 1 8 2.7C20 15.2 12 20 12 20z" />
      <path d="m12 6.8-1.6 4 3 2-1.4 3.6" />
    </>
  ),
  // Gourde : ivresse
  Pandawa: (
    <>
      <path d="M11 3v2.6c-1.8.6-2.8 2-2.4 3.7.2.8.9 1.4 1.4 1.7-3 .7-4.8 3-4.4 5.8.4 2.8 3 4.7 6.4 4.7s6-1.9 6.4-4.7c.4-2.8-1.4-5.1-4.4-5.8.5-.3 1.2-.9 1.4-1.7.4-1.7-.6-3.1-2.4-3.7V3" />
      <path d="M10 3h4M7 15h10" />
    </>
  ),
  // Bombe : artificier
  Roublard: (
    <>
      <circle cx="10.5" cy="14" r="6.5" />
      <path d="m14.8 9.2 2-2M15.8 6.2l2 2" />
      <path d="M19.5 3v1.6M21.5 5h-1.6M20.9 3.6l-1 1" />
      <path d="M7.5 12.5a3 3 0 0 1 2-2.2" strokeOpacity=".6" />
    </>
  ),
  // Masque : changement de masque
  Zobal: (
    <>
      <path d="M4 5.5c5-2 11-2 16 0 .5 7.5-3 14-8 14S3.5 13 4 5.5z" />
      <path d="M7.5 10.5c1-.8 2.2-.8 3 0M13.5 10.5c.8-.8 2-.8 3 0M9.5 15c1.6 1 3.4 1 5 0" />
    </>
  ),
  // Engrenage : évolution mécanique
  Steamer: (
    <>
      <path d={GEAR} />
      <circle cx="12" cy="12" r="3" />
    </>
  ),
  // Deux portails reliés
  Eliotrope: (
    <>
      <circle cx="8.5" cy="12" r="5.5" />
      <circle cx="15.5" cy="12" r="5.5" />
      {dot(8.5, 12, 1.1)}
      {dot(15.5, 12, 1.1)}
    </>
  ),
  // Rune losange à quatre points (4 éléments)
  Huppermage: (
    <>
      <path d="m12 2.5 8.5 9.5-8.5 9.5L3.5 12z" />
      <path d="m12 9 2.6 3-2.6 3-2.6-3z" />
      {dot(12, 5.8, 1)}
      {dot(17, 12, 1)}
      {dot(12, 18.2, 1)}
      {dot(7, 12, 1)}
    </>
  ),
  // Griffures : la proie
  Ouginak: <path d="M6 4c2.5 4.5 2.5 11-.5 16M11.5 3.5c2.5 5 2.5 12-.5 17M17 4c2.5 4.5 2.5 11-.5 16" />,
  // Lance projetée
  Forgelance: (
    <>
      <path d="M3.5 20.5 14 10" />
      <path d="m14 10-1-3.5 7.5-3-3 7.5z" />
      <path d="m8.5 12.5 3 3" />
    </>
  ),
};

export function ClassIcon({ name, ...p }: SvgProps & { name: string }) {
  return <Svg {...p}>{CLASS_ICONS[name] ?? UI.crest}</Svg>;
}

/** Emblème du site (rose des vents runique). */
export function Logo({ size = 32, className, id = 'logo-g' }: { size?: number; className?: string; id?: string }) {
  const g = `url(#${id})`;
  return (
    <svg viewBox="0 0 32 32" width={size} height={size} className={className} aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" style={{ stopColor: 'var(--gold-2)' }} />
          <stop offset="1" style={{ stopColor: 'var(--copper)' }} />
        </linearGradient>
      </defs>
      <circle cx="16" cy="16" r="14.5" style={{ fill: 'var(--logo-bg)' }} stroke={g} strokeWidth="1.5" />
      <circle cx="16" cy="16" r="10.5" fill="none" stroke={g} strokeWidth=".8" strokeDasharray="1.5 2.2" />
      <path d="M16 4.5 18.2 13.8 27.5 16 18.2 18.2 16 27.5 13.8 18.2 4.5 16 13.8 13.8z" fill={g} />
      <path d="M16 9.5 17.2 14.8 22.5 16 17.2 17.2 16 22.5 14.8 17.2 9.5 16 14.8 14.8z" style={{ fill: 'var(--logo-bg)' }} />
      <circle cx="16" cy="16" r="1.6" style={{ fill: 'var(--teal)' }} />
    </svg>
  );
}
