const apiCall = 'http://api.arbetsformedlingen.se/af/v0/';

const searchStrings = {
  initalSearchString: 'platsannonser/matchning?lanid=1&sida=1&antalrader=10'
};

// const returnFromFetchData = {
//   initalFetchData:
// }

const initalFetchData = {
  tenLatestJobsInStockholm: [],
  totaltIStockholm: ''
};

const searchBox = document.querySelector('#searchBox');
const searchForm = document.querySelector('#searchForm');
const numberOfResults = document.querySelector('#numberOfResults');
// Pick the main container in the DOM
const mainContainer = document.querySelector('main');

// Array med sökningsresultat. Innehåller 10 annonser från Stockholms län när sidan laddas första gången. Uppdateras med search box sökningen när man clickar "Search"
searchResultsArr = [];

const callFetch = apiUrl => {
  return fetch(apiUrl).then(res => res.json());
};

// Insertion of html with initally fetched data
const insertArticles = arr => {
  for (article of arr) {
    let articleHtml = `
        <article id=${article.annonsid}>
           <h2>${article.annonsrubrik}</h2>
           <div class="snippets-job-ad">
            <p>${article.yrkesbenamning}</p>
            <p>Arbetsgivare: ${article.arbetsplatsnamn}</p>
            <p><a href=${article.annonsurl}>Gå till annons</a></p>

           </div>
           <button class="expand-job-ad">Mer info</button>
         </article>`;
    mainContainer.insertAdjacentHTML('beforeend', articleHtml);
  }
};

// Append 10 latest jobs to variable and append total jobs in Stockholm to variable. Push 10 latest array to HTML injection function
const appendInitalDataToHtml = async () => {
  let returnFromFetchData = await callFetch(
    `${apiCall}${searchStrings.initalSearchString}`
  );

  initalFetchData.tenLatestJobsInStockholm =
    returnFromFetchData.matchningslista.matchningdata;

  initalFetchData.totaltIStockholm = returnFromFetchData.antal_platsannonser;

  insertArticles(initalFetchData.tenLatestJobsInStockholm);
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
    return console.log('Fyll i sökord');
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
