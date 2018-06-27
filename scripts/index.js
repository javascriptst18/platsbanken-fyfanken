const searchBox = document.querySelector('#searchBox');
const searchForm = document.querySelector('#searchForm');
const numberOfResults = document.querySelector('#numberOfResults');
// Pick the main container in the DOM
const mainContainer = document.querySelector('main');

const apiCall = 'http://api.arbetsformedlingen.se/af/v0/';

const searchStrings = {
  initalSearchString: 'platsannonser/matchning?lanid=1&sida=1&antalrader=10'
};

// store data from fetch calls in variables
const fetchData = {
  tenLatestJobsInStockholm: [],
  totaltIStockholm: '',
  fetchFromTextSearch: []
};

const callFetch = apiUrl => {
  return fetch(apiUrl).then(res => res.json());
};

// Insertion of html with initally fetched data
const insert10FirstArticles = arr => {
  for (article of arr) {
    let articleHtml = `
        <article id=${article.annonsid}>
          <span class="job-title"><i class="fas fa-tag"></i>${
            article.yrkesbenamning
          }</span>
           <h2>${article.annonsrubrik}</h2>
            <span class="work-place"><i class="fas fa-building"></i>${
              article.arbetsplatsnamn
            }</span>
            <span class="location"><i class="fas fa-map-marker-alt"></i>${
              article.kommunnamn
            }, ${article.lan}</span>
            <p><a href=${article.annonsurl}>Gå till annons</a></p>
           <button class="expand-job-ad">Mer info</button>
         </article>`;
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

  insert10FirstArticles(fetchData.tenLatestJobsInStockholm);
};

appendInitalDataToHtml();

let fritextSokning = function(event) {
  event.preventDefault();

  if (searchBox.value == '') {
    return console.log('Fyll i sökord');
  }
  let freeTextSearchString = `platsannonser/matchning?sida=1&antalrader=${
    numberOfResults.value
  }&nyckelord=${searchBox.value}`;

  let returnData = callFetch(`${apiCall}${freeTextSearchString}`)
    .matchningslista.matchningdata;

  console.log(returnData);
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

    console.log(freeTextSearchString);

    let returnData = await callFetch(`${apiCall}${freeTextSearchString}`);

    console.log(returnData.matchningslista.matchningdata);
  }
});
// stockholmTen();

mainContainer.addEventListener('click', function(e) {
  // Add Event listener for clicks inside main container
  if (e.target.classList.contains('expand-job-ad')) {
    // if expanded job ad...
    let articleNodes = document.querySelectorAll('article');
    for (let article of articleNodes) {
      article.classList.remove('expanded'); // ...remove class expanded on all other jobs
    }
    e.target.parentElement.classList.add('expanded'); // add expanded class on the clicked element parent
    let jobAdTarget = e.target.parentElement;
    document.addEventListener('click', function(e) {
      // if click outside expanded element...
      if (!e.target.closest('.expanded')) {
        jobAdTarget.classList.remove('expanded'); // ...close the expanded element
      }
    });
    document.addEventListener('keyup', event => {
      // If Escape button key strokes...
      if (event.key === 'Escape' || event.keyCode === 27) {
        jobAdTarget.classList.remove('expanded'); // ...close the expanded job ad
      }
    });
    e.target.parentElement.scrollIntoView(); // scroll to the opened job ad element
  }
});

/** idHandler is an object that converts string inputs to unique id values that can be used in API queries
 *  Usage:
 *      idHandler.getMe( 'string with län or yrkesområde name' ).id   -> returns id
 *                                                              .namn -> returns full name
 *                                                              .antal_ledigajobb - > returns antal_ledigajobb for the län or yrkesområde
 *                                                              .antal_platsannonser - > returns platsannonser for the län or yrkesområde
 * */

let idHandler = {
  lanIds: {}, // Response object with län data - template "soklista"
  yrkesomradenIds: {} // Response object with yrkesområden data - template "soklista"
};

/** idHandler.init runs once when the script loads and
 * fetches the län and yrkesområden lists and stores it
 * to make conversions without repeating API calls.
 */
idHandler.init = function() {
  let queryString = 'arbetsformedling/soklista/lan';

  fetch('http://api.arbetsformedlingen.se/af/v0/' + queryString)
    .then(response => {
      return response.json();
    })
    .then(response => {
      return (idHandler.lanIds = response);
    });

  queryString = 'platsannonser/soklista/yrkesomraden';

  fetch('http://api.arbetsformedlingen.se/af/v0/' + queryString)
    .then(response => {
      return response.json();
    })
    .then(response => {
      return (idHandler.yrkesomradenIds = response);
    });
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

idHandler.getMe = function(stringValue) {
  for (let category in idHandler) {
    if (idHandler[category].soklista != undefined) {
      for (let arrItem of idHandler[category].soklista.sokdata) {
        if (arrItem.namn.toLowerCase().includes(stringValue.toLowerCase())) {
          return arrItem;
        }
      }
    }
  }
};

idHandler.init();
