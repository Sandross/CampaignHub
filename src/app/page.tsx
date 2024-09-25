import dynamic from 'next/dynamic';
import CampaignTable from '@/components/campaignTable';
const NoSSRComponent = dynamic(() => import('../components/campaignTable'), { ssr: false });

export default async function Home() {
  return (
    <div>
      <h1 style={{ padding: '2rem'}}>Campanhas</h1>
      <NoSSRComponent />
    </div>
  );
}
