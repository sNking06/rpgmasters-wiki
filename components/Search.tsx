'use client';

import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useId, useMemo, useRef, useState, type KeyboardEvent as RKeyboardEvent, type ReactNode } from 'react';
import { Icon, SectionIcon, type SectionKey } from './icons';
import { MAIN_NAV, MORE_NAV, sectionOf } from '@/lib/site';

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

/** Surligne les termes (comparaison sans accents ni casse) dans un texte d'origine. */
function highlight(text: string, terms: string[]): ReactNode {
  if (!terms.length) return text;
  const { norm, map } = normalizeWithMap(text);
  const ranges: [number, number][] = [];
  for (const t of terms) {
    let from = 0;
    let pos: number;
    while ((pos = norm.indexOf(t, from)) >= 0) {
      ranges.push([map[pos], map[pos + t.length - 1] + 1]);
      from = pos + t.length;
    }
  }
  if (!ranges.length) return text;
  ranges.sort((a, b) => a[0] - b[0]);
  const out: ReactNode[] = [];
  let cur = 0;
  for (const [s, e] of ranges) {
    if (s < cur) continue;
    if (s > cur) out.push(text.slice(cur, s));
    out.push(<mark key={s}>{text.slice(s, e)}</mark>);
    cur = e;
  }
  out.push(text.slice(cur));
  return out;
}

type Option = { key: string; url: string; title: string; sub?: string; ex?: ReactNode; icon: SectionKey };

const QUICK: Option[] = [...MAIN_NAV, ...MORE_NAV].map((n) => ({
  key: n.href,
  url: n.href,
  title: n.label,
  ex: n.desc,
  icon: n.icon,
}));

export const OPEN_SEARCH_EVENT = 'rpg:open-search';

const isTyping = (el: EventTarget | null) =>
  el instanceof HTMLElement && (el.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(el.tagName));

/** Bouton du header + palette de recherche (Ctrl/Cmd+K, « / »). L'index est chargé à la première ouverture. */
export default function Search({ onOpen }: { onOpen?: () => void }) {
  const router = useRouter();
  const uid = useId();
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState('');
  const [active, setActive] = useState(0);
  const [data, setData] = useState<Prepared[] | null>(null);
  const [error, setError] = useState(false);
  const [mac, setMac] = useState(false);
  const loading = useRef(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const returnFocus = useRef<HTMLElement | null>(null);

  const load = useCallback(() => {
    if (loading.current) return;
    loading.current = true;
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
  }, []);

  const show = useCallback(() => {
    returnFocus.current = document.activeElement as HTMLElement | null;
    load();
    onOpen?.();
    setOpen(true);
  }, [load, onOpen]);

  const close = useCallback(() => {
    setOpen(false);
    setQ('');
    setActive(0);
    returnFocus.current?.focus?.();
  }, []);

  // Raccourcis globaux + ouverture depuis d'autres boutons (accueil).
  useEffect(() => {
    setMac(/Mac|iPhone|iPad/.test(navigator.platform || navigator.userAgent));
    const onKey = (ev: KeyboardEvent) => {
      if ((ev.metaKey || ev.ctrlKey) && ev.key.toLowerCase() === 'k') {
        ev.preventDefault();
        if (open) close();
        else show();
      } else if (ev.key === '/' && !open && !isTyping(ev.target)) {
        ev.preventDefault();
        show();
      }
    };
    const onEvt = () => show();
    document.addEventListener('keydown', onKey);
    window.addEventListener(OPEN_SEARCH_EVENT, onEvt);
    return () => {
      document.removeEventListener('keydown', onKey);
      window.removeEventListener(OPEN_SEARCH_EVENT, onEvt);
    };
  }, [open, show, close]);

  // Focus dans le champ + blocage du défilement de la page.
  useEffect(() => {
    if (!open) return;
    inputRef.current?.focus();
    const root = document.documentElement;
    root.classList.add('is-locked');
    return () => root.classList.remove('is-locked');
  }, [open]);

  const terms = useMemo(
    () =>
      normalize(q)
        .split(/\s+/)
        .filter((t) => t.length > 1),
    [q],
  );

  const options: Option[] = useMemo(() => {
    if (!terms.length) return QUICK;
    if (!data) return [];
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
      .map(({ e }) => ({
        key: e.url,
        url: e.url,
        title: e.title,
        sub: e.title !== e.page ? e.page : undefined,
        ex: highlight(excerpt(e, terms[0]), terms),
        icon: sectionOf(e.url),
      }));
  }, [terms, data]);

  useEffect(() => setActive(0), [q]);

  // Garde l'option active visible.
  useEffect(() => {
    listRef.current?.querySelector<HTMLElement>(`[data-i="${active}"]`)?.scrollIntoView({ block: 'nearest' });
  }, [active]);

  const go = (url: string) => {
    setOpen(false);
    setQ('');
    setActive(0);
    router.push(url);
  };

  const onKeyDown = (ev: RKeyboardEvent) => {
    if (ev.key === 'Escape') {
      ev.preventDefault();
      close();
    } else if (ev.key === 'ArrowDown') {
      ev.preventDefault();
      if (options.length) setActive((a) => (a + 1) % options.length);
    } else if (ev.key === 'ArrowUp') {
      ev.preventDefault();
      if (options.length) setActive((a) => (a - 1 + options.length) % options.length);
    } else if (ev.key === 'Enter') {
      const o = options[active];
      if (o) {
        ev.preventDefault();
        go(o.url);
      }
    } else if (ev.key === 'Tab') {
      // Focus piégé dans la boîte de dialogue.
      const f = dialogRef.current?.querySelectorAll<HTMLElement>('input, button');
      if (!f || !f.length) return;
      const first = f[0];
      const last = f[f.length - 1];
      if (ev.shiftKey && document.activeElement === first) {
        ev.preventDefault();
        last.focus();
      } else if (!ev.shiftKey && document.activeElement === last) {
        ev.preventDefault();
        first.focus();
      }
    }
  };

  const listId = `${uid}-list`;
  const optId = (i: number) => `${uid}-opt-${i}`;
  const pending = terms.length > 0 && !data && !error;
  const status = error
    ? 'Index de recherche indisponible (généré lors de « npm run build »).'
    : pending
      ? 'Chargement…'
      : terms.length && options.length === 0
        ? 'Aucun résultat.'
        : terms.length
          ? `${options.length} résultat${options.length > 1 ? 's' : ''}`
          : '';

  return (
    <>
      <button type="button" className="search-trigger" onClick={show} aria-haspopup="dialog" aria-label="Rechercher dans le wiki">
        <Icon name="search" size={20} />
        <span className="search-trigger-label">Rechercher…</span>
        <kbd className="search-kbd" aria-hidden="true">
          {mac ? '⌘' : 'Ctrl'} K
        </kbd>
      </button>

      {open ? (
        <div className="palette-backdrop" onMouseDown={(e) => e.target === e.currentTarget && close()}>
          <div
            className="palette"
            role="dialog"
            aria-modal="true"
            aria-labelledby={`${uid}-title`}
            ref={dialogRef}
            onKeyDown={onKeyDown}
          >
            <h2 id={`${uid}-title`} className="sr-only">
              Rechercher dans le wiki
            </h2>
            <div className="palette-field">
              <Icon name="search" size={22} />
              <input
                ref={inputRef}
                type="text"
                role="combobox"
                aria-expanded={options.length > 0}
                aria-controls={listId}
                aria-autocomplete="list"
                aria-activedescendant={options.length ? optId(active) : undefined}
                aria-label="Rechercher dans le wiki"
                placeholder="Rechercher… (ex. : prestige, elo, crâ)"
                autoComplete="off"
                spellCheck={false}
                value={q}
                onChange={(e) => setQ(e.target.value)}
              />
              <button type="button" className="palette-close" onClick={close} aria-label="Fermer la recherche">
                <kbd aria-hidden="true">Échap</kbd>
              </button>
            </div>

            <div className="palette-body">
              <p className="palette-group">{terms.length ? 'Résultats' : 'Accès rapide'}</p>
              <ul id={listId} role="listbox" aria-label={terms.length ? 'Résultats' : 'Accès rapide'} ref={listRef}>
                {options.map((o, i) => (
                  <li
                    key={o.key}
                    id={optId(i)}
                    data-i={i}
                    role="option"
                    aria-selected={i === active}
                    className={i === active ? 'is-active' : undefined}
                    onMouseMove={() => i !== active && setActive(i)}
                    onClick={() => go(o.url)}
                  >
                    <span className="opt-icon">
                      <SectionIcon section={o.icon} size={20} />
                    </span>
                    <span className="opt-main">
                      <span className="opt-title">
                        {o.title}
                        {o.sub ? <span className="opt-sub"> · {o.sub}</span> : null}
                      </span>
                      {o.ex ? <span className="opt-ex">{o.ex}</span> : null}
                    </span>
                    <span className="opt-go" aria-hidden="true">
                      <Icon name="enter" size={16} />
                    </span>
                  </li>
                ))}
              </ul>
              {status && (error || pending || !options.length) ? <p className="palette-empty">{status}</p> : null}
            </div>
            <p className="sr-only" role="status" aria-live="polite">
              {status}
            </p>
            <div className="palette-foot" aria-hidden="true">
              <span>
                <kbd>↑</kbd>
                <kbd>↓</kbd> naviguer
              </span>
              <span>
                <kbd>Entrée</kbd> ouvrir
              </span>
              <span>
                <kbd>Échap</kbd> fermer
              </span>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}

/** Bouton secondaire qui ouvre la palette (ex. héros de l'accueil). */
export function OpenSearchButton({ className, children }: { className?: string; children: ReactNode }) {
  return (
    <button type="button" className={className} onClick={() => window.dispatchEvent(new Event(OPEN_SEARCH_EVENT))}>
      {children}
    </button>
  );
}
