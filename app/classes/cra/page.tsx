import Link from 'next/link';
import type { Metadata } from 'next';
import { Essentiel, Fiche, M, Meter, More, PageEnd, PageHeader, Section, TableWrap, Tip, Warn } from '@/components/ui';
import { CRA_CARDS } from '@/lib/classes';

export const metadata: Metadata = {
  title: 'Crâ',
  description: 'Crâ dans RpgMasters : build conseillé en 5 lignes, passif Œil de lynx, 3 cartes exclusives, PO et vision spectrale (plafond 60 %).',
};

const EL_CLASS: Record<string, string> = { Terre: 'el-terre', Feu: 'el-feu', '—': 'el-none' };

export default function CraPage() {
  return (
    <>
      <PageHeader
        title="Crâ"
        crumbs={[{ href: '/classes/', label: 'Classes' }]}
        intro="L’Archer : ses sorts de dégâts peuvent doubler leurs dégâts, et la PO augmente cette chance."
      />

      <Essentiel title="Build conseillé en 5 lignes" list="build">
        <li>
          <span className="build-ico" aria-hidden="true">💪</span>
          <span>
            <strong>Stats : Force (Terre)</strong> en priorité — le gros sort Flèche Punitive est Terre. <M s={['T', 'D']} />
          </span>
        </li>
        <li>
          <span className="build-ico" aria-hidden="true">🎯</span>
          <span>
            <strong>PO : monte jusqu’au plafond de 60 %</strong> de vision spectrale (≈ 85 PO), pas au-delà.{' '}
            <M s={['C', 'D']} />
          </span>
        </li>
        <li>
          <span className="build-ico" aria-hidden="true">⚡</span>
          <span>
            <strong>Chaque tour : Tirs Puissants (1 PA) en premier.</strong> <M s={['T', 'D']} />
          </span>
        </li>
        <li>
          <span className="build-ico" aria-hidden="true">🃏</span>
          <span>
            <strong>Deck : 10 cartes dont les 3 exclusives</strong>, + des cartes de dégâts du même élément. <M s="T" />
          </span>
        </li>
        <li>
          <span className="build-ico" aria-hidden="true">⚔️</span>
          <span>
            <strong>Arène : joue tous tes tickets chaque jour</strong> (+1 stat par victoire). <M s="T" />
          </span>
        </li>
      </Essentiel>

      <Fiche
        title="🏹 Fiche Crâ"
        rows={[
          ['Rôle', 'Archer'],
          ['Complexité', '1'],
          ['Passif', 'Œil de lynx'],
          ['Vision spectrale', '+26 % (passif) → 60 % max'],
          ['Éléments des sorts', 'Terre et Feu'],
          ['Caractéristiques', <>Force (Terre), Intelligence (Feu) <M s="D" /></>],
        ]}
      />

      <Section id="cartes" title="Le passif et les 3 cartes">
        <div className="callout callout-info">
          <p className="callout-title">👁️ Passif : Œil de lynx</p>
          <p>
            « +26 % de chances de vision spectrale : chaque sort de dégâts peut infliger le double de dégâts (chance totale
            avec la PO plafonnée à 60 %). » <M s="T" />
          </p>
        </div>
        <ul className="spells">
          {CRA_CARDS.map((c) => (
            <li key={c.id} className="spell">
              <span className="spell-pa" aria-hidden="true">
                {c.pa}
              </span>
              <h3>{c.name}</h3>
              <p>
                <strong>{c.pa} PA</strong> · {c.effect}
              </p>
              <p>
                <span className={`el ${EL_CLASS[c.element]}`}>{c.element === '—' ? 'Buff' : c.element}</span>
              </p>
            </li>
          ))}
        </ul>
        <More title="Détails des cartes (portée, critique, identifiants)">
          <TableWrap caption="Cartes exclusives du Crâ (toutes niveau 1, portée 4)">
            <thead>
              <tr>
                <th>Carte</th>
                <th className="num">PA</th>
                <th>Élément</th>
                <th className="num">cc</th>
                <th className="num">id</th>
              </tr>
            </thead>
            <tbody>
              {CRA_CARDS.map((c) => (
                <tr key={c.id}>
                  <td>{c.name}</td>
                  <td className="num">{c.pa}</td>
                  <td>{c.element}</td>
                  <td className="num">{c.cc ?? '—'}</td>
                  <td className="num">{c.id}</td>
                </tr>
              ))}
            </tbody>
          </TableWrap>
          <ul>
            <li>
              Les 3 cartes sont de niveau 1, portée <code>r:4</code> dans les données de la page. <M s="T" />
            </li>
            <li>
              Flèche Punitive : élément 1 = Terre. Flèche Explosive : élément 2 = Feu. Tirs Puissants n’a pas d’élément (buff).{' '}
              <M s="T" />
            </li>
            <li>
              <code>cc:5</code> est probablement le % de critique de base du sort. <M s="D" />
            </li>
            <li>
              Identifiant interne de la classe : 9, rôle « Archer », complexité 1. <M s="T" />
            </li>
          </ul>
        </More>
      </Section>

      <Section id="po-vision-spectrale" title="PO et vision spectrale">
        <p>
          <strong>Vision spectrale</strong> = chance qu’un sort de dégâts fasse <strong>double dégâts</strong>. <M s="T" />
        </p>
        <Meter
          max={100}
          label="Chance de vision spectrale : 26 % grâce au passif, jusqu’à 34 points de plus grâce à la PO, plafond à 60 %."
          segments={[
            { value: 26, kind: 'a', legend: <>Passif : 26 % <M s="T" /></> },
            { value: 34, kind: 'b', legend: <>À gagner avec la PO : 34 points ≈ 85 PO <M s={['C', 'D']} /></> },
            { value: 40, kind: 'c', legend: <>Au-delà de 60 % : plafond, inutile <M s="T" /></> },
          ]}
          ticks={[
            { at: 0, label: '0 %' },
            { at: 26, label: '26 %' },
            { at: 60, label: '60 %' },
            { at: 100, label: '100 %' },
          ]}
        />
        <Tip>
          <p>
            Le Prestige donne de la PO : <strong>+2 PO au Prestige 2</strong>, <strong>+3 PO au Prestige 5</strong>. <M s={['T', 'D']} />{' '}
            Voir <Link href="/prestige/">Prestige</Link>.
          </p>
        </Tip>
        <Warn>
          <p>
            La PO d’un objet n’est <strong>pas multipliée</strong> par la fusion ni par le Prestige. <M s="T" />
          </p>
        </Warn>
        <More title="Le calcul en détail">
          <ul>
            <li>
              Constante de combat <code>spectralPerPo: 0.4</code>. <M s="T" />
            </li>
            <li>
              Lecture : chaque point de PO ajoute <strong>+0,4 %</strong> de vision spectrale (lien fait avec le texte du
              passif). <M s="D" />
            </li>
            <li>
              Marge entre 26 % et 60 % : <strong>34 points</strong>, soit environ <strong>85 PO</strong> (34 ÷ 0,4) venant de
              l’équipement et des bonus, si la lecture ci-dessus est juste. <M s={['C', 'D']} />
            </li>
            <li>
              Inutile de chercher de la PO pour la vision spectrale au-delà du plafond de 60 %. <M s="D" />
            </li>
            <li>
              L’ordre index → numéro de Prestige pour les bonus de PO est déduit. <M s="D" />
            </li>
          </ul>
        </More>
      </Section>

      <Section id="elements" title="Éléments : Terre et Feu">
        <ul className="chips" aria-label="Éléments du Crâ">
          <li>
            <span className="el el-terre">Terre = Force</span>
          </li>
          <li>
            <span className="el el-feu">Feu = Intelligence</span>
          </li>
        </ul>
        <p>
          Aucun sort exclusif du Crâ n’est Air ou Eau. <M s="T" /> La FAQ conseille de mettre ses points dans « la
          caractéristique de l’élément de tes sorts de dégâts ». <M s="T" />
        </p>
        <More title="D’où vient la correspondance stat → élément ?">
          <ul>
            <li>
              Éléments du jeu (index) : 0 Neutre, 1 Terre, 2 Feu, 3 Eau, 4 Air. <M s="T" />
            </li>
            <li>
              Force = Terre, Intelligence = Feu, Chance = Eau, Agilité = Air : déduit de couleurs identiques dans le code, très
              probable. <M s="D" />
            </li>
          </ul>
        </More>
      </Section>

      <Section id="lacunes" title="Ce qu’on ne sait pas">
        <More title="Lacunes des sources (3)">
          <ul>
            <li>
              Formule de dégâts (effet de Force/Intelligence, Puissance, critique) : non publique, calcul côté serveur. <M s="N" />
            </li>
            <li>
              Valeur exacte du bonus de Puissance +100 sur les dégâts : aucun coefficient trouvé. <M s="N" />
            </li>
            <li>
              Cartes communes Terre/Feu adaptées au Crâ : non listées. <M s="N" />
            </li>
          </ul>
        </More>
      </Section>

      <PageEnd
        current="/classes/cra/"
        see={[
          { href: '/guide-cra/', label: 'Guide Crâ (10 conseils)' },
          { href: '/caracteristiques/', label: 'Caractéristiques' },
          { href: '/prestige/', label: 'Prestige' },
          { href: '/arene/', label: 'Arène' },
        ]}
        sources="mecaniques.md §1, §2, §4 et recommandations Crâ, txt_faq.txt"
      />
    </>
  );
}
