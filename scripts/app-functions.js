export let accessAPI = function (queryString = '') {
  return fetch(this.staticQueryStrings.baseURL + queryString)
    .then(response => {
      return response.json();
    })
    .catch(error => {
      return console.log(error);
    });
};

export let getFilterList = function (requestedList, parentListId = '') {
  this.accessAPI(this.staticQueryStrings[requestedList] + parentListId)
    .then(response => {
      console.log(response);
      return response.soklista.sokdata;
    })
};

export let buildMatchingQueryString = function (options) {
  let matchingQueryString = this.staticQueryStrings.matching;

  return matchingQueryString;
};

export let executeSearchQuery = function (searchType, options) {
  let searchQueryResults = {};

  return searchQueryResults;
};

export let convertToId = function (nameString) {
  let idNumber = '';

  return idNumber;
};

export let filterOptionChecked = function () {

};