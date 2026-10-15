import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { parse } from './csv.mjs';
async function csv(name) {
  const [headers, ...rows] = parse(await readFile(`sources/rpgmasters-${name}.csv`, 'utf8'));
  return rows.map((row) => {
    if (row.length !== headers.length) throw new Error(`${name}: invalid column count`);
    return Object.fromEntries(headers.map((key, i) => [key, row[i].trim()]));
  });
}
const [drops, mechanics, monsters, cards] = await Promise.all(['boss-drops', 'boss-mechanics', 'zones-monsters', 'cards'].map(csv));
const bosses = new Map();
for (const { boss, etape_or_zone, level, ...drop } of drops) {
  if (!bosses.has(etape_or_zone)) bosses.set(etape_or_zone, { name: boss, location: etape_or_zone, level: Number(level), bestiary: true, drops: [], mechanics: [] });
  bosses.get(etape_or_zone).drops.push(drop);
}
for (const { boss, level, ...mechanic } of mechanics) {
  let matches = [...bosses.values()].filter(b => b.name === boss);
  if (!matches.length) {
    const entry = { name: boss, location: "Hors liste des 106 boss du bestiaire · voir les sources des mécaniques", level: Number(level), bestiary: false, drops: [], mechanics: [] };
    bosses.set(boss, entry);
    matches = [entry];
  }
  for (const entry of matches) entry.mechanics.push(mechanic);
}
const zones = new Map();
for (const { zone, zone_level, mechanics, notable_drops, ...monster } of monsters) {
  if (!zones.has(zone)) zones.set(zone, { name: zone, level: zone_level, monsters: [] });
  zones.get(zone).monsters.push({ ...monster, family: mechanics.replace(/^famille:\s*/i, ''), drops: notable_drops ? notable_drops.split(' | ') : [] });
}
await mkdir('data', { recursive: true });
for (const [name, data] of [['boss', [...bosses.values()]], ['zones', [...zones.values()]], ['cards', cards]]) {
  await writeFile(`data/${name}.json`, JSON.stringify(data));
  console.log(`${name}.json : ${data.length} entrées`);
}
