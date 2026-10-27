'use client';

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
  // Plateau clair par défaut ; le sombre n'est appliqué que sur choix explicite (mémorisé).
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
      </span>
      <span className="when-light">
        <Icon name="moon" size={20} />
      </span>
      <span className="sr-only">Changer le thème</span>
    </button>
  );
}
