import { useAppDispatch, useAppSelector } from '../../shared/hooks';
import styles from './Pagination.module.css';
import { setCurrentPageNumber } from './paginationSlice';

const Pagination = () => {
  const dispatch = useAppDispatch();
  const currentPageNumber = useAppSelector((state) => state.pagination.currentPageNumber);
  const totalPages = useAppSelector((state) => state.pagination.totalPages);

  const getPreviousPage = () => {
    if (currentPageNumber > 1) {
      dispatch(setCurrentPageNumber(currentPageNumber - 1));
    }
  };

  const getNextPage = () => {
    if (currentPageNumber < totalPages) {
      dispatch(setCurrentPageNumber(currentPageNumber + 1));
    }
  };

  return (
    <div className={styles.pagination}>
      <button className={styles.button} onClick={getPreviousPage}>
        back
      </button>
      <span>
        {currentPageNumber} of {totalPages}
      </span>
      <button className={styles.button} onClick={getNextPage}>
        forward
      </button>
    </div>
  );
};

export default Pagination;
