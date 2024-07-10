function setSearchInputValue(inputValue: string | null) {
  if (typeof inputValue === "string") {
    localStorage.setItem("searchInputValue", inputValue.trim());
  } else {
    localStorage.setItem("searchInputValue", "");
  }
}

export default setSearchInputValue;
