const baseURL = 'http://api.arbetsformedlingen.se/af/v0/';
const matchningURL = 'platsannonser/matchning?';
const searchBox = document.querySelector( '#searchBox' );
const numberOfResults = 20; // document.querySelector( '#numberOfResults' );

arr = [];

let fritextSokning = function ( searchQuery ) {

  let parameterString = 'sida=1&antalrader=' + numberOfResults + '&nyckelord=' + searchQuery;

  fetch( baseURL + matchningURL + parameterString )
    .then( response => {
      return response.json();
    } )
    .then( response => {
      return arr = response.matchningslista.matchningdata;
    } );

}