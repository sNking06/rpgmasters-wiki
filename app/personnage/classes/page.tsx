import Link from 'next/link';
import type { Metadata } from 'next';
import ClassGrid from '@/components/ClassGrid';
import { ClassIcon, Icon } from '@/components/icons';
import { Essentiel, M, More, PageEnd, PageHeader, Section, TableWrap, Tip } from '@/components/ui';
import { CLASSES, IOP_CARDS } from '@/lib/classes';

export const metadata: Metadata = {
  title: 'Classes',
  description: 'Les 19 classes de RpgMasters et leur passif en une ligne, changement de classe, fiche Crâ.',
};

export default function ClassesPage() {
  return (
    <>
      <PageHeader section="classes" title="Classes" intro="19 classes jouables, chacune avec un passif et 3 cartes exclusives." />

      <Essentiel>
        <li>
          Chaque classe : <strong>1 passif</strong> + <strong>3 cartes exclusives</strong>. Les autres cartes sont communes à
          toutes les classes. <M s="T" />
        </li>
        <li>
          Changer de classe : <strong>1er changement gratuit</strong>, puis <strong>300 000 kamas</strong> (page Personnage).{' '}
          <M s="T" />
        </li>
        <li>
          Le jeu ne désigne <strong>aucune « meilleure » classe</strong> : chacune a son style. <M s="T" />
        </li>
      </Essentiel>

      <Link href="/personnage/classes/cra/" className="feature">
        <span className="medal" aria-hidden="true">
          <ClassIcon name="Crâ" size={28} />
        </span>
        <span>
          <span className="feature-title">Crâ — fiche détaillée</span>
          <span className="feature-desc">Build conseillé, cartes exclusives, vision spectrale et PO.</span>
        </span>
        <Icon name="arrowRight" size={22} className="feature-arrow" />
      </Link>

      <p><Link href="/personnage/classes/feca/">Féca — armure et cartes exclusives →</Link></p>
      <Section id="liste" title="Les 19 classes et leur passif">
        <p>Touchez une classe pour lire le texte complet de son passif.</p>
        <ClassGrid classes={CLASSES} />
        <More title="D’où viennent ces textes ?">
          <ul>
            <li>
              Textes des passifs repris de la page publique /classes. <M s="T" />
            </li>
            <li>
              L’association classe → passif suit l’ordre de la page (même ordre que la liste des 19 classes) et colle au nom
              des passifs : très probable, mais déduite. <M s="D" />
            </li>
          </ul>
        </More>
      </Section>

      <Section id="exemple-iop" title="Exemple : les cartes du Iop">
        <p>
          La page /classes affiche le Iop par défaut (« Guerrier téméraire », difficulté ★☆☆). <M s="T" />
        </p>
        <TableWrap caption="Cartes exclusives du Iop">
          <thead>
            <tr>
              <th>Carte</th>
              <th className="num">PA</th>
              <th>Effet</th>
            </tr>
          </thead>
          <tbody>
            {IOP_CARDS.map((c) => (
              <tr key={c.name}>
                <td>{c.name}</td>
                <td className="num">{c.pa}</td>
                <td>{c.effect}</td>
              </tr>
            ))}
          </tbody>
        </TableWrap>
        <Tip>
          <p>Le 1er changement de classe est gratuit : vous pouvez en tester une autre sans rien payer.</p>
        </Tip>
      </Section>

      <Section id="lacunes" title="Ce qu’on ne sait pas">
        <More title="Lacunes des sources (2)">
          <ul>
            <li>
              Cartes exclusives des autres classes (hors Crâ, Féca et Iop) : non relevées. <M s="N" />
            </li>
            <li>
              Classement de puissance des classes : aucun, le jeu n’en désigne pas. <M s="N" />
            </li>
          </ul>
        </More>
      </Section>

      <PageEnd
        current="/personnage/classes/"
        see={[
          { href: '/personnage/classes/cra/', label: 'Fiche Crâ' },
          { href: '/personnage/caracteristiques/', label: 'Caractéristiques' },
          { href: '/personnage/classes/feca/', label: 'Guide Féca' },
        ]}
        sources="passifs_classes.txt, txt_classes.txt, txt_faq.txt"
      />
    </>
  );
}
