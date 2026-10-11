import type { Metadata } from 'next';
import { Badge, Callout, Fact, Facts, PageHeader, Section, TableWrap } from '@/components/ui';
import { DATA_DATE_LABEL, GAME_URL } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Sources et limites',
  description: 'Méthode, légende [TROUVÉ]/[DÉDUIT], lacunes connues, règles de la communauté et fichiers sources de ce wiki non officiel RpgMasters.',
};

const FILES: [string, string][] = [
  ['mecaniques.md', 'Mécaniques extraites des pages et du code client publics (caractéristiques, classes, cartes, objets, Prestige, arène, saison, coffres, énergie, lacunes, recommandations Crâ).'],
  ['rea_classement.md', 'Compléments : courbe d’XP, énergie et coûts, Elo, résultats négatifs sur les dégâts, Prestige, classement de saison.'],
  ['passifs_classes.txt', 'Textes des passifs des 19 classes (page /classes).'],
  ['txt_faq.txt', 'Texte brut de la page publique /faq.'],
  ['txt_saison.txt', 'Texte brut de la page publique /saison (règles et classement au moment du relevé).'],
  ['txt_classes.txt', 'Texte brut de la page publique /classes.'],
  ['txt_home.txt', 'Texte brut de la page d’accueil publique.'],
  ['txt_mentions.txt', 'Texte brut de la page publique /mentions (mentions et règles).'],
];

export default function SourcesPage() {
  return (
    <>
      <PageHeader title="Sources et limites" lead={`Comment ce wiki a été fait, et ce qu’il ne sait pas. ${DATA_DATE_LABEL}.`} />

      <Section id="statut" title="Un wiki non officiel">
        <Callout kind="warn">
          <p>
            Ce wiki est <strong>NON OFFICIEL</strong>. Il n’est affilié ni à l’équipe de RpgMasters ni à{' '}
            <strong>Ankama Games</strong>, et peut contenir des erreurs. Vérifiez toujours en jeu.
          </p>
        </Callout>
        <Facts>
          <Fact s="T">
            RpgMasters est un projet de fans, gratuit et à but non lucratif, sans publicité ni achat. Il n’est ni affilié, ni
            soutenu, ni approuvé par Ankama Games.
          </Fact>
          <Fact s="T">
            Le jeu, ses mécaniques et ses systèmes sont originaux, sans lien avec le jeu officiel : ne pas supposer que les
            formules de DOFUS s’appliquent.
          </Fact>
          <Fact s="T">
            Les classes, objets, panoplies, sorts, monstres, zones, noms, illustrations et contenus associés de l’univers DOFUS
            sont la propriété exclusive d’Ankama Games. Ce wiki ne reproduit <strong>aucune image ni ressource graphique</strong>{' '}
            du jeu.
          </Fact>
        </Facts>
      </Section>

      <Section id="methode" title="Méthode">
        <Facts>
          <Fact s="T">
            Contenu généré à partir de <strong>pages publiques</strong> de{' '}
            <a href={GAME_URL} rel="noopener noreferrer">
              rpgmasters.houk.fr
            </a>{' '}
            (/, /faq, /classes, /saison, /mentions) et du <strong>code client JavaScript public</strong> (15 fichiers{' '}
            <code>/_next/static/chunks/*.js</code> référencés par ces pages).
          </Fact>
          <Fact s="T">
            <strong>Lecture seule, sans connexion</strong>, sans API privée ni page connectée. Relevé le 11 octobre 2026 (heure
            de Paris).
          </Fact>
          <Fact s="T">
            La page /mentions ne contient aucune interdiction d’analyser le code client ou de lire les pages publiques.
          </Fact>
          <Fact s="T">
            Les combats sont calculés côté serveur : beaucoup de formules ne sont donc pas visibles (voir les lacunes).
          </Fact>
        </Facts>
      </Section>

      <Section id="legende" title="Légende des badges">
        <TableWrap caption="Signification des marqueurs">
          <thead>
            <tr>
              <th>Badge</th>
              <th>Signification</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <Badge s="T" />
              </td>
              <td>Écrit tel quel dans une page publique ou dans le code client public.</td>
            </tr>
            <tr>
              <td>
                <Badge s="D" />
              </td>
              <td>Interprétation des notes sources, à confirmer en jeu.</td>
            </tr>
            <tr>
              <td>
                <Badge s="C" />
              </td>
              <td>Calcul fait à partir de valeurs trouvées (marqueur repris des notes sources).</td>
            </tr>
            <tr>
              <td>
                <Badge s="N" />
              </td>
              <td>Information absente des sources publiques (lacune). Rien n’a été inventé pour la combler.</td>
            </tr>
          </tbody>
        </TableWrap>
      </Section>

      <Section id="lacunes" title="Lacunes connues">
        <p>Non exposés côté client public (calcul serveur ou pages après connexion) :</p>
        <Facts>
          <Fact s="N">Formules de dégâts.</Fact>
          <Fact s="N">Formules de PV.</Fact>
          <Fact s="N">Formule d’XP par combat (XP réellement gagnée).</Fact>
          <Fact s="N">Table complète <code>MONSTER_XP_REF</code> (seules quelques valeurs sont citées).</Fact>
          <Fact s="N">Valeurs des bonus de panoplies.</Fact>
          <Fact s="N">Coefficients de Force, Intelligence, Chance, Agilité, Vitalité, Sagesse.</Fact>
          <Fact s="N">Stats de la table d’objets.</Fact>
          <Fact s="N">Cartes communes (hors cartes de classe).</Fact>
          <Fact s="N">Fonction de calcul de l’Elo et bonus de série de victoires.</Fact>
          <Fact s="N">Formule ou pondération du classement de saison, et tout score « Opti ».</Fact>
        </Facts>
      </Section>

      <Section id="regles" title="Règles de la communauté (page Mentions)">
        <Facts>
          <Fact s="T">Un seul compte et un seul personnage par personne.</Fact>
          <Fact s="T">Pas de nom de personnage insultant, haineux ou qui usurpe l’identité de quelqu’un.</Fact>
          <Fact s="T">Pas de triche : scripts, robots ou exploitation de bugs (signale-les plutôt !).</Fact>
          <Fact s="T">Les comptes qui ne respectent pas ces règles peuvent être supprimés.</Fact>
          <Fact s="T">
            Données personnelles : seuls l’adresse e-mail (connexion) et les données du personnage sont conservées ; nom et
            progression visibles publiquement dans les classements ; suppression du compte possible à tout moment.
          </Fact>
        </Facts>
      </Section>

      <Section id="fichiers" title="Fichiers sources">
        <TableWrap caption="Fichiers du dossier sources/ du dépôt">
          <thead>
            <tr>
              <th>Fichier</th>
              <th>Contenu</th>
            </tr>
          </thead>
          <tbody>
            {FILES.map(([f, d]) => (
              <tr key={f}>
                <td>
                  <code>{f}</code>
                </td>
                <td>{d}</td>
              </tr>
            ))}
          </tbody>
        </TableWrap>
      </Section>
    </>
  );
}
