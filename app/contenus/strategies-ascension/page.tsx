import type { Metadata } from 'next';
import Link from 'next/link';
import { Disc, Essentiel, Fiche, Joueurs, PageEnd, PageHeader, Section, TableWrap, Warn } from '@/components/ui';
import { SectionIcon } from '@/components/icons';

export const metadata: Metadata = {
  title: 'Stratégies communautaires de l’Ascension',
  description: 'Ascension de RpgMasters : repères officiels (boss Transmutés, paliers de Prestige) et conseils de joueurs non officiels, étage par étage (17 à 255), mécaniques des mobs, déchaînement, reflets, ordre de focus.',
};

const PALIERS: [string, string][] = [
  ['110', 'Prestige 10'],
  ['140', 'Prestige 11'],
  ['170', 'Prestige 12'],
  ['200', 'Prestige 13'],
  ['230', 'Prestige 14'],
  ['260', 'Prestige 15 (avec un record de 130 étages aux Abysses)'],
];

export default function Page() {
  return (
    <>
      <PageHeader href="/contenus/strategies-ascension/" art="ascension" title="Stratégies communautaires de l’Ascension" intro="Ce que dit le développeur, puis les conseils des joueurs du Discord, étage par étage (17 à 255)." />
      <Warn title="Conseils de joueurs, non officiels">
        <p>
          Les conseils de cette page viennent des discussions du Discord RpgMasters, pas du développeur. Ils sont rédigés au conditionnel et n’ont pas été testés par ce wiki :
          notre record est l’étage 41. Seuls les blocs marqués « Discord officiel » viennent d’une annonce signée du développeur.
        </p>
      </Warn>
      <Essentiel>
        <li>Au-delà de l’étage 100, les boss deviennent des <strong>Transmutés</strong> (« Comte Razof Transmuté »…). <Disc d="08/10" /></li>
        <li>Leurs mécaniques sont « impossibles à deviner à l’avance » : passer son tour deux fois, sorts plus chers, élément qui change, soins inversés, échange de PV, soins du boss avec ta propre force… <Disc d="08/10" /></li>
        <li>Depuis le 12/10, chaque mécanique s’affiche sur la carte du boss, avec une alerte rouge ⚠ le tour où elle tombe. <Disc d="12/10" /></li>
        <li>Les succès vont jusqu’à l’<strong>étage 260</strong>. <Disc d="10/10" /></li>
      </Essentiel>
      <Fiche
        title="Paliers de Prestige (étages 105 à 260)"
        icon={<SectionIcon section="prestige" size={20} />}
        rows={PALIERS.map(([e, p]) => [`Étage ${e}`, p])}
      />
      <Section id="officiel" title="Règles officielles utiles au-delà de l’étage 100">
        <ul>
          <li>Soins et boucliers plafonnés à <strong>40 % des PV max</strong>, <strong>2 sorts de soin ou de bouclier par tour</strong> (3 pour l’Eniripsa et le Sacrieur), Ascension comprise. <Disc d="16/10" /></li>
          <li>Pandawa : les soins d’Ivresse ne sont jamais réduits ni inversés par les mécaniques anti-soin (Inversion des Transmutés comprise). <Disc d="10/10" /></li>
          <li>Fureur des boss : l’arme ne compte plus dans les cartes jouées du tour. <Disc d="20/10" /></li>
          <li>Les étages atteints restent acquis après un Prestige (voir <Link href="/personnage/prestige/">Prestige</Link>).</li>
        </ul>
      </Section>
      <Section id="conseils" title="La méta selon les joueurs (étages 105 à 260)">
        <Warn title="Non officiel : conseils de joueurs">
          <p>
            Résumé du salon #boss-et-stratégies (messages du 13 au 21/10/2026), sans pseudo. Rien de tout cela n’a été testé par ce wiki ni confirmé
            par le développeur : à lire comme des pistes.
          </p>
        </Warn>
        <ul>
          <li><strong>Méta « rush »</strong> : selon les joueurs, il vaudrait mieux tuer vite que chercher à tenir, les Transmutés punissant les combats longs.</li>
          <li><strong>Traversée</strong> serait l’une des cartes les plus jouées à ces étages.</li>
          <li><strong>Appui</strong> se jouerait avec une <strong>dague</strong>.</li>
          <li>Contre les boss à <strong>renvoi</strong>, un deck <strong>mono-élément</strong> serait conseillé.</li>
          <li>Dofus recommandés : <Link href="/equipement/dofus/#passifs">Ébène</Link> (Perforation ×1,3), <Link href="/equipement/dofus/#passifs">Émeraude</Link> (survit une fois à 20 % de PV) et <Link href="/equipement/dofus/#passifs">Ivoire</Link> (aucun coup ordinaire au-delà de 35 % des PV max).</li>
        </ul>
        <TableWrap caption="Tranches d’étages et repères">
          <thead><tr><th>Étages</th><th>Repère officiel</th><th>Conseils de joueurs</th></tr></thead>
          <tbody>
            <tr><td>105 – 110</td><td>Transmutés · P10 à 110</td><td>rush, Traversée, Dofus Ébène / Émeraude / Ivoire</td></tr>
            <tr><td>111 – 260</td><td>P11 à 140 … P15 à 260</td><td>mêmes conseils ; mono-élément contre les boss à renvoi</td></tr>
          </tbody>
        </TableWrap>
        <p>Les messages ne détaillent pas de composition étage par étage, et rien n’a été trouvé pour les étages 42 à 60.</p>
      </Section>

      <Section id="par-etage" title="Conseils par étage">
        <Joueurs src="#boss-et-stratégies, 06–19/10">
          <p>Notes de joueurs, au conditionnel, souvent d’avant les nerfs du 14/10 (boucliers) : à vérifier. Notre propre record est l’étage 41 (voir <Link href="/contenus/ascension/">Ascension</Link>).</p>
        </Joueurs>
        <TableWrap caption="Conseils de joueurs par étage (non officiels)">
          <thead><tr><th>Étage</th><th>Ce qui aurait marché</th><th>Date</th></tr></thead>
          <tbody>
            <tr><td>17 – 18</td><td>Supervizoeuf ; au 18, le boss scellerait les cartes les plus chères. Les indices seraient dans le texte du boss.</td><td>07/10</td></tr>
            <tr><td>28</td><td>Tuer Ush sans toucher au Sac ; un deck réduit à 5 sorts passerait en Auto. Toxoliath empêcherait le soin, renvoi de dégâts aux tours 4-5.</td><td>07/10 · 12/10</td></tr>
            <tr><td>34</td><td>Ombre (Fureur) : plus de 2 cartes → prochaine attaque ×2,5, l’arme ne compterait pas. Odorat + Mutilation permettraient de contourner la règle.</td><td>09/10</td></tr>
            <tr><td>36 – 37</td><td>36 : 2 cartes de pioche dans les trophées + boucliers, Auto possible. 37 (Phossile, Razof, Père Ver) : 2 sorts par tour max ; focus Kolosso (sauf tours 4-5 : renvoi), puis Père Ver, puis Razof ; pas de sort de zone, Vertu chaque tour, Précipitation sur le mob qui tape le plus fort, jamais 2 fois le même élément d’affilée.</td><td>07/10 · 09/10</td></tr>
            <tr><td>38</td><td>« Déchaînement » au-delà de 2 cartes : jouer des rallonges de PA et Précipitation.</td><td>07/10</td></tr>
            <tr><td>43</td><td>Focus en priorité le mob qui débuffe ou bloque des sorts.</td><td>08/10</td></tr>
            <tr><td>52 – 55</td><td>52 : deck full bouclier (Couronne, Vertu, Odorat, Précipitation, Bluff). 55 : Supernova + Tromperie + Évolution + Vertu + Précipitation ; focus Ougah (2 cartes, le corps-à-corps ne compte pas), puis Vertu + Précipitation suffiraient contre Bworker et Barbéryl. Scaraboss : garder 3 PA.</td><td>08/10</td></tr>
            <tr><td>77</td><td>Tuer Cell d’abord, puis ToT quand on a assez de PV/bouclier, Kimbo en dernier.</td><td>09/10</td></tr>
            <tr><td>85</td><td>Un sort à beaucoup de PA ; soins possibles ; focus Phossile ; au tour 1, Traversée + un autre sort pour toucher tout le monde.</td><td>09/10</td></tr>
            <tr><td>97</td><td>Focus Fuji, aucun soin tant qu’elle vit ; ne pas taper Kolosso aux tours 4-5 ; Razof en 2e.</td><td>09/10</td></tr>
            <tr><td>98</td><td>Sphincter (100 000 PV, 90 % de résistance, bouclier) : le taper seulement quand il n’a plus de bouclier, sinon tuer les autres ; de la pénétration ; Obsidienne en premier pour pouvoir se soigner ; ordre Glours → Fuji → Kani ; option « stop Auto quand il ne reste qu’un ennemi » puis manuel. 3 à 4 essais.</td><td>10/10 · 12/10</td></tr>
            <tr><td>99</td><td>Fuji / Razof / Ombre : boucliers au tour 1 puis Traversée ; focus Razof → Ombre → Fuji ; jouer « sur le retour » de la Fuji. Variante : Kani → Hell Mina.</td><td>10/10 · 12/10</td></tr>
            <tr><td>102</td><td>Fuji puis Kani. Au-delà de 100, il faudrait du Rayonnant +5 partout ou des légendaires.</td><td>10/10 · 12/10</td></tr>
            <tr><td>105</td><td>Échange de PV avec Père Ver utile ; Ush en premier, isoler Cell si besoin.</td><td>16/10</td></tr>
            <tr><td>127</td><td>Ajouter un Dofus Tacheté pour ne pas perdre de carte ; l’Auto ne passerait pas.</td><td>12/10</td></tr>
            <tr><td>129</td><td>« 3-2-1 » : taper Komi le plus tôt, DPS l’Obsidienne, se soigner sur le reflet. Autre ordre cité : Ombre → Razof → Fuji.</td><td>10/10 · 12/10</td></tr>
            <tr><td>130 – 131</td><td>130 : Kolosso → Toxo → Korriandre, pas de soin possible sur Korriandre, la laisser en dernier. 131 : focus le mob le plus à gauche, gros dégâts puis bouclier ; les 3 premiers tours en Auto puis manuel ; perforation à plafonner, build mono-élément.</td><td>12/10 · 13/10</td></tr>
            <tr><td>145</td><td>Korriandre (malédiction des soins) puis Razof, puis le XLII en 1v1 en surveillant l’élément renvoyé ; sorts mono-élément multi-lignes, vol de vie, boucliers ; triple ligne neutre en vol de vie contre le XLII (il ne renverrait pas le neutre) ; Dofus Ivoire intéressant.</td><td>15/10 → 18/10</td></tr>
            <tr><td>185</td><td>Commencer par Barbéryl avec une Traversée très boostée, feu de zone pour toucher aussi le Sac, focus le Sac jusqu’à son Reflet Feu, puis Précipitation + Odorat sur lui en boucle.</td><td>18–19/10</td></tr>
            <tr><td>232</td><td>Supervizoeuf a « seuil de douleur » : ne pas le focus ; Sphincter d’abord (réduit les soins), puis 1v1 ; reflets chaque tour ; sorts mono-élément ou à 2 lignes ; deck proche du minimum.</td><td>15/10</td></tr>
            <tr><td>235</td><td>Inversion : 2 tours sans bouclier ni soin, Koumiho + Supervizoeuf taperaient ~20 000. Un Sram (Invisibilité) esquiverait ces 2 tours.</td><td>15/10</td></tr>
            <tr><td>245</td><td>XLII immunisé à un élément, renvoi élémentaire, 6 % de ses PV max par coup : trouver l’élément qui passe, sorts multi-lignes, corps-à-corps neutre. Phossil en 2e ; attention au Glas et à l’Onde de choc ; temporiser aux tours 5-6 (inversions).</td><td>15/10</td></tr>
            <tr><td>255</td><td>Un Ouginak passerait facilement.</td><td>16/10</td></tr>
          </tbody>
        </TableWrap>
        <p>Étages cités comme blocages (11–17/10) : 37, 92, 97–99, 102, 105, 127, 129, 131, 135, 140, 210, 232, 235, 240, 242, 245.</p>
      </Section>

      <Section id="mecaniques" title="Mécaniques des mobs (vues par les joueurs)">
        <Joueurs src="#boss-et-stratégies, 06–21/10">
          <ul>
            <li>Rat Noir, Haute Truche (dès le tour 3) et Nelween (dès le tour 4) : les sorts de soin et de vol de vie infligeraient des dégâts au lieu de soigner.</li>
            <li>Koumiho renverrait les dégâts aux tours 3 et 4 ; un joueur dit que le renvoi s’applique dès le tour 2 alors que le texte annonce 3-4.</li>
            <li>Croca / Blop : sorts à 2 PA aux tours 3-4. Le XLII frapperait fort au-delà de 3 cartes dans le même tour.</li>
            <li>Malédiction des soins : ce serait le mob de gauche qui applique ses effets (21/10). Le vol de vie ne serait pas touché par « tes soins te blessent à partir du tour 2 ».</li>
            <li>« Seuil de douleur » : environ 16 coups à plafonner ; il faudrait des lignes plafonnées et aucune mécanique de soin ou de bouclier.</li>
            <li>Les effets des boss sont rappelés dans la boîte de dialogue en début de combat ; depuis le 12/10, ils sont affichés sur la carte du boss (officiel). <Disc d="12/10" /></li>
          </ul>
        </Joueurs>
      </Section>

      <Section id="dechainement" title="Déchaînement et Fureur">
        <Joueurs src="#boss-et-stratégies, 07–09/10">
          <ul>
            <li>Certains boss se « déchaînent » au-delà de 2 cartes jouées dans le tour (étages 34, 37, 38…).</li>
            <li>La pioche compterait comme une carte jouée ; l’arme jouée entre deux sorts ferait compter 3 sorts ; le Portail de l’Éliotrope compterait comme un sort (signalé comme bug, non confirmé). Le 20/10, l’arme ne compte plus pour la Fureur (officiel). <Disc d="20/10" /></li>
            <li>Parade conseillée : un débuff (Précipitation ou Odorat : prochaine attaque affaiblie de 45 %) + double bouclier (Vertu), et un deck de 5 à 7 cartes qui couvre tous les coûts en PA.</li>
          </ul>
        </Joueurs>
      </Section>

      <Section id="reflets" title="Reflets, renvois et immunités">
        <Joueurs src="#boss-et-stratégies et #équilibrage, 09–18/10">
          <ul>
            <li>Les Transmutés seraient immunisés à un élément (et se soigneraient si on le tape) ou refléteraient 100 % des dégâts de cet élément.</li>
            <li>Contre un reflet : jouer soin ou vol de vie et tuer d’abord les mobs qui empêchent de se soigner ; Tempête de Puissance et Ciguë sont citées.</li>
            <li>Boss « 6 % des PV max par coup » : trouver l’élément qui passe et multiplier les lignes (Traversée, Drain, Bluff), puis finir en mono-élément non reflété.</li>
            <li>Contre les boss à renvoi : mono-élément, pas de sort de zone, et ne jamais enchaîner 2 fois le même élément (Onde de choc).</li>
            <li>Boss cumulant malédiction des soins, carapace, reflet, élément mouvant et seuil de douleur : on ne pourrait pas faire tomber son bouclier ; un boss échange ses PV avec les tiens.</li>
          </ul>
        </Joueurs>
      </Section>

      <Section id="focus" title="Ordre de focus">
        <Joueurs src="#boss-et-stratégies, 07–18/10">
          <ul>
            <li>En général : d’abord le mob qui débuffe, scelle des cartes ou empêche les soins, puis celui qui tape le plus fort ; le boss à renvoi en dernier, hors de ses tours de renvoi.</li>
            <li>Exemples : Razof → Ombre → Fuji (99) ; Fuji → Kani (102) ; Kolosso → Toxo → Korriandre (130) ; Korriandre → Razof → XLII (145) ; Sphincter puis 1v1 (232).</li>
            <li>Deux decks suffiraient : un deck soin et un deck bouclier ; deck « Ascension free » cité jusqu’à l’étage 61-85 : Précipitation, Bluff, Invisibilité, Drain, Vertu, Traversée, Odorat (+ Tromperie). Voir les <Link href="/personnage/caracteristiques/#conseils-joueurs">codes de deck DM-S et vitrines</Link>.</li>
            <li>Équipement : un joueur bloqué à l’étage 70 en full Rayonnant +5 serait passé en Auto jusqu’à 90 en changeant de stuff ; Cire Momore + chapeau, arme et anneau Servitude pour tanker ; Dofus Émeraude / Ivoire comme seconde chance.</li>
          </ul>
        </Joueurs>
      </Section>

      <PageEnd current="/contenus/strategies-ascension/" see={[{ href: '/contenus/ascension/', label: 'Ascension (étages observés)' }, { href: '/personnage/prestige/', label: 'Prestige' }, { href: '/a-propos/journal/', label: 'Journal des mises à jour' }]} sources="Discord officiel RpgMasters, #annonces (08/10, 10/10, 12/10, 16/10, 20/10) ; #boss-et-stratégies, #aide et #équilibrage, joueurs (06–21/10, non officiel) ; FAQ du jeu relevée le 20/10" />
    </>
  );
}
