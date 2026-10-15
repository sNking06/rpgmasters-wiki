'use client';
import { useMemo, useState } from 'react';
import ITEMS from '@/data/items.json';

type Item = Record<string, string>;
const items = ITEMS as unknown as Item[];

const STATS: [string, string][] = [
  ['PA', 'PA'], ['PM', 'PM'], ['Portee', 'PO'], ['Vitalite', 'Vita'], ['Sagesse', 'Sag'], ['Force', 'Force'],
  ['Intelligence', 'Intel'], ['Chance', 'Chance'], ['Agilite', 'Agi'], ['Puissance', 'Puis'], ['Critique', 'Crit'],
  ['Dommages_Eau', 'Do Eau'], ['Dommages_Feu', 'Do Feu'], ['Dommages_Terre', 'Do Terre'], ['Dommages_Air', 'Do Air'],
  ['Dommages_Critiques', 'Do Crit'],
];
const RAR = ['Légendaire', 'Mythique', 'Épique', 'Rare'];
const num = (v?: string) => { const m = v?.match(/-?\d+(?:[.,]\d+)?/); return m ? parseFloat(m[0].replace(',', '.')) : NaN; };
const norm = (s: string) => s.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();

export function ItemTable() {
  const slots = useMemo(() => [...new Set(items.map((i) => i.slot))].sort(), []);
  const [q, setQ] = useState('');
  const [slot, setSlot] = useState('');
  const [rar, setRar] = useState('');
  const [lvl, setLvl] = useState(0);
  const [sort, setSort] = useState('level');
  const rows = useMemo(() => {
    const nq = norm(q.trim());
    const r = items.filter((i) => (!slot || i.slot === slot) && (!rar || i.rarity === rar) && num(i.level) >= lvl &&
      (!nq || norm(`${i.name} ${i.set ?? ''} ${i.set_bonus ?? ''} ${i.autres ?? ''}`).includes(nq)));
    return r.sort((a, b) => {
      const d = (num(b[sort]) || 0) - (num(a[sort]) || 0);
      return d || RAR.indexOf(a.rarity) - RAR.indexOf(b.rarity) || a.name.localeCompare(b.name);
    });
  }, [q, slot, rar, lvl, sort]);

  return (
    <div className="item-table">
      <div className="item-filters">
        <label>Recherche<input type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Nom, panoplie, effet…" /></label>
        <label>Emplacement<select value={slot} onChange={(e) => setSlot(e.target.value)}><option value="">Tous</option>{slots.map((s) => <option key={s}>{s}</option>)}</select></label>
        <label>Rareté<select value={rar} onChange={(e) => setRar(e.target.value)}><option value="">Toutes</option>{RAR.map((s) => <option key={s}>{s}</option>)}</select></label>
        <label>Niveau min<select value={lvl} onChange={(e) => setLvl(Number(e.target.value))}>{[0, 150, 185, 190, 195, 200].map((n) => <option key={n} value={n}>{n || 'Tous'}</option>)}</select></label>
        <label>Trier par<select value={sort} onChange={(e) => setSort(e.target.value)}><option value="level">Niveau</option>{STATS.map(([k, l]) => <option key={k} value={k}>{l}</option>)}</select></label>
      </div>
      <p className="item-count">{rows.length} objet{rows.length > 1 ? 's' : ''} sur {items.length}</p>
      <div className="table-wrap" role="region" aria-label="Objets end-game" tabIndex={0}>
        <table>
          <thead><tr><th>Objet</th><th>Empl.</th><th>Niv.</th><th>Rareté</th>{STATS.map(([k, l]) => <th key={k}>{l}</th>)}<th>Résist.</th><th>Panoplie et autres effets</th></tr></thead>
          <tbody>
            {rows.map((i) => (
              <tr key={`${i.name}-${i.slot}-${i.level}`}>
                <td><strong>{i.name}</strong></td><td>{i.slot}</td><td>{i.level}</td><td>{i.rarity}</td>
                {STATS.map(([k]) => <td key={k} className={sort === k ? 'sorted' : undefined}>{i[k] ?? ''}</td>)}
                <td>{i.Resistances ?? ''}</td>
                <td className="item-notes">
                  {i.set ? <div><strong>{i.set}</strong>{i.set_bonus ? ` — ${i.set_bonus}` : ''}</div> : null}
                  {i.Dommages ? <div>Dommages : {i.Dommages}</div> : null}
                  {i.autres ? <div>{i.autres}</div> : null}
                  {i.obtention ? <div className="muted">Obtention : {i.obtention}</div> : null}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
