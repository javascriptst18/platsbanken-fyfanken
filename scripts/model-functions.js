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

export function accessAPI(queryString = '') {
    return fetch(this.staticQueryStrings.baseURL + queryString)
        .then(response => response.json())
        .catch(error => console.log(error));
}

export function buildMatchingQueryString() {
    const queryString = '';
    // Placeholder function
    return queryString;
}

export function getFilterList(requestedList, parentListId = '') {
    return this.accessAPI(this.staticQueryStrings[requestedList] + parentListId)
        .then(response => response);
}

export function saveFilterList(filterList, app) {
    const listName = app.translate(filterList.soklista.listnamn);
    app.filterLists[`${listName}List`] = filterList.soklista.sokdata;
}

export function initiate() {
    this.getFilterList('region').then(response => saveFilterList(response, this));
    this.getFilterList('jobCategory').then(response => saveFilterList(response, this));
}
