import styles from './Pagination.module.css';
type Props = {
  currentPageNumber: number;
  getPreviousPage: () => void;
  getNextPage: () => void;
};

const Pagination = (props: Props) => {
  return (
    <div className={styles.pagination}>
      <button className={styles.button} onClick={props.getPreviousPage}>
        back
      </button>
      <span>{props.currentPageNumber}</span>
      <button className={styles.button} onClick={props.getNextPage}>
        forward
      </button>
    </div>
  );
};

export default Pagination;
