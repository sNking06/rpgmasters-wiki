import { CaptureGallery } from '@/components/GameCapture';
import items from '@/data/items.json';
import Link from 'next/link';
import {KeyFigures, Bars, M, PageHeader, Section, TableWrap, Tip} from '@/components/ui';
export const metadata={title:'Panoplies'};
const TESTS:[string,string,string,string,string,string,string][]=[
 ['A. Gouffre 3/3','Lancepince d’Exécrabe, Visage de Mureine, Dorsale de Willorque T2','13 813','Neutre 50, Terre 38, Feu/Eau/Air 50 %','46 %','19 406','\u2014'],
 ['B. Gouffre 3/3 + Sanctuaire 2/3','A + Étreinte Végétale T2, Grèves Écarlates','13 943','50 % partout','46 %','19 652','Eau 442'],
 ['C. Malédiction de Cire Momore 6/6 (gardée)','Chagrin de Cire, Âmes Hurlantes, Lourd Fardeau T2, Triste Sceau T2, Claymomore, Éternelle Poursuite +5','14 335','50 % partout','89 % affichée (plafond 50 %)','19 883','Eau 365 · Terre/Feu/Air 333'],
];
function Tests(){return <Section id="tests-feca" title="Panoplies défensives testées sur Féca (20 oct 2026)">
  <p>Comparaison faite en jeu le 20 oct 2026 sur un Féca niveau 200, Prestige 7, <strong>14 PA dans les trois variantes</strong>. Avant les tests : 13 987 PV et 15 % de résistance Terre (autres stats de départ non relevées). <M s="T" /></p>
  <KeyFigures items={[
    {icon:'pv', value:'14 335', label:'PV', note:'Momore 6/6 · gardée'},
    {icon:'record', value:'19 883', label:'Opti'},
    {icon:'damage', value:'1584', label:'Puissance'},
    {icon:'resistance', value:'50 %', label:'Résistances', note:'Tous les éléments'},
  ]} />
  <div className="set-comparison">
    {([{label:'PV', index:2, max:14335}, {label:'Opti', index:5, max:19883}]).map(metric =>
      <div key={metric.label}><h3>{metric.label}</h3><Bars label={`Comparaison ${metric.label} des trois variantes`} max={metric.max} items={TESTS.map((r,i) => ({
        name:<span className="variant-name">{i===0?'Gouffre':i===1?'Gouffre + Sanctuaire':'Momore'} <span className="set-badge">{i===2?'6/6':'3/3'}</span>{i===1?<span className="set-badge">2/3</span>:null}{i===2?<span className="set-badge kept">Gardée</span>:null}</span>,
        value:Number(r[metric.index].replace(/ /g,'')), display:r[metric.index], hl:i===2,
      }))} /></div>
    )}
  </div>
  <TableWrap caption="Variantes testées (stats affichées sur la fiche du personnage)">
    <thead><tr><th>Variante</th><th>Pièces</th><th className="num">PV</th><th>Résistances</th><th>Réduction</th><th className="num">Opti</th><th>Dommages élémentaires</th></tr></thead>
    <tbody>{TESTS.map(r=><tr key={r[0]}>{r.map((c,i)=><td key={i} className={i===2||i===5?'num':undefined}>{c}</td>)}</tr>)}</tbody>
  </TableWrap>
  <ul>
    <li>Bonus relevés : Gouffre 3/3 <strong>+1 PA, +60 Chance, +7 % Critique, +10 Tacle</strong> ; Momore 6/6 <strong>+2 PA, +200 Puissance, +10 % résistances, +15 Réduction</strong>. <M s="T" /></li>
    <li>Avec Momore : <strong>Puissance 1584</strong>. La Réduction de dégâts s’affiche à 89 % mais elle est plafonnée à 50 %. <M s="T" /></li>
  </ul>
  <Tip title="Variante gardée : Momore 6/6">
    <p>Meilleure survie des trois : <strong>+350 PV</strong> par rapport au stuff de départ et résistance Terre de <strong>15 % à 50 %</strong>. Contrepartie : dommages Eau 365 contre 442 avec Gouffre + Sanctuaire ; l’effet sur Pelle des Anciens reste à vérifier. <M s="T" /> Voir aussi le <Link href="/personnage/classes/feca/#panoplie">Guide Féca</Link>.</p>
  </Tip>
  <CaptureGallery ids={['momore-equipement-porte', 'momore-chagrin-de-cire']} />
</Section>;}
export default function Page(){const sets=new Map<string,Set<string>>();for(const item of items){if('set' in item && item.set && 'set_bonus' in item && item.set_bonus){if(!sets.has(item.set))sets.set(item.set,new Set());sets.get(item.set)!.add(item.set_bonus);}}return <><PageHeader href="/equipement/panoplies/" title="Panoplies" intro="Bonus de panoplie présents dans le relevé des objets, et comparatif testé en jeu sur Féca."/><Tests/>{[...sets].map(([name,bonuses])=><section className="section" key={name}><h2>{name}</h2><ul>{[...bonuses].map(b=><li key={b}>{b}</li>)}</ul><h3>Objets relevés</h3><ul>{items.filter(i=>'set' in i && i.set===name).map(i=><li key={i.name}>{i.name}</li>)}</ul></section>)}</>;}
