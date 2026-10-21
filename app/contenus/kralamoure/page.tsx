import GameCapture, { CaptureGallery } from '@/components/GameCapture';
import Link from 'next/link';
import { KeyFigures, TlDr, PageHeader, Section, M, Tip, Contra, Disc, Officiel, Joueurs, Constat, Warn, TableWrap } from '@/components/ui';
export default function Page(){return <><PageHeader href="/contenus/kralamoure/" title="Kralamoure" intro="Boss de guilde : observations du 13 au 21 octobre 2026."/>      <TlDr>
  <li>Faille en accès libre, uniquement en guilde ; combats illimités, sans énergie.</li>
  <li>Seuls les 3 meilleurs scores du jour comptent ; remise à zéro vers 01:30.</li>
  <li>Le combat dure 10 tours.</li>
  <li>Le bouclier est plafonné à 40 % des PV max.</li>
</TlDr>
<KeyFigures items={[
  {icon:'record', value:'159 632', label:'Record personnel', note:'Un combat · 17/10/2026'},
  {icon:'damage', value:'385 314', label:'Score du jour', note:'18/10/2026'},
  {icon:'damage', value:'320 085', label:'Score du jour', note:'20/10/2026 · 11 h'},
  {icon:'tours', value:'10', label:'Tours par combat'},
]} />
<Section id="kralamoure" title="Kralamoure (boss de guilde)">
        <ul>
          <li>Accessible <strong>uniquement en guilde</strong> : Guilde → Faille du Kralamoure. <M s="T" /></li>
          <li>Faille en <strong>accès libre</strong> : combats <strong>illimités</strong>, <strong>10 tours</strong>, sans énergie. Seuls les <strong>3 meilleurs scores du jour</strong> comptent pour le classement (constaté le 18 oct 2026). Remise à zéro quotidienne vers <strong>01:30</strong>. <M s="T" /></li>
          <li>Environ <strong>100 M de PV</strong> partagés par la guilde. <M s="T" /></li>
          <li>Odorat divise par deux son prochain Gros coup. <M s="T" /></li>
          <li>Ancienne condition : le Prestige 5 demandait 500 000 dégâts cumulés sur le Kralamoure (et le P6 1 000 000). <M s="T" /> <strong>Supprimée le 18/10</strong>. <Disc d="18/10" /></li>
        </ul>
        <CaptureGallery ids={['guilde-faille-top10', 'guilde-classement-guildes']} />
        <h3>Deck de 7 cartes</h3>
        <p>Bouclier Féca, Vertu, Précipitation, Traversée, Bluff, Pelle des Anciens, Tibia. Précipitation en premier pour les PA, puis un bouclier presque chaque tour ; toutes les cartes de dégâts au tour 10 lors du record du 17 oct 2026. <M s="T" /></p>
        <GameCapture id="deck-7-kralamoure" />
        <ul>
          <li>Le bouclier est <strong>plafonné à 40 % des PV max</strong>. <M s="T" /></li>
          <li>Cliquer « Fin du tour » <strong>une seule fois</strong> par tour. <M s="T" /></li>
        </ul>
        <Tip title="Record personnel — 17/10/2026">
          <p><strong>159 632 dégâts</strong> avec le Deck 7 : Précipitation d’abord, un bouclier presque chaque tour, puis toutes les cartes de dégâts au tour 10. <M s="T" /></p>
        </Tip>
        <p>Lors des combats suivants dans la même journée, une fois le boss déjà terrassé, les dégâts rapportés étaient beaucoup plus faibles : <strong>23 695 à 132 314</strong> observés. La cause de cet écart n’est pas établie. <M s="T" /></p>
        <h3>Scores du jour relevés</h3>
        <ul>
          <li><strong>18 oct 2026</strong> : 9 combats (127 225, 102 020, 113 888, 125 895, 124 174, 132 194, 123 575 et 2 autres). Score du jour <strong>385 314</strong> = 132 194 + 127 225 + 125 895. <M s="T" /></li>
          <li><strong>20 oct 2026, 11 h</strong> : 3 combats, meilleur <strong>116 717</strong>, score du jour <strong>320 085</strong>. <M s="T" /></li>
          <li>Record personnel en un combat toujours <strong>159 632</strong> (17 oct 2026). <M s="T" /></li>
        </ul>
        <GameCapture id="guilde-degats-snking" caption="Dégâts de SNking par jour dans le tableau des membres" />
        <Tip title="Historique — 15 oct 2026">
          <p><strong>109 506 dégâts</strong> en un combat avec ce deck, contre <strong>74 420</strong> avec un deck de 14 cartes (15 oct 2026). Monter vite les 5 charges d’Armure, puis tout envoyer. <M s="T" /></p>
        </Tip>
      </Section>
<Section id="decks-bonus" title="Decks et bonus de combat (test du 21/10)">
  <Constat title="Bonus de combat vérifiés">
    <ul>
      <li><strong>Grands decks</strong> : +5 % par carte au-delà de 7, jusqu’à <strong>+25 % à 12 cartes</strong> ; <strong>17 cartes max</strong> par deck.</li>
      <li><strong>Sorts à une ligne</strong> : +50 %, puis +20 % par tour, jusqu’à <strong>+150 %</strong>, tant qu’aucun sort multi-lignes n’est lancé. Vérifié : <strong>Recel 2 345</strong> dégâts au tour 1, <strong>3 904</strong> au tour 5.</li>
      <li><strong>Claymomore</strong> (4 lignes) <strong>annule</strong> ce bonus.</li>
      <li>Coûts réels : Recel, Ravage, Baraka, Outrage <strong>3 PA</strong> ; Déferlement <strong>4 PA</strong>.</li>
    </ul>
  </Constat>
  <h3>Test : deck « une ligne » contre Deck 7</h3>
  <p>Deck A (12 cartes) : Recel, Ravage, Baraka, Outrage, Déferlement, Courant, Javeline de Myr, Précipitation, Arcanin, Prélude au Fer, Berserk, Bouclier Féca, avec le Dofus Pourpre.</p>
  <TableWrap caption="Dégâts sur un combat de Faille, 21/10/2026">
    <thead><tr><th>Deck</th><th className="num">Dégâts</th></tr></thead>
    <tbody>
      <tr><td>Deck A, 12 cartes à une ligne + Dofus Pourpre</td><td className="num">79 521</td></tr>
      <tr><td>Variante avec Traversée et Bluff</td><td className="num">73 254</td></tr>
      <tr><td>Deck 7 cartes habituel</td><td className="num">≈ 90 000 à 104 000</td></tr>
    </tbody>
  </TableWrap>
  <Warn title="Test non concluant">
    <p>Le jeu a <strong>sauté des tours</strong> après « Fin du tour » (2→4, 5→7, 9→11, affichage « Tour 11/10 ») : le deck A a joué moins de tours que prévu. À refaire en jouant chaque tour lentement. Voir <Link href="/a-propos/journal/#bugs-connus">Bugs connus</Link>.</p>
  </Warn>
</Section>
<Section id="historique" title="Historique des règles de la Faille">
  <ol className="timeline">
    <li><span className="tl-head">09/10</span><p>Un Top 10 du meilleur combat du jour, un seul résultat par personnage. <Disc d="09/10" /> Pas de Faille pour les persos de saison.</p></li>
    <li><span className="tl-head">14/10 → 16/10</span><p>Nouveau sort <strong>Maîtrise des Popokémons</strong> (6 PA) : en fin de combat de la Faille, <strong>5 % de chances</strong>, une seule fois par personnage. Pendant 5 tours, tes coups ne peuvent pas tuer la cible (elle reste à 1 PV). <Disc d="14/10 → 16/10" /></p></li>
    <li className="is-key"><span className="tl-head">18/10</span><span className="tl-tag">règles actuelles</span><p><strong>Plus de chrono</strong> : on lance un combat quand on veut. <strong>Tes 3 plus gros combats du jour</strong> comptent dans ton score. <strong>Boules de capture</strong> sur les 10 premiers combats du jour, puis plus aucune. Compteurs remis à zéro à minuit. P5 et P6 n’ont plus de condition de dégâts à la Faille. <Disc d="18/10" /></p></li>
    <li><span className="tl-head">20/10</span><p>Un deck trop petit ne consomme plus d’essai. Faille et Dimension ne cassent plus la série de l’Élan. L’arme ne compte plus dans la Fureur des boss. <Disc d="20/10" /></p></li>
  </ol>
  <Officiel title="Guilde : suivi des combats contre le Kralamoure" d="date non relevée">
    <p>L’onglet Gestion de la guilde (meneur et bras droits) montre les combats contre le Kralamoure par jour sur les 7 derniers jours, et permet de trier les membres par combats et dégâts de Faille.</p>
  </Officiel>
  <Contra title="Remise à zéro : minuit ou 01:30 ?">
    <p>Le patch du 18/10 dit que les compteurs du jour ont été remis à zéro à minuit <Disc d="18/10" /> ; en jeu, la remise à zéro quotidienne a été constatée vers 01:30. Les deux valeurs sont gardées en attendant un nouveau relevé.</p>
  </Contra>
</Section>
<Section id="conseils-joueurs" title="Sorts clés et stats : conseils de joueurs">
  <Joueurs src="#aide, #boss-et-stratégies, 06–17/10">
    <ul>
      <li><strong>Sorts clés</strong> : Traversée (ses lignes critiques ressortent dans les journaux de combat Krala), Bluff / Tromperie, Masque du Psychopathe (Zobal), sorts de boost ; l’Écaflip (32 % de dégâts doublés) serait intéressant sur le Krala.</li>
      <li><strong>Équipement</strong> : un familier et le Dofus d’Invocation (2 pioches en réserve par tour au lieu de 1) seraient conseillés.</li>
      <li><strong>Ordre de stats conseillé</strong> : Puissance d’abord, puis PA jusqu’à un niveau convenable (51 à 66 cités), puis Critique jusqu’à 100 ; équilibrer (pas 70 PA sans Puissance). Les dommages aux sorts en % seraient plus forts que les dommages fixes.</li>
      <li>Ordres de grandeur cités le 15/10 : 800 000 par combat pour un P8 sans Rayonnant +5, 6 à 7 M pour d’autres ; top du jour vers 73 M.</li>
      <li>Signalé le 08/10 : un combat lancé avec un deck insuffisant consommait la chance du jour (corrigé officiellement le 20/10). <Disc d="20/10" /></li>
    </ul>
  </Joueurs>
</Section>
</>;}