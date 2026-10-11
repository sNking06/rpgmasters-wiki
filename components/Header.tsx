'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { MAIN_NAV, MORE_NAV } from '@/lib/site';
import { Icon, Logo, SectionIcon } from './icons';
import Search from './Search';
import ThemeToggle from './ThemeToggle';

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
    <header className={`site-header${open ? ' menu-open' : ''}`}>
      <div className="header-bar">
        <Link href="/" className="brand">
          <Logo size={34} className="brand-logo" />
          <span className="brand-text">
            <span className="brand-name">RpgMasters</span>
            <span className="brand-sub">wiki non officiel</span>
          </span>
        </Link>
        <div className="header-tools">
          <Search onOpen={() => setOpen(false)} />
          <ThemeToggle />
          <button
            type="button"
            className="icon-btn menu-toggle"
            aria-expanded={open}
            aria-controls="main-nav"
            onClick={() => setOpen((o) => !o)}
          >
            <Icon name={open ? 'close' : 'menu'} size={22} />
            <span className="sr-only">Menu</span>
          </button>
        </div>
      </div>
      <nav id="main-nav" className={`main-nav${open ? ' is-open' : ''}`} aria-label="Navigation principale">
        <ul className="nav-list">
          {MAIN_NAV.map((n) => (
            <li key={n.href}>
              <Link href={n.href} aria-current={isActive(pathname, n.href) ? 'page' : undefined}>
                <SectionIcon section={n.icon} size={19} className="nav-icon" />
                <span className="nav-label-long">{n.label}</span>
                <span className="nav-label-short">{n.short ?? n.label}</span>
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
              Plus <Icon name="chevron" size={16} className="more-chev" />
            </button>
            <ul id="more-menu" className="more-menu">
              {MORE_NAV.map((n) => (
                <li key={n.href}>
                  <Link href={n.href} aria-current={isActive(pathname, n.href) ? 'page' : undefined}>
                    <SectionIcon section={n.icon} size={19} className="nav-icon" />
                    <span>
                      <span className="more-label">{n.label}</span>
                      <span className="more-desc">{n.desc}</span>
                    </span>
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
