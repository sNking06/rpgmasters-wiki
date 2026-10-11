import { fmt } from './ui';

type Pt = { level: number; xp: number; kind: 'source' | 'calc' };

const W = 640;
const H = 360;
const M = { l: 64, r: 20, t: 16, b: 44 };
const PW = W - M.l - M.r;
const PH = H - M.t - M.b;
const LOG_MIN = 1;
const LOG_MAX = 9;

const x = (lvl: number) => M.l + (lvl / 200) * PW;
const y = (v: number) => M.t + ((LOG_MAX - Math.log10(v)) / (LOG_MAX - LOG_MIN)) * PH;

const Y_TICKS: [number, string][] = [
  [1e1, '10'],
  [1e2, '100'],
  [1e3, '1 k'],
  [1e4, '10 k'],
  [1e5, '100 k'],
  [1e6, '1 M'],
  [1e7, '10 M'],
  [1e8, '100 M'],
  [1e9, '1 Md'],
];
const X_TICKS = [0, 25, 50, 75, 100, 125, 150, 175, 200];

/** Graphique SVG (échelle log) reliant uniquement des points connus : interpolation visuelle, pas une courbe calculée. */
export default function XpChart({ points }: { points: Pt[] }) {
  const pts = [...points].filter((p) => p.xp > 0).sort((a, b) => a.level - b.level);
  const path = pts.map((p, i) => `${i ? 'L' : 'M'}${x(p.level).toFixed(1)},${y(p.xp).toFixed(1)}`).join(' ');
  const labelled = new Set([10, 30, 100, 200]);

  return (
    <figure className="chart">
      <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-labelledby="xp-chart-title xp-chart-desc">
        <title id="xp-chart-title">XP cumulée pour atteindre un niveau (échelle logarithmique)</title>
        <desc id="xp-chart-desc">
          Points connus reliés par des segments : niveaux 2 à 6 calculés, puis niveaux 10, 20, 30, 31, 50, 100 et 200 cités dans
          les sources. Les segments sont une interpolation visuelle.
        </desc>
        {Y_TICKS.map(([v, lab]) => (
          <g key={v}>
            <line x1={M.l} x2={W - M.r} y1={y(v)} y2={y(v)} stroke="#2a303b" strokeWidth={1} />
            <text x={M.l - 8} y={y(v) + 4} textAnchor="end" fontSize={12} fill="#a9b0bd">
              {lab}
            </text>
          </g>
        ))}
        {X_TICKS.map((l) => (
          <text key={l} x={x(l)} y={H - M.b + 18} textAnchor="middle" fontSize={12} fill="#a9b0bd">
            {l}
          </text>
        ))}
        <line x1={M.l} x2={W - M.r} y1={M.t + PH} y2={M.t + PH} stroke="#4a5263" strokeWidth={1} />
        <text x={M.l + PW / 2} y={H - 6} textAnchor="middle" fontSize={12} fill="#a9b0bd">
          Niveau
        </text>
        <path d={path} fill="none" stroke="#6aa8ff" strokeWidth={2} strokeDasharray="6 4" strokeLinejoin="round" />
        {pts.map((p) => (
          <g key={p.level}>
            <circle
              cx={x(p.level)}
              cy={y(p.xp)}
              r={5}
              fill={p.kind === 'source' ? '#6aa8ff' : '#1b1f26'}
              stroke="#6aa8ff"
              strokeWidth={2}
            >
              <title>
                {`Niveau ${p.level} : ${fmt(p.xp)} XP cumulée (${p.kind === 'source' ? 'cité dans les sources' : 'calculé à partir des 5 valeurs connues'})`}
              </title>
            </circle>
            {labelled.has(p.level) ? (
              <text x={x(p.level) - 8} y={y(p.xp) - 10} textAnchor="end" fontSize={12} fill="#e7e9ee">
                {fmt(p.xp)}
              </text>
            ) : null}
          </g>
        ))}
      </svg>
      <figcaption>
        <span aria-hidden="true">●</span> point cité dans les sources · <span aria-hidden="true">○</span> point calculé au build
        (niveaux 2 à 6) · tirets = <strong>interpolation visuelle</strong> entre points connus, pas des valeurs réelles. Survolez
        un point pour sa valeur.
      </figcaption>
    </figure>
  );
}
