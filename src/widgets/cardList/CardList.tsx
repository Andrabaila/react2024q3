import { Person } from '../../pages/main/api/api';
import './index.css';

type Props = {
  list: Person[];
};

export default function CardList({ list }: Props) {
  return (
    <div className="people">
      {!!list.length &&
        list.map((el: Person) => (
          <div className="person" key={el.name}>
            <h2 className="name">{el.name}</h2>
            <p className="description">
              Was born in the year {el.birth_year}.{' '}
              {el.gender.charAt(0).toUpperCase() + el.gender.slice(1)} has {el.eye_color} eyes,{' '}
              {el.hair_color} hair, weighs {el.mass} kg, and is
              {el.height} cm tall.
            </p>
          </div>
        ))}
    </div>
  );
}
