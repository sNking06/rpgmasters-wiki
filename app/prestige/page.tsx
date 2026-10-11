import Link from 'next/link';
import type { Metadata } from 'next';
import { Badge, Callout, Fact, Facts, PageHeader, Section, Src, TableWrap } from '@/components/ui';

export const metadata: Metadata = {
  title: 'Prestige',
  description: 'Prestige dans RpgMasters : bonus par Prestige, conditions P1 à P15, ce qu’on perd et garde, objet éternel, plafond de PA.',
};

type Row = { p: number; cond: string; bonus: string; pa: number };

const paCap = (p: number) => (p >= 8 ? 15 : p >= 5 ? 14 : p >= 2 ? 13 : 12);

const ROWS: Row[] = [
  { p: 1, cond: 'Niveau 200', bonus: '+1 PA' },
  { p: 2, cond: 'Niveau 200', bonus: '+2 PO' },
  { p: 3, cond: 'Niveau 200', bonus: '+2 PM' },
  { p: 4, cond: 'Étage 20 de l’Ascension terminé', bonus: '+1 PA' },
  { p: 5, cond: 'Étage 30 + 500 000 dégâts cumulés sur le Kralamoure de la Faille', bonus: '+3 PO' },
  { p: 6, cond: 'Étage 40 + 1 000 000 dégâts cumulés sur le Kralamoure de la Faille', bonus: '+3 PM' },
  { p: 7, cond: 'Étage 40 de l’Ascension terminé', bonus: '+1 PA' },
  { p: 8, cond: 'Étage 60 de l’Ascension terminé', bonus: '—' },
  { p: 9, cond: 'Étage 80 de l’Ascension terminé', bonus: '—' },
  { p: 10, cond: 'Étage 110 de l’Ascension terminé', bonus: '—' },
  { p: 11, cond: 'Étage 140 de l’Ascension terminé', bonus: '—' },
  { p: 12, cond: 'Étage 170 de l’Ascension terminé', bonus: '—' },
  { p: 13, cond: 'Étage 200 de l’Ascension terminé', bonus: '—' },
  { p: 14, cond: 'Étage 230 de l’Ascension terminé', bonus: '—' },
  { p: 15, cond: 'Étage 260 de l’Ascension terminé', bonus: '—' },
].map((r) => ({ ...r, pa: paCap(r.p) }));

export default function PrestigePage() {
  return (
    <>
      <PageHeader title="Prestige" lead="Repartir du niveau 1 avec un équipement plus fort : bonus, conditions, pertes et gardes." />

      <Section id="principe" title="Principe">
        <Facts>
          <Fact s="T">
            Au niveau 200, on peut repartir au niveau 1. Bouton « Faire Prestige » (page Personnage), confirmation en tapant{' '}
            <strong>« PRESTIGE »</strong>. Maximum actuel : <strong>Prestige 15</strong> ; les suivants sont annoncés
            « bientôt disponibles ».
          </Fact>
          <Fact s="T">Rien n’oblige à faire Prestige tout de suite au niveau 200.</Fact>
          <Fact s="T">
            En saison, les Prestiges s’arrêtent au <strong>10</strong> (<code>seasonMax: 10</code>) ; les suivants ne
            s’ouvrent que sur le personnage principal.
          </Fact>
        </Facts>
        <Src>txt_faq.txt, mecaniques.md §5, rea_classement.md §5</Src>
      </Section>

      <Section id="bonus" title="Bonus par Prestige">
        <Facts>
          <Fact s="T">
            <strong>+25 %</strong> de stats sur tout ce qui est équipé, cumulable à chaque Prestige (
            <code>PRESTIGE.gearPct: 25</code>). PA, PM, PO et Invocations des objets ne sont pas multipliés.
          </Fact>
          <Fact s="T">
            <strong>+1 carte</strong> dans les decks par Prestige.
          </Fact>
          <Fact s="T">Accès à l’Ascension (tour de boss) dès 1 Prestige, en étant de nouveau niveau 200.</Fact>
          <Fact s="T">À partir du Prestige 1, un sort en double renforce le sort au lieu d’être converti en kamas.</Fact>
          <Fact s="T">
            Bonus de combat cumulatifs sur les Prestiges 1 à 7 (<code>PRESTIGE.combat</code>) : +1 PA, +2 PO, +2 PM, +1 PA, +3
            PO, +3 PM, +1 PA.
          </Fact>
          <Fact s="D">L’association de ces bonus aux numéros de Prestige (P1 = +1 PA, P2 = +2 PO…) suit l’ordre du tableau.</Fact>
          <Fact s="T">
            Plafond de PA total : 12 de base, 13 dès P2, 14 dès P5, 15 dès P8 (hors Abysses).
          </Fact>
        </Facts>
      </Section>

      <Section id="conditions" title="Conditions P1 → P15">
        <TableWrap caption="Conditions, bonus de combat et plafond de PA par Prestige">
          <thead>
            <tr>
              <th className="num">Prestige</th>
              <th>Condition [TROUVÉ]</th>
              <th>Bonus de combat [TROUVÉ, ordre DÉDUIT]</th>
              <th className="num">PA max [TROUVÉ]</th>
            </tr>
          </thead>
          <tbody>
            {ROWS.map((r) => (
              <tr key={r.p}>
                <td className="num">P{r.p}</td>
                <td>{r.cond}</td>
                <td>{r.bonus}</td>
                <td className="num">{r.pa}</td>
              </tr>
            ))}
          </tbody>
        </TableWrap>
        <p>
          Les étages de l’Ascension atteints sont conservés après un Prestige. Chaque étage coûte 2 d’énergie <Badge s="T" />.
        </p>
        <Src>txt_faq.txt (« Comment passer Prestige ? »), mecaniques.md §5</Src>
      </Section>

      <Section id="pertes" title="Ce qu’on perd, ce qu’on garde">
        <h3>Toujours perdu</h3>
        <Facts>
          <Fact s="T">Le niveau, les points de caractéristiques répartis, l’étape de l’Aventure.</Fact>
        </Facts>
        <h3>Perdu tant qu’on n’a pas atteint le Prestige 4</h3>
        <Facts>
          <Fact s="T">
            L’équipement, l’inventaire, les ventes en cours à l’HDV et les kamas — sauf l’objet choisi pour être gardé et les
            objets éternels.
          </Fact>
          <Fact s="T">
            Un coffre ouvert juste avant le Prestige donne un objet qui sera perdu avec l’inventaire (avant P4). Les coffres non
            ouverts, eux, sont conservés.
          </Fact>
        </Facts>
        <Callout>
          <p>
            <Badge s="T" /> <strong>À partir du Prestige 4</strong>, les Prestiges suivants ne font plus rien perdre :
            l’équipement revient dans l’inventaire et les kamas sont conservés.
          </p>
        </Callout>
        <h3>Toujours gardé</h3>
        <Facts>
          <Fact s="T">
            Cartes de sort et decks, album/collection, coffres (non ouverts), énergie, Elo, records (Abysses, Ascension),
            étage d’Ascension.
          </Fact>
          <Fact s="T">
            Parchemins de caractéristique (d’arène ou en objet), niveau et XP du Bouclier de forge.
          </Fact>
          <Fact s="T">Niveau et croquettes du Compagnon.</Fact>
        </Facts>
        <Src>txt_faq.txt</Src>
      </Section>

      <Section id="objet-eternel" title="Objet éternel">
        <Facts>
          <Fact s="T">
            À chaque Prestige, on choisit un objet (porté ou en inventaire). Il devient <strong>éternel</strong> : lié à vie,
            invendable, et il revient à tous les Prestiges suivants.
          </Fact>
          <Fact s="T">
            Il passe <strong>au moins au niveau Rayonnant</strong>.
          </Fact>
          <Fact s="T">
            Conseil de la FAQ : choisir un objet durable (un Dofus, une pièce forte du build…). Un objet mis en vente à l’HDV
            peut aussi être gardé avant le Prestige 4.
          </Fact>
          <Fact s="T">
            En saison : l’objet éternel n’est donné que si le Prestige dépasse le record déjà récompensé sur le compte ; à la
            mort du perso de saison, les objets éternels sont mis à l’abri dans la Banque.
          </Fact>
        </Facts>
        <Src>txt_faq.txt, txt_saison.txt</Src>
      </Section>

      <Section id="voir-aussi" title="Voir aussi">
        <p>
          <Link href="/caracteristiques/">Caractéristiques</Link> · <Link href="/saison/">Saison</Link> ·{' '}
          <Link href="/guide-cra/">Guide Crâ</Link>
        </p>
      </Section>
    </>
  );
}
