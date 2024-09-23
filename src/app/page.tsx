import { getCampaigns } from '@/redux/asyncThunks/campaign';
import CampaignTable from '@/components/campaignTable';

export default async function Home() {

  return (
    <div>
      <h1>Campaigns List</h1>
      <CampaignTable />
    </div>
  );
}
