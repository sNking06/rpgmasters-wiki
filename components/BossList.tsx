'use client';
import Link from 'next/link';
import { bossEntries } from '@/lib/nav';
import { useMemo, useState } from 'react';
const bosses = bossEntries;
import { More, TableWrap } from './ui';
import { normalize, SearchFilter, ResultCount } from './CatalogFilters';
export function BossList() {
  const [q, setQ] = useState('');
  const [min, setMin] = useState('');
  const [max, setMax] = useState('');
  const [mechanics, setMechanics] = useState(false);
  const rows = useMemo(() => bosses.filter(b => (!min || b.level >= Number(min)) && (!max || b.level <= Number(max)) && (!mechanics || b.mechanics.length > 0) && normalize(JSON.stringify(b)).includes(normalize(q.trim()))), [q, min, max, mechanics]);
  return <div className="catalogue">
    <div className="item-filters"><SearchFilter value={q} onChange={setQ} /><label>Niveau minimum<input type="number" min="0" value={min} onChange={e => setMin(e.target.value)} /></label><label>Niveau maximum<input type="number" min="0" value={max} onChange={e => setMax(e.target.value)} /></label><label><input type="checkbox" checked={mechanics} onChange={e => setMechanics(e.target.checked)} /> Avec mécaniques relevées</label></div>
    <ResultCount count={rows.length} total={bosses.length} noun="fiches" />
    {rows.map(b => <More key={b.location} title={`${b.name} · niveau ${b.level}${b.bestiary ? '' : ' · complément hors bestiaire'}`}>
      <p><Link href={`/monde/boss/${b.slug}/`}>Voir la fiche de {b.name} →</Link></p><p>{b.location}</p><h3>Mécaniques par difficulté</h3>
      {b.mechanics.length ? b.mechanics.map((m, i) => <div key={i}><h4>{m.tier} — {m.mechanic}</h4><p>{m.text}</p><p className="muted">Sources en jeu : {m.sources}</p></div>) : <p>Mécaniques non collectées pour ce boss (ou verrouillées en jeu).</p>}
      <h3>Butin affiché</h3>{b.drops.length ? <TableWrap caption={`Butin de ${b.name}`}><thead><tr><th scope="col">Objet</th><th scope="col">Taux affiché</th></tr></thead><tbody>{b.drops.map((d, i) => <tr key={i}><td>{d.item}</td><td>{d.drop_pct}</td></tr>)}</tbody></TableWrap> : <p>Aucun relevé de butin dans ce fichier.</p>}
    </More>)}
  </div>;
}
