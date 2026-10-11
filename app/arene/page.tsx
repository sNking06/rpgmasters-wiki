import Link from 'next/link';
import type { Metadata } from 'next';
import { Badge, Callout, Fact, Facts, PageHeader, Section, Src, TableWrap } from '@/components/ui';

export const metadata: Metadata = {
  title: 'Arène et classements',
  description: 'Arène de RpgMasters : Elo (constantes ARENA_ELO), tickets, reset hebdomadaire, récompenses, et classement de saison sur 6 modes.',
};

const ELO: [string, string, string][] = [
  ['kWin', '60', 'Facteur K en victoire'],
  ['kLoss', '48', 'Facteur K en défaite'],
  ['defenderShare', '0.5', 'Le défenseur reçoit la moitié de la variation'],
  ['repeat', '[1, 0.5, 0.25, 0]', 'Rejouer le même adversaire : gain ×1, ×0,5, ×0,25 puis 0'],
  ['repeatHours', '24', 'Fenêtre de 24 h pour les rematchs'],
  ['floor', '1000', 'Elo plancher 1 000'],
  ['base', '5', 'Probablement un gain plancher'],
  ['defenderLoss', '2', 'Probablement la perte minimale du défenseur'],
  ['streakMax', '15', 'Plafond d’une série de victoires qui majore le gain (taux inconnu)'],
];

export default function ArenePage() {
  return (
    <>
      <PageHeader title="Arène et classements" lead="Elo, tickets, reset hebdomadaire et récompenses ; plus le classement de saison." />

      <Callout kind="warn">
        <p>
          <Badge s="N" /> <strong>Aucun score « Opti »</strong> ni calcul de classement « Opti » n’a été trouvé : le terme
          n’apparaît ni dans les pages ni dans le code client public (les correspondances « Opti » étaient « Option » ou
          « optimistic »).
        </p>
      </Callout>

      <Section id="fonctionnement" title="Fonctionnement">
        <Facts>
          <Fact s="T">
            On défie des joueurs proposés par le jeu ; leur équipe joue pour eux. La liste est choisie autour de son Elo et
            change toutes les <strong>10 minutes environ</strong> (élargie s’il n’y a pas assez d’adversaires proches).
          </Fact>
          <Fact s="T">
            Chaque défi coûte <strong>1 ticket</strong> : <strong>10 tickets gratuits par jour</strong>, non cumulables d’un
            jour à l’autre, plus ceux gagnés dans les coffres.
          </Fact>
          <Fact s="T">
            Le code contient aussi <code>ENERGY.pvpCost: 2</code>.
          </Fact>
          <Fact s="D">
            Selon une note source, un combat d’arène coûterait donc 2 d’énergie ; la FAQ, elle, parle d’un ticket. À vérifier en
            jeu.
          </Fact>
          <Fact s="T">
            Chaque victoire donne <strong>+1 à une caractéristique au hasard</strong> (parchemin d’arène, jusqu’à +300 par
            caractéristique).
          </Fact>
          <Fact s="T">Rejouer contre le même adversaire rapporte de moins en moins d’Elo dans la journée.</Fact>
          <Fact s="T">Les modes Auto AFK ne fonctionnent pas en arène.</Fact>
        </Facts>
        <Src>txt_faq.txt, rea_classement.md §2–3</Src>
      </Section>

      <Section id="elo" title="Elo : constantes ARENA_ELO">
        <p>
          Les valeurs sont <Badge s="T" /> (littéral dans le code client). Leur interprétation est <Badge s="D" /> : aucune
          fonction de calcul d’Elo n’existe côté client.
        </p>
        <TableWrap caption="ARENA_ELO — valeur [TROUVÉ], interprétation [DÉDUIT]">
          <thead>
            <tr>
              <th>Constante</th>
              <th className="num">Valeur</th>
              <th>Interprétation (DÉDUIT)</th>
            </tr>
          </thead>
          <tbody>
            {ELO.map(([k, v, d]) => (
              <tr key={k}>
                <td>
                  <code>{k}</code>
                </td>
                <td className="num">{v}</td>
                <td>{d}</td>
              </tr>
            ))}
          </tbody>
        </TableWrap>
        <Facts>
          <Fact s="T">
            Aucune fonction d’Elo côté client : <code>streakMax</code>, <code>base</code>, <code>defenderLoss</code>,{' '}
            <code>defenderShare</code> n’apparaissent que comme littéraux (absence vérifiée sur les 15 fichiers JS).
          </Fact>
          <Fact s="D">
            Hypothèse de calcul (non vérifiable) : gain = K × (1 − probabilité attendue), K = 60 en victoire (48 en défaite),
            multiplié par <code>repeat[n]</code> pour les rematchs sur 24 h.
          </Fact>
          <Fact s="N">Montant du bonus de série de victoires : inconnu, ne pas le chiffrer.</Fact>
        </Facts>
        <Src>mecaniques.md §6, rea_classement.md §3</Src>
      </Section>

      <Section id="reset" title="Reset hebdomadaire">
        <Facts>
          <Fact s="T">
            Reset chaque <strong>vendredi à 23 h 59</strong> (heure de Paris) : l’Elo repart de <strong>1 000</strong>.
          </Fact>
          <Fact s="T">
            Il faut au moins <strong>10 combats</strong> dans la semaine pour être classé.
          </Fact>
          <Fact s="T">
            La FAQ dit aussi qu’on garde son Elo après un Prestige ; c’est le reset de la semaine qui prime.
          </Fact>
        </Facts>
      </Section>

      <Section id="recompenses" title="Classement et récompenses de la semaine">
        <Facts>
          <Fact s="T">Top 100 : coffres Légendaires.</Fact>
          <Fact s="T">Top 10 : coffres Ultimes.</Fact>
          <Fact s="T">Podium : un Coffre Rayonnant +5 au choix et une couronne.</Fact>
          <Fact s="N">Nombre exact de coffres par place du classement d’arène : non précisé.</Fact>
        </Facts>
        <Src>txt_faq.txt, mecaniques.md §6</Src>
      </Section>

      <Section id="classement-saison" title="Classement de saison (6 modes)">
        <Facts>
          <Fact s="T">
            Score = <strong>moyenne des places</strong> dans 6 modes : Niveau, Aventure, Ascension, Abysses, Arène, Collection,
            parmi les persos de la saison.
          </Fact>
          <Fact s="T">
            Un mode non classé est compté à une place fixe affichée (ex. : « Abysses non classé (compté #163) », « Arène non
            classé (compté #425) » au moment du relevé).
          </Fact>
          <Fact s="T">
            Aucune formule ni pondération dans le client : le classement est tenu côté serveur.
          </Fact>
          <Fact s="D">
            Une moyenne de places récompense l’absence de mode faible : un mode où l’on est 500e annule un mode où l’on est
            1er. Il vaut mieux faire monter son plus mauvais rang.
          </Fact>
          <Fact s="T">
            Récompenses (sur le perso principal) : voir <Link href="/saison/#recompenses">Saison</Link>.
          </Fact>
          <Fact s="N">Score « Opti » : aucun trouvé.</Fact>
        </Facts>
        <Src>txt_saison.txt, rea_classement.md §6</Src>
      </Section>
    </>
  );
}
