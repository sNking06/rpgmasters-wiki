import type { Metadata } from 'next';
import Link from 'next/link';
import GameCapture from '@/components/GameCapture';
import { Contra, Disc, Essentiel, PageEnd, PageHeader, Section, Warn } from '@/components/ui';

export const metadata: Metadata = {
  title: 'Journal des mises à jour',
  description: 'Patch notes officiels de RpgMasters, datés, d’après le salon #annonces du Discord officiel (signés du développeur), du 8 au 20 octobre 2026.',
};

type Entry = { d: string; title: string; items: string[]; captures?: string[]; links?: { href: string; label: string }[] };

const ENTRIES: Entry[] = [
  {
    d: '20/10', title: 'Mise à jour du 20 octobre 2026', captures: ['patch-2026-10-20'],
    items: [
      'Anti-bots : pour tout débloquer, il faut lier un compte Discord de plus de 3 jours. Les invités n’ont accès qu’à l’Aventure et à la Chasse. Les comptes déjà inscrits restent débloqués. Un seul compte par adresse e-mail.',
      'La Roue Bouftou ne tourne qu’après 10 victoires.',
      'Fureur des boss : l’arme ne compte plus dans les cartes jouées du tour. Faille : un deck trop petit ne consomme plus d’essai.',
      'Mode Auto : nouveau réglage « piocher en premier ». « Un autre combat » relance dans le mode actuel, avec un bouton « Relancer en manuel ».',
      'Abysses sans limite d’étages (plus de plafond à 1000), 1 relance des propositions tous les 25 étages (3 en réserve).',
      'HDV : filtre par niveau de fusion, Dofus / Trophées / Prysmaradites séparés, historique des ventes. 98 panoplies reçoivent un bonus à 2 objets.',
      'Saison des Cartes : fin affichée le dimanche 25/10 à 18 h. Textes harmonisés : il ne reste que le « mode Auto ».',
    ],
    links: [{ href: '/debuter/bases/#discord', label: 'Lier son Discord' }, { href: '/contenus/abysses/', label: 'Abysses' }],
  },
  {
    d: '18/10', title: 'Patch note du 18/10', captures: ['patch-2026-10-18', 'patch-saison-cartes-annonce'],
    items: [
      'Mode Auto AFK : plus de malus (XP, kamas, coffres, butin entiers, croquettes, même pity). Le bouton s’appelle « Auto (enchaîne) ».',
      'Limite de combats par heure et par jour, tous modes confondus.',
      'Faille du Kralamoure : plus de chrono, les 3 plus gros combats du jour comptent, Boules de capture sur les 10 premiers combats du jour.',
      'Prestige : les Prestiges 5 et 6 n’ont plus de condition de dégâts à la Faille.',
      'Roue Bouftou : un tour toutes les 3 h, jackpot 0,01 %. Pano Mehdi : +2 % de dommages aux sorts par objet porté.',
      'Sécurité : des comptes ont été suspendus pour usage possible de bots.',
      'Saison des Cartes : dimanche 18 oct. 18 h → dimanche 25 oct. 18 h, XP ×4, énergie illimitée.',
    ],
    links: [{ href: '/contenus/kralamoure/#historique', label: 'Historique de la Faille' }, { href: '/personnage/prestige/#officiel', label: 'Prestige' }],
  },
  {
    d: '17/10', title: 'Patch note du 17/10', captures: ['patch-2026-10-17'],
    items: [
      'Roue Bouftou (menu « Plus »), un tour toutes les 3 h, principal uniquement : 2 000 kamas 30 %, 5 Boules de capture 20 %, 3 tickets d’arène 18 %, 10 000 kamas 12 %, Coffre bonus 10 %, 50 000 kamas 5 %, Coffre épique 3,5 %, Coffre royal 1 %, jackpot 0,01 % (objet de la pano Mehdi).',
      'Pano Mehdi : +20 % de stats par objet porté (hors PA, PM, PO) et +2 % de dégâts de sorts chacun (11 objets = +22 %).',
      'Roublard retravaillé, Osamodas (attaque coordonnée 25 % → 50 %), Transfusion (1 à 80 % des PV max en Neutre, 2 fois par tour).',
    ],
  },
  {
    d: '16/10', title: 'Mise à jour du 16 octobre · Chasse ciblée', captures: ['patch-2026-10-16', 'patch-2026-10-16-chasse-ciblee', 'patch-chasse-ciblee-pity'],
    items: [
      'Dofus et trophées fusionnables jusqu’à Rayonnant +5 : +100 % sur leurs stats (PA et PM au plus ×2).',
      'Plafond des soins 25 % → 40 % des PV max, comme les boucliers ; toujours 2 sorts de soin ou de bouclier par tour (3 pour l’Eniripsa et le Sacrieur).',
      'Chasse ciblée : 1 000 kamas par combat, 5 % de drop par victoire réparti entre 3 objets choisis au plus. Pity (correctif, date non relevée) : l’objet tombe tous les 100 combats, tous les 200 en Auto AFK.',
    ],
    links: [{ href: '/economie/#chasse-ciblee', label: 'Chasse ciblée' }],
  },
  {
    d: '14/10 → 16/10', title: 'Mise à jour du 14 au 16 octobre', captures: ['patch-2026-10-14-16'],
    items: [
      'Plafond des boucliers 25 % → 40 % des PV max ; soins restés à 25 % (jusqu’au 16/10).',
      'Nouveau sort Maîtrise des Popokémons (6 PA) : tombe en fin de combat de la Faille du Kralamoure, 5 % de chances, une seule fois par personnage.',
      '9 objets légendaires (un par catégorie) : 1 sur 1 000 000 par victoire, 10 au plus par jour et par objet sur le serveur.',
    ],
  },
  {
    d: '14/10', title: 'Mise à jour et correctif du 14 octobre', captures: ['patch-2026-10-14', 'patch-2026-10-14-correctif'],
    items: [
      'Soins et boucliers : mêmes limites partout (25 % des PV max, 2 sorts par tour), Ascension, Dimension Écarlate et Colisée compris. Les boucliers du Féca ne montent plus sans limite.',
      'Runes : un objet runé peut monter en fusion et être gardé au Prestige (il devient éternel avec ses runes). Rune de Fureur : +8 % → +2 % de dégâts critiques.',
      'Abysses : un Coffre de trophée au choix tous les 5 étages, un Coffre de trophée Rayonnant +1 au choix tous les 50.',
      'Colisée en travaux : retiré des prérequis du Prestige.',
    ],
  },
  {
    d: '13/10', title: 'Équilibrage Féca',
    items: ['Armure Féca plafonnée à 20 % (relevé du Discord du 21/10 ; texte exact de l’annonce non recopié ici).'],
    links: [{ href: '/personnage/classes/feca/', label: 'Féca' }],
  },
  {
    d: '12/10', title: 'Patchs du 12 octobre',
    items: [
      '02:26 — 15 nouveaux passifs de Dofus ; l’Initiative fonctionne ; sorts à une ligne (+50 %, puis +20 % par tour, jusqu’à +150 %) ; grands decks (+5 % par carte au-delà de 7, jusqu’à +25 %) ; 8 decks et 8 équipements ; croquettes à 10 % par victoire.',
      '08:55 — Arène Ultime (duels 1v1 en direct, Elo séparé, dégâts −60 %) et système d’amis.',
      '10:44 — Mécaniques des boss affichées sur la carte du boss, avec alerte rouge.',
      '16:56 — Les Runes (1 % / 0,5 % / 0,1 % par victoire) et le Poutch d’entraînement (100 M de PV).',
    ],
    links: [{ href: '/equipement/dofus/#passifs', label: 'Passifs des Dofus' }, { href: '/economie/#runes', label: 'Runes' }],
  },
  {
    d: '11/10', title: 'Fin de la Saison Héroïque',
    items: ['Seule la Banque de saison est transférée sur le perso principal ; les objets éternels peuvent y être rangés. Énergie illimitée les 7 premiers jours après création d’un compte.'],
  },
  {
    d: '10/10', title: 'Équilibrage des classes, Dofus, lot « Fidélité », succès',
    items: [
      '17:51 — Passifs de classe revalorisés (toutes sauf Iop et Zobal) ; changement de classe à 300 000 kamas.',
      '18:36 — Effets des 10 Dofus majeurs ; Dofawa : « effet mystère ».',
      '22:39 — Série de connexion, l’Élan, parrainage, Compagnon, Dimension Écarlate.',
      '23:24 — 323 succès (Ascension jusqu’à l’étage 260, Prestiges 11 à 15) avec de l’énergie à la clé ; Compagnon : +0,2 % par niveau.',
    ],
  },
  {
    d: '09/10', title: 'Saison Héroïque lancée',
    items: ['Du 9/10 18 h au 12/10 8 h : perso de saison, mort définitive face aux boss, Banque. Kralamoure : Top 10 du meilleur combat du jour. Arène : 10 tickets gratuits par jour, +2 par quête du jour.'],
  },
  {
    d: '08/10', title: 'Patch 2.5, 2.5.1 et gros patch nocturne',
    items: [
      'Patch 2.5 : choix du deck et du stuff à chaque combat, pioche, Forgemagie sans échec (1 orbe = 1 XP), fusion repensée (Rayonnant dès T3), succès.',
      '2.5.1 : deck minimum 7 cartes ; coffres de choix par rareté.',
      'DofusMasters devient RpgMasters (rpgmasters.houk.fr).',
      'Patch nocturne : boutique de coffres plafonnée, taxe HDV 8 %, Abysses jusqu’à 1000, arène hebdomadaire, Prestige lié à l’Ascension seule (P7 40, P8 60, P9 80, P10 110), boss Transmutés au-delà de l’étage 100, bonus Discord +10 % XP et butin, +5 % aux caractéristiques.',
    ],
  },
];

export default function JournalPage() {
  return (
    <>
      <PageHeader href="/a-propos/journal/" section="sources" title="Journal des mises à jour" intro="Les patch notes officiels, du plus récent au plus ancien, d’après le salon #annonces du Discord du jeu." />
      <Essentiel>
        <li>Source : messages et images signés du développeur (Mehdi) dans <strong>#annonces</strong>, relevés le 21/10/2026 vers 11 h.</li>
        <li>Chaque bloc porte la date de l’annonce ; les règles ont souvent changé plusieurs fois en quelques jours.</li>
        <li>Les pages du wiki gardent les valeurs vérifiées en jeu ; les écarts sont signalés dans des encadrés « Contradiction ».</li>
      </Essentiel>
      <Warn title="Relevé incomplet">
        <p>Le texte de #annonces n’a été extrait que jusqu’au 12/10 ; du 14 au 20/10, ce journal s’appuie sur les images de patch notes. L’annonce du 13/10 (Féca) n’est connue que par le résumé du relevé.</p>
      </Warn>
      <Section id="journal" title="Patch notes datés">
        <ol className="patch-list">
          {ENTRIES.map((e) => (
            <li key={e.d} id={`p-${e.d.replace(/[^0-9]+/g, '-')}`}>
              <h3>{e.title} <Disc d={e.d} /></h3>
              <ul>{e.items.map((t, i) => <li key={i}>{t}</li>)}</ul>
              {e.links?.length ? <p>Voir : {e.links.map((l, i) => <span key={l.href}>{i ? ' · ' : ''}<Link href={l.href}>{l.label}</Link></span>)}</p> : null}
              {e.captures?.map((id) => <GameCapture key={id} id={id} />)}
            </li>
          ))}
        </ol>
      </Section>
      <Section id="bugs-connus" title="Bugs connus (Discord, 07–21/10)">
        <Warn title="Signalés par des joueurs, non confirmés">
          <p>Relevé des salons #bugs (07 au 20/10), #général et #aide, sans pseudo. Le développeur confirme rarement une correction dans le salon : beaucoup de ces bugs ont pu être corrigés, et ceux repris dans un patch officiel sont indiqués.</p>
        </Warn>
        <h3>Combat</h3>
        <ul>
          <li>Dommages fixes et dommages critiques appliqués seulement à la 1re ligne des sorts multi-lignes (Traversée, Drain, Bluff, Tromperie…), signalé les 09, 12 et 14/10 ; dégâts de la Traversée (Iop) jugés faux le 20/10.</li>
          <li>Déchaînement : la pioche, l’arme jouée entre deux sorts et le Portail de l’Éliotrope compteraient comme des sorts (09/10) ; l’arme ne compte plus pour la Fureur depuis le 20/10 (officiel).</li>
          <li>Renvoi de dégâts affiché aux tours 3-4 mais appliqué dès le tour 2 (16/10) ; Ombre inversant les PV même à 100 % (11/10) ; Razof se déchaînant sans condition (10/10).</li>
          <li>L’IA de l’Auto ne lançait pas Précipitation ni Masque du Psychopathe (07–08/10).</li>
          <li>Pourpre et chance de l’Écaflip non cumulés ; réduction de −60 % du PvP appliquée ailleurs ; perforation du Dofus Ébène bloquée à 25 % (encore le 17/10) ; Pandawa soigné par les renvois au-delà de l’étage 100 ; bonus des sorts à une ligne remis à 50 % chaque tour (12/10).</li>
          <li>Pioche bloquée (7 cartes, 6 en main, 3 pioches inutilisables) et valeur des passifs Zobal non mise à l’échelle du Prestige dans le journal (15/10).</li>
          <li>Déconnexions pour inactivité en plein combat manuel, combats d’Ascension revenus quelques tours en arrière (07–12/10).</li>
        </ul>
        <h3>Objets, runes et Prestige</h3>
        <ul>
          <li>Objets R5 runés disparus au passage de Prestige (12/10) ; impossible de verrouiller un objet runé (13 → 18/10, cadenas sur les objets runés ajoutés le 20/10).</li>
          <li>Dofus et trophées bloqués à R+2 en fusion (14 → 16/10 ; R+5 annoncé le 16/10).</li>
          <li>Panoplies Crockuzko, Pol Ouatnos et Justicier sans bonus (07 → 19/10, correction jamais confirmée).</li>
          <li>Import d’équipement par code : « Erreur serveur » (13 et 17/10) ; HDV limité à 13-17 ventes sur 20 (13–14/10).</li>
          <li>08/10 : « Tout cocher » à la vente sélectionnait aussi les Rayonnants (des joueurs en ont vendu par erreur) ; 09/10 : une fusion T2 → T3 aurait tout remis en T1 ; prix des coffres affiché faux (corrigé le 20/10, officiel). Fusion refusée alors que rien n’est verrouillé (17–21/10).</li>
        </ul>
        <h3>Comptes, énergie et saison</h3>
        <ul>
          <li>Énergie illimitée expirée après 5 jours au lieu de 7 ; achats (énergie illimitée 3 jours, 2 000 orbes) non crédités ; série de connexion remise à 1/7 (12–17/10).</li>
          <li>Saison Héroïque : objets éternels perdus ou gardés à tort à la mort, perso perdu après un crash compté comme défaite (10–12/10).</li>
          <li>Classement de saison peu fiable, compteur de cartes bloqué vers 1 000 ; joueurs à l’étage 1000 des Abysses non départagés (19/10).</li>
          <li>Un combat de Krala brisait la série de l’Élan (11/10) ; corrigé le 20/10 (officiel). Interface mobile instable, chat bloqué en hauteur.</li>
        </ul>
        <h3>Exploits et triche signalés</h3>
        <ul>
          <li>12/10 : un exploit des <strong>défis de l’Élan</strong> a été signalé au développeur dans #bugs. Statut de correction non lu.</li>
          <li>08/10 : une stratégie combinant le Portail de l’Éliotrope et le corps-à-corps a été qualifiée de « use-bug » par un joueur.</li>
          <li>~20/10 : soupçons d’automatisation au classement des Abysses (montées d’étages très rapides) ; aucune sanction lue. Le 18/10, des comptes ont été suspendus pour usage possible de bots (officiel).</li>
        </ul>
      </Section>
      <Section id="contradictions" title="Règles qui ont changé">
        <Contra title="À garder en tête">
          <ul>
            <li>Auto AFK : −50 % jusqu’au 18/10, sans malus depuis (la chasse ciblée du 16/10 parlait encore du « nerf habituel » en AFK).</li>
            <li>Soins et boucliers : 25 % le 14/10, boucliers 40 % entre le 14 et le 16/10, soins 40 % le 16/10.</li>
            <li>Compagnon : « jusqu’à +100 % au niveau 400 » puis, le même soir, +0,2 % par niveau (+79,8 % au niveau 400).</li>
            <li>Abysses : jusqu’à 1000 étages le 8/10, sans limite le 20/10.</li>
            <li>Saison des Cartes : un visuel annonce du vendredi 23/10 18 h au lundi 26/10 8 h, alors que l’annonce et le patch du 20/10 disent du 18/10 18 h au 25/10 18 h.</li>
          </ul>
        </Contra>
        <GameCapture id="patch-saison-cartes-23-26" caption="Visuel aux dates différentes (23 → 26 oct)" />
      </Section>
      <PageEnd current="/a-propos/journal/" see={[{ href: '/a-propos/sources/', label: 'Sources et limites' }, { href: '/personnage/prestige/', label: 'Prestige' }, { href: '/contenus/kralamoure/', label: 'Kralamoure' }]} sources="Discord officiel RpgMasters, #annonces (relevé du 21/10/2026)" />
    </>
  );
}
