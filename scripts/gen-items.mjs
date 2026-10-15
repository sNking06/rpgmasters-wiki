// Génère data/items.json depuis le CSV relevé en jeu (bestiaire, 2026-10-15).
import { readFile, writeFile } from 'node:fs/promises';
const SRC = process.env.ITEMS_CSV || 'sources/rpgmasters-items-endgame.csv';
import { parse } from './csv.mjs';
const [head, ...rows] = parse(await readFile(SRC, 'utf8'));
const items = rows.map((r) => Object.fromEntries(head.map((h, i) => [h, (r[i] ?? '').trim()]).filter(([h, v]) => v !== '' && h !== 'source_url')));
await writeFile('data/items.json', JSON.stringify(items));
console.log(`items.json : ${items.length} objets`);
