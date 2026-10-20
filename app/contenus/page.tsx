import { trailFor } from '@/lib/nav';
import SectionLanding from '@/components/SectionLanding';
export const metadata={title:trailFor('/contenus/').at(-1)!.title};
export default function Page(){return <SectionLanding href="/contenus/" captureIds={['guilde-faille-top10', 'ascension-etage-42']} captureCaptions={{'guilde-faille-top10': 'Faille du Kralamoure dans la page Guilde', 'ascension-etage-42': 'Ascension : étage 42 avant combat'}}/>;}