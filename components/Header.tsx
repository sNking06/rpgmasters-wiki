'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { MAIN_NAV } from '@/lib/site';
import { Icon, Logo, SectionIcon } from './icons';
import Search from './Search';
import ThemeToggle from './ThemeToggle';

const isActive = (pathname: string, href: string) => (pathname.endsWith('/') ? pathname : pathname + '/') === href;

export default function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname() ?? '/';

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    const onKey = (ev: KeyboardEvent) => {
      if (ev.key === 'Escape') {
            setOpen(false);
      }
    };
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('keydown', onKey);
    };
  }, []);

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
                <span className="nav-label-short">{n.label}</span>
              </Link>
            </li>
          ))}

        </ul>
      </nav>
    </header>
  );
}
