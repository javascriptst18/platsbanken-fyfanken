const baseURL = 'http://api.arbetsformedlingen.se/af/v0/';
const matchningURL = 'platsannonser/matchning?';
const searchBox = document.querySelector( '#searchBox' );
const searchSubmit = document.querySelector( '#searchSubmit' )
const numberOfResults = document.querySelector( '#numberOfResults' );

// Array med sökningsresultat. Innehåller 10 annonser från Stockholms län när sidan laddas första gången. Uppdateras med search box sökningen när man clickar "Search"
searchResultsArr = [];

let stockholmTen = function () {
  fetch( baseURL + matchningURL + 'lanid=1&sida=1&antalrader=10' )
    .then( response => {
      return response.json();
    } )
    .then( response => {
      return searchResultsArr = response.matchningslista.matchningdata;
    } );
}

let fritextSokning = function ( event ) {
  event.preventDefault();

  if ( searchBox.value == "" ) {
    return console.log( 'No search term entered' );
  }
  let parameterString = 'sida=1&antalrader=' + numberOfResults.value + '&nyckelord=' + searchBox.value;

  fetch( baseURL + matchningURL + parameterString )
    .then( response => {
      return response.json();
    } )
    .then( response => {
      console.log( response.matchningslista.matchningdata );
      return searchResultsArr = response.matchningslista.matchningdata;
    } );

}

searchSubmit.addEventListener( 'click', fritextSokning );
stockholmTen();