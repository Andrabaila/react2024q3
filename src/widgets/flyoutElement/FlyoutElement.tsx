import { useDispatch } from 'react-redux';
import { useAppSelector } from '../../shared/hooks';
import styles from './flyoutElement.module.css';
import { setSelectedArr } from './selectedSlice';
import { CSVLink } from 'react-csv';

const FlyoutElement = () => {
  const selectedPeople = useAppSelector((state) => state.selected.selectedArr);
  const dispatch = useDispatch();

  const handleUnselect = () => {
    dispatch(setSelectedArr([]));
  };

  return (
    <section className={styles.section}>
      <div>Number of selected items: {selectedPeople.length}</div>
      <button type="button" onClick={handleUnselect}>
        Unselect all
      </button>
      <CSVLink data={selectedPeople} filename={`${selectedPeople.length}_people.csv`}>
        <button>Download</button>
      </CSVLink>
    </section>
  );
};

export default FlyoutElement;