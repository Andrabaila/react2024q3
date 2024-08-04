import { ErrorButton, ThemeButton } from '../../ui';
import SearchBar from '../searchBar';

const Header = () => {
  return (
    <header className="flex flex-nowrap gap-4 p-2.5">
      <SearchBar />
      <ErrorButton />
      <ThemeButton />
    </header>
  );
};

export default Header;
