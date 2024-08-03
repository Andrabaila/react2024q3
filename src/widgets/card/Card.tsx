import { setIsVisible, setPersonURL } from '../cardDetails/cardDetailsSlice';
import { useAppSelector } from '../../shared/hooks';
import { useDispatch } from 'react-redux';
import { Person } from '../../shared/api/types';
import { setSelectedArr } from '../flyoutElement/selectedSlice';

type Props = {
  el: Person;
};

const Card = ({ el }: Props) => {
  const isDetailsVisible = useAppSelector((state) => state.details.isVisible);
  const selectedPeople = useAppSelector((state) => state.selected.selectedArr);

  const dispatch = useDispatch();
  const isSelectedPerson = selectedPeople.find((person) => person.name === el.name);

  const handleChange = () => {
    if (isSelectedPerson) {
      dispatch(setSelectedArr(selectedPeople.filter((person) => person.name != el.name)));
    } else {
      dispatch(setSelectedArr([...selectedPeople, el]));
    }
  };

  const handleClick = (url: string) => {
    if (!isDetailsVisible) {
      dispatch(setIsVisible(true));
      dispatch(setPersonURL(url));
    }
  };

  return (
    <div
      className="w-[250px] p-2.5 border border-solid rounded-lg cursor-pointer relative"
      onClick={() => handleClick(el.url)}
    >
      <h2 className="text-center font-bold">{el.name}</h2>
      <p className="text-justify">
        Was born in the year {el.birth_year}.{' '}
        {el.gender.charAt(0).toUpperCase() + el.gender.slice(1)} has {el.eye_color} eyes...
      </p>
      <label className="absolute top-0 left-0 m-1.5" aria-label="select person">
        <input type="checkbox" onChange={handleChange} checked={!!isSelectedPerson} />
      </label>
    </div>
  );
};

export default Card;
