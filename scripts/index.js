async function searchByCriteria(searchCriteria) {
  const baseURL = 'http://api.arbetsformedlingen.se/af/v0/';
  const responseObject = await fetch(baseURL + searchCriteria);
  const matches = await responseObject.json();
  console.log(matches);
}

searchByCriteria('platsannonser/matchning?lanid=1&yrkesomradeid=3&antalrader=30');
