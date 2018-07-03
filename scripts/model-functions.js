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

export function saveFilterList(requestedList, parentItemName = '') {
  return this.accessAPI(this.staticQueryStrings[requestedList])
    .then((response) => {
      this.translate(response.soklista.listnamn);
      this.filterLists[`${requestedList}List`] = response.soklista.sokdata;
    });
}

export function initiate() {
  this.saveFilterList('region')
    .then(this.saveFilterList('jobCategory'))
    .then(console.log(this))
    .then(this.insertHTML(this.htmlSelectors.filters,'Filter','filter'))
}

export function convertNameToObj(inputString) {

}

export function searchInArrayOfObjects(keyName, keyValue, arr) {
  let matchFound = false;
  arr.forEach((e,i,a) => {
    if (matchFound === true) {return};
    Object.keys(e).forEach((ee,ii,aa) => {
      if (e[keyName] === keyValue) {
        matchFound = true;
      }
    })
  })
}