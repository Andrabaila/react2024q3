import { useGetPeopleQuery } from './api/swapiApi';
import { CardList, Pagination } from '../../widgets/';
import { useAppSelector } from '../../shared/hooks';
import Header from '../../widgets/header/';

export default function PageMain() {
  const searchQuery = useAppSelector((state) => state.search.searchQueryValue);
  const currentPageNumber = 1;

  /*   const [, setURLSearchParams] = useSearchParams(); */

  const { data: peopleData, isLoading } = useGetPeopleQuery({
    searchQuery: searchQuery.trim(),
    page: currentPageNumber,
  });

  /*   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setState((prev) => ({
      ...prev,
      searchInputValue: e.target.value,
    }));
  }; */

  const getPreviousPage = () => {
    /*     if (currentPageNumber > 1) {
      setState((prev) => ({
        ...prev,
        currentPageNumber: currentPageNumber - 1,
      }));
    } */
  };

  const getNextPage = () => {
    /*     if (peopleData && state.currentPageNumber < Math.ceil(peopleData.count / 10)) {
      setState((prev) => ({
        ...prev,
        currentPageNumber: state.currentPageNumber + 1,
      }));
    } */
  };

  return (
    <>
      <Header />
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <>
          <CardList list={peopleData?.results || []} />
          <Pagination
            currentPageNumber={currentPageNumber}
            getPreviousPage={getPreviousPage}
            getNextPage={getNextPage}
          />
        </>
      )}
    </>
  );
}
