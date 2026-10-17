import type { Metadata } from 'next';
import { Essentiel, M, PageEnd, PageHeader, Section, Tip, Warn } from '@/components/ui';

export const metadata: Metadata = {
  title: 'Ascension étages 29-30 et 38-42 · record 41',
  description: 'Ascension RpgMasters : étages 29-30 et 38-42, record actuel 41, essais de l’étage 42 et build défensif Féca observés en jeu.',
};

export default function AscensionPage() {
  return (
    <>
      <PageHeader section="prestige" title="Ascension : étages 29-30 et 38-42" intro="Record actuel : étage 41 validé ; étage 42 encore en essai. L’étage 30 est requis pour le Prestige 5. Observations du 13 au 15 oct 2026 pour les étages 29-30, et du 16 au 17 oct 2026 pour les étages 38-42." />
      <Essentiel>
        <li>Étages 29-30 : jouer <strong>3 cartes maximum par tour</strong> (l’arme ne compte pas) pour ne pas déclencher la Fureur d’Ougah. <M s="T" /></li>
        <li>Ne jamais enchaîner <strong>2 sorts de dégâts du même élément</strong> (Onde de choc de Ben le Ripate). <M s="T" /></li>
        <li>Garder un bouclier (ex. <strong>Vertu au tour 1</strong>) pour les Gros coups. L’étage 30 a été passé ainsi. <M s="T" /></li>
      </Essentiel>
      <Section id="boss" title="Étages 29-30 : les boss">
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
      <Section id="regles" title="Étages 29-30 : règles observées">
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
      <Section id="etages-38-42" title="Étages 38 à 42 — observations des 16-17 oct 2026">
        <h3>Étage 38 — Père Ver, Grolloum, Comte Razof</h3>
        <p>Protection donne de gros boucliers. La Fureur de Père Ver multiplie son attaque par <strong>2,5 au-delà de 2 cartes dans le tour</strong> ; les armes ne comptent pas. Étage passé avec 2 cartes par tour et l’arme. <M s="T" /></p>
        <h3>Étage 39 — Supervizœuf, Ben le Ripate, Bworker</h3>
        <p>Fureur présente ; son seuil et son multiplicateur ne sont pas précisés dans ce relevé. <M s="T" /></p>
        <h3>Étage 40 — Ush Galesh, Toxoliath, XLII</h3>
        <p>Étage palier : Fureur plus douce, <strong>plus de 3 cartes = attaque ×1,8</strong>. <M s="T" /></p>
        <h3>Étage 41 — validé, record actuel</h3>
        <p>Kimbo : environ 52 000 PV ; Fuji Givrefoux Nourricière : environ 62 000 PV ; Bworker : environ 52 000 PV. <M s="T" /></p>
        <ul>
          <li>Vol de 1 PA par tour et sceau sur la carte la plus chère. <M s="T" /></li>
          <li>Onde de choc : deux sorts de dégâts du même élément à la suite infligent 25 % des PV max ; l’arme ne compte pas. <M s="T" /></li>
          <li>Malédiction des soins, boucliers de 10 000 à 12 000 et Rage observés pendant le combat. <M s="T" /></li>
        </ul>
        <h3>Étage 42 — encore non franchi</h3>
        <ul>
          <li><strong>Barbéryl Clochecuivre : 62 409 PV</strong>, Deuxième souffle (relève à 40 %) et Fureur au-delà de 2 cartes : attaque ×2,5. <M s="T" /></li>
          <li><strong>Toxoliath : 52 424 PV</strong>, Malédiction des soins et Onde de choc. <M s="T" /></li>
          <li><strong>Minotot : 52 424 PV</strong>, Deuxième souffle et Onde de choc. <M s="T" /></li>
          <li>Total effectif avec les relèves : environ <strong>213 000 PV</strong>. <M s="T" /></li>
        </ul>
        <p>Meilleur essai manuel documenté : mort au <strong>tour 17</strong>, Toxoliath tué au tour 12, Minotot à 9 782 PV et Barbéryl presque intact. Le focus Barbéryl en premier a donné de moins bons résultats : morts aux tours 6 à 8. <M s="T" /></p>
        <Tip title="Meilleure stratégie observée à l’étage 42">
          <p>Focus Toxoliath d’abord, bouclier ou Rempart avant d’attaquer, éléments alternés, aucun soin ni vol de vie. Le plafond de bouclier observé est de 40 % des PV max ; Rempart donne +38 % de résistances dans tous les éléments pendant 1 tour dans ce relevé. <M s="T" /></p>
        </Tip>
        <Warn><p>Cette stratégie a donné le meilleur essai documenté ; elle n’a pas encore permis de valider l’étage 42.</p></Warn>
      </Section>
      <Section id="build-defensif" title="Build défensif Féca pour l’Ascension">
        <p>Relevé des 16-17 oct 2026 : deck resserré à <strong>11 cartes</strong> — Bouclier Féca, Vertu, Rempart, Couronne d’Épines, Précipitation, Contribution, Péremption, Pelle des Anciens, Ancrage, Frisson, Carnavalo. <M s="T" /></p>
        <p>Avec les pièces ci-dessous, la survie observée est passée de <strong>11 429 PV et une mort au tour 2</strong> à <strong>13 568 PV et une mort au tour 17</strong>. <M s="T" /></p>
        <ul>
          <li><strong>Dofus Émeraude</strong> : +400 Vitalité, survit une fois avec 20 % des PV. <M s="T" /></li>
          <li><strong>Dofus Argenté Scintillant</strong> : +300 Vitalité, bouclier de 8 % des PV max en début de combat. <M s="T" /></li>
          <li><strong>Dofus du Cauchemar</strong> : ennemis à −15 % de dégâts pendant les 2 premiers tours. <M s="T" /></li>
          <li><strong>Jadis Rayonnant +3</strong> : +338 Vitalité, +20 % Résistance Neutre, +16 Réduction ; bouclier préféré à Droiture de Fallanster dans ces essais. <M s="T" /></li>
        </ul>
        <p>Résistances obtenues : <strong>Neutre 47 %, Terre 15 %, Feu/Eau/Air 50 %</strong> ; Réduction 46 %, avec <strong>14 PA conservés</strong>. <M s="T" /></p>
      </Section>
      <PageEnd current="/contenus/ascension/" see={[{ href: '/personnage/prestige/', label: 'Prestige' }, { href: '/personnage/classes/feca/', label: 'Guide Féca' }]} sources="Observations en combat : étages 29-30, 13-15 oct 2026 ; étages 38-42 et build défensif, 16-17 oct 2026" />
    </>
  );
}
