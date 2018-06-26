const baseURL = 'http://api.arbetsformedlingen.se/af/v0/';
const matchningURL = 'platsannonser/matchning?';
let stockholm10 = [];
const searchBox = document.querySelector('#searchBox');
const searchSubmit = document.querySelector('#searchSubmit');
const tenLatestArticles = 'lanid=1&sida=1&antalrader=10';
const numberOfResults = 20; // document.querySelector( '#numberOfResults' );

// Array med sökningsresultat. Innehåller 10 annonser från Stockholms län när sidan laddas första gången. Uppdateras med search box sökningen när man clickar "Search"
searchResultsArr = [];

const fetchStockholmsLan = async (url, matchUrl, parameters) => {
  const rawResponse = await fetch(url + matchUrl + parameters);
  const responseToJson = await rawResponse.json();

  return responseToJson.matchningslista;
};

fetchStockholmsLan(baseURL, matchningURL, tenLatestArticles);

let fritextSokning = function (event) {
  event.preventDefault();

  if (searchBox.value == '') {
    return console.log('No search term entered');
  }
  let parameterString =
    'sida=1&antalrader=' + numberOfResults + '&nyckelord=' + searchBox.value;

  fetchStockholmsLan(baseURL, matchningURL, parameterString);
};

searchSubmit.addEventListener('click', fritextSokning());
console.log(searchResultsArr);