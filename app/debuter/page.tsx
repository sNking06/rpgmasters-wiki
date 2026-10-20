import { trailFor } from '@/lib/nav';
import SectionLanding from '@/components/SectionLanding';
export const metadata={title:trailFor('/debuter/').at(-1)!.title};
export default function Page(){return <SectionLanding href="/debuter/" captureId="tableau-de-bord" captureCaption="Le tableau de bord, point de départ de chaque session"/>;}