'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { NAV } from '@/lib/site';
import Search from './Search';

export default function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => setOpen(false), [pathname]);

  return (
    <header className="site-header">
      <div className="header-inner">
        <Link href="/" className="brand">
          RpgMasters <span className="brand-sub">wiki non officiel</span>
        </Link>
        <Search onNavigate={() => setOpen(false)} />
        <button
          type="button"
          className="menu-toggle"
          aria-expanded={open}
          aria-controls="main-nav"
          onClick={() => setOpen((o) => !o)}
        >
          <span aria-hidden="true">{open ? '✕' : '☰'}</span>
          <span className="sr-only">Menu</span>
        </button>
      </div>
      <nav id="main-nav" className={`main-nav${open ? ' is-open' : ''}`} aria-label="Navigation principale">
        <ul>
          {NAV.map((n) => {
            const active = pathname === n.href || pathname + '/' === n.href;
            return (
              <li key={n.href}>
                <Link href={n.href} aria-current={active ? 'page' : undefined}>
                  {n.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
}
