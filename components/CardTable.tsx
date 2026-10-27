'use client';
import { useMemo, useState } from 'react';
import cards from '@/data/cards.json';
import { normalize, SearchFilter, SelectFilter, ResultCount } from './CatalogFilters';

const unknown = 'Non renseigné';
const general = 'Général / sans tag';
const value = (c: (typeof cards)[number], key: string) => {
  if (key === 'element') return c.element || 'Sans élément';
  if (key === 'class_or_general') return c.class_or_general || general;
  return c[key as keyof typeof c] || unknown;
};

const filters = [
  { key: 'pa_cost', label: 'Coût en PA' },
  { key: 'element', label: 'Élément' },
  { key: 'rarity', label: 'Rareté' },
  { key: 'class_or_general', label: 'Classe / général (tag)' },
];

const options = Object.fromEntries(
  filters.map((f) => [
    f.key,
    [...new Set(cards.flatMap((c) => (f.key === 'element' ? value(c, f.key).split(';') : [value(c, f.key)])))].sort((a, b) =>
      a.localeCompare(b, 'fr', { numeric: true }),
    ),
  ]),
);

export function CardTable() {
  const [q, setQ] = useState('');
  const [selected, setSelected] = useState<Record<string, string>>({});
  const rows = useMemo(
    () =>
      cards.filter(
        (c) =>
          filters.every(
            (f) =>
              !selected[f.key] ||
              (f.key === 'element'
                ? value(c, f.key).split(';').includes(selected[f.key])
                : value(c, f.key) === selected[f.key]),
          ) && normalize(JSON.stringify(c)).includes(normalize(q.trim())),
      ),
    [q, selected],
  );

  return (
    <div className="item-table catalogue">
      <div className="item-filters">
        <SearchFilter value={q} onChange={setQ} />
        {filters.map((f) => (
          <SelectFilter
            key={f.key}
            label={f.label}
            value={selected[f.key] || ''}
            options={options[f.key]}
            onChange={(s) => setSelected((prev) => ({ ...prev, [f.key]: s }))}
          />
        ))}
      </div>
      <ResultCount count={rows.length} total={cards.length} noun="cartes" />
      <p id="cards-help">
        Faites défiler le tableau horizontalement pour lire tous les effets. Les tags Classe, Incarné et Général sont ceux de
        l’export du 26 octobre 2026. Quand la note indique des stacks, les chiffres sont les valeurs du compte relevé.
      </p>
      <div className="table-wrap" role="region" aria-label="Catalogue des cartes" aria-describedby="cards-help" tabIndex={0}>
        <table>
          <caption>Cartes possédées relevées le 26 octobre 2026</caption>
          <thead>
            <tr>
              {['Carte', 'Classe / général', 'Rareté', 'PA', 'Élément', 'Effets', 'Lignes', 'Notes'].map((h) => (
                <th scope="col" key={h}>
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((c) => (
              <tr key={c.name}>
                <td>
                  <strong>{c.name}</strong>
                </td>
                <td>{value(c, 'class_or_general')}</td>
                <td>{value(c, 'rarity')}</td>
                <td>{c.pa_cost}</td>
                <td>{value(c, 'element').replaceAll(';', ', ')}</td>
                <td className="item-notes">{c.effect}</td>
                <td>{c.lines}</td>
                <td className="item-notes">{c.notes || '\u2014'}</td>
              </tr>
            ))}
            {!rows.length && (
              <tr>
                <td colSpan={8}>Aucune carte ne correspond à ces filtres.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
