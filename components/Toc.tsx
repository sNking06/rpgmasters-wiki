'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

type Item = { id: string; label: string };

/**
 * Sommaire « Sur cette page » (desktop ≥ 1100 px), généré depuis les h2 des <section id> du contenu.
 * La colonne est réservée en CSS : l'apparition du sommaire ne décale rien (pas de CLS).
 */
export default function Toc() {
  const pathname = usePathname();
  const [items, setItems] = useState<Item[]>([]);
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const sections = Array.from(document.querySelectorAll<HTMLElement>('#contenu section.section[id]')).filter((s) =>
      s.querySelector(':scope > h2'),
    );
    setItems(sections.map((s) => ({ id: s.id, label: s.querySelector(':scope > h2')!.textContent?.trim() ?? s.id })));
    setActive(sections[0]?.id ?? null);
    if (!sections.length) return;

    const visible = new Set<string>();
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) visible.add(e.target.id);
          else visible.delete(e.target.id);
        }
        const first = sections.find((s) => visible.has(s.id));
        if (first) setActive(first.id);
      },
      { rootMargin: '-120px 0px -55% 0px' },
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, [pathname]);

  if (items.length < 2) return null;

  return (
    <nav className="toc" aria-label="Sur cette page">
      <p className="toc-title">Sur cette page</p>
      <ol>
        {items.map((it) => (
          <li key={it.id}>
            <a href={`#${it.id}`} aria-current={active === it.id ? 'location' : undefined} onClick={() => setActive(it.id)}>
              <span className="toc-label">{it.label}</span>
            </a>
          </li>
        ))}
      </ol>
      <a href="#contenu" className="toc-top">
        Haut de page
      </a>
    </nav>
  );
}
