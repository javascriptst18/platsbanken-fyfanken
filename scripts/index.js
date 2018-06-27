const searchBox = document.querySelector('#searchBox');
const searchForm = document.querySelector('#searchForm');
const numberOfResults = document.querySelector('#numberOfResults');
// Pick the main container in the DOM
const mainContainer = document.querySelector('main');
<<<<<<< HEAD
const mainWrapper = document.querySelector('#mainWrapper');
const closeButton = document.querySelector('#closeButton');
const singleAdContainer = document.querySelector('#singleAdContainer');
=======
const formOfRegions = document.querySelector('#formOfRegions');
const formOfCommunes = document.querySelector('#formOfCommunes');
const listOfRegions = document.querySelector('#listOfRegions');
const listOfCommunes = document.querySelector('#listOfCommunes');
const doSearch = document.querySelector('#doSearch');
>>>>>>> inject-text-searchHTML

const apiCall = 'http://api.arbetsformedlingen.se/af/v0/';

const searchStrings = {
  initalSearchString: 'platsannonser/matchning?lanid=1&sida=1&antalrader=10'
};

// store data from fetch calls in variables
const fetchData = {
  tenLatestJobsInStockholm: [],
  totaltIStockholm: '',
  fromTextSearch: []
};

const callFetch = apiUrl => {
  return fetch(apiUrl).then(res => res.json());
};

// Injection of html with fetched data
const insertArticles = arr => {
  // empty mainContainer before HTML injection
  mainContainer.innerHTML = '';
  for (article of arr) {
    // html structure with data to inject
    let articleHtml = `
        <article id=${article.annonsid}>
           <h2>${article.annonsrubrik}</h2>
           <div class="ad-details-wrapper">
           <span class="job-title"><i class="fas fa-tag"></i>${
             article.yrkesbenamning
           }</span>
            <span class="work-place"><i class="fas fa-at"></i>${
              article.arbetsplatsnamn
            }</span>
            <span class="location"><i class="fas fa-map-marker-alt"></i>${
              article.kommunnamn
            }, ${article.lan}</span>
            </div>
           <button class="expand-job-ad"><i class="fas fa-plus-circle"></i>Öppna annons</button>
         </article>`;
    //  actual injection
    mainContainer.insertAdjacentHTML('beforeend', articleHtml);
  }
};

/*
  Append 10 latest jobs to variable and append total jobs in Stockholm to variable. 
  Push 10 latest array to HTML injection function
*/

const appendInitalDataToHtml = async () => {
  let returnFromFetchData = await callFetch(
    `${apiCall}${searchStrings.initalSearchString}`
  );

  fetchData.tenLatestJobsInStockholm =
    returnFromFetchData.matchningslista.matchningdata;

  fetchData.totaltIStockholm = returnFromFetchData.antal_platsannonser;

  insertArticles(fetchData.tenLatestJobsInStockholm);
};

// Call function
appendInitalDataToHtml();

<<<<<<< HEAD
let fritextSokning = function (event) {
  event.preventDefault();
=======
// append data from fetched array to html dropdown element choosen with id
appendItemToHtmlId = (listItemArr, whereToAppend) => {
  whereToAppend.innerHTML = '';
>>>>>>> inject-text-searchHTML

  // insert default option before genereating list
  whereToAppend.insertAdjacentHTML('beforeend', `<option>...</option>`);
  for (listItem of listItemArr) {
    let itemToAppend = `<option id="${listItem.id}" value="${listItem.namn}">${
      listItem.namn
    }</option>`;
    whereToAppend.insertAdjacentHTML('beforeend', itemToAppend);
  }
};

// let communeString = `${apiCall}platsannonser/soklista/kommuner`;

//   let communeListResult = await callFetch(communeString);
//   idHandler.workCategoryList = await workCategoryListResult.soklista.sokdata;
//   console.log(idHandler.workCategoryList);

//   let workQueryString = `${apiCall}platsannonser/soklista/yrkesomraden`;

//   let workCategoryListResult = await callFetch(workQueryString);
//   idHandler.workCategoryList = await workCategoryListResult.soklista.sokdata;
//   console.log(idHandler.workCategoryList);

//   await appendItemToHtmlId(idHandler.workCategoryList, listOfCommunes);

/** idHandler is an object that converts string
 *  inputs to unique id values that can be used in API queries.
 *  It also has two properties that are arrays with all lan and yrkesområden.
 *
 *  Usage:
 *          idHandler.getMe( 'string with län or yrkesområde name' ).id   -> returns id
 *                                                                  .namn -> returns full name
 *                                                                  .antal_ledigajobb - > returns antal_ledigajobb for the län or yrkesområde
 *                                                                  .antal_platsannonser - > returns platsannonser for the län or yrkesområde
 *
 *          idHandler.lanList -> An array of objects with all län and the above values.
 *          idHandler.yrkesomradeList - > An array of objects with all yrkesområden and the above values
 * */

let idHandler = {
  regionList: [], // List over available regions
  communeList: [], // List over communes in selected region
  regionId: '',
  communeId: ''
};

/** idHandler.init runs once when the script loads and
 * fetches the län and yrkesområden lists and stores it
 * to make conversions without repeating API calls.
 */

idHandler.init = async () => {
  // build query string for region fetch
  let regionQueryString = `${apiCall}arbetsformedling/soklista/lan`;
  //  fetch list of regions
  let regionListResult = await callFetch(regionQueryString);
  idHandler.regionList = regionListResult.soklista.sokdata;
  console.log(idHandler.regionList);

  await appendItemToHtmlId(idHandler.regionList, listOfRegions);
};

/** idHandler.getMe is a method that will loop through all län and yrkesområde
 * and return an object with the properties.
 *
 * id, namn, antal_platsannonser, antal_ledigajobb
 * for the first match for the given string.
 *
 * The string can be partial ie. 'Stockholm' will match 'Stockholms län'
 * but for yrkesområde it will return the object for the first partial match only.
 *
 */

idHandler.getListId = (stringValue, list) => {
  for (item of list) {
    if (item.namn.includes(stringValue)) {
      return item.id;
    }
  }
};

// idHandler.getRegionId = stringValue => {
//   for (commune of idHandler.communeList) {
//     if (region.namn.includes(stringValue)) {
//       return region.id;
//     }
//   }
// };

idHandler.init();

// EVENT LISTENERS

// Listen on free text search input
searchForm.addEventListener('submit', async e => {
  e.preventDefault();

  if (searchBox.value == '') {
    // (temporary solution) error message as alert. Change to div insertion with msg
    alert('Fyll i sökord');
  } else {
    let freeTextSearchString = `platsannonser/matchning?sida=1&antalrader=${
      numberOfResults.value
    }&nyckelord=${searchBox.value}`;

    let returnData = await callFetch(`${apiCall}${freeTextSearchString}`);

    fetchData.fromTextSearch = returnData.matchningslista.matchningdata;

    insertArticles(fetchData.fromTextSearch);
  }
});

<<<<<<< HEAD
mainContainer.addEventListener('click', function (e) {
=======
/*

if select value in region dropdown has a region name the regions id is saved to variable 
idHandler.regionId and is used to build query string to fetch the communes belonging to 
the region. After fetch of list of communes the communes are dynamically appended to the 
communes form below. The commune form and the search button is also set to display block 
in the end to show on screen.

*/

formOfRegions.addEventListener('submit', async e => {
  e.preventDefault();
  if (listOfRegions.value !== '...') {
    // fetch region id from array of regions
    idHandler.regionId = idHandler.getListId(
      listOfRegions.value,
      idHandler.regionList
    );

    // build commune querystring
    let communeString = `${apiCall}platsannonser/soklista/kommuner?lanid=${
      idHandler.regionId
    }`;

    let firstResult = await callFetch(communeString);
    communeListResult = firstResult.soklista.sokdata;

    idHandler.communeList = communeListResult;

    appendItemToHtmlId(idHandler.communeList, listOfCommunes);

    formOfCommunes.style.display = 'block';
    doSearch.style.display = 'block';
  }
});

/*

Listens on commune form and if commune is choosen the id of the specific commune is fetched
and stored in variable for building search string


*/

formOfCommunes.addEventListener('submit', e => {
  e.preventDefault();
  if (listOfCommunes.value !== '...') {
    idHandler.communeId = idHandler.getListId(
      listOfCommunes.value,
      idHandler.communeList
    );
  }
});

/*

Search button that take the stored id of region and commune and makes a query. If commune is left blank
search query is built only with region id. After query the fetched data is appended inside main. The variables
is then restored to default value in preparation for new search and search button and commune dropdwn is 
hidden again with display: none.

*/

doSearch.addEventListener('click', async e => {
  debugger;
  let customQueryString = `${apiCall}platsannonser/matchning?lanid=${
    idHandler.regionId
  }&sida=1&antalrader=${numberOfResults.value}`;

  let customQueryStringWithCommune = `${apiCall}platsannonser/matchning?lanid=${
    idHandler.regionId
  }&kommunid=${idHandler.communeId}&sida=1&antalrader=${numberOfResults.value}`;

  if (idHandler.communeId === '') {
    let regionCustomSearchResult = await callFetch(customQueryString);

    insertArticles(regionCustomSearchResult.matchningslista.matchningdata);
  } else {
    let regionAndCommuneCustomSearchResult = await callFetch(
      customQueryStringWithCommune
    );

    insertArticles(
      regionAndCommuneCustomSearchResult.matchningslista.matchningdata
    );
  }

  formOfCommunes.style.display = 'none';
  doSearch.style.display = 'none';

  idHandler.communeId = '';
  idHandler.regionId = '';
});

mainContainer.addEventListener('click', function(e) {
>>>>>>> inject-text-searchHTML
  // Add Event listener for clicks inside main container
  if (e.target.classList.contains('expand-job-ad')) {
    mainWrapper.classList.toggle('fadeout');
    singleAdContainer.classList.toggle('hidden');
    document.addEventListener('keyup', event => {
      // If Escape button key strokes...
      if (event.key === 'Escape' || event.keyCode === 27) {
        singleAdContainer.classList.add('hidden'); // ...close the expanded job ad
        mainWrapper.classList.remove('fadeout');
      }
    });
    closeButton.addEventListener('click', function (e) {
      e.preventDefault();
      singleAdContainer.classList.add('hidden'); // ...close the expanded job ad
      mainWrapper.classList.remove('fadeout');
    })
  }
});
<<<<<<< HEAD
/** idHandler is an object that converts string 
 *  inputs to unique id values that can be used in API queries.
 *  It also has two properties that are arrays with all lan and yrkesområden.
 * 
 *  Usage:
 *          idHandler.getMe( 'string with län or yrkesområde name' ).id   -> returns id
 *                                                                  .namn -> returns full name
 *                                                                  .antal_ledigajobb - > returns antal_ledigajobb for the län or yrkesområde
 *                                                                  .antal_platsannonser - > returns platsannonser for the län or yrkesområde
 * 
 *          idHandler.lanList -> An array of objects with all län and the above values.
 *          idHandler.yrkesomradeList - > An array of objects with all yrkesområden and the above values
 * */

let idHandler = {
  lanIds: {}, // Response object with län data - template "soklista"
  yrkesomradenIds: {}, // Response object with yrkesområden data - template "soklista"
};

/** idHandler.init runs once when the script loads and 
 * fetches the län and yrkesområden lists and stores it 
 * to make conversions without repeating API calls.
 */

idHandler.init = function () {

  let queryString = 'arbetsformedling/soklista/lan';

  fetch('http://api.arbetsformedlingen.se/af/v0/' + queryString)
    .then(response => {
      return response.json();
    })
    .then(response => {
      return idHandler.lanIds = response;
    })
    .then(response => {
      return idHandler.lanList = idHandler.lanIds.soklista.sokdata;
    })

  queryString = 'platsannonser/soklista/yrkesomraden';

  fetch('http://api.arbetsformedlingen.se/af/v0/' + queryString)
    .then(response => {
      return response.json();
    })
    .then(response => {
      return idHandler.yrkesomradenIds = response;
    })
    .then(response => {
      return idHandler.yrkesomradeList = idHandler.lanIds.soklista.sokdata;
    })
};

/** idHandler.getMe is a method that will loop through all län and yrkesområde 
 * and return an object with the properties.
 * 
 * id, namn, antal_platsannonser, antal_ledigajobb
 * for the first match for the given string.
 * 
 * The string can be partial ie. 'Stockholm' will match 'Stockholms län'
 * but for yrkesområde it will return the object for the first partial match only.
 * 
 */

idHandler.getMe = function (stringValue) {
  for (let category in idHandler) { // Loop through idHandler's object properties
    if (idHandler[category].soklista != undefined) { // Ignore any methods
      for (let arrItem of idHandler[category].soklista.sokdata) { // Search until a match is found
        if (arrItem.namn.toLowerCase().includes(stringValue.toLowerCase())) {
          return arrItem;
        }
      }
    }
  }
};

idHandler.init();

/** Function that returns an object with the details for a given anonsId.
 * Use "await getJobDetails(jobId)" (Otherwise it'll return an unresolved promise)
 * */

let getJobDetails = function (jobId) {

  return fetch(`${apiCall}platsannonser/${jobId}`)
    .then(response => {
      return response.json();
    })
    .then(response => {
      return response.platsannons;
    })

}
=======
>>>>>>> inject-text-searchHTML
