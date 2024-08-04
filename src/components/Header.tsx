import { ErrorButton, ThemeButton } from '@/ui';
import { SearchBar } from '@/components';

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
