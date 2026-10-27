'use client';
export const normalize = (s: string) => s.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
export function SearchFilter({ value, onChange }: { value: string; onChange: (s: string) => void }) {
  return <label>Recherche<input type="search" value={value} onChange={e => onChange(e.target.value)} placeholder="Nom, effet, butin…" /></label>;
}
export function SelectFilter({ label, value, options, onChange }: { label: string; value: string; options: string[]; onChange: (s: string) => void }) {
  return <label>{label}<select value={value} onChange={e => onChange(e.target.value)}><option value="">Tous</option>{options.map(s => <option key={s} value={s}>{s || 'Non renseigné'}</option>)}</select></label>;
}
export function ResultCount({ count, total, noun }: { count: number; total: number; noun: string }) {
  return <p className="item-count" role="status" aria-live="polite">{count} {noun} sur {total}{count === 0 ? '. Aucun résultat pour ces filtres.' : ''}</p>;
}
