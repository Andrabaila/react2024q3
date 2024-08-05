import { useEffect } from 'react';
import { Person } from '../../shared/api/types';
import { useGetPeopleQuery } from '../../shared/api/swapiApi';
import { useAppSelector } from '../../shared/hooks';
import Pagination from '../pagination';
import { useDispatch } from 'react-redux';
import { setTotalPages } from '../pagination/paginationSlice';
import Card from '../card';
import { useRouter } from 'next/navigation';

export default function CardList() {
  const router = useRouter();
  const searchQuery = useAppSelector((state) => state.search.searchQueryValue);
  const currentPageNumber = useAppSelector((state) => state.pagination.currentPageNumber);
  const dispatch = useDispatch();

  useEffect(() => {
    const params = new URLSearchParams({
      search: searchQuery,
      page: String(currentPageNumber),
    });
    router.replace(`?${params.toString()}`);
  }, [router, searchQuery, currentPageNumber]);

  const { data: peopleData, isLoading } = useGetPeopleQuery({
    searchQuery: searchQuery.trim(),
    page: currentPageNumber,
  });

  useEffect(() => {
    if (peopleData) {
      dispatch(setTotalPages(Math.ceil(peopleData.count / 10)));
    }
  }, [dispatch, peopleData]);

  return (
    <section className="flex flex-col p-5 gap-2.5 items-center">
      {isLoading ? (
        <span>Loading...</span>
      ) : (
        <>
          <div className="flex flex-wrap p-5 gap-5 justify-center">
            {peopleData && peopleData.results.length ? (
              peopleData.results.map((el: Person) => <Card el={el} key={el.name} />)
            ) : (
              <h3>Sorry!</h3>
            )}
          </div>
          {peopleData && peopleData.results.length ? (
            <Pagination />
          ) : (
            <div>There are no results matching the specified search criteria</div>
          )}
        </>
      )}
    </section>
  );
}
