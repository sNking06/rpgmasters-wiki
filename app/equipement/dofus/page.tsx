import { ItemTable } from '@/components/ItemTable';
import { PageHeader } from '@/components/ui';
export const metadata={title:'Dofus'};
export default function Page(){return <><PageHeader title="Dofus" intro="Dofus présents dans le relevé des objets."/><ItemTable onlyDofus/></>;}