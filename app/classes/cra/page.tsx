import Link from 'next/link';
import type { Metadata } from 'next';
import { Badge, Callout, Fact, Facts, PageHeader, Section, Src, TableWrap } from '@/components/ui';
import { CRA_CARDS } from '@/lib/classes';

export const metadata: Metadata = {
  title: 'Crâ',
  description: 'Crâ dans RpgMasters : passif Œil de lynx, 3 cartes exclusives (PA, effet, élément), PO et vision spectrale, plafond 60 %.',
};

export default function CraPage() {
  return (
    <>
      <PageHeader title="Crâ" lead="Archer : passif Œil de lynx, cartes exclusives Terre et Feu, et vision spectrale liée à la PO." />

      <Section id="identite" title="Identité">
        <Facts>
          <Fact s="T">Identifiant interne 9, rôle « Archer », complexité 1.</Fact>
          <Fact s="T">Comme toute classe : 1 passif + 3 cartes exclusives ; les autres cartes se partagent entre classes.</Fact>
        </Facts>
        <Src>mecaniques.md §2 (données de la page /classes)</Src>
      </Section>

      <Section id="passif" title="Passif : Œil de lynx">
        <Callout>
          <p>
            <Badge s="T" /> « +26 % de chances de vision spectrale : chaque sort de dégâts peut infliger le double de dégâts
            (chance totale avec la PO plafonnée à 60 %). »
          </p>
        </Callout>
        <Facts>
          <Fact s="T">
            Vision spectrale = chance qu’un sort de dégâts inflige le <strong>double de dégâts</strong>.
          </Fact>
          <Fact s="T">
            Chance de base du passif : <strong>+26 %</strong> ; chance totale (avec la PO) plafonnée à <strong>60 %</strong>.
          </Fact>
        </Facts>
      </Section>

      <Section id="cartes" title="Les 3 cartes exclusives">
        <TableWrap caption="Cartes exclusives du Crâ (toutes niveau 1, portée 4)">
          <thead>
            <tr>
              <th>Carte</th>
              <th className="num">PA</th>
              <th>Effet</th>
              <th>Élément</th>
              <th className="num">cc</th>
            </tr>
          </thead>
          <tbody>
            {CRA_CARDS.map((c) => (
              <tr key={c.id}>
                <td>
                  <strong>{c.name}</strong>
                  <br />
                  <small>id {c.id}</small>
                </td>
                <td className="num">{c.pa}</td>
                <td>{c.effect}</td>
                <td>{c.element}</td>
                <td className="num">{c.cc ?? '—'}</td>
              </tr>
            ))}
          </tbody>
        </TableWrap>
        <Facts>
          <Fact s="T">Les trois cartes sont de niveau 1, portée <code>r:4</code> dans les données de la page.</Fact>
          <Fact s="T">
            Flèche Punitive : élément 1 = <strong>Terre</strong>. Flèche Explosive : élément 2 = <strong>Feu</strong>. Tirs
            Puissants n’a pas d’élément (buff).
          </Fact>
          <Fact s="D">
            <code>cc:5</code> est probablement le pourcentage de critique de base du sort.
          </Fact>
        </Facts>
        <Src>mecaniques.md §2</Src>
      </Section>

      <Section id="elements" title="Éléments : Terre et Feu">
        <Facts>
          <Fact s="T">
            Les sorts exclusifs du Crâ sont <strong>Terre</strong> et <strong>Feu</strong> ; aucun n’est Air ou Eau.
          </Fact>
          <Fact s="T">
            Éléments du jeu (index) : 0 Neutre, 1 Terre, 2 Feu, 3 Eau, 4 Air.
          </Fact>
          <Fact s="D">
            Correspondance caractéristique → élément : Force = Terre, Intelligence = Feu, Chance = Eau, Agilité = Air (déduite
            de couleurs identiques dans le code, très probable). Pour le Crâ : Terre = Force, Feu = Intelligence.
          </Fact>
          <Fact s="T">
            La FAQ conseille de mettre ses points dans « la caractéristique de l’élément de tes sorts de dégâts ».
          </Fact>
        </Facts>
        <Src>mecaniques.md §1 et §2, txt_faq.txt</Src>
      </Section>

      <Section id="po-vision-spectrale" title="PO et vision spectrale">
        <Facts>
          <Fact s="T">
            Constante de combat <code>spectralPerPo: 0.4</code>.
          </Fact>
          <Fact s="D">
            Interprétation : chaque point de PO ajoute <strong>+0,4 %</strong> de chance de vision spectrale (lien fait avec le
            texte du passif).
          </Fact>
          <Fact s={['C', 'D']}>
            Marge entre les 26 % du passif et le plafond de 60 % : <strong>34 points</strong>, soit environ{' '}
            <strong>85 PO</strong> (34 ÷ 0,4) apportés par l’équipement et les bonus, si l’interprétation ci-dessus est juste.
          </Fact>
          <Fact s="T">
            Bonus de PO du Prestige : +2 PO au Prestige 2, +3 PO au Prestige 5 (voir <Link href="/prestige/">Prestige</Link> ;
            l’ordre index → numéro de Prestige est <Badge s="D" />).
          </Fact>
          <Fact s="T">
            La PO d’un objet n’est pas multipliée par la fusion ni par le Prestige.
          </Fact>
        </Facts>
        <Src>mecaniques.md §1, §4, recommandations 2</Src>
      </Section>

      <Section id="plafond" title="Plafond de 60 %">
        <Facts>
          <Fact s="T">La chance totale de vision spectrale (passif + PO) est plafonnée à <strong>60 %</strong>.</Fact>
          <Fact s="D">Il est inutile de chercher de la PO pour la vision spectrale au-delà de ce plafond.</Fact>
        </Facts>
      </Section>

      <Section id="lacunes" title="Lacunes">
        <Facts>
          <Fact s="N">Formule de dégâts (effet de Force/Intelligence, Puissance, critique) : non publique, calcul côté serveur.</Fact>
          <Fact s="N">Valeur exacte du bonus de Puissance +100 sur les dégâts : aucun coefficient trouvé.</Fact>
          <Fact s="N">Cartes communes Terre/Feu adaptées au Crâ : non listées dans les sources.</Fact>
        </Facts>
        <p>
          Pour des conseils pratiques, voir le <Link href="/guide-cra/">guide Crâ</Link>.
        </p>
      </Section>
    </>
  );
}
