import { useTheme } from '../../shared/hooks';
import { ErrorButton } from '../../shared/ui';
import SearchBar from '../searchBar';
import styles from './Header.module.css';

const Header = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className={styles.header}>
      <SearchBar />
      <ErrorButton />
      <button onClick={toggleTheme}>Switch to {theme === 'light' ? 'Dark' : 'Light'} Theme</button>
    </header>
  );
};

export default Header;
