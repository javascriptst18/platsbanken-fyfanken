const baseURL = 'http://api.arbetsformedlingen.se/af/v0/';
const matchningURL = 'platsannonser/matchning?';
const searchBox = document.querySelector( '#searchBox' );
const searchSubmit = document.querySelector( '#searchSubmit' )
const numberOfResults = 20; // document.querySelector( '#numberOfResults' );

arr = [];

let fritextSokning = function ( event ) {
  event.preventDefault();

  if ( searchBox.value == "" ) {
    return console.log( 'No search term entered' );
  }
  let parameterString = 'sida=1&antalrader=' + numberOfResults + '&nyckelord=' + searchBox.value;

  fetch( baseURL + matchningURL + parameterString )
    .then( response => {
      return response.json();
    } )
    .then( response => {
      return arr = response.matchningslista.matchningdata;
    } );

}

searchSubmit.addEventListener( 'click', fritextSokning );