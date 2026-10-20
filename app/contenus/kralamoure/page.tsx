import GameCapture, { CaptureGallery } from '@/components/GameCapture';
import { KeyFigures, TlDr, PageHeader, Section, M, Tip } from '@/components/ui';
export default function Page(){return <><PageHeader href="/contenus/kralamoure/" title="Kralamoure" intro="Boss de guilde : observations du 13 au 20 octobre 2026."/>      <TlDr>
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
          <li>Le Prestige 5 demande 500 000 dégâts cumulés sur le Kralamoure. <M s="T" /></li>
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
</>;}