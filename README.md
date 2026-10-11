# Wiki RpgMasters (non officiel)

Petit wiki statique en français pour [RpgMasters](https://rpgmasters.houk.fr), pensé pour les joueurs (mobile d’abord).

> **Avertissement** : projet de fans **non officiel**, non affilié à l’équipe du jeu ni à Ankama Games.
> Contenu tiré uniquement de pages publiques et du code client public (lecture seule, sans connexion),
> relevé le 11 oct 2026 ; il peut contenir des erreurs. Aucune image ni ressource du jeu n’est reproduite
> (emoji et SVG/CSS maison uniquement).

## Stack

- Next.js (App Router) en export statique (`output: 'export'`, `trailingSlash: true`), TypeScript
- CSS simple (thème sombre, mobile d’abord, texte ≥ 16 px, cibles ≥ 44 px), aucune autre dépendance
- Contenu en composants React et fichiers TS (`lib/`), sources brutes dans `sources/`
- Recherche côté client : `scripts/build-search-index.mjs` génère `out/search-index.json` après le build
  (une entrée par page et par `<section id>` ; les `<nav>` — fil d’Ariane, « Voir aussi » — sont ignorés)

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
