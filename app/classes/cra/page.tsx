import Link from 'next/link';
import type { Metadata } from 'next';
import { ClassIcon, ElementIcon, Icon, SectionIcon, type ElementKey } from '@/components/icons';
import { El, Essentiel, Fiche, Info, M, Meter, More, PageEnd, PageHeader, Section, TableWrap, Tip, Warn } from '@/components/ui';
import { CRA_CARDS } from '@/lib/classes';

export const metadata: Metadata = {
  title: 'Crâ',
  description: 'Crâ dans RpgMasters : build conseillé en 5 lignes, passif Œil de lynx, 3 cartes exclusives, PO et vision spectrale (plafond 60 %).',
};

const EL_KIND: Record<string, 'terre' | 'feu' | 'none'> = { Terre: 'terre', Feu: 'feu', '—': 'none' };
const EL_ICON: Record<string, ElementKey> = { Terre: 'terre', Feu: 'feu', '—': 'neutre' };

export default function CraPage() {
  return (
    <>
      <PageHeader
        icon={<ClassIcon name="Crâ" size={30} />}
        title="Crâ"
        crumbs={[{ href: '/classes/', label: 'Classes' }]}
        intro="L’Archer : ses sorts de dégâts peuvent doubler leurs dégâts, et la PO augmente cette chance."
      />

      <Essentiel title="Build conseillé en 5 lignes" list="build">
        <li>
          <span className="build-ico" aria-hidden="true">
            <ElementIcon element="terre" size={20} />
          </span>
          <span>
            <strong>Stats : Force (Terre)</strong> en priorité — le gros sort Flèche Punitive est Terre. <M s={['T', 'D']} />
          </span>
        </li>
        <li>
          <span className="build-ico" aria-hidden="true">
            <Icon name="target" size={20} />
          </span>
          <span>
            <strong>PO : monte jusqu’au plafond de 60 %</strong> de vision spectrale (≈ 85 PO), pas au-delà.{' '}
            <M s={['C', 'D']} />
          </span>
        </li>
        <li>
          <span className="build-ico" aria-hidden="true">
            <Icon name="bolt" size={20} />
          </span>
          <span>
            <strong>Chaque tour : Tirs Puissants (1 PA) en premier.</strong> <M s={['T', 'D']} />
          </span>
        </li>
        <li>
          <span className="build-ico" aria-hidden="true">
            <Icon name="cards" size={20} />
          </span>
          <span>
            <strong>Deck : 10 cartes dont les 3 exclusives</strong>, + des cartes de dégâts du même élément. <M s="T" />
          </span>
        </li>
        <li>
          <span className="build-ico" aria-hidden="true">
            <SectionIcon section="arene" size={20} />
          </span>
          <span>
            <strong>Arène : joue tous tes tickets chaque jour</strong> (+1 stat par victoire). <M s="T" />
          </span>
        </li>
      </Essentiel>

      <Fiche
        title="Fiche Crâ"
        icon={<ClassIcon name="Crâ" size={20} />}
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
        <Info title="Passif : Œil de lynx" icon={<Icon name="eye" size={18} />}>
          <p>
            « +26 % de chances de vision spectrale : chaque sort de dégâts peut infliger le double de dégâts (chance totale
            avec la PO plafonnée à 60 %). » <M s="T" />
          </p>
        </Info>
        <ul className="spells">
          {CRA_CARDS.map((c) => (
            <li key={c.id} className={`spell spell-${EL_KIND[c.element]}`}>
              <span className="spell-el-ico" aria-hidden="true">
                <ElementIcon element={EL_ICON[c.element]} size={110} strokeWidth={1.2} />
              </span>
              <div className="spell-head">
                <span className="spell-pa" aria-hidden="true">
                  <span>{c.pa}</span>
                </span>
                <h3>{c.name}</h3>
              </div>
              <p>
                <strong>{c.pa} PA</strong> · {c.effect}
              </p>
              <p className="spell-el">
                <El kind={EL_KIND[c.element]}>{c.element === '—' ? 'Buff' : c.element}</El>
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
            <El kind="terre">Terre = Force</El>
          </li>
          <li>
            <El kind="feu">Feu = Intelligence</El>
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
