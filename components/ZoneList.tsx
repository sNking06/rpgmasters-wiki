'use client';
import Link from 'next/link';
import { zoneEntries } from '@/lib/nav';
import { useMemo, useState } from 'react';
const zones = zoneEntries;
import { More } from './TablePrimitives';
import { normalize, SearchFilter, ResultCount } from './CatalogFilters';
export function ZoneList() {
  const [q, setQ] = useState('');
  const rows = useMemo(() => zones.map(z => ({ ...z, monsters: z.monsters.filter(m => normalize(`${z.name} ${z.level} ${JSON.stringify(m)}`).includes(normalize(q.trim()))) })).filter(z => z.monsters.length), [q]);
  return <div className="catalogue"><div className="item-filters"><SearchFilter value={q} onChange={setQ} /></div><ResultCount count={rows.length} total={zones.length} noun="zones" />
    {rows.map(z => <More key={z.name} title={`${z.name} · niveaux ${z.level} · ${z.monsters.length} monstres`}>
      <p><Link href={`/monde/zones/${z.slug}/`}><span className="tree-label">Voir la fiche de {z.name}</span></Link></p>{z.monsters.map((m, i) => <article key={i}><h3>{m.monster} · niveaux {m.level}</h3><p>Famille : {m.family || 'Non affichée'}</p><h4>Objets bonus de victoire</h4>{m.drops.length ? <ul>{m.drops.map(d => <li key={d}>{d}</li>)}</ul> : <p>Pas de butin propre à ce monstre (seulement l’objet bonus de victoire).</p>}</article>)}
    </More>)}
  </div>;
}
