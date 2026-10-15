// Génère data/items.json depuis le CSV relevé en jeu (bestiaire, 2026-10-15).
import { readFile, writeFile } from 'node:fs/promises';
const SRC = process.env.ITEMS_CSV || 'sources/rpgmasters-items-endgame.csv';
function parse(t) {
  const rows = []; let row = [], f = '', q = false;
  for (let i = 0; i < t.length; i++) {
    const c = t[i];
    if (q) { if (c === '"') { if (t[i + 1] === '"') { f += '"'; i++; } else q = false; } else f += c; }
    else if (c === '"') q = true;
    else if (c === ',') { row.push(f); f = ''; }
    else if (c === '\n' || c === '\r') { if (c === '\r' && t[i + 1] === '\n') i++; row.push(f); rows.push(row); row = []; f = ''; }
    else f += c;
  }
  if (f || row.length) { row.push(f); rows.push(row); }
  return rows.filter((r) => r.some((x) => x.trim()));
}
const [head, ...rows] = parse(await readFile(SRC, 'utf8'));
const items = rows.map((r) => Object.fromEntries(head.map((h, i) => [h, (r[i] ?? '').trim()]).filter(([h, v]) => v !== '' && h !== 'source_url')));
await writeFile('data/items.json', JSON.stringify(items));
console.log(`items.json : ${items.length} objets`);
