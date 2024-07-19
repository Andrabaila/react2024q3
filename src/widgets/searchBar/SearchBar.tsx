import styles from './SearchBar.module.css';
import { ErrorButton, SearchButton, SearchInput } from '../../shared/ui';

const SearchBar = () => {
  return (
    <div className={styles.search_bar}>
      <SearchInput />
      <SearchButton />
      <ErrorButton />
    </div>
  );
};

export default SearchBar;
