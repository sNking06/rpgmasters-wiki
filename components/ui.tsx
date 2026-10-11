import Link from 'next/link';
import type { ReactNode } from 'react';
import { DATA_DATE_LABEL, PAGE_ORDER } from '@/lib/site';

/** Statut d'une information : T = [TROUVÉ], D = [DÉDUIT], C = calcul sur valeurs trouvées, N = non trouvé (lacune). */
export type Status = 'T' | 'D' | 'C' | 'N';

export const STATUS_INFO: Record<Status, { glyph: string; label: string; title: string }> = {
  T: { glyph: '✓', label: 'Trouvé', title: '[TROUVÉ] Écrit tel quel dans une page publique ou dans le code client public' },
  D: { glyph: '~', label: 'Déduit', title: '[DÉDUIT] Interprétation, à confirmer en jeu' },
  C: { glyph: '=', label: 'Calcul', title: '[calcul sur TROUVÉ] Calcul fait à partir de valeurs trouvées' },
  N: { glyph: '?', label: 'Non trouvé', title: 'NON TROUVÉ : absent des pages et du code client publics' },
};

/**
 * Pastille discrète en fin de ligne (✓ ~ = ?). Le glyphe est dessiné en CSS (data-g) :
 * il ne pollue pas l'index de recherche, et l'infobulle / aria-label donnent le sens.
 */
export function M({ s }: { s: Status | Status[] }) {
  const list = Array.isArray(s) ? s : [s];
  return (
    <>
      {list.map((x) => (
        <span
          key={x}
          className={`mark mark-${x}`}
          data-g={STATUS_INFO[x].glyph}
          role="img"
          aria-label={STATUS_INFO[x].label}
          title={STATUS_INFO[x].title}
        />
      ))}
    </>
  );
}

export type Crumb = { href: string; label: string };

export function PageHeader({
  title,
  intro,
  crumbs = [],
  dateBadge = false,
}: {
  title: string;
  intro: ReactNode;
  crumbs?: Crumb[];
  /** Badge de date appuyé (page Saison) au lieu de la petite puce ; une chaîne est ajoutée après la date. */
  dateBadge?: boolean | string;
}) {
  return (
    <header className="page-header">
      <nav className="crumbs" aria-label="Fil d’Ariane">
        <ol>
          <li>
            <Link href="/">Accueil</Link>
          </li>
          {crumbs.map((c) => (
            <li key={c.href}>
              <Link href={c.href}>{c.label}</Link>
            </li>
          ))}
          <li aria-current="page">{title}</li>
        </ol>
      </nav>
      <h1>{title}</h1>
      <p className="intro">{intro}</p>
      <p className={dateBadge ? 'date-badge' : 'date-chip'}>
        <span aria-hidden="true">📅</span> {DATA_DATE_LABEL}
        {typeof dateBadge === 'string' ? ` · ${dateBadge}` : null}
      </p>
    </header>
  );
}

/** Encadré « L'essentiel » : 3 à 5 puces. */
export function Essentiel({ children, title = 'L’essentiel', list = 'ul' }: { children: ReactNode; title?: string; list?: 'ul' | 'build' }) {
  return (
    <aside className="essentiel" aria-labelledby="essentiel-h">
      <h2 id="essentiel-h">{title}</h2>
      {list === 'build' ? <ol className="build">{children}</ol> : <ul>{children}</ul>}
    </aside>
  );
}

/** Fiche récapitulative (infobox) : libellé → valeur. */
export function Fiche({ title, rows }: { title: string; rows: [ReactNode, ReactNode][] }) {
  return (
    <div className="fiche">
      <p className="fiche-title">{title}</p>
      <dl>
        {rows.map(([k, v], i) => (
          <div key={i} className="fiche-row">
            <dt>{k}</dt>
            <dd>{v}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

export function Section({ id, title, children }: { id: string; title: string; children: ReactNode }) {
  return (
    <section id={id} className="section">
      <h2>
        <a href={`#${id}`} className="anchor">
          {title}
        </a>
      </h2>
      {children}
    </section>
  );
}

/** Détails secondaires repliables. */
export function More({ title, children, id }: { title: ReactNode; children: ReactNode; id?: string }) {
  return (
    <details className="more" id={id}>
      <summary>{title}</summary>
      <div className="more-body">{children}</div>
    </details>
  );
}

export function Tip({ title = 'Astuce', children }: { title?: string; children: ReactNode }) {
  return (
    <div className="callout callout-tip">
      <p className="callout-title">
        <span aria-hidden="true">💡</span> {title}
      </p>
      {children}
    </div>
  );
}

export function Warn({ title = 'Attention', children }: { title?: string; children: ReactNode }) {
  return (
    <div className="callout callout-warn">
      <p className="callout-title">
        <span aria-hidden="true">⚠️</span> {title}
      </p>
      {children}
    </div>
  );
}

/** Tableau scrollable dans son conteneur sur mobile. */
export function TableWrap({ children, caption }: { children: ReactNode; caption?: string }) {
  return (
    <div className="table-wrap" role="region" aria-label={caption} tabIndex={0}>
      <table>
        {caption ? <caption>{caption}</caption> : null}
        {children}
      </table>
    </div>
  );
}

/** Barres horizontales simples (une valeur par ligne). */
export function Bars({
  items,
  max,
  label,
  caption,
}: {
  items: { name: ReactNode; value: number; display: string; hl?: boolean }[];
  max: number;
  label: string;
  caption?: ReactNode;
}) {
  return (
    <figure className="viz">
      <ul className="bars" aria-label={label}>
        {items.map((it, i) => (
          <li key={i} className={it.hl ? 'is-hl' : undefined}>
            <span className="bar-label">{it.name}</span>
            <span className="bar-track" aria-hidden="true">
              <span className="bar-fill" style={{ width: `${Math.max(0, (it.value / max) * 100)}%` }} />
            </span>
            <span className="bar-val">{it.display}</span>
          </li>
        ))}
      </ul>
      {caption ? <figcaption>{caption}</figcaption> : null}
    </figure>
  );
}

/** Jauge à segments (ex. vision spectrale 26 % + marge PO → plafond 60 %). */
export function Meter({
  max,
  segments,
  ticks = [],
  label,
  caption,
}: {
  max: number;
  segments: { value: number; kind: 'a' | 'b' | 'c'; legend: ReactNode }[];
  ticks?: { at: number; label: string }[];
  label: string;
  caption?: ReactNode;
}) {
  return (
    <figure className="viz">
      <div className="meter" role="img" aria-label={label}>
        <div className="meter-track">
          {segments.map((s, i) => (
            <span key={i} className={`meter-seg seg-${s.kind}`} style={{ width: `${(s.value / max) * 100}%` }} />
          ))}
        </div>
        {ticks.length ? (
          <div className="meter-ticks" aria-hidden="true">
            {ticks.map((t) => (
              <span key={t.at} style={{ left: `${(t.at / max) * 100}%` }}>
                {t.label}
              </span>
            ))}
          </div>
        ) : null}
      </div>
      <ul className="meter-legend">
        {segments.map((s, i) => (
          <li key={i}>
            <span className={`swatch seg-${s.kind}`} aria-hidden="true" /> {s.legend}
          </li>
        ))}
      </ul>
      {caption ? <figcaption>{caption}</figcaption> : null}
    </figure>
  );
}

/** Pied de page : « Voir aussi », sources de la page, précédent / suivant. */
export function PageEnd({ current, see, sources }: { current: string; see: Crumb[]; sources?: string }) {
  const i = PAGE_ORDER.findIndex((p) => p.href === current);
  const prev = i > 0 ? PAGE_ORDER[i - 1] : null;
  const next = i >= 0 && i < PAGE_ORDER.length - 1 ? PAGE_ORDER[i + 1] : null;
  return (
    <nav className="page-end" aria-label="Voir aussi et pages voisines">
      {see.length ? (
        <>
          <p className="page-end-title">Voir aussi</p>
          <ul className="see-also">
            {see.map((s) => (
              <li key={s.href}>
                <Link href={s.href}>{s.label}</Link>
              </li>
            ))}
          </ul>
        </>
      ) : null}
      {sources ? (
        <p className="page-sources">
          Sources : {sources} · <Link href="/sources/#legende">légende ✓ ~ = ?</Link>
        </p>
      ) : null}
      <div className="prev-next">
        {prev ? (
          <Link href={prev.href} className="pn pn-prev">
            <span className="pn-dir">← Précédent</span>
            {prev.label}
          </Link>
        ) : (
          <span />
        )}
        {next ? (
          <Link href={next.href} className="pn pn-next">
            <span className="pn-dir">Suivant →</span>
            {next.label}
          </Link>
        ) : null}
      </div>
    </nav>
  );
}

/** Nombre au format français, espaces insécables (pas de retour à la ligne au milieu d'un nombre). */
export const fmt = (n: number) => n.toLocaleString('fr-FR').replace(/[   ]/g, ' ');
