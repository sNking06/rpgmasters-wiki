/**
 * Décor du héros d'accueil, 100 % SVG maison : halo, cercles runiques en rotation lente,
 * champ d'étoiles scintillantes, constellation en arc et poussières dorées qui montent.
 * Positions générées par un PRNG à graine fixe : rendu identique à chaque build. Animations en CSS,
 * coupées par prefers-reduced-motion.
 */

function mulberry32(seed: number) {
  let a = seed;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const W = 1200;
const H = 640;
const CX = 930;
const CY = 300;
const r1 = (n: number) => Math.round(n * 10) / 10;

const rand = mulberry32(20261011);
const STARS = Array.from({ length: 72 }, () => ({
  x: r1(rand() * W),
  y: r1(rand() * H),
  r: r1(0.6 + rand() * 1.3),
  tw: rand() < 0.45,
  delay: r1(rand() * 4.5),
}));
const MOTES = Array.from({ length: 14 }, () => ({
  x: r1(480 + rand() * 700),
  y: r1(430 + rand() * 200),
  r: r1(1.2 + rand() * 1.6),
  delay: r1(-rand() * 14),
  dur: r1(11 + rand() * 7),
}));

// Constellation en forme d'arc bandé (clin d'œil au Crâ), en haut au centre.
const CONST = [
  [612, 70],
  [668, 98],
  [706, 146],
  [716, 204],
  [700, 256],
  [664, 300],
  [620, 324],
] as const;

const polar = (r: number, deg: number) => {
  const a = (deg * Math.PI) / 180;
  return [r1(CX + r * Math.cos(a)), r1(CY + r * Math.sin(a))] as const;
};

const TICKS = Array.from({ length: 48 }, (_, i) => {
  const long = i % 4 === 0;
  const [x1, y1] = polar(long ? 232 : 240, i * 7.5);
  const [x2, y2] = polar(250, i * 7.5);
  return { x1, y1, x2, y2, long };
});

const DIAMONDS = Array.from({ length: 8 }, (_, i) => {
  const [x, y] = polar(250, i * 45 + 22.5);
  return `M${x} ${r1(y - 7)} L${r1(x + 5)} ${y} L${x} ${r1(y + 7)} L${r1(x - 5)} ${y} Z`;
});

const star = (rOut: number, rIn: number, n: number, rot = -90) =>
  Array.from({ length: n * 2 }, (_, i) => {
    const [x, y] = polar(i % 2 ? rIn : rOut, rot + (i * 180) / n);
    return `${i ? 'L' : 'M'}${x} ${y}`;
  }).join(' ') + ' Z';

const STAR8 = star(180, 128, 8);
const STAR4 = star(58, 18, 4);

export default function HeroArt() {
  return (
    <svg className="hero-art" viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="xMaxYMid slice" aria-hidden="true" focusable="false">
      <defs>
        <radialGradient id="hero-halo">
          <stop offset="0" className="halo-stop-a" stopOpacity="0.32" />
          <stop offset="0.45" className="halo-stop-b" stopOpacity="0.1" />
          <stop offset="1" className="halo-stop-b" stopOpacity="0" />
        </radialGradient>
      </defs>

      <circle className="halo" cx={CX} cy={CY} r="330" fill="url(#hero-halo)" />

      {STARS.map((s, i) => (
        <circle
          key={i}
          className={s.tw ? 'star twinkle' : 'star'}
          cx={s.x}
          cy={s.y}
          r={s.r}
          opacity={s.tw ? undefined : 0.45}
          style={s.tw ? { animationDelay: `${s.delay}s` } : undefined}
        />
      ))}

      <g>
        <path className="link" strokeWidth="1" fill="none" d={`M${CONST.map(([x, y]) => `${x} ${y}`).join(' L')}`} />
        <path className="link" strokeWidth="1" strokeDasharray="3 5" d={`M${CONST[0][0]} ${CONST[0][1]} L${CONST[6][0]} ${CONST[6][1]}`} />
        {CONST.map(([x, y], i) => (
          <circle key={i} className="star twinkle" cx={x} cy={y} r={i === 3 ? 2.6 : 1.9} style={{ animationDelay: `${i * 0.6}s` }} />
        ))}
      </g>

      {/* Anneau extérieur : graduations et losanges */}
      <g className="spin">
        <circle className="rune" cx={CX} cy={CY} r="250" strokeOpacity="0.38" strokeWidth="1.2" />
        <circle className="rune" cx={CX} cy={CY} r="226" strokeOpacity="0.22" strokeDasharray="2 9" />
        {TICKS.map((t, i) => (
          <line
            key={i}
            className="rune"
            x1={t.x1}
            y1={t.y1}
            x2={t.x2}
            y2={t.y2}
            strokeOpacity={t.long ? 0.55 : 0.3}
            strokeWidth={t.long ? 1.6 : 1}
          />
        ))}
        {DIAMONDS.map((d, i) => (
          <path key={i} className="rune" d={d} strokeOpacity="0.6" strokeWidth="1.2" />
        ))}
      </g>

      {/* Anneau intérieur turquoise, en sens inverse */}
      <g className="spin spin-rev">
        <circle className="rune-2" cx={CX} cy={CY} r="180" strokeOpacity="0.35" strokeWidth="1.2" />
        <path className="rune-2" d={STAR8} strokeOpacity="0.28" strokeWidth="1" />
        <circle className="rune-2" cx={CX} cy={CY} r="128" strokeOpacity="0.3" strokeDasharray="1 7" strokeWidth="2" />
      </g>

      <circle className="rune" cx={CX} cy={CY} r="74" strokeOpacity="0.32" />
      <path className="rune" d={STAR4} strokeOpacity="0.55" strokeWidth="1.3" />
      <circle className="star twinkle" cx={CX} cy={CY} r="3.5" />

      {MOTES.map((m, i) => (
        <circle
          key={i}
          className="mote"
          cx={m.x}
          cy={m.y}
          r={m.r}
          opacity="0"
          style={{ animationDelay: `${m.delay}s`, animationDuration: `${m.dur}s` }}
        />
      ))}
    </svg>
  );
}
