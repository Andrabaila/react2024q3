import { CardDetails, CardList, Header } from '../../widgets/';
import styles from './PageMain.module.css';

export default function PageMain() {
  return (
    <>
      <Header />
      <main className={styles.main}>
        <CardList />
        <CardDetails />
      </main>
    </>
  );
}
