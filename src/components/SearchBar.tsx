import { SearchButton, SearchInput } from '@/ui';

const SearchBar = () => {
  return (
    <form onSubmit={(event) => event.preventDefault()} className="flex gap-4 p-2.5">
      <SearchInput />
      <SearchButton />
    </form>
  );
};

export default SearchBar;
