import { fmt } from './TablePrimitives';

type Pt = { level: number; xp: number; kind: 'source' | 'calc' };

// viewBox étroit : le texte reste lisible une fois l'SVG réduit à la largeur d'un mobile (375 px).
const W = 360;
const H = 250;
const M = { l: 52, r: 14, t: 14, b: 44 };
const PW = W - M.l - M.r;
const PH = H - M.t - M.b;
const LOG_MIN = 1;
const LOG_MAX = 9;
const FS = 15;

const x = (lvl: number) => M.l + (lvl / 200) * PW;
const y = (v: number) => M.t + ((LOG_MAX - Math.log10(v)) / (LOG_MAX - LOG_MIN)) * PH;

const Y_TICKS: [number, string][] = [
  [1e1, '10'],
  [1e3, '1 k'],
  [1e5, '100 k'],
  [1e7, '10 M'],
  [1e9, '1 Md'],
];
const X_TICKS = [0, 50, 100, 150, 200];

/** Graphique SVG (échelle log) reliant uniquement des points connus : interpolation visuelle, pas une courbe calculée. */
export default function XpChart({ points }: { points: Pt[] }) {
  const pts = [...points].filter((p) => p.xp > 0).sort((a, b) => a.level - b.level);
  const path = pts.map((p, i) => `${i ? 'L' : 'M'}${x(p.level).toFixed(1)},${y(p.xp).toFixed(1)}`).join(' ');
  const area = pts.length
    ? `${path} L${x(pts[pts.length - 1].level).toFixed(1)},${M.t + PH} L${x(pts[0].level).toFixed(1)},${M.t + PH} Z`
    : '';
  const labelled: Record<number, 'start' | 'end'> = { 30: 'start', 100: 'end', 200: 'end' };

  return (
    <figure className="viz">
      <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-labelledby="xp-chart-title xp-chart-desc">
        <title id="xp-chart-title">XP cumulée pour atteindre un niveau (échelle logarithmique)</title>
        <desc id="xp-chart-desc">
          Points connus reliés par des segments : niveaux 2 à 6 calculés, puis niveaux 10, 20, 30, 31, 50, 100 et 200 cités dans
          les sources. Les segments sont une interpolation visuelle.
        </desc>
        <defs>
          <linearGradient id="xp-area" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" className="chart-stop-1" stopOpacity="0.28" />
            <stop offset="1" className="chart-stop-1" stopOpacity="0" />
          </linearGradient>
        </defs>
        {Y_TICKS.map(([v, lab]) => (
          <g key={v}>
            <line className="chart-grid" x1={M.l} x2={W - M.r} y1={y(v)} y2={y(v)} />
            <text className="chart-text" x={M.l - 6} y={y(v) + 5} textAnchor="end" fontSize={FS}>
              {lab}
            </text>
          </g>
        ))}
        {X_TICKS.map((l) => (
          <text key={l} className="chart-text" x={x(l)} y={H - M.b + 20} textAnchor="middle" fontSize={FS}>
            {l}
          </text>
        ))}
        <line className="chart-axis" x1={M.l} x2={W - M.r} y1={M.t + PH} y2={M.t + PH} />
        <text className="chart-text" x={M.l + PW / 2} y={H - 4} textAnchor="middle" fontSize={FS}>
          Niveau
        </text>
        <path d={area} fill="url(#xp-area)" stroke="none" />
        <path className="chart-line chart-line-1 chart-dash" d={path} />
        {pts.map((p) => (
          <g key={p.level}>
            <circle
              className={`chart-pt chart-pt-1 ${p.kind === 'source' ? 'chart-pt-fill' : 'chart-pt-hollow'}`}
              cx={x(p.level)}
              cy={y(p.xp)}
              r={4.5}
            >
              <title>
                {`Niveau ${p.level} : ${fmt(p.xp)} XP cumulée (${p.kind === 'source' ? 'cité dans les sources' : 'calculé à partir des 5 valeurs connues'})`}
              </title>
            </circle>
            {labelled[p.level] ? (
              <text
                className="chart-label"
                x={x(p.level) + (labelled[p.level] === 'start' ? 8 : -8)}
                y={y(p.xp) + (labelled[p.level] === 'start' ? 18 : -9)}
                textAnchor={labelled[p.level]}
                fontSize={FS}
              >
                {fmt(p.xp)}
              </text>
            ) : null}
          </g>
        ))}
      </svg>
      <figcaption>
        Point plein : cité dans les sources. Cercle : calculé (niveaux 2 à 6). Les tirets sont une liaison visuelle entre
        points connus, pas des valeurs réelles.
      </figcaption>
    </figure>
  );
}
