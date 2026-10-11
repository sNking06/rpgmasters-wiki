# Approche de la refonte — Wiki RpgMasters (non officiel)

## Synthèse de l'approche retenue

1. **Partir de la question du joueur** (GameDev.net, Medium) : chaque page répond d'abord à « qu'est-ce que je dois savoir / faire ? » via une phrase d'intro d'une ligne puis un encadré « L'essentiel » (3–5 puces).
2. **Interface à deux niveaux** (étude HCI/ACM) : résumé visuel pour les novices, profondeur pour les experts dans des `<details>` repliables — on ne supprime aucun fait, on le range.
3. **Gabarit fixe par type de page** (Soulbound/OSRS) : intro → L'essentiel → fiche (infobox) → sections courtes → détails repliables → « Voir aussi » en pied ; mêmes composants partout (encadrés Astuce/Attention, tableaux courts, jauges).
4. **Accueil = hub** (Fandom, Medium) : 6 grandes cartes vers les sujets clés, puis « quoi faire en premier » (5 astuces sourcées), liens secondaires discrets.
5. **Fiabilité visible mais légère** (DEV.to Astro, version-aware) : date des données affichée sur chaque page (badge appuyé sur Saison), pastilles ✓ / ~ / = / ? en fin de ligne, légende unique dans « Sources et limites ».
6. **Fonction avant la forme** (HCI) : thème sombre sobre, mobile d'abord (375 px), texte ≥ 16 px, cibles ≥ 44 px, visuels simples en CSS/SVG maison qui *portent une donnée* (jauge, barres, frise), jamais décoratifs.

## Plan concret

### Gabarit de page commun (`components/ui.tsx`)
- `PageHeader` : fil d'Ariane (Accueil › …), H1 court, **intro d'une ligne**, puce de date « Données du 11 oct 2026 ».
- `Essentiel` : encadré « L'essentiel », 3–5 puces max, juste sous le titre.
- `Fiche` (infobox) : grille clé → valeur (dl) — une par système : Crâ, Caractéristiques, Arène, Saison, Énergie, XP, Prestige, Économie.
- `Section` (H2 court, `<section id>` conservé pour les ancres et l'index de recherche), paragraphes ≤ 2 phrases, listes.
- `More` : `<details>` repliable pour formules, constantes du code, tableaux longs (> 6 lignes), lacunes.
- `Tip` (Astuce, vert) / `Warn` (Attention, ambre).
- `PageEnd` : « Voir aussi » (3–5 liens) + navigation précédente/suivante + lien vers la légende.
- Pastilles `M` : petit rond ✓ (trouvé), ~ (déduit), = (calcul sur valeurs trouvées), ? (non trouvé), en fin de ligne, avec infobulle `title` + `aria-label` ; glyphe en CSS pour ne pas polluer l'index de recherche.

### Visuels (CSS/SVG maison, aucun asset du jeu)
- Jauge **énergie** 100 / +1 par 6 min ; courbe SVG du **prix d'achat** d'énergie (300 → 2 000).
- Jauge **vision spectrale** : passif 26 % + marge PO 34 pts → plafond 60 %.
- Barres **fusion** +10 % → +20 % → +45 % ; barres **raretés** ; barres **rematch arène** ×1/×0,5/×0,25/0.
- **Frise Prestige** (jalons P1, P2, P4, P5, P8, P10, P15) + tableau complet P1→P15 replié.
- **Chronologie de la saison** (début ven. 9 oct 18:00 → relevé 11 oct → fin lun. 12 oct 08:00).
- Courbe d'XP SVG (points connus seulement), redimensionnée pour rester lisible à 375 px.

### Pages
- **Accueil** : titre court, sous-titre 1 ligne, avertissement non officiel court, **exactement 6 cartes** (Classes, Caractéristiques, Arène, Saison [+ badge date], Énergie & XP, Prestige), « Les 5 astuces pour grimper vite » (tirées de la FAQ publique : Discord, énergie jamais pleine, Aventure vs Chasse, coffres avant la réserve de 6, 10 tickets d'arène), liens secondaires (Économie, Guide Crâ, FAQ, Sources).
- **/classes** : grille de cartes compactes (nom + passif en 1 ligne, texte complet repliable), Crâ mis en avant, filtre client simple.
- **/classes/cra** : « Build conseillé en 5 lignes » en haut, fiche, 3 cartes exclusives en visuel, jauge vision spectrale, détails repliables.
- **/guide-cra** : avertissement bots/scripts interdits, 10 conseils en cartes courtes + détail repliable, « À vérifier en jeu ».
- **/faq** : accordéons groupés par thème, sommaire des thèmes en puces cliquables.
- **/sources** : court — non officiel, méthode, légende des pastilles, lacunes (repliées), règles, fichiers (repliés).
- Autres pages système (Caractéristiques, Arène, Saison, Énergie & XP, Prestige, Économie) : gabarit commun + fiche + visuel principal.

### Navigation
- Header : Classes · Stats · Arène · Saison · Énergie/XP · Prestige · **Plus ▾** (Économie, Guide Crâ, FAQ, Sources) ; bouton de recherche (palette) et bascule de thème ; menu mobile plein écran sous le header, entrées de 44 px.
- Fil d'Ariane + précédent/suivant en pied de page.

### Passe visuelle « premium » (après la refonte de lisibilité)
- Contenu, routes et gabarit inchangés ; seule la présentation évolue.
- Direction artistique « grimoire tactique » : encre bleu-nuit, or/cuivre, accent turquoise, ornements losanges,
  trame géométrique discrète ; thème clair « parchemin » ; bascule mémorisée, sans flash.
- Emoji remplacés par des pictogrammes SVG maison (classes, éléments, sections) : l’élément d’un sort est
  toujours donné par icône **et** texte, jamais par la couleur seule.
- Accueil : héros animé (halo, cercles runiques, étoiles), 6 cartes avec micro-animations, 5 astuces.
- Navigation : palette de recherche (Ctrl/⌘ K, « / »), sommaire latéral collant sur desktop.
- Tableaux à en-tête collant et défilement interne ; graphiques re-colorés par variables CSS (suivent le thème).
- Mouvement léger, entièrement coupé par `prefers-reduced-motion`.

### Contraintes techniques
- Routes inchangées, export statique, aucune nouvelle dépendance.
- `scripts/build-search-index.mjs` : ignore les `<nav>` (fil d'Ariane, pied de page) pour que l'index reflète le contenu.
- Aucun chiffre modifié ; les faits non visibles d'emblée restent dans les `<details>` (donc dans le HTML et l'index).
