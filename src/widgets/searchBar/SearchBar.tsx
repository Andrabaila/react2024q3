import styles from './SearchBar.module.css';
import { SearchButton, SearchInput } from '../../shared/ui';

const SearchBar = () => {
  return (
    <div className={styles.search_bar}>
      <SearchInput />
      <SearchButton />
    </div>
  );
};

export default SearchBar;
