import React from "react";
import getSearchInputValue from "./features/getSearchInputValue";
import setSearchInputValue from "./features/setSearchInputValue";
import { Person, getPeople } from "./features/api";

export default class App extends React.Component {
  state = {
    searchInputValue: getSearchInputValue(),
    searchResults: [],
    isLoading: false,
  };
  componentDidMount() {
    this.setState({ searchInputValue: getSearchInputValue() });
    window.addEventListener("beforeunload", () =>
      setSearchInputValue(this.state.searchInputValue)
    );
    this.handleClick();
  }
  componentWillUnmount() {
    localStorage.setItem("searchInputValue", this.state.searchInputValue);
  }

  handleClick = async () => {
    this.setState((prev) => ({
      ...prev,
      isLoading: true,
    }));
    const peopleArray = await getPeople(this.state.searchInputValue.trim());
    this.setState((prev) => ({
      ...prev,
      searchResults: peopleArray,
      isLoading: false,
    }));
  };

  render(): React.ReactNode {
    return (
      <>
        <div className="search-bar">
          <input
            type="search"
            placeholder="enter name"
            value={this.state.searchInputValue}
            onChange={(event) =>
              this.setState({ searchInputValue: event.target.value })
            }
          />
          <button onClick={this.handleClick}>Search</button>
          <button className="error">Error</button>
        </div>
        {this.state.isLoading ? (
          <p>Loading...</p>
        ) : (
          <div className="people">
            {!!this.state.searchResults.length &&
              this.state.searchResults.map((el: Person) => (
                <div className="person" key={el.name}>
                  <h2 className="name">{el.name}</h2>
                  <p className="description">
                    Was born in the year {el.birth_year}.{" "}
                    {el.gender.charAt(0).toUpperCase() + el.gender.slice(1)} has{" "}
                    {el.eye_color} eyes, {el.hair_color} hair, weighs {el.mass}{" "}
                    kg, and is
                    {el.height} cm tall.
                  </p>
                </div>
              ))}
          </div>
        )}
      </>
    );
  }
}
