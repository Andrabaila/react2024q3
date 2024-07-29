import styles from './SearchBar.module.css';
import { SearchButton, SearchInput } from '../../shared/ui';

const SearchBar = () => {
  return (
    <form onSubmit={(event) => event.preventDefault()} className={styles.search_bar}>
      <SearchInput />
      <SearchButton />
    </form>
  );
};

export default SearchBar;
