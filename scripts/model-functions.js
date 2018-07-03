/**
 * 
 * MODEL FUNCTIONS
 * 
 * All the functions used by the page 
 * to retrieve and organize data.
 * 
 * Functions that manipulate the DOM or
 * allow the user to interact with it
 * should be placed in either the view
 * controller files.
 * 
 */

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
  // Placeholder function
  return queryString;
}

export let getFilterList = function (requestedList, parentListId = '') {
  return this.accessAPI(this.staticQueryStrings[requestedList] + parentListId)
    .then(response => {
      return response;
    })
};

export let saveFilterList = function (filterList, app) {
  let listName = app.translate(filterList.soklista.listnamn);
  app.filterLists[listName + 'List'] = filterList.soklista.sokdata;
  console.log(app);
}

export let initiate = function () {
  this.getFilterList('region').then(response => saveFilterList(response, this));
  this.getFilterList('jobCategory').then(response => saveFilterList(response, this));
}