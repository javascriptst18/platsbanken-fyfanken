const searchBox = document.querySelector('#searchBox');
const searchForm = document.querySelector('#searchForm');
const numberOfResults = document.querySelector('#numberOfResults');
// Pick the main container in the DOM
const mainContainer = document.querySelector('main');
const mainWrapper = document.querySelector('#mainWrapper');
const closeButton = document.querySelector('#closeButton');
const singleAdContainer = document.querySelector('#singleAdContainer');

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

let fritextSokning = function (event) {
  event.preventDefault();

  if (searchBox.value == '') {
    return console.log('Fyll i sökord');
  }
  let freeTextSearchString = `platsannonser/matchning?sida=1&antalrader=${
    numberOfResults.value
  }&nyckelord=${searchBox.value}`;

  let returnData = callFetch(`${apiCall}${freeTextSearchString}`)
    .matchningslista.matchningdata;
};

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

mainContainer.addEventListener('click', function (e) {
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