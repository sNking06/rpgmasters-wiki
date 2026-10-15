import items from '@/data/items.json';
import {PageHeader} from '@/components/ui';
export const metadata={title:'Panoplies'};
export default function Page(){const sets=new Map<string,Set<string>>();for(const item of items){if('set' in item && item.set && 'set_bonus' in item && item.set_bonus){if(!sets.has(item.set))sets.set(item.set,new Set());sets.get(item.set)!.add(item.set_bonus);}}return <><PageHeader title="Panoplies" intro="Bonus de panoplie présents dans le relevé des objets."/>{[...sets].map(([name,bonuses])=><section className="section" key={name}><h2>{name}</h2><ul>{[...bonuses].map(b=><li key={b}>{b}</li>)}</ul><h3>Objets relevés</h3><ul>{items.filter(i=>'set' in i && i.set===name).map(i=><li key={i.name}>{i.name}</li>)}</ul></section>)}</>;}
