import Link from 'next/link';
import type { Metadata } from 'next';
import { Badge, Callout, Fact, Facts, PageHeader, Section, Src, TableWrap } from '@/components/ui';
import { DATA_DATE_LABEL } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Saison Héroïque',
  description: 'Saison Héroïque de RpgMasters (9–12 oct 2026) : règles, banque, classement sur 6 modes, récompenses, Prestiges limités à 10.',
};

const ULTIMES = [10, 8, 6, 5, 4, 3, 2, 1, 1, 1];

export default function SaisonPage() {
  return (
    <>
      <PageHeader title="Saison Héroïque" lead={DATA_DATE_LABEL} />

      <Callout kind="warn">
        <p>
          <strong>{DATA_DATE_LABEL}.</strong> La saison Héroïque se termine le <strong>lundi 12 octobre 2026 à 08:00</strong>{' '}
          (heure de Paris). Ce wiki n’est pas mis à jour en direct : après cette date, ces informations décrivent une saison
          passée. Consultez la page Saison du jeu pour la situation actuelle.
        </p>
      </Callout>

      <Section id="dates" title="Dates">
        <Facts>
          <Fact s="T">
            Du <strong>vendredi 9 octobre à 18:00</strong> au <strong>lundi 12 octobre à 08:00</strong> (heure de Paris).
          </Fact>
          <Fact s="T">Au moment du relevé (11 oct 2026, vers 17 h), la page indiquait une fin « dans 14 h 50 ».</Fact>
        </Facts>
        <Src>txt_saison.txt, mecaniques.md §7</Src>
      </Section>

      <Section id="regles" title="Règles Héroïques">
        <Facts>
          <Fact s="T">
            Un perso de saison <strong>créé de zéro</strong> (classe au choix), <strong>en plus</strong> du perso principal, qui
            reste intact. On change avec le sélecteur Principal / Saison.
          </Fact>
          <Fact s="T">
            <strong>Pas d’énergie</strong> : combats gratuits. <strong>XP ×4</strong>.
          </Fact>
          <Fact s="T">
            <strong>Mort définitive contre les boss</strong> : une défaite face à un boss arrête le perso de saison (il reste au
            classement avec son niveau).
          </Fact>
          <Fact s="T">
            Première défaite adoucie : la première fois que le compte meurt, la moitié du stuff équipé et des équipements en
            inventaire attend sur le prochain perso de saison (une seule fois). Les morts suivantes ne rendent rien.
          </Fact>
          <Fact s="T">
            Rejouer : après une mort, un nouveau perso gagne <strong>XP ×2 en plus</strong> tant qu’il est sous le niveau du
            perso tombé.
          </Fact>
          <Fact s="T">HDV de saison séparé ; pas de guilde, de Faille ni de succès pour le perso de saison.</Fact>
          <Fact s="T">
            Prestiges de saison limités à <strong>10</strong> ; les suivants (jusqu’au 15) ne s’ouvrent que sur le perso
            principal.
          </Fact>
          <Fact s="T">Le bonus Discord est partagé avec le perso de saison (à lier depuis le perso principal).</Fact>
        </Facts>
        <Src>txt_saison.txt, txt_faq.txt</Src>
      </Section>

      <Section id="banque" title="Banque de saison">
        <Facts>
          <Fact s="T">
            <strong>8 emplacements, +3 par Prestige</strong> (selon le record de la saison). Accessible depuis l’inventaire de
            saison.
          </Fact>
          <Fact s="T">Son contenu survit à la mort. À la mort du perso de saison, les objets éternels y sont mis à l’abri.</Fact>
          <Fact s="T">
            À la fin de la saison, <strong>tout le contenu</strong> de la Banque est transféré définitivement dans l’inventaire
            du perso principal (lundi 8 h).
          </Fact>
          <Fact s="T">
            L’objet éternel de Prestige n’est donné que si le Prestige dépasse le record déjà récompensé sur le compte.
          </Fact>
        </Facts>
      </Section>

      <Section id="classement" title="Classement de saison">
        <Facts>
          <Fact s="T">
            Moyenne des places dans <strong>6 modes</strong> (Niveau, Aventure, Ascension, Abysses, Arène, Collection), parmi
            les persos de la saison. Voir aussi <Link href="/arene/#classement-saison">Arène</Link>.
          </Fact>
          <Fact s="T">
            Au relevé : <strong>1 289 persos de saison classés</strong>, morts compris (avec leur score au moment de leur
            mort).
          </Fact>
          <Fact s="T">Fin de saison : classement figé.</Fact>
          <Fact s="T">
            Classes les plus présentes dans le top 30 affiché : Zobal (majorité), Iop, Ouginak, Féca, Roublard (extrait observé,
            non exhaustif). Aucun Crâ dans ce top 30 ; un Crâ apparaît à la 69e place du top 100 affiché.
          </Fact>
          <Fact s="D">On ne peut rien en conclure de fiable sur la force des classes.</Fact>
        </Facts>
        <Src>txt_saison.txt, mecaniques.md §7</Src>
      </Section>

      <Section id="recompenses" title="Récompenses">
        <Facts>
          <Fact s="T">
            Versées sur le <strong>perso principal</strong>, une fois par compte, pour son meilleur perso.
          </Fact>
          <Fact s="T">
            <strong>Top 100</strong> : de <strong>100 Coffres Légendaires</strong> (1er) à <strong>10</strong> (100e).
          </Fact>
          <Fact s="T">
            <strong>Top 10</strong> : Coffres Ultimes en plus, selon le tableau ci-dessous.
          </Fact>
          <Fact s="T">Le 1er porte la couronne 👑 dans le chat jusqu’à la saison suivante.</Fact>
          <Fact s="T">En plus du top 100 : contenu de la Banque transféré au perso principal.</Fact>
        </Facts>
        <TableWrap caption="Coffres Ultimes du top 10 [TROUVÉ]">
          <thead>
            <tr>
              <th className="num">Place</th>
              <th className="num">Coffres Ultimes</th>
            </tr>
          </thead>
          <tbody>
            {ULTIMES.map((n, i) => (
              <tr key={i}>
                <td className="num">{i + 1}</td>
                <td className="num">{n}</td>
              </tr>
            ))}
          </tbody>
        </TableWrap>
        <p>
          <Badge s="N" /> Nombre de Coffres Légendaires pour chaque place intermédiaire : seules les bornes (100 au 1er, 10 au
          100e) sont écrites ; la page affichait les valeurs place par place sans formule.
        </p>
        <Src>txt_saison.txt</Src>
      </Section>
    </>
  );
}
