import CardList from '@/widgets/cardList/CardList';
import styles from './PageMain.module.css';
import CardDetails from '@/widgets/cardDetails/CardDetails';
import { FlyoutElement, Header } from '@/widgets';

export default function PageMain() {
  return (
    <>
      <Header />
      <main className={styles.main}>
        <CardList />
        <CardDetails />
      </main>
      <FlyoutElement />
    </>
  );
}
