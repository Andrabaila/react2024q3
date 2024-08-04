import { setCurrentPageNumber } from '@/store/paginationSlice';
import { useAppDispatch, useAppSelector } from '../hooks';
import { setQueryValue } from '@/store/searchSlice';

const SearchButton = () => {
  const searchInputValue = useAppSelector((state) => state.search.searchInputValue);
  const searchQuery = useAppSelector((state) => state.search.searchQueryValue);
  const dispatch = useAppDispatch();

  const handleClick = () => {
    if (searchQuery != searchInputValue) {
      dispatch(setQueryValue(searchInputValue));
      dispatch(setCurrentPageNumber(1));
    }
  };

  return (
    <button type="button" className="border border-gray-300" onClick={handleClick}>
      Search
    </button>
  );
};

export default SearchButton;
