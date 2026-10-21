export { More, TableWrap, fmt } from './TablePrimitives';
import Link from 'next/link';
import Illustration from './Illustration';
import { illustrationFor, type IllustrationName } from '@/lib/illustrations';
import { StatIcon, type StatIconName } from './icons';
import type { CSSProperties, ReactNode } from 'react';
import { DATA_DATE_LABEL } from '@/lib/site';
import { ElementIcon, Icon, SectionIcon, type ElementKey, type SectionKey } from './icons';

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

/** Petite puce « Données du … ». */
export function DateChip({ extra, strong = false }: { extra?: string; strong?: boolean }) {
  return (
    <p className={strong ? 'date-badge' : 'date-chip'}>
      <Icon name="calendar" size={16} /> {DATA_DATE_LABEL}
      {extra ? ` · ${extra}` : null}
    </p>
  );
}

export function PageHeader({
  title,
  intro,
  crumbs = [],
  dateBadge = false,
  section,
  icon,
  art,
  href,
}: {
  art?: IllustrationName;
  href?: string;
  title: string;
  intro: ReactNode;
  crumbs?: Crumb[];
  /** Badge de date appuyé (page Saison) au lieu de la petite puce ; une chaîne est ajoutée après la date. */
  dateBadge?: boolean | string;
  /** Pictogramme de section (médaillon à côté du titre). */
  section?: SectionKey;
  /** Pictogramme personnalisé (ex. classe), prioritaire sur `section`. */
  icon?: ReactNode;
}) {
  const fallback: Partial<Record<SectionKey, IllustrationName>> = {
    home: 'home', classes: 'personnage', stats: 'personnage', arene: 'contenus',
    saison: 'contenus', energie: 'debuter', prestige: 'personnage', economie: 'economie',
    guide: 'personnage', faq: 'debuter', sources: 'home',
  };
  const scene = art ?? (href ? illustrationFor(href) : (section && fallback[section]) || 'home');
  return (
    <header className="page-header illustrated-header">
      <Illustration name={scene} alt="" className="banner-art" />
      <div className="banner-copy">
        <div className="title-row">
          {icon || section ? (
            <span className="medal medal-lg" aria-hidden="true">
              {icon ?? (section ? <SectionIcon section={section} size={28} /> : null)}
            </span>
          ) : null}
          <h1>{title}</h1>
        </div>
        <p className="intro">{intro}</p>
        <DateChip strong={!!dateBadge} extra={typeof dateBadge === 'string' ? dateBadge : undefined} />
      </div>
    </header>
  );
}

/** Encadré « L'essentiel » : 3 à 5 puces. */
export function Essentiel({ children, title = 'L’essentiel', list = 'ul', id = 'essentiel-h' }: { children: ReactNode; title?: string; list?: 'ul' | 'build'; id?: string }) {
  return (
    <aside className="essentiel" aria-labelledby={id}>
      <h2 id={id}>
        <Icon name="sparkle" size={18} /> {title}
      </h2>
      {list === 'build' ? <ol className="build">{children}</ol> : <ul>{children}</ul>}
    </aside>
  );
}

/** Fiche récapitulative (infobox) : libellé → valeur. */
export function Fiche({ title, rows, icon }: { title: string; rows: [ReactNode, ReactNode][]; icon?: ReactNode }) {
  return (
    <div className="fiche">
      <p className="fiche-title">
        {icon ? (
          <span className="medal" aria-hidden="true">
            {icon}
          </span>
        ) : null}
        {title}
      </p>
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

export function Tip({ title = 'Astuce', children }: { title?: string; children: ReactNode }) {
  return (
    <div className="callout callout-tip">
      <p className="callout-title">
        <Icon name="bulb" size={18} /> {title}
      </p>
      {children}
    </div>
  );
}

export function Warn({ title = 'Attention', children }: { title?: string; children: ReactNode }) {
  return (
    <div className="callout callout-warn">
      <p className="callout-title">
        <Icon name="warning" size={18} /> {title}
      </p>
      {children}
    </div>
  );
}

export function Info({ title, icon, children }: { title: ReactNode; icon?: ReactNode; children: ReactNode }) {
  return (
    <div className="callout callout-info">
      <p className="callout-title">
        {icon ?? <Icon name="info" size={18} />} {title}
      </p>
      {children}
    </div>
  );
}

const EL_KEY: Record<string, ElementKey> = { terre: 'terre', feu: 'feu', eau: 'eau', air: 'air', none: 'neutre' };

/** Pastille d'élément : pictogramme + texte (jamais la couleur seule). */
export function El({ kind, children }: { kind: 'terre' | 'feu' | 'eau' | 'air' | 'none'; children: ReactNode }) {
  return (
    <span className={`el el-${kind}`}>
      <ElementIcon element={EL_KEY[kind]} size={16} strokeWidth={2} />
      {children}
    </span>
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
              <span className="bar-fill" style={{ '--w': `${Math.max(0, (it.value / max) * 100)}%` } as CSSProperties} />
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
  return (
    <nav className="page-end" aria-label="Voir aussi et pages voisines">
      {see.length ? (
        <>
          <p className="page-end-title">Voir aussi</p>
          <ul className="see-also">
            {see.map((s) => (
              <li key={s.href}>
                <Link href={s.href}>
                  {s.label}
                  <Icon name="arrowRight" size={16} />
                </Link>
              </li>
            ))}
          </ul>
        </>
      ) : null}
      {sources ? (
        <p className="page-sources">
          Sources : {sources} · <Link href="/a-propos/sources/#legende">légende ✓ ~ = ?</Link>
        </p>
      ) : null}
    </nav>
  );
}

export type KeyFigure = { icon: StatIconName; value: string; label: string; note?: string };

export function Stat({ icon, value, label }: Omit<KeyFigure, 'note'>) {
  return <div className="stat"><StatIcon name={icon} size={24} /><strong className="stat-value">{value}</strong><span className="stat-label">{label}</span></div>;
}

export function KeyFigures({ items }: { items: KeyFigure[] }) {
  return <ul className="key-figures" aria-label="Chiffres clés">{items.map((item, i) =>
    <li key={i}><Stat {...item} />{item.note ? <span className="stat-note">{item.note}</span> : null}</li>
  )}</ul>;
}

export function TlDr({ children }: { children: ReactNode }) {
  return <Essentiel title="À retenir" id="a-retenir-h">{children}</Essentiel>;
}

/** Pastille de source : annonce officielle du développeur sur le Discord (#annonces ou #faq). */
export function Disc({ d, salon = 'annonces' }: { d: string; salon?: 'annonces' | 'faq' }) {
  return (
    <span className="src-disc" title={`Discord officiel, ${salon === 'faq' ? 'salon #faq' : 'annonce'} du ${d} (signée du développeur)`}>
      Discord officiel, {salon === 'faq' ? '#faq' : 'annonce'} du {d}
    </span>
  );
}

/** Encadré « Contradiction » : deux sources qui ne disent pas la même chose. Rien n’est supprimé. */
export function Contra({ title = 'Contradiction entre sources', children }: { title?: string; children: ReactNode }) {
  return (
    <div className="callout callout-warn callout-contra">
      <p className="callout-title">
        <Icon name="warning" size={18} /> {title}
      </p>
      {children}
    </div>
  );
}

/** Encadré « Annonce officielle » (Discord du jeu). */
export function Officiel({ title, d, children }: { title: ReactNode; d: string; children: ReactNode }) {
  return (
    <div className="callout callout-info callout-officiel">
      <p className="callout-title">
        <Icon name="scroll" size={18} /> {title} <Disc d={d} />
      </p>
      {children}
    </div>
  );
}

/** Encadré « Conseils de joueurs, non officiels » (Discord, au conditionnel, sans pseudos). */
export function Joueurs({ title = 'Conseils de joueurs — non officiels', src, children }: { title?: ReactNode; src?: string; children: ReactNode }) {
  return (
    <div className="callout callout-tip callout-joueurs">
      <p className="callout-title">
        <Icon name="bulb" size={18} /> {title}
        {src ? <span className="src-joueur">Discord, {src} · non officiel</span> : null}
      </p>
      {children}
    </div>
  );
}
