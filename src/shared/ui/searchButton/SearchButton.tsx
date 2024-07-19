import { useGetPeopleQuery } from '../../../pages/main/api/swapiApi';
import { useAppSelector } from '../../hooks';
import styles from './SearchButton.module.css';

const SearchButton = () => {
  const searchValue = useAppSelector((state) => state.search.searchValue);
  const { refetch } = useGetPeopleQuery({ searchQuery: searchValue, page: 1 }, { skip: true });
  const handleClick = () => {
    refetch;
  };

  return (
    <button className={styles.button} onClick={handleClick}>
      Search
    </button>
  );
};

export default SearchButton;
