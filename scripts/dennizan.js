const baseURL = 'http://api.arbetsformedlingen.se/af/v0/';
const matchningURL = 'platsannonser/matchning?';

let parameterString = 'lanid=1&sida=1&antalrader=10';

fetch( baseURL + matchningURL + parameterString )
  .then( response => {
    return response.json();
  } )
  .then( response => {
    return response.matchningslista.matchningdata;
  } )