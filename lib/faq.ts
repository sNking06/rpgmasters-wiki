/** FAQ synthétique — reformulation de txt_faq.txt (page publique /faq). Tout est [TROUVÉ]. Une entrée de `a` = une puce courte. */
export type FaqItem = { id: string; q: string; a: string[]; see?: { href: string; label: string } };
export type FaqGroup = { id: string; title: string; items: FaqItem[] };

export const FAQ: FaqGroup[] = [
  {
    id: 'progresser',
    title: 'Débuter et progresser',
    items: [
      {
        id: 'niveau',
        q: 'Comment monter de niveau vite ?',
        a: [
          'L’XP vient des combats gagnés (Aventure, Chasse, boss, Ascension…). Niveau max : 200.',
          'Chaque combat coûte de l’énergie, qui se recharge seule : ne la laisse pas pleine trop longtemps.',
          'Lier son Discord donne +10 % d’XP à vie. Le mode « Auto » joue le combat à ta place.',
          'Compare l’XP de fin de combat entre Aventure et Chasse pour voir ce qui marche à ton niveau.',
        ],
        see: { href: '/debuter/energie-xp/', label: 'Énergie et XP' },
      },
      {
        id: 'aventure-chasse',
        q: 'Aventure ou Chasse : quelle différence ?',
        a: [
          'Aventure (le « Chemin ») : des étapes qui s’enchaînent, un boss toutes les 5 étapes, monstres de plus en plus forts.',
          'Chasse : tu choisis la zone et le groupe de monstres. Zone accessible dès son niveau minimum moins 5.',
          'Les boss de zone n’apparaissent que quelques minutes à intervalles réguliers (un badge prévient).',
        ],
      },
      {
        id: 'classe',
        q: 'Peut-on changer de classe ? Laquelle est la meilleure ?',
        a: [
          'Oui, page Personnage : le 1er changement est gratuit, puis 300 000 kamas.',
          'Le jeu ne désigne pas de « meilleure » classe : chacune a son style.',
        ],
        see: { href: '/personnage/classes/', label: 'Classes' },
      },
      {
        id: 'niveau-200',
        q: 'Que faire une fois niveau 200 ?',
        a: [
          'Faire Prestige (retour au niveau 1 avec plus de stats)…',
          '… ou rester 200 pour farmer, faire l’arène, les Abysses ou la Faille avec sa guilde.',
          'L’Ascension (tour de boss) s’ouvre après au moins un Prestige.',
        ],
      },
      {
        id: 'caracteristiques',
        q: 'Comment répartir mes points de caractéristiques ?',
        a: [
          '5 points par niveau, page Personnage (Force, Intelligence, Chance, Agilité, Vitalité, Sagesse).',
          'Choisis la caractéristique de l’élément de tes sorts de dégâts.',
          'Au Prestige, les points sont remis à zéro ; les parchemins restent.',
        ],
        see: { href: '/personnage/caracteristiques/', label: 'Caractéristiques' },
      },
    ],
  },
  {
    id: 'prestige',
    title: 'Prestige et Ascension',
    items: [
      {
        id: 'prestige',
        q: 'Qu’est-ce que le Prestige ? Que perd-on ?',
        a: [
          'Au niveau 200, retour au niveau 1 : +25 % de stats sur l’équipement porté, cumulable à chaque Prestige.',
          'Aussi : bonus de combat sur les premiers Prestiges, +1 carte dans les decks, accès à l’Ascension.',
          'Perdu : niveau, points de caractéristiques, étape de l’Aventure.',
          'Perdu avant le Prestige 4 seulement : équipement, inventaire, ventes HDV, kamas (sauf l’objet gardé et les objets éternels).',
          'Toujours gardés : cartes et decks, album, coffres, énergie, Elo, records, Ascension.',
        ],
        see: { href: '/personnage/prestige/', label: 'Prestige' },
      },
      {
        id: 'conditions',
        q: 'Quelles conditions pour chaque Prestige ?',
        a: [
          'Niveau 200 jusqu’au P3, puis des étages d’Ascension : 20 pour P4 … 260 pour P15.',
          'P5 et P6 demandent aussi des dégâts sur le Kralamoure de la Faille.',
          'Maximum actuel : P15 ; P10 en saison.',
        ],
        see: { href: '/personnage/prestige/#conditions', label: 'Étapes P1 → P15' },
      },
      {
        id: 'objet-eternel',
        q: 'Quel objet garder au Prestige ?',
        a: [
          'Il devient éternel : lié à vie, invendable, il revient à chaque Prestige et passe au moins Rayonnant.',
          'Prends un objet durable : un Dofus, une pièce forte…',
        ],
      },
      {
        id: 'coffres-prestige',
        q: 'Faut-il ouvrir ses coffres avant le Prestige ?',
        a: [
          'Non : les coffres non ouverts sont gardés.',
          'Un coffre donne un objet du niveau du perso à l’ouverture ; avant P4, ce qui est ouvert juste avant le Prestige est perdu avec l’inventaire.',
        ],
      },
      {
        id: 'ascension',
        q: 'À quoi sert l’Ascension ?',
        a: [
          'Tour de boss aux mécaniques cachées, ouverte après 1 Prestige, une fois de nouveau niveau 200.',
          'Chaque étage coûte 2 énergie ; chaque nouvel étage donne un coffre (plus gros tous les 5 étages).',
          'L’étage atteint reste après un Prestige et conditionne les Prestiges suivants.',
        ],
      },
    ],
  },
  {
    id: 'coffres-energie',
    title: 'Coffres et énergie',
    items: [
      {
        id: 'coffres',
        q: 'Combien de coffres par jour ? Lequel acheter ?',
        a: [
          '3 coffres gratuits par heure (1 toutes les 20 min), 6 en réserve au maximum.',
          'Environ 5 % de chance de coffre par combat gagné, plus Ascension, arène, Faille et saison.',
          'Boutique : Classique 5 000, Chanceux 10 000 (raretés ×3), Épique 20 000 kamas (Épique ou mieux garanti).',
          '100 par jour et par type, prix normal pour les 20 premiers.',
        ],
        see: { href: '/economie/', label: 'Économie' },
      },
      {
        id: 'energie',
        q: 'Comment fonctionne l’énergie ?',
        a: [
          '100 points max, +1 toutes les 6 minutes, même hors ligne.',
          'Coût : Chasse/Aventure 1, boss/Ascension 2, arène 1 ticket, Abysses 20.',
          'Achat : 300 kamas le point, 1 000 points/jour max, prix en hausse au-delà de 600.',
          'Le perso de saison n’utilise pas d’énergie.',
        ],
        see: { href: '/debuter/energie-xp/#energie', label: 'Énergie' },
      },
      {
        id: 'elan',
        q: 'Qu’est-ce que l’Élan ?',
        a: ['Chaque combat remplit une jauge : 25 combats = 1 Coffre Épique (3 par jour au plus).', '3 défis courts par jour rapportent des kamas.'],
      },
    ],
  },
  {
    id: 'objets',
    title: 'Objets, fusion et forgemagie',
    items: [
      {
        id: 'fusion',
        q: 'Comment fusionner ? Qu’est-ce qu’un Rayonnant ?',
        a: [
          '3 objets identiques du même tiers : 3 T1 → T2, 3 T2 → Rayonnant.',
          'Un Rayonnant monte de +0 à +5 avec d’autres Rayonnants +0 (1 puis 2).',
          'Rayonnant : +20 % de stats au départ, jusqu’à +45 % à +5. PA, PM, PO, Invocations non multipliés.',
          'Rayonnant en coffre : 1 % de base.',
        ],
        see: { href: '/economie/#fusion', label: 'Fusion' },
      },
      {
        id: 'panoplies',
        q: 'Y a-t-il des bonus de panoplie ?',
        a: ['Oui, dès 2 pièces différentes d’une même panoplie, de plus en plus fort avec le nombre de pièces (visible page Personnage).'],
      },
      {
        id: 'dofus',
        q: 'Comment obtenir un objet précis ou un Dofus ?',
        a: [
          'Le Bestiaire indique quels monstres lâchent l’objet.',
          'Les Dofus ne tombent jamais à plus de 2 %, tous bonus compris (boss, butin supplémentaire, certains coffres de récompense).',
        ],
      },
      {
        id: 'bris',
        q: 'À quoi sert de briser des objets ?',
        a: [
          'Orbes : 1 sous le niveau 70, 2 jusqu’au 139, 3 au-delà, ×3 pour un Rayonnant ; 8 000 par jour max.',
          'Ils montent le Bouclier de forge sans échec, jusqu’à +300 % au niveau 400.',
          'Vente aux PNJ : 10 kamas par niveau, 2 000 max. Un objet verrouillé est protégé.',
        ],
      },
    ],
  },
  {
    id: 'combat',
    title: 'Combat, deck et automatique',
    items: [
      {
        id: 'deck',
        q: 'Comment marche le deck ?',
        a: [
          'Jusqu’à 10 sorts au départ (+1 par Prestige), 7 minimum pour combattre, 6 decks préparables.',
          'PA total plafonné : 12, 13 dès P2, 14 dès P5, 15 dès P8 (hors Abysses).',
          'Dès P1, un doublon renforce le sort.',
        ],
      },
      {
        id: 'auto',
        q: '« Auto » ou « Auto AFK » : quelle différence ?',
        a: [
          '« Auto » joue le combat en cours, récompenses normales (vérification de présence tous les 20 combats).',
          '« Auto AFK » enchaîne seul jusqu’à une défaite, l’énergie vide ou l’arrêt, avec moitié moins d’XP, de kamas et de butin.',
          'Auto AFK indisponible en arène, Abysses, Faille, Ascension, boss de zone et capture ; vérification toutes les 60 minutes.',
        ],
      },
      {
        id: 'inactif',
        q: 'Pourquoi suis-je « inactif » ou en file d’attente ?',
        a: [
          'Les joueurs actifs en même temps sont limités (500 par défaut).',
          'Après 10 minutes sans clic, la place est libérée. Un combat en cours est protégé.',
        ],
      },
    ],
  },
  {
    id: 'modes',
    title: 'Modes de jeu',
    items: [
      {
        id: 'abysses',
        q: 'Comment fonctionnent les Abysses ?',
        a: [
          'Descente de 1 000 étages, 20 énergie.',
          'Équipement et stats ignorés : tout le monde part de 6 PA, 3 PM, 100 partout, avec un sort au choix parmi 3.',
          'Après chaque victoire, un bonus parmi 3 cartes ; tous les 5 étages, un nouveau sort.',
          'Après une défaite, reprise possible 25 étages sous son record (gardé après Prestige).',
        ],
      },
      {
        id: 'arene',
        q: 'Comment marche l’arène ?',
        a: [
          '1 ticket par défi, 10 gratuits par jour (non cumulables). Adversaires autour de ton Elo, liste renouvelée toutes les ~10 minutes.',
          'Chaque victoire : +1 à une caractéristique au hasard (jusqu’à +300).',
          'Reset le vendredi 23 h 59 (Paris), Elo à 1 000, 10 combats minimum pour être classé.',
          'Top 100 : Légendaires ; top 10 : Ultimes ; podium : Rayonnant +5 au choix et couronne.',
        ],
        see: { href: '/contenus/arene/', label: 'Arène' },
      },
      {
        id: 'guilde',
        q: 'À quoi servent les guildes ?',
        a: [
          'Jusqu’à 40 joueurs, pour affronter le Kralamoure de la Faille.',
          'Faille en accès libre : combats illimités ; seuls les 3 meilleurs scores du jour comptent ; dégâts additionnés ; coffres selon le classement du jour (constaté le 18 oct 2026).',
          'Les dégâts cumulés conditionnent certains Prestiges.',
        ],
      },
      {
        id: 'dimension',
        q: 'Qu’est-ce que la Dimension Écarlate ?',
        a: [
          'Mode de guilde : vagues sans fin, de plus en plus fortes ; chemin renouvelé chaque lundi.',
          'Points par vague, multiplicateur de difficulté de ×1 à ×7,5 ; ta meilleure descente de la semaine compte.',
          'Guilde classée sur ses 10 meilleurs membres.',
          'Ni XP ni butin en combat : coffres le lundi pour les meilleures guildes.',
          'Entrée 20 énergie, vagues suivantes gratuites ; un Seigneur de la Dimension toutes les 50 vagues.',
        ],
      },
      {
        id: 'saison',
        q: 'C’est quoi la saison Héroïque ?',
        a: [
          'Événement limité : un perso de saison créé de zéro, en plus du principal (intact).',
          'Pas d’énergie, beaucoup plus d’XP, mais mort définitive face aux boss.',
          'Récompenses sur le perso principal ; le contenu de la Banque (8 emplacements, +3 par Prestige) y est transféré à la fin.',
        ],
        see: { href: '/contenus/saison/', label: 'Saison' },
      },
    ],
  },
  {
    id: 'hdv',
    title: 'Hôtel de vente et kamas',
    items: [
      {
        id: 'hdv',
        q: 'Comment vendre et acheter à l’HDV ?',
        a: [
          'Prix libre, 20 ventes à la fois max, taxe de 8 % sur le prix de vente.',
          'Un objet acheté est lié 24 h. Objets éternels et verrouillés invendables.',
        ],
      },
    ],
  },
  {
    id: 'compte',
    title: 'Compte et communauté',
    items: [
      {
        id: 'invite',
        q: 'Je joue en invité : comment sauvegarder ?',
        a: [
          'Un compte invité est lié au navigateur : sauvegarde-le avec un e-mail et un mot de passe (rappel après 12 minutes de jeu).',
          'E-mail, mot de passe et suppression : dans les Paramètres.',
        ],
      },
      {
        id: 'discord',
        q: 'Quel est le bonus Discord ?',
        a: [
          '+10 % XP, +10 % butin, +5 % stats, à vie tant que le compte reste lié, partout (arène comprise).',
          'Liaison depuis le Tableau de bord, partagée avec le perso de saison.',
        ],
      },
      {
        id: 'compagnon',
        q: 'Qu’est-ce que le compagnon ?',
        a: [
          'Un allié qui grandit avec des croquettes : +0,2 % à tout l’équipement par niveau, jusqu’à +79,8 % au niveau 400.',
          'Croquette : 5 % par combat gagné (aucune en Auto AFK), 100 données par jour max.',
          'N’agit pas aux Abysses ni sur PA/PM/PO/invocations.',
        ],
        see: { href: '/economie/#compagnon', label: 'Compagnon' },
      },
      {
        id: 'connexion',
        q: 'À quoi sert la série de connexion ?',
        a: [
          'Calendrier de 7 jours : un coffre de plus en plus gros, gros cadeau au 7e jour. Un jour raté remet à 1.',
          'Pack « Bon retour » après 2 jours d’absence.',
        ],
      },
      {
        id: 'parrainage',
        q: 'Que gagne le parrain ?',
        a: [
          'Quand l’ami atteint le niveau 30 : 1 Coffre Royal et 2 Coffres Épiques, une fois par ami.',
          '5 parrainages valides par semaine max ; l’ami doit être nouveau et sur une autre connexion.',
        ],
      },
      {
        id: 'absence',
        q: 'Que fait mon perso quand je ne suis pas là ?',
        a: ['Dans la Grotte de l’Aéfka, il ramasse coffres, kamas et XP ; à ton retour, la fenêtre « Pendant ton absence » montre le butin.'],
      },
      {
        id: 'bug',
        q: 'J’ai un bug : que faire ?',
        a: [
          'Rafraîchis la page.',
          'Sinon, signale-le sur le chat ou le Discord (salon bugs et suggestions) : ce que tu faisais, ton pseudo, l’heure.',
          'N’exploite pas un bug.',
        ],
      },
      {
        id: 'payant',
        q: 'Le jeu est-il payant ?',
        a: [
          'Non : projet de fans gratuit, sans publicité ni achat, non affilié à Ankama.',
          'Prestiges au-delà du 15 annoncés « bientôt disponibles », sans date.',
        ],
      },
    ],
  },
];
