# Wiki RpgMasters (non officiel)

Petit wiki statique en français pour [RpgMasters](https://rpgmasters.houk.fr), pensé pour les joueurs (mobile d’abord).

> **Avertissement** : projet de fans **non officiel**, non affilié à l’équipe du jeu ni à Ankama Games.
> Contenu tiré uniquement de pages publiques et du code client public (lecture seule, sans connexion),
> relevé le 11 oct 2026 ; il peut contenir des erreurs. Aucune image ni ressource du jeu n’est reproduite
> (pictogrammes SVG et CSS maison uniquement).

## Stack

- Next.js (App Router) en export statique (`output: 'export'`, `trailingSlash: true`), TypeScript
- Aucune dépendance ajoutée : CSS maison (`app/globals.css`), polices système (serif d’affichage
  « Iowan Old Style / Palatino / Georgia », aucune requête de police externe), SVG inline
- Contenu en composants React et fichiers TS (`lib/`), sources brutes dans `sources/`
- Recherche côté client : `scripts/build-search-index.mjs` génère `out/search-index.json` après le build
  (une entrée par page et par `<section id>` ; les `<nav>` — fil d’Ariane, « Voir aussi » — sont ignorés)

## Design (« grimoire tactique »)

- Thème sombre encre bleu-nuit + or/cuivre, accent turquoise ; thème clair « parchemin ». Jetons de couleur
  en variables CSS en tête de `globals.css` (contraste AA visé dans les deux thèmes).
- Bascule clair/sombre dans le header (`components/ThemeToggle.tsx`) : respecte `prefers-color-scheme`,
  choix mémorisé dans `localStorage`, appliqué avant le rendu par un script inline dans `<head>` (pas de flash).
- Pictogrammes SVG dessinés pour le wiki (`components/icons.tsx`) : 19 classes, 4 éléments, sections, interface.
  Aucun asset du jeu. Favicon : `app/icon.svg`.
- Recherche en palette de commandes (`components/Search.tsx`) : Ctrl/⌘ + K ou « / », navigation ↑ ↓ Entrée Échap,
  index chargé à la première ouverture.
- Sommaire « Sur cette page » (`components/Toc.tsx`) généré depuis les h2, collant, ≥ 1100 px.
- Héros d’accueil animé en SVG/CSS (`components/HeroArt.tsx`) ; apparition au défilement en CSS
  (`animation-timeline`, ignorée si non prise en charge). Toutes les animations sont coupées par
  `prefers-reduced-motion`.

## Gabarit des pages

Voir `docs/approche_refonte.md`. Chaque page suit le même ordre, avec les composants de `components/ui.tsx` :

1. `PageHeader` : fil d’Ariane, titre, intro d’une ligne, date des données
2. `Essentiel` : encadré « L’essentiel » (3–5 puces)
3. `Fiche` : fiche récapitulative (infobox) du système
4. `Section` courtes, encadrés `Tip` (Astuce) / `Warn` (Attention), visuels `Bars` / `Meter`
5. `More` : détails repliables (formules, constantes du code, tableaux longs, lacunes)
6. `PageEnd` : « Voir aussi », sources de la page, précédent / suivant

## Commandes

```bash
npm install
npm run build   # → dossier out/ (+ out/search-index.json)
npm run dev     # développement (la recherche nécessite un build préalable)
```

Le dossier `out/` se sert avec n’importe quel serveur statique.

## Légende

Pastilles discrètes en fin de ligne (infobulle au survol, légende sur la page « Sources et limites ») :
**✓** [TROUVÉ] écrit tel quel · **~** [DÉDUIT] interprétation · **=** [calcul sur TROUVÉ] · **?** NON TROUVÉ (lacune).

Illustrations originales : `public/illustrations/*.svg` ; déposer vos JPG/PNG dans `sources/illustrations/`, puis exécuter `python3 scripts/optimize-illustrations.py` (Pillow).
Au prochain build, `<Illustration>` choisit automatiquement les WebP (largeur max. 1600, qualité 80) et leur variante `-800.webp` via `srcSet`, sinon le SVG.

## Captures en jeu

Déposer la PNG dans `sources/captures/`, puis ajouter une entrée dans
`sources/captures/captures.json` avec les champs `id`, `src`, `box`, `mask`, `alt` et `date`
(en suivant le format des entrées existantes). Générer les images et le catalogue, puis construire le site :

```bash
python3 scripts/build-captures.py
npm run build
```

Insérer `<GameCapture id="mon-id" />` (avec une prop `caption` facultative) ou
`<CaptureGallery ids={['premier-id', 'second-id']} />` depuis `components/GameCapture.tsx`.
Un identifiant absent du catalogue ne rend rien : les emplacements Ascension étage 42,
Jardins d’Hiver et Tableau de bord sont déjà prêts. Les vignettes ouvrent la capture
pleine taille ; la lightbox permet de parcourir les captures de la page avec ←/→.
