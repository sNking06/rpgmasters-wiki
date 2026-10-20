import { trailFor } from '@/lib/nav';
import SectionLanding from '@/components/SectionLanding';
export const metadata={title:trailFor('/monde/').at(-1)!.title};
export default function Page(){return <SectionLanding href="/monde/" captureId="monde-zones" captureCaption="Page Chasse : prochain boss de zone et liste des zones"/>;}