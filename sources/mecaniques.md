# RpgMasters — mécaniques extraites des pages et du code client PUBLICS

Date : 2026-10-11 (Europe/Paris). Site : https://rpgmasters.houk.fr
Méthode : lecture seule, sans connexion, sans API privée. HTML public (`/`, `/faq`, `/classes`, `/saison`, `/mentions`) téléchargés avec `curl`, plus les 15 chunks JS publics `/_next/static/chunks/*.js` référencés par ces pages (copies dans `/workspace/rpgmasters/js/`, HTML dans `/workspace/rpgmasters/page_*.html`, texte brut dans `txt_*.txt`). REA (`rea`) était disponible mais non utilisé : `export-web-scripts` exige d'abord une capture ; le téléchargement direct des fichiers publics suffisait.

Légende : **[TROUVÉ]** = écrit tel quel dans une page / dans le code client ; **[DÉDUIT]** = mon interprétation, à confirmer.

## 0. Mentions / règles (https://rpgmasters.houk.fr/mentions)
- Aucune interdiction d'analyser le code client ou de lire les pages publiques. [TROUVÉ]
- Règles de la communauté [TROUVÉ] : « Un seul compte et un seul personnage par personne. » ; « Pas de triche : scripts, robots ou exploitation de bugs (signale-les plutôt !). » ; comptes en infraction « peuvent être supprimés ».
- ⚠ Conséquence pratique : toute automatisation du jeu (scripts/robots) est interdite par les règles. Seul l'« Auto » / « Auto AFK » intégrés au jeu sont prévus (FAQ). Aussi, « un seul personnage par personne » vs un agent qui joue pour Steven : à garder en tête.
- Projet de fans, gratuit, non affilié à Ankama. Mécaniques « originales, sans lien avec le jeu officiel » [TROUVÉ] → ne pas supposer que les formules Dofus s'appliquent.

## 1. Caractéristiques
Sources : `/faq`, chunk `js/1j9ap254vst00.js` (module de constantes).

### Trouvé
- 5 points de caractéristique par niveau (`POINTS_PER_LEVEL:5`), niveau max 200 (`MAX_LEVEL:200`). FAQ : « Tu gagnes 5 points par niveau… Choisis la caractéristique de l'élément de tes sorts de dégâts. »
- Six caractéristiques répartissables : vitalité, sagesse, force, intelligence, chance, agilité (`BASE_STATS`).
- Éléments : index 0 Neutre, 1 Terre, 2 Feu, 3 Eau, 4 Air (`ELEMENT_NAMES`). Couleurs/mapping Force=Terre, Intelligence=Feu, Chance=Eau, Agilité=Air suggérés par les couleurs des stats (Force #b98a4a = Terre #b98a4a ; Intelligence #d9665f = Feu ; Chance #5f8fd6 = Eau ; Agilité #5fb07a = Air). [DÉDUIT par identité de couleur, très probable]
- Parchemins d'arène : +1 à une caractéristique au hasard par victoire d'arène, jusqu'à +300 par caractéristique (`ARENA_SCROLL cap:300`, stats force/intelligence/chance/agilité ; FAQ). Définitifs après Prestige.
- Parchemins de stat en objet (`STAT_SCROLL`) : value 10, cap 300, 6 stats (incl. vitalité, sagesse), rarité 4.
- Au Prestige, les points répartis sont remis à zéro ; les parchemins restent (FAQ).
- Constantes de combat (`COMBAT_STATS`) [TROUVÉ, sens exact non documenté] : `basePm:3, dodgePerPm:1, dodgeMax:50, spectralPerPo:0.4, perforationPerPoint:0.05, perforationMax:25, erosionPerPoint:0.05, erosionMax:25, penetrationPerPoint:0.8, penetrationMax:50, dmgReductionMax:50`.
  - `dodgeChance = min(50, max(0, 3 + PM) × 1)` (fonction `dodgeChance`) → esquive en % liée aux PM, plafond 50 %. [TROUVÉ pour la formule ; « esquive de quoi » = DÉDUIT]
  - `spectralPerPo:0.4` : +0,4 % de chance de « vision spectrale » (double dégâts) par point de PO, cf. passif du Crâ. [DÉDUIT du lien avec le texte du passif]
  - `RES_PCT_CAP_PLAYER:50` : % de résistance joueur plafonné à 50.
- Liste des stats d'objets (`STAT_ORDER`) : pa, pm, po, invocations, pv, vitalité, sagesse, force, intelligence, chance, agilité, puissance, critique, dommages (+ par élément, critiques, poussée), soins, prospection, initiative, résistances (% et fixes), tacle, fuite, retrait/esquive PA/PM, renvoi, % dommages sorts/armes, pénétration, réduction de dégâts, pods.
- PA total plafonné : 12 de base, 13 dès Prestige 2, 14 dès P5, 15 dès P8 (`paCapFor`, FAQ). Hors Abysses.

### Lacunes (non trouvé côté client)
- **Aucune formule** « Force/Intelligence/Chance/Agilité → dégâts », « Vitalité → PV », « Sagesse → ? », ni d'effet de l'Initiative, Puissance, Critique ne figure dans les chunks publics ; le calcul de combat semble côté serveur. Les cartes parlent de « Puissance » (buff) et de « critique » mais pas de coefficient. Je n'ai rien inventé.
- Plafond d'une caractéristique de base (hors parchemins) : non trouvé.

## 2. Classes (https://rpgmasters.houk.fr/classes — données RSC embarquées dans le HTML)
- « Chaque classe possède un passif et 3 cartes de sorts exclusives. Toutes les autres cartes se gagnent en combat et dans les coffres, et se partagent entre toutes les classes. » [TROUVÉ]
- Changement de classe : premier gratuit, ensuite 300 000 kamas (FAQ). Le jeu ne désigne pas de « meilleure » classe (FAQ).

### Crâ (id 9, rôle « Archer », complexité 1) — [TROUVÉ] dans `page_classes.html`
- **Passif « Œil de lynx »** : « +26 % de chances de vision spectrale : chaque sort de dégâts peut infliger le double de dégâts (chance totale avec la PO plafonnée à 60 %). »
- 3 cartes exclusives (tout niveau 1, portée `r:4`) :
  | Carte | PA | Effet (brut) | Élément |
  |---|---|---|---|
  | Flèche Punitive (id 32456) | 4 | dmg 23–26 mono-cible, `cc:5` | el 1 = **Terre** |
  | Tirs Puissants (id 32466) | 1 | buff Puissance +100 et Critique +10 %, 1 tour (« jusqu'à ton prochain tour ») | — |
  | Flèche Explosive (id 32445) | 3 | dmg 14–17 **en zone** (tous les ennemis), `cc:5` | el 2 = **Feu** |
- `cc:5` : probablement le % de critique de base du sort. [DÉDUIT]
- Éléments des sorts exclusifs du Crâ : **Terre (Force) et Feu (Intelligence)** ; aucun Air/Eau. [TROUVÉ → conséquence]
- Autres classes (pour comparaison, extrait) : Iop +15 %/sort enchaîné (max +45 %) ; Ecaflip 32 % double dégâts ; Sram +30/60 % sous 50/25 % PV ; Forgelance premier sort de dégâts du tour +45 % ; Eliotrope 1 attaque sur 2 +50 %, etc. (liste complète dans `page_classes.html`).

## 3. Cartes / sorts / deck
- Deck : 10 sorts au départ, +1 par Prestige (`DECK_SIZE 10`, `DECK_PER_PRESTIGE 1`), minimum 7 pour combattre, 6 decks préparables (`GEAR_PRESETS count 6` pour les équipements ; decks 6 d'après FAQ). Pioches supplémentaires max 4 (`EXTRA_DRAW_MAX`).
- Doublons : à partir du Prestige 1, un doublon renforce le sort (`SPELL_STACK {fromPrestige:1, perStack:3, pct:3, maxStacks:50}`) → [DÉDUIT] +3 % par tranche de 3 doublons, jusqu'à 50 paliers (=+150 %) ; `spellStacks(n)=min(50,floor(n/3))`. Avant P1 : converti en kamas (`DUPLICATE_CARD_KAMAS 3000`).
- Les cartes ont une rareté (Commun…Légendaire), chance de carte par coffre 20 % (`CHEST.cardChance`).
- Types d'effets existants (`effectLines`) : dmg, steal, heal, shield, buff/debuff, summon, bomb, trap, stun, draw, poison, empower, rewind, apGain/apRemove…

## 4. Objets : raretés, tiers, fusion, Rayonnant, panoplies
- Raretés et poids de tirage en coffre (`RARITIES.chestWeight`) : Commun 46, Peu commun 28, Rare 15, Épique 7,5, Mythique 3, Légendaire 0,5. [TROUVÉ]
- Fusion : 3 exemplaires même objet/même tiers : T1→T2, puis 3 T2 → Rayonnant. Rayonnant +0…+5 en ajoutant des Rayonnants +0 (1 pour les premiers niveaux, 2 ensuite ; `radiantFeed`: <2→0, <4→1, sinon 2). Bonus de stats `FUSION.bonusPct = [0,10,20,25,30,35,40,45]` (index = niveau de fusion 0..7 ; `max:7`, `copies:3`). FAQ : « 20 % de stats en plus au départ jusqu'à 45 % à +5 ». Le tableau mène donc : T2 = +10 %, Rayonnant +0 = +20 %, +1 = 25 %, +2 = 30 %, +3 = 35 %, +4 = 40 %, +5 = 45 %. [TROUVÉ + alignement DÉDUIT]
- PA, PM, PO, Invocations non multipliés par la fusion/Prestige (`excluded`).
- Dofus : fusion max 4 (`dofusMax:4`), Dofus Rayonnant = +100 % (`dofusRadiantPct:100`), PA compris ; `radiantPa:2`. Dofus : drop ≤ 2 % tous bonus compris (FAQ).
- Panoplies : ≥ 2 pièces différentes portées → bonus croissant (FAQ). Valeurs des bonus : **non publiques** (visibles page Personnage, connexion requise).
- Bris : orbes 1 (<niv 70), 2 (≤139), 3 (au-delà), ×3 Rayonnant, max 8 000/jour → Bouclier de forge (forgemagie) jusqu'à +300 % au niveau 400, sans échec (FAQ).
- Compagnon : +0,2 %/niveau de l'équipement, jusqu'à +79,8 % au niveau 400 ; croquette 5 %/combat gagné, 100/jour (FAQ). Ne touche pas PA/PM/PO/invocations.
- Prestige : +25 % de stats sur tout l'équipé par Prestige, cumulable (`PRESTIGE.gearPct:25`).
- Bonus Discord : +10 % XP, +10 % butin, +5 % stats, à vie, partout arène comprise (FAQ).
- Vente PNJ : 10 kamas × niveau, max 2 000. HDV : taxe 8 %, 20 annonces, liaison 24 h après achat.

## 5. Prestige (`PRESTIGE`, FAQ)
- Niveau 200 requis, mot de confirmation « PRESTIGE », max 15.
- Bonus de combat cumulatifs par Prestige 1→7 (`PRESTIGE.combat`) : P1 +1 PA ; P2 +2 PO ; P3 +2 PM ; P4 +1 PA ; P5 +3 PO ; P6 +3 PM ; P7 +1 PA. [TROUVÉ ; l'ordre par index → numéro de Prestige est DÉDUIT]
- Conditions : P1-P3 niveau 200 ; P4 Ascension étage 20 ; P5 étage 30 + 500 000 dégâts Kralamoure ; P6 étage 40 + 1 000 000 ; P7 étage 40 ; P8 60 ; P9 80 ; P10 110 ; P11 140 ; P12 170 ; P13 200 ; P14 230 ; P15 260.
- Avant P4 : perte de l'équipement/inventaire/kamas (sauf 1 objet éternel). À partir de P4 : plus de perte. Objet éternel : lié à vie, passe au moins Rayonnant.

## 6. Arène / Elo / classement
- Constantes `ARENA_ELO` [TROUVÉ] : `kWin:60, kLoss:48, defenderShare:0.5, repeat:[1,0.5,0.25,0], repeatHours:24, floor:1000, base:5, defenderLoss:2, streakMax:15`.
- [DÉDUIT] K=60 en victoire, 48 en défaite ; rejouer le même adversaire dans les 24 h rapporte ×1, ×0,5, ×0,25 puis 0 ; Elo plancher 1 000 ; série de victoires jusqu'à 15 (bonus exact inconnu).
- FAQ : 10 tickets gratuits/jour (non cumulables), reset hebdo vendredi 23:59 (Paris), Elo repart à 1 000, ≥ 10 combats pour être classé ; top 100 coffres Légendaires, top 10 Ultimes, podium Coffre Rayonnant +5 + couronne ; adversaires choisis autour de ton Elo, liste changée toutes les ~10 min ; chaque victoire = +1 stat au hasard (parchemin, max +300/stat).
- **Aucun « score d'Opti » ni calcul de classement « Opti » trouvé** (aucune occurrence du terme dans les pages/JS publics ; les correspondances « Opti » = « Option/optimistic »).

## 7. Saison Héroïque (https://rpgmasters.houk.fr/saison) [TROUVÉ]
- Du vendredi 9 oct 18:00 au lundi 12 oct 08:00 (Paris) ; XP ×4, énergie illimitée, mort définitive face aux boss, perso de saison créé de zéro en plus du principal, HDV séparé, pas de guilde/Faille/succès.
- Classement = moyenne des places dans 6 modes (Niveau, Aventure, Ascension, Abysses, Arène, Collection). Récompenses sur le perso principal : top 100 de 100 Coffres Légendaires (1er) à 10 (100e) ; top 10 + Coffres Ultimes (10, 8, 6, 5, 4, 3, 2, 1, 1, 1) ; 1er = couronne.
- Banque 8 emplacements (+3 par Prestige) : tout le contenu transféré au perso principal à la fin ; objets éternels mis à l'abri à la mort. Annonce : « TOUT le contenu de votre BANQUE… lundi ».
- Prestiges de saison limités à 10. Classes dominantes dans le top 30 visible : Zobal (majorité), Iop, Ouginak, Féca, Roublard ; aucun Crâ dans le haut du classement affiché (extrait observé, non exhaustif). [TROUVÉ, interprétation DÉDUITE : prudence]
- ⚠ Date : la saison se termine dans ~15 h au moment de l'extraction (11 oct 17h).

## 8. Coffres, butin, XP, énergie
- Coffres gratuits : 1 toutes les 20 min (`periodSec:1200`), réserve max 6 ; ~5 % de chance de coffre par combat gagné.
- Coffre classique 5 000 k, chanceux 10 000 k (rareté ×3), épique 20 000 k (Épique+ garanti) ; max 100/jour/type ; 20 premiers au prix normal.
- Coffre Épique via « Élan » : 25 combats = 1 coffre (3/jour max).
- Types de coffres de récompense (`GIFT_CHESTS`) : Royal (Épique+, carte Rare+), Légendaire (Mythique+, carte Épique+, 5 % Rayonnant), Ultime (Rayonnant ou Dofus), Rayonnant +5 au choix, etc.
- Rayonnant en coffre : 1 % de base (`CHEST.radiantPct:1`).
- Énergie : max 100, +1 / 6 min ; combat 1, boss/Ascension 2 ; Abysses 20 ; achat 300 k/point jusqu'à 1 000/jour (prix monte au-delà de 600, max 2 000).
- XP : « L'XP vient des combats gagnés » ; formule XP **non trouvée**. Bonus connus : Discord +10 %, saison ×4. FAQ conseille de comparer l'XP Aventure vs Chasse en fin de combat. Zone de Chasse accessible à partir du niveau min −5 (`HUNT_LEVEL_MARGIN 5`).
- Auto : récompenses ×0,5 en AFK (`AUTO.rewardMult 0.5`).

## 9. Lacunes globales
Formules de dégâts/PV/XP, valeurs de panoplies, coefficients de Force/Int/Chance/Agi/Vitalité/Sagesse, stats de la table d'objets, cartes communes hors classes : non exposés côté client public (serveur / pages après connexion). Je n'ai pas appelé d'API ni de page connectée.

## Recommandations d'optimisation pour un Crâ (uniquement sur éléments vérifiés)
1. **Choisir Force (Terre) ou Intelligence (Feu)** : ce sont les éléments des sorts de signature (Flèche Punitive = Terre 23–26 ; Flèche Explosive = Feu 14–17 zone). La FAQ dit de mettre les points dans la caractéristique de l'élément des sorts de dégâts. Le gros sort mono-cible (4 PA) est Terre → Force est le choix le plus cohérent tant que le deck repose sur lui [déduit du tableau, non chiffré]. Évite de disperser sur Chance/Agilité sauf si les cartes communes choisies sont de ces éléments.
2. **Maximiser la PO** : le passif ajoute +26 % de double dégâts (« vision spectrale »), avec +0,4 % par PO (`spectralPerPo`), plafond total 60 % ; il reste donc ~34 points de marge à gagner par la PO (≈ 85 PO équipement/bonus). [chiffres calculés ; l'applicabilité de 0,4 %/PO est déduite]. Les bonus de Prestige PO (+2 P2, +3 P5) y contribuent.
3. **Exploiter l'élan des 60 %** : ne pas sur-investir au-delà du plafond de 60 % de chance spectrale.
4. **Tirs Puissants (1 PA)** : +100 Puissance et +10 % critique pour 1 PA, jusqu'à ton prochain tour : à lancer en premier chaque tour dans le deck.
5. **Deck** : 10 cartes dont les 3 exclusives ; compléter avec cartes de dégâts du même élément (toutes les cartes se partagent entre classes). Garder ≥ 7 cartes. PA total plafonné à 12 (puis 13/14/15 par Prestige).
6. **Objets** : fusionner par 3 ; viser Rayonnant (+20 % → +45 % à +5) sur les pièces fortes ; PA/PM/PO non multipliés par la fusion → privilégier les objets qui donnent directement des PO/PA (valeur brute), stats élémentaires multipliées.
7. **Multiplicateurs permanents gratuits** : lier Discord (+10 % XP, +10 % butin, +5 % stats) ; faire avancer le Bouclier de forge (briser les objets, jusqu'à 8 000 orbes/jour) et le Compagnon (croquettes).
8. **Arène** : 10 tickets gratuits/jour, chaque victoire donne +1 stat aléatoire (parchemin) jusqu'à 300 par stat → utiliser tous les tickets chaque jour ; éviter de rejouer le même adversaire (gain ×0,5 puis ×0,25 puis 0 dans les 24 h, déduit).
9. **Progression** : au niveau 30 il n'y a pas de Prestige avant 200 ; à long terme, Prestige 4 supprime les pertes ; les PO/PA/PM de Prestige servent directement le Crâ (P2 +2 PO, P5 +3 PO).
10. **Saison** (finit lundi 12 oct 08:00) : aucun Crâ visible dans le haut du classement affiché ; ne rien en conclure de fiable sur la force de la classe. Ne pas utiliser de script/bot (interdit par `/mentions`).

## À vérifier dans le jeu (connecté, par un humain)
Fiche Personnage (valeurs réelles Force → dégâts, plafond de caractéristique), panoplies, bonus des cartes communes de dégâts Terre/Feu, XP Aventure vs Chasse.
