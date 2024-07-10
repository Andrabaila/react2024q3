function setSearchInputValue(inputValue: string | null) {
  if (typeof inputValue === "string") {
    localStorage.setItem("searchInputValue", inputValue);
  } else {
    localStorage.setItem("searchInputValue", "");
  }
}

export default setSearchInputValue;
