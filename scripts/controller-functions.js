import {
  updateFiltersDisplayed,
} from './view-functions';

/**
 *
 * CONTROLLER FUNCTIONS
 *
 * All the functions that allow
 * the user to control the page via
 * the DOM. Event listeners, Clicking
 * search, selecting a filter etc.
 *
 * Functions that manipulate the view
 * of the DOM or work on data directly
 * should be in another file.
 *
 */

export function executeSearchBoxQuery() {
  // Placeholder function
}

export function toggleFilterSetting(filterIdentifier) {

  let matchFound = false;

  Object.keys(this.userOptions.filterSettings).forEach((e, i, a) => {
    this.userOptions.filterSettings[e].forEach((ee, ii, aa) => {
      if (filterIdentifier === ee) {
        matchFound = true;
        console.log('Filter "' + ee + '" already selected. Removing.');
        this.userOptions.filterSettings[e].splice(ii, 1);
      }
    });
  });

  if (matchFound) {
    return updateFiltersDisplayed()
  }

  Object.keys(this.filterLists).forEach((e, i, a) => {
    this.filterLists[e].forEach((ee, ii, aa) => {
      if (filterIdentifier === ee.namn) {
        console.log('Filter "' + ee.namn + '" not selected. Adding.')
        this.userOptions.filterSettings[e].push(ee.namn);
        return updateFiltersDisplayed();
      }
    })
  })
}


export function loadNextPage() {
  // Placeholder function
}