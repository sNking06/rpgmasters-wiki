import { ItemTable } from '@/components/ItemTable';
import GameCapture from '@/components/GameCapture';
import { PageHeader } from '@/components/ui';
export const metadata={title:'Dofus'};
export default function Page(){return <><PageHeader href="/equipement/dofus/" title="Dofus" intro="Dofus présents dans le relevé des objets."/><GameCapture id="inventaire-dofus" caption="Inventaire filtré sur Dofus / Trophée, avec le panneau de filtres"/><ItemTable onlyDofus/></>;}