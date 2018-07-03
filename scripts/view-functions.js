/**
 *
 * VIEW FUNCTIONS
 *
 * All the functions that change the
 * presentation of the data by the DOM.
 * Adding new jobs, showing more jobs etc.
 *
 * Functions that work on data directly
 * or control how the user interacts with
 * the page should be in another file.
 *
 */

export function updateJobsDisplayed() {
  // Placeholder function
}

export function updateFiltersDisplayed(filterName) {
  // Placeholder function
}

function buildAd(adObject) {
  const adString = `<article id=${adObject.id}>
                        <h2>${adObject.namn}</h2>
                        <div class="ad-details-wrapper">
                            <span class="job-title"><i class="fas fa-tag"></i>${''}</span>
                            <span class="work-place"><i class="fas fa-at"></i>${''}</span>
                            <span class="location"><i class="fas fa-map-marker-alt"></i>${''}, ${''}</span>
                            <span class="latest-application-date"><i class="far fa-clock"></i>Ansök senast ${''}</span>
                        </div>
                        <button class="expand-job-ad"><i class="fas fa-plus-circle"></i>Öppna annons</button>
                     </article>`;
  return adString;
}

function buildFilter(filterObject) {
  const filterString = `<span> ${filterObject.namn}</span>`;
  return filterString;
}

function insertHTML(targetSelector, insertedObject, objectType) {
  let insertionString = '';
  switch (objectType) {
    case 'ad':
      insertionString = buildAd(insertedObject);
      break;
    case 'filter':
      insertionString = buildFilter(insertedObject);
      break;
    default:
  }
  return targetSelector.insertAdjacentHTML('beforeend', insertionString);
}
