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

let idHandler = {
  queryStrings: {
    initial: [
      'arbetsformedling/soklista/lan',
      'platsannonser/soklista/yrkesomraden'
    ],
    kommuner: 'platsannonser/soklista/kommuner?lanid=',
    yrkesgrupper: 'platsannonser/soklista/yrkesgrupper?yrkesomradeid=',
    baseURL: 'http://api.arbetsformedlingen.se/af/v0/'
  }
};

idHandler.init = function () {

  for (let qString of idHandler.queryStrings.initial) {
    fetch(idHandler.queryStrings.baseURL + qString)
      .then(response => {
        return response.json();
      })
      .then(response => {
        this[response.soklista.listnamn + 'List'] = response.soklista.sokdata;
        return
      })
      .then(res => idHandler.getMe("kommuner", "lanList"))
      .then(res => idHandler.getMe("yrkesgrupper", "yrkesomradenList"))
  }
}

idHandler.getMe = function (requestGroup, requestTarget) {
  let qString = idHandler.queryStrings[requestGroup];
  for (let item of idHandler[requestTarget]) {
    fetch(idHandler.queryStrings.baseURL + qString + item.id)
      .then(response => {
        return response.json()
      })
      .then(response => {
        item[response.soklista.listnamn + 'List'] = response.soklista.sokdata;
        return
      })
  }
}

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