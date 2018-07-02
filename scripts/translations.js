export let translations = {
  lan: 'region',
  kommun: 'county',
  kommuner: 'counties',
  yrkesomrade: 'jobCategory',
  yrkesomraden: 'jobCategories',
  yrkesgrupp: 'jobGroup',
  yerkesgrupper: 'jobGroups',
  nyckelord: 'keywords',
  antalrader: 'resultsPerPage',
  sida: 'currentPage'
}

export let translateWord = function (inputWord) {
  for (let word in this.translations) {
    if (inputWord == word) {
      return this.translations[word];
    } else 
    if (inputWord == this.translations[word]) {
      return word;
    }
  }
  return console.log('Translation failed.')
}