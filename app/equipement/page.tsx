import { trailFor } from '@/lib/nav';
import SectionLanding from '@/components/SectionLanding';
export const metadata={title:trailFor('/equipement/').at(-1)!.title};
export default function Page(){return <SectionLanding href="/equipement/"/>;}