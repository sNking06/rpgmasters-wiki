'use client';
import { useMemo, useState } from 'react';
import ITEMS from '@/data/items.json';

type Item = Record<string, string>;
const items = ITEMS as unknown as Item[];

const STATS: [string, string][] = [
  ['PA', 'Points d’action'], ['PM', 'Points de mouvement'], ['Portee', 'Portée'],
  ['Vitalite', 'Vitalité'], ['Sagesse', 'Sagesse'], ['Force', 'Force'],
  ['Intelligence', 'Intelligence'], ['Chance', 'Chance'], ['Agilite', 'Agilité'],
  ['Puissance', 'Puissance'], ['Critique', 'Coups critiques'],
  ['Dommages_Eau', 'Dommages Eau'], ['Dommages_Feu', 'Dommages Feu'],
  ['Dommages_Terre', 'Dommages Terre'], ['Dommages_Air', 'Dommages Air'],
  ['Dommages_Critiques', 'Dommages critiques'],
];
const RAR = ['Mythique', 'Légendaire', 'Épique', 'Rare', 'Commun'];
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
        <label>Niveau minimum<select value={lvl} onChange={(e) => setLvl(Number(e.target.value))}>{[0, 150, 185, 190, 195, 200].map((n) => <option key={n} value={n}>{n || 'Tous'}</option>)}</select></label>
        <label>Trier par<select value={sort} onChange={(e) => setSort(e.target.value)}><option value="level">Niveau</option>{STATS.map(([k, l]) => <option key={k} value={k}>{l}</option>)}</select></label>
      </div>
      <ul className="rarity-legend" aria-label="Raretés des objets">{[...RAR].reverse().map((r) => <li key={r}><span className={`rarity rarity-${norm(r)}`}>{r}</span></li>)}</ul>
      <p id="item-table-help">Les colonnes indiquent les bonus affichés en jeu. Points d’action (PA), points de mouvement (PM) et portée (PO). Faites défiler le tableau pour comparer toutes les caractéristiques.</p>
      <p className="item-count" role="status" aria-live="polite">{rows.length} objet{rows.length > 1 ? 's' : ''} sur {items.length}</p>
      <div className="table-wrap" role="region" aria-label="Tableau comparatif des objets" aria-describedby="item-table-help" tabIndex={0}>
        <table>
          <caption>Objets de haut niveau et bonus de caractéristiques — tri décroissant.</caption>
          <thead><tr><th scope="col">Objet</th><th scope="col">Emplacement</th><th scope="col">Niveau</th><th scope="col">Rareté</th>{STATS.map(([k, l]) => <th scope="col" key={k}><abbr title={`Bonus de ${l.toLocaleLowerCase('fr')}, affiché en jeu`}>{l}</abbr></th>)}<th scope="col"><abbr title="Bonus de résistances affichés en jeu">Résistances</abbr></th><th scope="col">Panoplie et autres effets</th></tr></thead>
          <tbody>
            {rows.map((i) => (
              <tr key={`${i.name}-${i.slot}-${i.level}`}>
                <td><strong>{i.name}</strong></td><td>{i.slot}</td><td>{i.level}</td><td><span className={`rarity rarity-${norm(i.rarity)}`}>{i.rarity}</span></td>
                {STATS.map(([k]) => <td key={k} className={sort === k ? 'sorted' : undefined}>{i[k] ?? ''}</td>)}
                <td className="item-res">{i.Resistances ?? ''}</td>
                <td className="item-notes">
                  {i.set ? <div><strong>{i.set}</strong>{i.set_bonus ? ` — ${i.set_bonus}` : ''}</div> : null}
                  {i.Dommages ? <div>Dommages : {i.Dommages}</div> : null}
                  {i.autres ? <div>{i.autres}</div> : null}
                  {i.obtention ? <div className="muted">Obtention : {i.obtention}</div> : null}
                </td>
              </tr>
            ))}
          {rows.length === 0 && <tr><td colSpan={22}>Aucun objet ne correspond à ces filtres.</td></tr>}
          </tbody>
        </table>
      </div>
    </div>
  );
}
