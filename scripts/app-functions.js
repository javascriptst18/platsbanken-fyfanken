export let accessAPI = function (queryString = '') {
  return fetch(this.staticQueryStrings.baseURL + queryString)
    .then(response => {
      return response.json();
    })
    .catch(error => {
      return console.log(error);
    });
};

export let buildQueryString = function (options) {
  let queryString = '';
  
  return queryString;
}

export let getFilterList = function (requestedList, parentListId = '') {
  return this.accessAPI(this.staticQueryStrings[requestedList] + parentListId)
    .then(response => {
      return response;
    })
};

export let saveFilterList = function (filterList, app) {
  let listName = app.translateWord(filterList.soklista.listnamn);
  app.filterLists[listName + 'List'] = filterList.soklista.sokdata;
  console.log(app);
}

export let executeSearchBoxQuery = function () {

  return updateJobsDisplayed();
}

export let updateJobsDisplayed = function () {

}

export let toggleFilterSetting = function (filterSetting) {

  return updateJobsDisplayed();
}

export let loadNextPage = function () {

  return updateJobsDisplayed();
}

export let initiate = function () {
  this.getFilterList('region').then(response => saveFilterList(response, this));
  this.getFilterList('jobCategory').then(response => saveFilterList(response, this));
}