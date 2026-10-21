import { ItemTable } from '@/components/ItemTable';
import GameCapture from '@/components/GameCapture';
import { Disc, Essentiel, PageEnd, PageHeader, Section, TableWrap, Warn } from '@/components/ui';
export const metadata={title:'Dofus'};
const MAJEURS:[string,string][]=[
 ['Émeraude','Survit une fois avec 20 % de PV.'],
 ['Pourpre','Le premier sort de dégâts inflige ×2.'],
 ['Turquoise','+1 PA au tour suivant après un critique, au-delà du plafond de PA, pendant le combat seulement.'],
 ['Ocre','Une carte de plus au début du combat.'],
 ['Vulbis','Esquive qui monte de 2 % par coup non esquivé, 75 % au maximum.'],
 ['Ivoire','Aucun coup ordinaire ne retire plus de 35 % des PV max.'],
 ['Glaces','Frappe de la cible −10 %, non cumulable.'],
 ['Ébène','Perforation ×1,3 (plafond 32,5 %).'],
 ['Kaliptus','Un boss a 20 % de chances de donner un objet de butin en plus.'],
 ['Tacheté','Annule le premier effet de contrôle de chaque tour.'],
 ['Dofawa','« Effet mystère » : le développeur ne le dévoile pas.'],
];
const NOUVEAUX:[string,string,string][]=[
 ['Jyfus','Petit cœur','Une fois par combat, sous 30 % de PV : tu récupères 10 % de tes PV max.'],
 ['Dofus Cacao','Croquant','Briser entièrement un bouclier ennemi rend 3 % de tes PV max (1 fois par tour).'],
 ['Dofus Cawotte','Grignotage','+10 % d’XP par combat.'],
 ['Dokille','Fouineur','Les monstres ordinaires ont 5 % de chances de donner un objet en plus (jamais un Dofus).'],
 ['Dolmanax','Offrande du jour','Un élément à l’honneur chaque jour : +10 % de dégâts et de soins dans cet élément.'],
 ['Dofus des Veilleurs','Veille','PA non utilisés en fin de tour : tu en gardes 1 pour le tour suivant, même au-delà du plafond.'],
 ['Dotruche','Trop-plein','Les soins au-delà des PV max deviennent un bouclier (jusqu’à 10 % des PV max).'],
 ['Domakuro','Pioche affûtée','La 1re carte piochée en plus chaque tour coûte 1 PA de moins (min. 1).'],
 ['Dorigami','Pli','Après une esquive totale, le prochain sort inflige +15 % de dégâts.'],
 ['Dofoozbz','Réserve profonde','La réserve de pioches se recharge de 2 par tour au lieu de 1.'],
 ['Dofus Forgelave','Magma','Érosion ×1,3 (plafond 32,5 %).'],
 ['Dofus Argenté Scintillant','Éclat d’argent','Chaque combat commence avec un bouclier de 8 % des PV max.'],
 ['Dofus du Cauchemar','Effroi','Les ennemis font 15 % de dégâts en moins pendant les 2 premiers tours.'],
 ['Dom de Pin','Résine','Chaque vision spectrale réussie rend 3 % des PV max.'],
 ['Dofus Sylvestre','Forêt profonde','Les visions spectrales infligent ×2,25 au lieu de ×2.'],
];
export default function Page(){return <>
<PageHeader href="/equipement/dofus/" title="Dofus" intro="Les passifs officiels des Dofus, puis les Dofus présents dans le relevé des objets."/>
<Essentiel>
 <li>Les passifs sont actifs quand le Dofus est <strong>équipé</strong>, partout sauf dans les <strong>Abysses</strong>. <Disc d="12/10" /></li>
 <li>Depuis le 16/10, Dofus et trophées fusionnent jusqu’à <strong>Rayonnant +5</strong> : +100 % sur leurs stats, PA et PM au plus doublés. <Disc d="16/10" /></li>
 <li>Chasse ciblée : Dofus jusqu’au niveau de la zone +20, gardé une fois sur cinq (1 %). <Disc d="16/10" /></li>
</Essentiel>
<Section id="passifs" title="Passifs des 10 Dofus majeurs">
 <p>Annoncés le 10/10 à 18:36. <Disc d="10/10" /></p>
 <TableWrap caption="Dofus majeurs et leur passif"><thead><tr><th>Dofus</th><th>Passif</th></tr></thead>
 <tbody>{MAJEURS.map(([n,e])=><tr key={n}><td>{n}</td><td>{e}</td></tr>)}</tbody></TableWrap>
</Section>
<Section id="passifs-12-10" title="Nouveaux passifs du 12/10">
 <p>Patch note du 12/10 à 02:26. <Disc d="12/10" /></p>
 <TableWrap caption="Dofus ajoutés le 12/10"><thead><tr><th>Dofus</th><th>Passif</th><th>Effet</th></tr></thead>
 <tbody>{NOUVEAUX.map(([n,p,e])=><tr key={n}><td>{n}</td><td>{p}</td><td>{e}</td></tr>)}</tbody></TableWrap>
 <Warn title="Pano Mehdi"><p>Le « Dofus Mehditapasosé » fait partie de la pano Mehdi (11 objets, +20 % de stats par objet porté, +2 % de dégâts de sorts chacun), jackpot de la Roue Bouftou à 0,01 %. <Disc d="17/10" /></p></Warn>
</Section>
<Section id="releve" title="Dofus du relevé des objets">
<GameCapture id="inventaire-dofus" caption="Inventaire filtré sur Dofus / Trophée, avec le panneau de filtres"/>
<ItemTable onlyDofus/>
</Section>
<PageEnd current="/equipement/dofus/" see={[{href:'/economie/#fusion',label:'Fusion et Rayonnant'},{href:'/economie/#chasse-ciblee',label:'Chasse ciblée'},{href:'/a-propos/journal/',label:'Journal des mises à jour'}]} sources="Discord officiel, annonces des 10/10, 12/10, 16/10 et 17/10 ; relevé des objets" />
</>;}
