'use client';

import { useEffect, useMemo, useRef, useState } from 'react';

type Entry = { title: string; page: string; url: string; text: string };

/** Normalise un texte (minuscules, sans accents, ligatures dépliées) en gardant la correspondance des positions. */
function normalizeWithMap(src: string): { norm: string; map: number[] } {
  let norm = '';
  const map: number[] = [];
  for (let i = 0; i < src.length; i++) {
    let c = src[i].toLowerCase();
    if (c === 'œ') c = 'oe';
    else if (c === 'æ') c = 'ae';
    else c = c.normalize('NFD').replace(/[̀-ͯ]/g, '');
    for (const ch of c) {
      norm += ch;
      map.push(i);
    }
  }
  return { norm, map };
}

const normalize = (s: string) => normalizeWithMap(s).norm;

type Prepared = Entry & { nTitle: string; nText: string; map: number[] };

function excerpt(e: Prepared, term: string): string {
  const pos = e.nText.indexOf(term);
  if (pos < 0) return e.text.slice(0, 140) + (e.text.length > 140 ? '…' : '');
  const start = e.map[Math.max(0, pos - 60)] ?? 0;
  const end = e.map[Math.min(e.map.length - 1, pos + term.length + 80)] ?? e.text.length;
  return (start > 0 ? '…' : '') + e.text.slice(start, end + 1).trim() + (end + 1 < e.text.length ? '…' : '');
}

export default function Search({ onNavigate }: { onNavigate?: () => void }) {
  const [q, setQ] = useState('');
  const [data, setData] = useState<Prepared[] | null>(null);
  const [error, setError] = useState(false);
  const [open, setOpen] = useState(false);
  const boxRef = useRef<HTMLDivElement>(null);

  const load = () => {
    if (data || error) return;
    fetch('/search-index.json')
      .then((r) => {
        if (!r.ok) throw new Error(String(r.status));
        return r.json();
      })
      .then((entries: Entry[]) => {
        setData(
          entries.map((e) => {
            const { norm, map } = normalizeWithMap(e.text);
            return { ...e, nTitle: normalize(e.title + ' ' + e.page), nText: norm, map };
          }),
        );
      })
      .catch(() => setError(true));
  };

  useEffect(() => {
    const onDoc = (ev: MouseEvent) => {
      if (boxRef.current && !boxRef.current.contains(ev.target as Node)) setOpen(false);
    };
    document.addEventListener('click', onDoc);
    return () => document.removeEventListener('click', onDoc);
  }, []);

  const results = useMemo(() => {
    const terms = normalize(q).split(/\s+/).filter((t) => t.length > 1);
    if (!data || terms.length === 0) return [];
    return data
      .map((e) => {
        let score = 0;
        for (const t of terms) {
          const inTitle = e.nTitle.includes(t);
          const inText = e.nText.includes(t);
          if (!inTitle && !inText) return null;
          score += (inTitle ? 5 : 0) + (inText ? 1 : 0);
        }
        return { e, score };
      })
      .filter((x): x is { e: Prepared; score: number } => x !== null)
      .sort((a, b) => b.score - a.score)
      .slice(0, 12)
      .map(({ e }) => ({ e, ex: excerpt(e, terms[0]) }));
  }, [q, data]);

  return (
    <div className="search" ref={boxRef}>
      <label htmlFor="site-search" className="sr-only">
        Rechercher dans le wiki
      </label>
      <input
        id="site-search"
        type="search"
        placeholder="Rechercher… (ex. : prestige, elo, crâ)"
        autoComplete="off"
        value={q}
        onFocus={() => {
          load();
          setOpen(true);
        }}
        onChange={(ev) => {
          load();
          setQ(ev.target.value);
          setOpen(true);
        }}
        onKeyDown={(ev) => {
          if (ev.key === 'Escape') setOpen(false);
        }}
      />
      {open && q.trim().length > 1 ? (
        <div className="search-results" role="listbox">
          {error ? (
            <p className="search-empty">Index de recherche indisponible (généré lors de « npm run build »).</p>
          ) : !data ? (
            <p className="search-empty">Chargement…</p>
          ) : results.length === 0 ? (
            <p className="search-empty">Aucun résultat.</p>
          ) : (
            <ul>
              {results.map(({ e, ex }) => (
                <li key={e.url}>
                  <a
                    href={e.url}
                    onClick={() => {
                      setOpen(false);
                      onNavigate?.();
                    }}
                  >
                    <span className="sr-title">
                      {e.title}
                      {e.title !== e.page ? <span className="sr-page"> · {e.page}</span> : null}
                    </span>
                    <span className="sr-ex">{ex}</span>
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>
      ) : null}
    </div>
  );
}
