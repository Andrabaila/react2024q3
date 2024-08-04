import { useAppDispatch, useAppSelector } from '@/hooks';
import { setCurrentPageNumber } from '@/store/paginationSlice';

const Pagination = () => {
  const dispatch = useAppDispatch();
  const currentPageNumber = useAppSelector((state) => state.pagination.currentPageNumber);
  const totalPages = useAppSelector((state) => state.pagination.totalPages);

  const getPreviousPage = () => {
    if (currentPageNumber > 1) {
      dispatch(setCurrentPageNumber(currentPageNumber - 1));
    }
  };

  const getNextPage = () => {
    if (currentPageNumber < totalPages) {
      dispatch(setCurrentPageNumber(currentPageNumber + 1));
    }
  };

  return (
    <div className="flex gap-5 p-5 items-center">
      <button className="min-w-48 border" onClick={getPreviousPage}>
        back
      </button>
      <span>
        {currentPageNumber} of {totalPages}
      </span>
      <button className="min-w-48 border" onClick={getNextPage}>
        forward
      </button>
    </div>
  );
};

export default Pagination;
