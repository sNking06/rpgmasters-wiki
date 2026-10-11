# Wiki RpgMasters (non officiel)

Petit wiki statique en français pour [RpgMasters](https://rpgmasters.houk.fr).

> **Avertissement** : projet de fans **non officiel**, non affilié à l’équipe du jeu ni à Ankama Games.
> Contenu tiré uniquement de pages publiques et du code client public (lecture seule, sans connexion),
> relevé le 11 oct 2026 ; il peut contenir des erreurs. Aucune image ni ressource du jeu n’est reproduite.

## Stack

- Next.js (App Router) en export statique (`output: 'export'`, `trailingSlash: true`), TypeScript
- CSS simple (thème sombre), aucune autre dépendance
- Contenu en composants React et fichiers TS (`lib/`), sources brutes dans `sources/`
- Recherche côté client : `scripts/build-search-index.mjs` génère `out/search-index.json` après le build

## Commandes

```bash
npm install
npm run build   # → dossier out/ (+ out/search-index.json)
npm run dev     # développement (la recherche nécessite un build préalable)
```

Le dossier `out/` se sert avec n’importe quel serveur statique.

## Légende

Badges repris des notes sources : **[TROUVÉ]** (vert, écrit tel quel), **[DÉDUIT]** (ambre, interprétation),
**[calcul sur TROUVÉ]** (calcul sur valeurs trouvées) et **NON TROUVÉ** (lacune).
