export type Person = {
  birth_year: string;
  created: string;
  edited: string;
  eye_color: string;
  gender: string;
  hair_color: string;
  height: string;
  homeworld: string;
  mass: string;
  name: string;
  skin_color: string;
  url: string;
};

export type People = {
  count: number;
  next: string | null;
  previous: string | null;
  results: Person[];
};

export const getPeople = async (searchQuery: string = '', page: number = 1) => {
  try {
    const response = await fetch(
      `https://swapi.dev/api/people/?search=${searchQuery}&page=${page}`,
      {
        method: 'GET',
      },
    );
    const people: People = await response.json();
    return people;
  } catch (e) {
    console.error(e);
  }
};
