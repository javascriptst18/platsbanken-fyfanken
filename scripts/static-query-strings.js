/**
 *
 *  Static portions of search query
 *  strings for the arbetsförmedlingen
 *  API
 *
 */

export default {
  baseURL: 'http://api.arbetsformedlingen.se/af/v0/',
  region: 'arbetsformedling/soklista/lan',
  jobCategory: 'platsannonser/soklista/yrkesomraden',
  counties: 'platsannonser/soklista/kommuner?lanid=',
  jobGroups: 'platsannonser/soklista/yrkesgrupper?yrkesomradeid=',
  matching: 'platsannonser/matchning?',
};
