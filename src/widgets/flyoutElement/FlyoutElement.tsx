import { useAppSelector } from '../../shared/hooks';
import styles from './flyoutElement.module.css';

const FlyoutElement = () => {
  const selectedQuantity = useAppSelector((state) => state.selected.quantity);
  return (
    <section className={styles.section}>
      <div>Number of selected items: {selectedQuantity}</div>
      <button type="button">Unselect all</button>
      <button type="button">Download</button>
    </section>
  );
};

export default FlyoutElement;
