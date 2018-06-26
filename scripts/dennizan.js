const baseURL = 'http://api.arbetsformedlingen.se/af/v0/';
const matchningURL = 'platsannonser/matchning?';

arr = [];

let parameterString = 'lanid=1&sida=1&antalrader=11';

fetch(baseURL + matchningURL + parameterString)
  .then(response => {
    return response.json();
  })
  .then(response => {
    arr = response.matchningslista.matchningdata;
  });
