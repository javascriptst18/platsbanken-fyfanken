const baseURL = 'http://api.arbetsformedlingen.se/af/v0/';
const matchningURL = 'platsannonser/matchning?';
const searchBox = document.querySelector('#searchBox');
const searchSubmit = document.querySelector('#searchSubmit');
const numberOfResults = document.querySelector('#numberOfResults');

// Pick the main container in the DOM
const mainContainer = document.querySelector('main');

// Array med sökningsresultat. Innehåller 10 annonser från Stockholms län när sidan laddas första gången. Uppdateras med search box sökningen när man clickar "Search"
searchResultsArr = [];

let stockholmTen = function () {
  return fetch(baseURL + matchningURL + 'lanid=1&sida=1&antalrader=10')
    .then(response => {
      return response.json();
    })
    .then(response => {
      return response.matchningslista;
    });
};

let fritextSokning = function (event) {
  event.preventDefault();

  if (searchBox.value == '') {
    return console.log('No search term entered');
  }
  let parameterString =
    'sida=1&antalrader=' + numberOfResults.value + '&nyckelord=' + searchBox.value;

  fetch(baseURL + matchningURL + parameterString)
    .then(response => {
      return response.json();
    })
    .then(response => {
      console.log(response.matchningslista.matchningdata);
      return (searchResultsArr = response.matchningslista.matchningdata);
    });
};

searchSubmit.addEventListener('click', fritextSokning);
stockholmTen();

const insertArticles = arr => {
  for (article of arr) {
    let articleHtml = `
        <article id=${article.annonsid}>
          <span class="job-title"><i class="fas fa-tag"></i>${article.yrkesbenamning}</span>
           <h2>${article.annonsrubrik}</h2>
            <span class="work-place"><i class="fas fa-building"></i>${article.arbetsplatsnamn}</span>
            <span class="location"><i class="fas fa-map-marker-alt"></i>${article.kommunnamn}, ${article.lan}</span>
            <p><a href=${article.annonsurl}>Gå till annons</a></p>
           <button class="expand-job-ad">Mer info</button>
         </article>`;
    mainContainer.insertAdjacentHTML('beforeend', articleHtml);
  }
};
const appendArrToStockholm = async () => {
  let dataObj = await stockholmTen();
  totaltIStockholm = dataObj.antal_platsannonser;
  stockholm10 = await dataObj.matchningdata;
  insertArticles(stockholm10);
  //   let pushToDoc = await insertArticles(stockholm10);
  console.log(totaltIStockholm);
  return dataObj;
};

appendArrToStockholm();

mainContainer.addEventListener('click', function (e) { // Add Event listener for clicks inside main container
  if (e.target.classList.contains('expand-job-ad')) { // if expanded job ad...
    let articleNodes = document.querySelectorAll('article');
    for (let article of articleNodes) {
      article.classList.remove('expanded'); // ...remove class expanded on all other jobs
    }
    e.target.parentElement.classList.add('expanded'); // add expanded class on the clicked element parent
    let jobAdTarget = e.target.parentElement;
    document.addEventListener('click', function (e) { // if click outside expanded element...
      if (!e.target.closest('.expanded')) {
        jobAdTarget.classList.remove('expanded'); // ...close the expanded element
      }
    });
    document.addEventListener('keyup', event => { // If Escape button key strokes...
      if (event.key === 'Escape' || event.keyCode === 27) {
        jobAdTarget.classList.remove('expanded'); // ...close the expanded job ad
      }
    });
    e.target.parentElement.scrollIntoView(); // scroll to the opened job ad element
  }
});