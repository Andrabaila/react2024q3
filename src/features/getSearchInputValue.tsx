function getSearchInputValue() {
  let searchInputValue = '';
  if (localStorage.getItem('searchInputValue')) {
    searchInputValue = String(localStorage.getItem('searchInputValue'));
  }
  return searchInputValue;
}

export default getSearchInputValue;
