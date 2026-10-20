import { trailFor } from '@/lib/nav';
import SectionLanding from '@/components/SectionLanding';
export const metadata={title:trailFor('/personnage/').at(-1)!.title};
export default function Page(){return <SectionLanding href="/personnage/" captureId="feca-fiche" captureCaption="Fiche du Féca de SNking"/>;}