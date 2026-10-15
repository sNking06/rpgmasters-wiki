import type { Metadata } from 'next';
import { Essentiel, M, PageEnd, PageHeader, Section, Tip, Warn } from '@/components/ui';

export const metadata: Metadata = {
  title: 'Ascension étages 29-30',
  description: 'Mécaniques vérifiées en jeu des boss des étages 29 et 30 de l’Ascension RpgMasters (Ougah, Ben le Ripate, Sphincter Cell) et méthode qui a passé l’étage 30.',
};

export default function AscensionPage() {
  return (
    <>
      <PageHeader section="prestige" title="Ascension : étages 29 et 30" intro="L’étage 30 est requis pour le Prestige 5. Mécaniques observées en combat du 13 au 15 oct 2026." />
      <Essentiel>
        <li>Jouer <strong>3 cartes maximum par tour</strong> (l’arme ne compte pas) pour ne pas déclencher la Fureur d’Ougah. <M s="T" /></li>
        <li>Ne jamais enchaîner <strong>2 sorts de dégâts du même élément</strong> (Onde de choc de Ben le Ripate). <M s="T" /></li>
        <li>Garder un bouclier (ex. <strong>Vertu au tour 1</strong>) pour les Gros coups. L’étage 30 a été passé ainsi. <M s="T" /></li>
      </Essentiel>
      <Section id="boss" title="Les boss">
        <h3>Ougah — Fureur</h3>
        <ul>
          <li>Plus de 3 cartes jouées dans un tour : sa prochaine attaque est multipliée par <strong>1,8</strong>. La carte d’arme n’est pas comptée. <M s="T" /></li>
          <li>Rage : il « se déchaîne » ensuite avec un gros Gros coup. <M s="T" /></li>
        </ul>
        <h3>Ben le Ripate — Onde de choc</h3>
        <ul>
          <li>2 sorts de dégâts du même élément à la suite = <strong>25 % de tes PV max</strong> en dégâts. <M s="T" /></li>
        </ul>
        <h3>Sphincter Cell</h3>
        <ul>
          <li>Environ <strong>18,4k PV</strong> ; revient une fois à <strong>40 %</strong> de ses PV. <M s="T" /></li>
          <li>Son Gros coup grandit : <strong>3 852 → 4 741 → 5 630</strong>. <M s="T" /></li>
        </ul>
      </Section>
      <Section id="regles" title="Règles de l’étage">
        <ul>
          <li>Ta carte la plus chère est <strong>scellée tous les 2 tours</strong>. <M s="T" /></li>
          <li>Soins <strong>divisés par deux</strong> à partir du tour 2. <M s="T" /></li>
          <li>Passif « 1 ligne » : <strong>+20 % par tour</strong> jusqu’à +150 %, remis à zéro par les sorts multi-lignes comme Bluff. <M s="T" /></li>
        </ul>
        <Tip title="Ce qui a marché">
          <p>Étage 30 franchi le 14 oct 2026 vers minuit en 16 tours : 3 cartes maximum par tour, Vertu au tour 1, éléments alternés, Bluff retiré du deck.</p>
        </Tip>
        <Warn>
          <p>Observations d’un seul joueur sur quelques combats : les valeurs exactes peuvent varier selon les stats.</p>
        </Warn>
      </Section>
      <PageEnd current="/contenus/ascension/" see={[{ href: '/personnage/prestige/', label: 'Prestige' }, { href: '/personnage/classes/feca/', label: 'Guide Féca' }]} sources="Observations en combat, 13-15 oct 2026" />
    </>
  );
}
