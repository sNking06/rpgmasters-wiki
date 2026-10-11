'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { MAIN_NAV, MORE_NAV } from '@/lib/site';
import Search from './Search';

const isActive = (pathname: string, href: string) => pathname + '/' === href || pathname.startsWith(href);

export default function Header() {
  const [open, setOpen] = useState(false);
  const [more, setMore] = useState(false);
  const pathname = usePathname() ?? '/';
  const moreRef = useRef<HTMLLIElement>(null);

  useEffect(() => {
    setOpen(false);
    setMore(false);
  }, [pathname]);

  useEffect(() => {
    const onDoc = (ev: MouseEvent) => {
      if (moreRef.current && !moreRef.current.contains(ev.target as Node)) setMore(false);
    };
    const onKey = (ev: KeyboardEvent) => {
      if (ev.key === 'Escape') {
        setMore(false);
        setOpen(false);
      }
    };
    document.addEventListener('click', onDoc);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('click', onDoc);
      document.removeEventListener('keydown', onKey);
    };
  }, []);

  const moreActive = MORE_NAV.some((n) => isActive(pathname, n.href));

  return (
    <header className="site-header">
      <div className="header-inner">
        <Link href="/" className="brand">
          <span aria-hidden="true">📖</span> RpgMasters <span className="brand-sub">wiki non officiel</span>
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
        <ul className="nav-list">
          {MAIN_NAV.map((n) => (
            <li key={n.href}>
              <Link href={n.href} aria-current={isActive(pathname, n.href) ? 'page' : undefined}>
                <span className="nav-icon" aria-hidden="true">
                  {n.icon}
                </span>
                {n.short ?? n.label}
              </Link>
            </li>
          ))}
          <li className={`nav-more${more ? ' is-open' : ''}`} ref={moreRef}>
            <button
              type="button"
              className={`more-toggle${moreActive ? ' is-active' : ''}`}
              aria-expanded={more}
              aria-controls="more-menu"
              onClick={() => setMore((m) => !m)}
            >
              Plus <span aria-hidden="true">▾</span>
            </button>
            <ul id="more-menu" className="more-menu">
              {MORE_NAV.map((n) => (
                <li key={n.href}>
                  <Link href={n.href} aria-current={isActive(pathname, n.href) ? 'page' : undefined}>
                    <span className="nav-icon" aria-hidden="true">
                      {n.icon}
                    </span>
                    {n.label}
                  </Link>
                </li>
              ))}
            </ul>
          </li>
        </ul>
      </nav>
    </header>
  );
}
