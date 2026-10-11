'use client';

import Link from 'next/link';
import { useState } from 'react';
import type { ClassPassive } from '@/lib/classes';
import { ClassIcon, Icon } from './icons';

const norm = (s: string) =>
  s
    .toLowerCase()
    .replace(/œ/g, 'oe')
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '');

/** Grille de cartes compactes (pictogramme, nom + passif en une ligne), texte complet repliable, filtre côté client. */
export default function ClassGrid({ classes }: { classes: ClassPassive[] }) {
  const [q, setQ] = useState('');
  const n = norm(q.trim());
  const shown = n ? classes.filter((c) => norm(`${c.name} ${c.passive} ${c.text}`).includes(n)) : classes;

  return (
    <>
      <div className="filter-wrap">
        <label htmlFor="class-filter" className="sr-only">
          Filtrer les classes
        </label>
        <Icon name="search" size={18} />
        <input
          id="class-filter"
          className="class-filter"
          type="search"
          placeholder="Filtrer : nom, passif ou mot-clé (ex. : invocation, PA)…"
          autoComplete="off"
          value={q}
          onChange={(e) => setQ(e.target.value)}
        />
      </div>
      {n ? (
        <p className="class-count" role="status">
          {shown.length} classe{shown.length > 1 ? 's' : ''} sur {classes.length}
        </p>
      ) : null}
      <ul className="class-grid">
        {shown.map((c) => (
          <li key={c.name} id={c.slug ? `classe-${c.slug}` : undefined}>
            <details className={`class-card${c.slug ? ' card-hl' : ''}`}>
              <summary>
                <span className="medal" aria-hidden="true">
                  <ClassIcon name={c.name} size={24} />
                </span>
                <span>
                  <span className="class-name">{c.name}</span> · <span className="class-passive">{c.passive}</span>
                  <span className="class-short">{c.short}</span>
                </span>
                <Icon name="chevron" size={18} className="sum-chev" />
              </summary>
              <div className="class-body">
                <p>{c.text}</p>
                {c.slug ? (
                  <p>
                    <Link href={`/classes/${c.slug}/`}>Voir la fiche {c.name} →</Link>
                  </p>
                ) : null}
              </div>
            </details>
          </li>
        ))}
      </ul>
      {shown.length === 0 ? <p className="class-empty">Aucune classe ne correspond.</p> : null}
    </>
  );
}
