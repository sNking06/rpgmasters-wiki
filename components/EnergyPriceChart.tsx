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
  return (
    <figure className="viz">
      <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-labelledby="ep-title">
        <title id="ep-title">
          Prix d’un point d’énergie : 300 kamas jusqu’au 600e point acheté dans la journée, puis hausse jusqu’à 2 000 kamas au
          1 000e.
        </title>
        {[0, 1000, 2000].map((v) => (
          <g key={v}>
            <line x1={M.l} x2={W - M.r} y1={y(v)} y2={y(v)} stroke="#2a303b" />
            <text x={M.l - 6} y={y(v) + 5} textAnchor="end" fontSize={FS} fill="#b4bac6">
              {fmt(v)}
            </text>
          </g>
        ))}
        {[0, 600, 1000].map((n) => (
          <text key={n} x={x(n)} y={H - M.b + 20} textAnchor="middle" fontSize={FS} fill="#b4bac6">
            {fmt(n)}
          </text>
        ))}
        <text x={M.l + PW / 2} y={H - 4} textAnchor="middle" fontSize={FS} fill="#b4bac6">
          Points achetés aujourd’hui
        </text>
        <line x1={x(600)} x2={x(600)} y1={M.t} y2={M.t + PH} stroke="#4a5263" strokeDasharray="3 4" />
        <path d={path} fill="none" stroke="#f0c26b" strokeWidth={3} strokeLinejoin="round" />
        <text x={x(300)} y={y(300) - 10} textAnchor="middle" fontSize={FS} fill="#eceef3">
          300 k
        </text>
        <text x={x(1000) - 10} y={y(2000) + 5} textAnchor="end" fontSize={FS} fill="#eceef3">
          2 000 k
        </text>
      </svg>
      <figcaption>Prix du point en kamas : stable jusqu’à 600, puis hausse linéaire jusqu’à 1 000 (maximum par jour).</figcaption>
    </figure>
  );
}
