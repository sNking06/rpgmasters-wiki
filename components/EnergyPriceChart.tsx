import { ENERGY, energyPointPrice } from '@/lib/xp';
import { fmt } from './ui';

const W = 360;
const H = 220;
const M = { l: 56, r: 16, t: 16, b: 46 };
const PW = W - M.l - M.r;
const PH = H - M.t - M.b;
const FS = 15;

const x = (n: number) => M.l + (n / ENERGY.buyDaily) * PW;
const y = (p: number) => M.t + (1 - p / ENERGY.buyTopPrice) * PH;

/** Prix d'un point d'énergie selon le nombre déjà acheté dans la journée (formule du code, tracée exactement). */
export default function EnergyPriceChart() {
  const pts = [1, ENERGY.buyRampFrom, ENERGY.buyDaily].map((n) => [n, energyPointPrice(n)] as const);
  const path = pts.map(([n, p], i) => `${i ? 'L' : 'M'}${x(n).toFixed(1)},${y(p).toFixed(1)}`).join(' ');
  const area = `${path} L${x(ENERGY.buyDaily).toFixed(1)},${M.t + PH} L${x(1).toFixed(1)},${M.t + PH} Z`;
  return (
    <figure className="viz">
      <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-labelledby="ep-title">
        <title id="ep-title">
          Prix d’un point d’énergie : 300 kamas jusqu’au 600e point acheté dans la journée, puis hausse jusqu’à 2 000 kamas au
          1 000e.
        </title>
        <defs>
          <linearGradient id="ep-area" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" className="chart-stop-2" stopOpacity="0.3" />
            <stop offset="1" className="chart-stop-2" stopOpacity="0" />
          </linearGradient>
        </defs>
        {[0, 1000, 2000].map((v) => (
          <g key={v}>
            <line className={v ? 'chart-grid' : 'chart-axis'} x1={M.l} x2={W - M.r} y1={y(v)} y2={y(v)} />
            <text className="chart-text" x={M.l - 6} y={y(v) + 5} textAnchor="end" fontSize={FS}>
              {fmt(v)}
            </text>
          </g>
        ))}
        {[0, 600, 1000].map((n) => (
          <text key={n} className="chart-text" x={x(n)} y={H - M.b + 20} textAnchor="middle" fontSize={FS}>
            {fmt(n)}
          </text>
        ))}
        <text className="chart-text" x={M.l + PW / 2} y={H - 4} textAnchor="middle" fontSize={FS}>
          Points achetés aujourd’hui
        </text>
        <line className="chart-marker" x1={x(600)} x2={x(600)} y1={M.t} y2={M.t + PH} />
        <path d={area} fill="url(#ep-area)" stroke="none" />
        <path className="chart-line chart-line-2" d={path} />
        <circle className="chart-pt chart-pt-1 chart-pt-hollow" cx={x(600)} cy={y(300)} r={4.5} />
        <circle className="chart-pt chart-pt-1 chart-pt-fill" cx={x(1000)} cy={y(2000)} r={4.5} />
        <text className="chart-label" x={x(300)} y={y(300) - 10} textAnchor="middle" fontSize={FS}>
          300 k
        </text>
        <text className="chart-label" x={x(1000) - 10} y={y(2000) + 5} textAnchor="end" fontSize={FS}>
          2 000 k
        </text>
      </svg>
      <figcaption>Prix du point en kamas : stable jusqu’à 600, puis hausse linéaire jusqu’à 1 000 (maximum par jour).</figcaption>
    </figure>
  );
}
