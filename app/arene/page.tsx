import Link from 'next/link';
import type { Metadata } from 'next';
import { Icon, SectionIcon } from '@/components/icons';
import { Bars, Essentiel, Fiche, M, More, PageEnd, PageHeader, Section, TableWrap, Tip, Warn } from '@/components/ui';

export const metadata: Metadata = {
  title: 'Arène et classements',
  description: 'Arène de RpgMasters : 10 tickets par jour, +1 stat par victoire, Elo, reset du vendredi, récompenses, classement de saison sur 6 modes.',
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

const MODES = ['Niveau', 'Aventure', 'Ascension', 'Abysses', 'Arène', 'Collection'];

export default function ArenePage() {
  return (
    <>
      <PageHeader section="arene" title="Arène" intro="Défiez d’autres joueurs pour de l’Elo, des coffres et des stats définitives." />

      <Essentiel>
        <li>
          <strong>10 tickets gratuits par jour</strong>, non cumulables : 1 ticket par défi. <M s="T" />
        </li>
        <li>
          Chaque victoire : <strong>+1 à une stat au hasard</strong>, jusqu’à <strong>+300 par stat</strong>. <M s="T" />
        </li>
        <li>
          <strong>Reset le vendredi à 23 h 59</strong> (Paris) : l’Elo repart de 1 000. <M s="T" />
        </li>
        <li>
          <strong>10 combats minimum</strong> dans la semaine pour être classé. <M s="T" />
        </li>
      </Essentiel>

      <Fiche
        title="Fiche arène"
        icon={<SectionIcon section="arene" size={20} />}
        rows={[
          ['Tickets gratuits', '10 par jour'],
          ['Coût d’un défi', '1 ticket'],
          ['Gain par victoire', '+1 stat (max +300)'],
          ['Elo de départ', '1 000'],
          ['Reset', 'vendredi 23 h 59'],
          ['Pour être classé', '10 combats'],
          ['Adversaires', 'liste renouvelée ~10 min'],
          ['Auto AFK', 'non disponible'],
        ]}
      />

      <Section id="fonctionnement" title="Comment ça marche">
        <ul>
          <li>
            Vous défiez des joueurs proposés par le jeu ; <strong>leur équipe joue pour eux</strong>. <M s="T" />
          </li>
          <li>
            La liste est choisie <strong>autour de votre Elo</strong> et change toutes les 10 minutes environ (élargie s’il
            manque d’adversaires proches). <M s="T" />
          </li>
          <li>
            Tickets : 10 gratuits par jour, plus ceux gagnés dans les coffres. <M s="T" />
          </li>
          <li>
            Les modes Auto AFK ne fonctionnent pas en arène. <M s="T" />
          </li>
        </ul>
        <Warn title="Ticket ou énergie ?">
          <p>
            La FAQ parle d’<strong>un ticket</strong> par combat. Le code contient aussi <code>ENERGY.pvpCost: 2</code> <M s="T" />
            : selon une note source, l’arène coûterait donc aussi 2 d’énergie. À vérifier en jeu. <M s="D" />
          </p>
        </Warn>
      </Section>

      <Section id="elo" title="Elo : évitez les rematchs">
        <p>
          Rejouer le même adversaire rapporte de moins en moins dans la journée. <M s="T" />
        </p>
        <Bars
          label="Gain d’Elo contre un même adversaire sur 24 h"
          max={1}
          items={[
            { name: '1er combat', value: 1, display: '×1' },
            { name: '2e', value: 0.5, display: '×0,5' },
            { name: '3e', value: 0.25, display: '×0,25' },
            { name: '4e et +', value: 0, display: '0' },
          ]}
          caption={
            <>
              Constante <code>repeat</code> sur 24 h <M s="T" /> ; lecture « par adversaire » déduite <M s="D" />.
            </>
          }
        />
        <More title="Constantes ARENA_ELO (9) et hypothèse de calcul">
          <p>
            Valeurs littérales du code client <M s="T" /> ; interprétation déduite <M s="D" /> : aucune fonction de calcul
            d’Elo n’existe côté client.
          </p>
          <TableWrap caption="ARENA_ELO">
            <thead>
              <tr>
                <th>Constante</th>
                <th className="num">Valeur</th>
                <th>Interprétation</th>
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
          <ul>
            <li>
              <code>streakMax</code>, <code>base</code>, <code>defenderLoss</code>, <code>defenderShare</code> n’apparaissent
              que comme littéraux (absence vérifiée sur les 15 fichiers JS). <M s="T" />
            </li>
            <li>
              Hypothèse non vérifiable : gain = K × (1 − probabilité attendue), K = 60 en victoire (48 en défaite), multiplié
              par <code>repeat[n]</code> pour les rematchs sur 24 h. <M s="D" />
            </li>
            <li>
              Montant du bonus de série de victoires : inconnu. <M s="N" />
            </li>
            <li>
              La FAQ dit aussi qu’on garde son Elo après un Prestige ; c’est le reset de la semaine qui prime. <M s="T" />
            </li>
          </ul>
        </More>
      </Section>

      <Section id="recompenses" title="Récompenses de la semaine">
        <ul className="kpis">
          <li>
            <span className="kpi-val">
              <Icon name="trophy" size={24} /> Podium
            </span>
            <span className="kpi-lab">Coffre Rayonnant +5 au choix + couronne</span>
          </li>
          <li>
            <span className="kpi-val">Top 10</span>
            <span className="kpi-lab">Coffres Ultimes</span>
          </li>
          <li>
            <span className="kpi-val">Top 100</span>
            <span className="kpi-lab">Coffres Légendaires</span>
          </li>
        </ul>
        <p>
          Nombre exact de coffres par place : non précisé. <M s="N" />
        </p>
      </Section>

      <Section id="classement-saison" title="Classement de saison (6 modes)">
        <p>
          Score = <strong>moyenne de vos places</strong> dans 6 modes, parmi les persos de la saison : <M s="T" />
        </p>
        <ul className="chips" aria-label="Les 6 modes du classement">
          {MODES.map((m) => (
            <li key={m}>
              <span className="el el-none">{m}</span>
            </li>
          ))}
        </ul>
        <Tip>
          <p>
            Une moyenne de places punit le mode faible : être 500e dans un mode annule une 1re place ailleurs. Faites monter
            votre <strong>plus mauvais rang</strong>. <M s="D" />
          </p>
        </Tip>
        <More title="Détails du classement">
          <ul>
            <li>
              Un mode non classé compte pour une place fixe affichée (ex. : « Abysses non classé (compté #163) », « Arène non
              classé (compté #425) » au relevé). <M s="T" />
            </li>
            <li>
              Aucune formule ni pondération dans le client : le classement est tenu côté serveur. <M s="T" />
            </li>
            <li>
              Récompenses (sur le perso principal) : voir <Link href="/saison/#recompenses">Saison</Link>. <M s="T" />
            </li>
            <li>
              <strong>Aucun score « Opti »</strong> ni calcul de classement « Opti » trouvé : le terme n’apparaît ni dans les
              pages ni dans le code public (les correspondances étaient « Option » ou « optimistic »). <M s="N" />
            </li>
          </ul>
        </More>
      </Section>

      <PageEnd
        current="/arene/"
        see={[
          { href: '/caracteristiques/#parchemins', label: 'Parchemins' },
          { href: '/saison/', label: 'Saison' },
          { href: '/energie-xp/', label: 'Énergie' },
        ]}
        sources="txt_faq.txt, txt_saison.txt, mecaniques.md §6, rea_classement.md §2, §3, §6"
      />
    </>
  );
}
