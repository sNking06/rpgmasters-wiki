import type { ReactNode } from 'react';

/** Statut d'une information : T = [TROUVÉ], D = [DÉDUIT], N = non trouvé (lacune), C = calcul sur valeurs trouvées. */
export type Status = 'T' | 'D' | 'N' | 'C';

const LABELS: Record<Status, string> = {
  T: '[TROUVÉ]',
  D: '[DÉDUIT]',
  N: 'NON TROUVÉ',
  C: '[calcul sur TROUVÉ]',
};

const TITLES: Record<Status, string> = {
  T: 'Écrit tel quel dans une page ou dans le code client public',
  D: 'Interprétation, à confirmer en jeu',
  N: 'Absent des pages et du code client publics',
  C: 'Calcul effectué à partir de valeurs trouvées',
};

export function Badge({ s }: { s: Status }) {
  return (
    <span className={`badge badge-${s}`} title={TITLES[s]}>
      {LABELS[s]}
    </span>
  );
}

/** Une ligne de fait précédée de son (ou ses) badge(s). */
export function Fact({ s, children }: { s: Status | Status[]; children: ReactNode }) {
  const list = Array.isArray(s) ? s : [s];
  return (
    <li className="fact">
      <span className="fact-badges">
        {list.map((x) => (
          <Badge key={x} s={x} />
        ))}
      </span>
      <span className="fact-text">{children}</span>
    </li>
  );
}

export function Facts({ children }: { children: ReactNode }) {
  return <ul className="facts">{children}</ul>;
}

export function Section({ id, title, children }: { id: string; title: string; children: ReactNode }) {
  return (
    <section id={id} className="section">
      <h2 id={`${id}-h`}>
        <a href={`#${id}`} className="anchor">
          {title}
        </a>
      </h2>
      {children}
    </section>
  );
}

export function PageHeader({ title, lead }: { title: string; lead?: ReactNode }) {
  return (
    <header className="page-header">
      <h1>{title}</h1>
      {lead ? <p className="lead">{lead}</p> : null}
    </header>
  );
}

/** Tableau scrollable horizontalement sur mobile. */
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

export function Callout({ kind = 'info', children }: { kind?: 'info' | 'warn'; children: ReactNode }) {
  return <div className={`callout callout-${kind}`}>{children}</div>;
}

/** Bloc « lacunes » : ce qui n'a pas été trouvé dans les sources. */
export function Gaps({ items }: { items: ReactNode[] }) {
  return (
    <Facts>
      {items.map((it, i) => (
        <Fact key={i} s="N">
          {it}
        </Fact>
      ))}
    </Facts>
  );
}

export function Src({ children }: { children: ReactNode }) {
  return <span className="src">Source : {children}</span>;
}

export const fmt = (n: number) => n.toLocaleString('fr-FR').replace(/ /g, ' ');
