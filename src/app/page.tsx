import dynamic from 'next/dynamic';
const NoSSRComponent = dynamic(() => import('../components/campaignTable'), { ssr: false });
import styles from './page.module.scss';
export default async function Home() {
  return (
    <div className={styles.home}>
      <h1>Campanhas</h1>
      <NoSSRComponent />
    </div>
  );
}
