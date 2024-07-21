import { useAppDispatch, useAppSelector } from '../../hooks';
import { setQueryValue } from '../searchInput/searchSlice';
import styles from './SearchButton.module.css';

const SearchButton = () => {
  const searchInputValue = useAppSelector((state) => state.search.searchInputValue);
  const searchQuery = useAppSelector((state) => state.search.searchQueryValue);
  const dispatch = useAppDispatch();

  const handleClick = () => {
    if (searchQuery != searchInputValue) {
      dispatch(setQueryValue(searchInputValue));
    }
  };

  return (
    <button className={styles.button} onClick={handleClick}>
      Search
    </button>
  );
};

export default SearchButton;
