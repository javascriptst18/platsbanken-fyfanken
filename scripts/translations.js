/**
 *
 * Translations of terms used by the API and a translator
 * function to make the code easier to read
 *
 */

export const translations = {
  lan: 'region',
  kommun: 'county',
  kommuner: 'counties',
  yrkesomrade: 'jobCategory',
  yrkesomraden: 'jobCategories',
  yrkesgrupp: 'jobGroup',
  yerkesgrupper: 'jobGroups',
  nyckelord: 'keywords',
  antalrader: 'resultsPerPage',
  sida: 'currentPage',
};

export function translate(inputWord) {
  for (const word in this.translations) {
    if (inputWord == word) {
      return this.translations[word];
    } if (inputWord == this.translations[word]) {
      return word;
    }
  }
  return console.log('Translation failed.');
}
