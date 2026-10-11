# RpgMasters — compléments classement / XP / Elo (lecture seule, fichiers locaux)
Date 2026-10-11. Source : /workspace/rpgmasters/js/*.js (chunks minifiés : tout est sur la « ligne 1 », donc je cite l'offset caractère `@N`), txt_faq.txt, txt_saison.txt.
Légende : [TROUVÉ] = littéral dans le code/la page ; [DÉDUIT] = interprétation.
Complète mecaniques.md (ne répète pas ce qui y est déjà).

## 1. XP — courbe de niveaux [TROUVÉ] (nouveau)
- js/1_9q4szqjrgbk.js:1 @48138 (module 14294) : table cumulée `n[]`, `n[0]=n[1]=0`, `n[L+1] = n[L] + round(2.5 × MONSTER_XP_REF[L-1] × (2 + 0.12×L))`. Niveau = plus grand L tel que XP ≥ n[L].
- `MONSTER_XP_REF` = tableau de 200 valeurs, js/1_9q4szqjrgbk.js:1 @44822 (module 16627) : 16, 52, 104, 171, 251, … (≈ +10 par niveau vers 150 000 au niveau 200, dernier = 143043).
- Calculé avec ces formules [calcul sur TROUVÉ] — XP cumulée pour atteindre le niveau : 10 → 18 674 ; 20 → 173 323 ; **30 → 661 088** ; 31 → 737 696 ; 50 → 3 736 485 ; 100 → 42 231 421 ; 200 → 509 344 483. Niveau 30→31 = 76 608 XP.
- Interprétation [DÉDUIT] : la table est de référence « XP d'un monstre du niveau L » ; l'XP réellement donnée par combat n'est PAS dans le client (serveur). Donc impossible de calculer des combats/niveau exacts.
- Bonus XP connus [TROUVÉ, FAQ] : Discord +10 % ; Auto AFK ×0,5 (js/1j9ap254vst00.js @ AUTO rewardMult:.5) ; Saison ×4 (/saison) ; Zone de Chasse jusqu'à niveau −5 (HUNT_LEVEL_MARGIN:5, FAQ « compare l'XP Aventure vs Chasse »). LEVEL_BRACKET:20 existe (js/1j9ap254vst00.js @12400) sans usage visible [DÉDUIT : tranche de niveau de monstres/zones].

## 2. Énergie / coûts [TROUVÉ] (nouveau, js/1j9ap254vst00.js:1 @9453, module 6416)
- `ENERGY = {max:100, periodSec:360, pveCost:1, pvpCost:2, bossCost:2, buyPrice:300, buyDaily:1000, buyRampFrom:600, buyTopPrice:2000}`.
  → **l'arène coûte 2 énergie par combat** (pvpCost:2), PvE 1, boss 2. 100 énergie max, +1/6 min = 240/jour.
- Prix du point d'énergie acheté n (n = achats déjà faits aujourd'hui + 1) : 300 k si n ≤ 600 ; sinon `round(300 + 1700 × (n−600)/400)` jusqu'à 2000 k à n=1000. `energyBuyCost(déjà, qty)` = somme.
- Coût combats : 1 combat PvE = 300 k kamas d'énergie achetée ; ≈ 1 combat d'arène = 600 k. Seulement rentable si les kamas sont en surplus [DÉDUIT].
- Grotte de l'Aéfka (AFK) : donne coffres/kamas/XP hors-ligne (FAQ l.132).

## 3. Arène / Elo — ce qui est écrit et ce qui manque
- `ARENA_ELO = {kWin:60,kLoss:48,defenderShare:.5,repeat:[1,.5,.25,0],repeatHours:24,floor:1000,base:5,defenderLoss:2,streakMax:15}` js/1j9ap254vst00.js:1 @10945 [TROUVÉ] (déjà dans mecaniques.md).
- **Aucune fonction d'Elo n'existe côté client** (pas de calcul de gain, ni d'usage de streakMax/base/defenderLoss/defenderShare dans les 15 chunks : seul le littéral apparaît, rg `streakMax` = 1 occurrence). [TROUVÉ : absence]
- Hypothèse de calcul [DÉDUIT, non vérifiable] : gain = K × (1 − P_attendue) avec K=60 (K=48 en défaite), × repeat[n] pour les rematchs sur 24 h ; `defenderShare .5` = le défenseur reçoit la moitié de la variation ; `defenderLoss 2` / `base 5` : probablement perte minimale du défenseur / gain plancher ; `streakMax 15` : plafond d'une série de victoires qui majore le gain (taux inconnu). Ne pas chiffrer le bonus de série.
- Arène : l'Elo est remis à 1000 chaque vendredi 23:59 (FAQ l.101) ; ≥10 combats pour être classé. NB : FAQ l.35/59 dit « tu gardes ton Elo après Prestige » (≠ reset hebdo, c'est le reset de la semaine qui prime) [TROUVÉ].
- Mode Auto/AFK : non disponible en arène (FAQ l.92).

## 4. Dégâts / PO — résultats négatifs vérifiés
- `COMBAT_STATS` (js/1j9ap254vst00.js:1 @~10240) : `spectralPerPo:.4`, `perforation/erosionPerPoint:.05 (max 25)`, `penetrationPerPoint:.8 (max 50)`, `dmgReductionMax:50`, `dodgeChance(PM)=min(50, max(0,3+PM)×1)` [TROUVÉ].
- Pas de formule Force/Int/Chance/Agi → dégâts, ni Puissance, ni critique, ni PV dans le client [TROUVÉ : absence]. Le combat est calculé serveur.
- `SUSTAIN {maxPctHp:25, perTurn:2, extraBreeds:[11,7], extra:1}` (@~15600) [TROUVÉ, sens non documenté ; probablement plafond de soin/vol de vie : DÉDUIT].
- Doublons de sorts : `spellStacks(n)=min(50, floor(n/3))` [TROUVÉ] (palier +3 % chacun : DÉDUIT).

## 5. Prestige (précisions code) [TROUVÉ] @9453
- `gates` par index de Prestige déjà atteint : P4 asc 20 ; P5 asc 30 + 500 000 Faille ; P6 asc 40 + 1 000 000 ; P7 asc 40 ; P8 60 ; P9 80 ; P10 110 ; P11 140 ; P12 170 ; P13 200 ; P14 230 ; P15 260. `seasonMax:10`. PA cap : 12 ; 13 dès P2 ; 14 dès P5 ; 15 dès P8.

## 6. Classement de saison (6 modes) — rien de plus dans le JS
- Score = moyenne des places dans 6 modes (Niveau, Aventure, Ascension, Abysses, Arène, Collection) [TROUVÉ, /saison]. Aucune formule/pondération ni calcul de points dans le client ; le classement est tenu côté serveur. Pas de score « Opti » trouvé. Abysses (FAQ l.146) : points par vague, multiplicateur de difficulté ×1 à ×7,5, meilleure descente de la semaine [TROUVÉ].
- [DÉDUIT] Une moyenne de places récompense l'absence de mode faible : un mode où on est 500e annule un mode où on est 1er. Il vaut mieux faire monter le plus mauvais rang.

## 7. Ce que REA a fait
Voir rapport. `rea analyze-javascript-application <dossier>` fonctionne sur fichiers locaux uniquement sur un petit sous-ensemble (2 chunks, ~8 s, 38 Mo de JSON : 2 fichiers parsés, 17 504 nœuds AST, 9 983 nœuds de graphe, 0 module/IPC/Electron détecté, 0 littéral de constante exposé). Sur les 15 chunks complets (≈1 Mo) la commande n'a pas fini en >100 s et a été tuée. Les valeurs ci-dessus viennent de rg/python sur les chunks.
