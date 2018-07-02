export let accessAPI = function (qString = '') {
  return fetch(this.staticQueryStrings.baseURL + qString)
    .then(response => {
      return response.json();
    })
    .catch(error => {
      console.log(error);
    });
};

export let getFilterList = function (requestedList) {
  this.accessAPI(this.staticQueryStrings[requestedList])
    .then(response => {
      this.filterLists[requestedList + 'List'] = response.soklista.sokdata;
    })
};

export let buildQueryString = function (options) {
  let qString = '';

  return qString;
}

export let executeSearchQuery = function () {

  return searchQueryResults;
}