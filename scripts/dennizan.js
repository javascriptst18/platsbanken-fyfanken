const baseURL = 'http://api.arbetsformedlingen.se/af/v0/';
const matchningURL = 'platsannonser/matchning?';
let stockholm10 = [];

let parameterString = 'lanid=1&sida=1&antalrader=11';

const fetchStockholmsLan = async () => {
  const rawResponse = await fetch(
    `${baseURL}${matchningURL}${parameterString}`
  );
  const responseToJson = await rawResponse.json();

  return responseToJson.matchningslista;
};
