import { ErrorButton, ThemeButton } from '../../shared/ui';
import SearchBar from '../searchBar';
import styles from './Header.module.css';

const Header = () => {
  return (
    <header className={styles.header}>
      <SearchBar />
      <ErrorButton />
      <ThemeButton />
    </header>
  );
};

export default Header;
