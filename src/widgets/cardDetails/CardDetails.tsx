import { useDispatch } from 'react-redux';
import { useAppSelector } from '../../shared/hooks';
import { setIsVisible } from './cardDetailsSlice';
import { useGetPersonQuery } from '../../shared/api/swapiApi';

const CardDetails = () => {
  const isDetailsVisible = useAppSelector((state) => state.details.isVisible);
  const personURL = useAppSelector((state) => state.details.personURL);
  const dispatch = useDispatch();

  const { data: person, isLoading } = useGetPersonQuery({
    url: personURL,
  });

  const handleClick = () => {
    if (isDetailsVisible) {
      dispatch(setIsVisible(false));
    }
  };

  if (isDetailsVisible) {
    return (
      <aside className="flex items-center p-5">
        {isLoading ? (
          <p>Loading...</p>
        ) : person ? (
          <div className="flex flex-col items-center" key={person.name} onClick={handleClick}>
            <h2>{person.name}</h2>
            <div>
              <p>birth year: {person.birth_year}. </p>
              <p>gender: {person.gender}</p>
              <p>skin color: {person.skin_color}</p>
              <p>hair color: {person.hair_color}</p>
              <p>eye color: {person.eye_color}</p>
              <p>height: {person.height}</p>
              <p>mass: {person.mass}</p>
              <p>homeworld: {person.homeworld}</p>
              <p>url: {person.url}</p>
            </div>

            <button type="button" className="border border-solid" onClick={handleClick}>
              Close
            </button>
          </div>
        ) : (
          <p>No such person</p>
        )}
      </aside>
    );
  } else {
    return <></>;
  }
};

export default CardDetails;
