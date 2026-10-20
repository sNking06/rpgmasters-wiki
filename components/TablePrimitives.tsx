/** Primitives partagées par les catalogues client : aucun accès au système de fichiers. */
import type { ReactNode } from 'react';
import { Icon } from './icons';

/** Détails secondaires repliables. */
export function More({ title, children, id }: { title: ReactNode; children: ReactNode; id?: string }) {
  return (
    <details className="more" id={id}>
      <summary>
        <span>{title}</span>
        <Icon name="chevron" size={18} className="sum-chev" />
      </summary>
      <div className="more-body">{children}</div>
    </details>
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


/** Nombre au format français, espaces insécables (pas de retour à la ligne au milieu d'un nombre). */
export const fmt = (n: number) => n.toLocaleString('fr-FR').replace(/[   ]/g, ' ');
