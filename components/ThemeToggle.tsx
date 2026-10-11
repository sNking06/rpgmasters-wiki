'use client';

import { useEffect } from 'react';
import { Icon } from './icons';

type Theme = 'light' | 'dark';

const current = (): Theme => (document.documentElement.dataset.theme === 'light' ? 'light' : 'dark');

function apply(t: Theme) {
  const root = document.documentElement;
  root.classList.add('theme-anim');
  root.dataset.theme = t;
  window.setTimeout(() => root.classList.remove('theme-anim'), 350);
}

/**
 * Bascule clair / sombre. Le thème initial est posé avant le rendu par le script inline de <head>
 * (pas de flash) ; ici on ne fait que basculer et mémoriser. L'icône et le libellé suivent `data-theme`
 * en CSS : le rendu serveur et le rendu client restent identiques.
 */
export default function ThemeToggle() {
  // Suit le réglage du système tant que l'utilisateur n'a rien choisi.
  useEffect(() => {
    const mq = window.matchMedia('(prefers-color-scheme: light)');
    const onChange = () => {
      try {
        if (localStorage.getItem('theme')) return;
      } catch {}
      apply(mq.matches ? 'light' : 'dark');
    };
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  const toggle = () => {
    const next: Theme = current() === 'light' ? 'dark' : 'light';
    apply(next);
    try {
      localStorage.setItem('theme', next);
    } catch {}
  };

  return (
    <button type="button" className="icon-btn theme-toggle" onClick={toggle}>
      <span className="when-dark">
        <Icon name="sun" size={20} />
        <span className="sr-only">Passer au thème clair</span>
      </span>
      <span className="when-light">
        <Icon name="moon" size={20} />
        <span className="sr-only">Passer au thème sombre</span>
      </span>
    </button>
  );
}
