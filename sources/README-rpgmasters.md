# RpgMasters theorycraft data
NOTE: drop % are as displayed in the bestiary for account SNking: they already include the account's prospection (486) and Discord bonus (+10 % butin), and were collected on 15/10/2026 ~07:00 while an event "Un peu de rabe ?" (XP x2, Butin x2, until 15/10/2026 12:13) was active — % may include Butin x2.
Bestiary note: each boss also has 1 % chance of a Dofus and 1 % of a Rayonnant item (not listed per boss).
Rarity column blank: rarity is not shown as text in the bestiary.

## Files (collected 15/10/2026 ~07:00-07:30, read-only browsing, account SNking)
- rpgmasters-boss-drops.csv — 106 bosses of the bestiary "Boss" tab (Chemin order, boss n°1..106), every listed drop with Niv. and %. etape_or_zone = "Boss n°X · étape Y · vaincu | <donjon>". level = boss level shown. rarity blank (not displayed as text). Item level not a column; it's on the page ("Niv. N").
- rpgmasters-zones-monsters.csv — bestiary Monstres tab filtered level 150–200, "Tous les monstres" (323 monsters; one row per monster×zone link). zone_level from the zone dropdown range. pv: not shown in bestiary (blank). mechanics column holds the monster family shown ("famille: …") — no per-monster mechanics are displayed. notable_drops = items listed on the monster card, all labelled "objet bonus de victoire" with item level; 93 monsters say "Pas de butin propre à ce monstre (seulement l’objet bonus de victoire)" (empty drops).
- rpgmasters-cards.csv — Deck page collection: 241 owned cards (page: 235/246 discovered, 241 owned). class_or_general = Classe/Incarné tag; rarity from tag; element = elements named in effect lines; effect = effect lines joined " / "; lines = number of effect lines; notes = extra tags (Zone), duplicate bonus ("doublons +X %"), status (Dans le deck / Toujours possédée). Undiscovered cards (11) aren't shown, so not included.
- rpgmasters-boss-mechanics.csv (bonus) — "Mécaniques des boss" tab, verbatim per difficulty tier, for all bosses level 150–200 (27 unlocked; Bworker niv. 180 is the 1 locked boss). Bosses < 150 not collected.
General mechanics notes from the page:
- Abysses : la mécanique de chaque boss y est tirée au hasard à chaque descente (et adoucie), elle n’est donc pas listée ici.
- Ascension : dès l’étage 101 boss Transmutés (2-3 mécaniques parmi Épuisement final, Sceau, Élément mouvant, Inversion, Échange de PV, Rancune ; une seule dès l’étage 140). Dès l’étage 140 : Écho, Glas, Lien d’âme, Accoutumance, Seuil de douleur, Hâte.
- Dès l’étape 400 de l’Aventure, tous les boss pulvérisent celui qui garde un bouclier 6 tours d’affilée (ils préviennent un tour avant).
