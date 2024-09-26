import styles from './page.module.scss';
import CampaignTable from '@/components/campaignTable';
export default async function Home() {
  return (
    <div className={styles.home}>
      <h1>Campanhas</h1>
      <CampaignTable />
    </div>
  );
}
