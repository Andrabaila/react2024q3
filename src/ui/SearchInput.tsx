import { useAppDispatch, useAppSelector } from '../hooks';
import { setSearchValue } from './searchSlice';

const SearchInput = () => {
  const dispatch = useAppDispatch();
  const searchInputValue = useAppSelector((state) => state.search.searchInputValue);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchValue(event.target.value));
  };

  return (
    <input
      type="search"
      className="p-2"
      placeholder="enter name"
      value={searchInputValue}
      onChange={handleChange}
    />
  );
};

export default SearchInput;
