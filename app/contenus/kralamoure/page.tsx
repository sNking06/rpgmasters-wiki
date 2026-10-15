import { PageHeader, Section, M, Tip } from '@/components/ui';
export default function Page(){return <><PageHeader title="Kralamoure" intro="Boss de guilde : observations du 13 au 15 octobre 2026."/>      <Section id="kralamoure" title="Kralamoure (boss de guilde)">
        <ul>
          <li>Accessible <strong>uniquement en guilde</strong> : Guilde → Faille du Kralamoure. <M s="T" /></li>
          <li>1 combat toutes les <strong>20 minutes</strong>, <strong>10 tours</strong>, sans énergie. <M s="T" /></li>
          <li>Environ <strong>100 M de PV</strong> partagés par la guilde. <M s="T" /></li>
          <li>Odorat divise par deux son prochain Gros coup. <M s="T" /></li>
          <li>Le Prestige 5 demande 500 000 dégâts cumulés sur le Kralamoure. <M s="T" /></li>
        </ul>
        <h3>Deck de 7 cartes</h3>
        <p>Bouclier Féca, Vertu, Précipitation, Traversée, Bluff, Pelle des Anciens, Tibia. Précipitation en premier pour les PA, puis un bouclier à chaque tour.</p>
        <Tip title="Résultat">
          <p><strong>109 506 dégâts</strong> en un combat avec ce deck, contre <strong>74 420</strong> avec un deck de 14 cartes (15 oct 2026). Monter vite les 5 charges d’Armure, puis tout envoyer.</p>
        </Tip>
      </Section>
</>;}