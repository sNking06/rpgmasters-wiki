import { trailFor } from '@/lib/nav';
import SectionLanding from '@/components/SectionLanding';
export const metadata={title:trailFor('/contenus/').at(-1)!.title};
export default function Page(){return <SectionLanding href="/contenus/" captureId="guilde-faille-top10" captureCaption="Faille du Kralamoure dans la page Guilde"/>;}