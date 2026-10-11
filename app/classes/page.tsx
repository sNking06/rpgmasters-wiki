import Link from 'next/link';
import type { Metadata } from 'next';
import { Badge, Callout, Fact, Facts, PageHeader, Section, Src, TableWrap } from '@/components/ui';
import { CLASSES, IOP_CARDS } from '@/lib/classes';

export const metadata: Metadata = {
  title: 'Classes',
  description: 'Les 19 classes de RpgMasters et leur passif, changement de classe, cartes exclusives.',
};

export default function ClassesPage() {
  return (
    <>
      <PageHeader title="Classes" lead="Les 19 classes jouables, avec le texte de leur passif." />

      <Section id="regles" title="Règles générales">
        <Facts>
          <Fact s="T">
            Chaque classe possède <strong>1 passif</strong> et <strong>3 cartes de sorts exclusives</strong>. Toutes les autres
            cartes se gagnent en combat et dans les coffres, et se partagent entre toutes les classes.
          </Fact>
          <Fact s="T">
            Changement de classe (page Personnage) : le <strong>premier est gratuit</strong>, les suivants coûtent{' '}
            <strong>300 000 kamas</strong>.
          </Fact>
          <Fact s="T">
            Le jeu ne désigne pas de « meilleure » classe : chacune a son style (dégâts, soutien, invocations…). Le premier
            changement étant gratuit, on peut tester.
          </Fact>
        </Facts>
        <Src>txt_classes.txt, txt_faq.txt, mecaniques.md §2</Src>
      </Section>

      <Section id="liste" title="Les 19 classes et leur passif">
        <Callout>
          <p>
            <Badge s="T" /> Les textes des passifs sont repris de la page publique /classes.{' '}
            <Badge s="D" /> L’association classe → passif suit l’ordre d’apparition sur la page (même ordre que la liste des
            19 classes) et est cohérente avec le nom des passifs : très probable, mais déduite.
          </p>
        </Callout>
        <TableWrap caption="Passifs des classes (ordre de la page /classes)">
          <thead>
            <tr>
              <th>Classe</th>
              <th>Passif</th>
              <th>Effet</th>
            </tr>
          </thead>
          <tbody>
            {CLASSES.map((c) => (
              <tr key={c.name} id={c.slug ? `classe-${c.slug}` : undefined}>
                <td>
                  {c.slug ? (
                    <Link href={`/classes/${c.slug}/`}>
                      <strong>{c.name}</strong> → fiche
                    </Link>
                  ) : (
                    <strong>{c.name}</strong>
                  )}
                </td>
                <td>{c.passive}</td>
                <td>{c.text}</td>
              </tr>
            ))}
          </tbody>
        </TableWrap>
        <Src>passifs_classes.txt</Src>
        <p>
          Fiche détaillée disponible : <Link href="/classes/cra/">Crâ</Link>. Les autres classes n’ont pas de fiche : leurs
          cartes exclusives ne figurent pas dans les sources (sauf l’exemple du Iop ci-dessous).
        </p>
      </Section>

      <Section id="exemple-iop" title="Exemple affiché : cartes exclusives du Iop">
        <p>
          La page publique /classes affiche par défaut le Iop (« Guerrier téméraire », difficulté ★☆☆) <Badge s="T" /> :
        </p>
        <TableWrap caption="Cartes exclusives du Iop (page /classes)">
          <thead>
            <tr>
              <th>Carte</th>
              <th className="num">PA</th>
              <th>Effet affiché</th>
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
        <Src>txt_classes.txt</Src>
      </Section>

      <Section id="lacunes" title="Lacunes">
        <Facts>
          <Fact s="N">Cartes exclusives des autres classes (hors Crâ et Iop) : non relevées dans les sources.</Fact>
          <Fact s="N">Classement de puissance des classes : aucun, le jeu n’en désigne pas.</Fact>
        </Facts>
      </Section>
    </>
  );
}
