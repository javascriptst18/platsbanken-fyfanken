import '../scss/style.scss';

import { staticQueryStrings } from './static-query-strings';
import { htmlSelectors } from './html-selectors';
import { htmlTemplates } from './html-templates';
import { translations, translateWord } from './translations';
import { userOptions } from './user-options';
import { filterLists } from './filter-lists';
import { accessAPI, getFilterList, buildMatchingQueryString } from './app-functions';

let PlatsbankenApp = {
  userOptions,
  filterLists,
  staticQueryStrings,
  htmlSelectors,
  htmlTemplates,
  translations,
  translateWord,
  accessAPI,
  getFilterList,
  buildMatchingQueryString
};

PlatsbankenApp.getFilterList('region');
PlatsbankenApp.getFilterList('jobCategory');
PlatsbankenApp.getFilterList('counties','9');
PlatsbankenApp.translateWord('kommun');
console.log(PlatsbankenApp.buildMatchingQueryString());

console.log(PlatsbankenApp);


    // get regionId() {
    //     return `lanid=${PlatsbankenApp.convertId(this.lan) || ''}&`;

// const searchStrings = {
//   initalSearchString: 'platsannonser/matchning?lanid=1&sida=1&antalrader=10'
// };

// let scrollPosition = "";

// // store data from fetch calls in variables
// const fetchData = {
//   tenLatestJobsInStockholm: [],
//   totalAmountOfAdsInRegion: '',
//   fromTextSearch: []
// };

// const callFetch = apiUrl => {
//   return fetch(apiUrl).then(res => res.json());
// };

// // Format the date

// function formatDate(input) {
//   //Converts input from string to Date and then formats date as 'en-gb' (dd/mm/yyyy)
//   let formattedDate = new Date(input).toLocaleDateString('sv-se');
//   //Return the formatted date
//   return formattedDate;
// }

// // Injection of html with fetched data
// const insertArticles = arr => {
//   // empty mainContainer before HTML injection
//   mainContainer.innerHTML = '';
//   for (article of arr) {
//     let lastDayApply = formatDate(article.sista_ansokningsdag);
//     // html structure with data to inject
//     let articleHtml = `
//         <article id=${article.annonsid}>
//            <h2>${article.annonsrubrik}</h2>
//            <div class="ad-details-wrapper">
//            <span class="job-title"><i class="fas fa-tag"></i>${
//              article.yrkesbenamning
//            }</span>
//             <span class="work-place"><i class="fas fa-at"></i>${
//               article.arbetsplatsnamn
//             }</span>
//             <span class="location"><i class="fas fa-map-marker-alt"></i>${
//               article.kommunnamn
//             }, ${article.lan}</span>
//             <span class="latest-application-date"><i class="far fa-clock"></i>Ansök senast ${lastDayApply}</span>
//             </div>
//            <button class="expand-job-ad"><i class="fas fa-plus-circle"></i>Öppna annons</button>
//          </article>`;
//     //  actual injection
//     mainContainer.insertAdjacentHTML('beforeend', articleHtml);
//   }
// };

// /*
//   Append 10 latest jobs to variable and append total jobs in Stockholm to variable. 
//   Push 10 latest array to HTML injection function
// */

// const appendInitalDataToHtml = async () => {
//   let returnFromFetchData = await callFetch(
//     `${apiCall}${searchStrings.initalSearchString}`
//   );

//   fetchData.tenLatestJobsInStockholm =
//     returnFromFetchData.matchningslista.matchningdata;

//   fetchData.totalAmountOfAdsInRegion = returnFromFetchData.antal_platsannonser;

//   insertArticles(fetchData.tenLatestJobsInStockholm);
// };

// // Call function
// appendInitalDataToHtml();

// // append data from fetched array to html dropdown element choosen with id
// appendItemToHtmlId = (listItemArr, whereToAppend) => {
//   whereToAppend.innerHTML = '';

//   // insert default option before genereating list
//   whereToAppend.insertAdjacentHTML('beforeend', `<option>...</option>`);
//   for (listItem of listItemArr) {
//     let itemToAppend = `<option id="${listItem.id}" value="${listItem.namn}">${
//       listItem.namn
//     }</option>`;
//     whereToAppend.insertAdjacentHTML('beforeend', itemToAppend);
//   }
// };

// let idHandler = {
//   regionList: [], // List over available regions
//   communeList: [], // List over communes in selected region
//   workGroupResultList: [],
//   regionId: '',
//   communeId: '',
//   workCategoryId: ''
// };


// idHandler.init = async () => {
//   // build query string for region fetch
//   let regionQueryString = `${apiCall}arbetsformedling/soklista/lan`;
//   //  fetch list of regions
//   let regionListResult = await callFetch(regionQueryString);
//   idHandler.regionList = regionListResult.soklista.sokdata;
//   console.log(idHandler.regionList);

//   await appendItemToHtmlId(idHandler.regionList, listOfRegions);
// };

// idHandler.getListId = (stringValue, list) => {
//   for (item of list) {
//     if (item.namn.includes(stringValue)) {
//       return item.id;
//     }
//   }
// };

// idHandler.init();

// // EVENT LISTENERS

// // Listen on free text search input
// searchForm.addEventListener('submit', async e => {
//   e.preventDefault();

//   if (searchBox.value == '') {
//     // (temporary solution) error message as alert. Change to div insertion with msg
//     alert('Fyll i sökord');
//   } else {
//     let freeTextSearchString = `platsannonser/matchning?sida=1&antalrader=${
//       numberOfResults.value
//     }&nyckelord=${searchBox.value}`;

//     let returnData = await callFetch(`${apiCall}${freeTextSearchString}`);

//     fetchData.fromTextSearch = returnData.matchningslista.matchningdata;

//     insertArticles(fetchData.fromTextSearch);
//   }
// });

// /*

// if select value in region dropdown has a region name the regions id is saved to variable 
// idHandler.regionId and is used to build query string to fetch the communes belonging to 
// the region. After fetch of list of communes the communes are dynamically appended to the 
// communes form below. The commune form and the search button is also set to display block 
// in the end to show on screen.

// */

// formOfRegions.addEventListener('change', async e => {
//   e.preventDefault();
//   if (listOfRegions.value !== '...') {
//     // fetch region id from array of regions
//     idHandler.regionId = idHandler.getListId(
//       listOfRegions.value,
//       idHandler.regionList
//     );

//     // build commune querystring
//     let communeString = `${apiCall}platsannonser/soklista/kommuner?lanid=${
//       idHandler.regionId
//     }`;

//     let firstResult = await callFetch(communeString);
//     communeListResult = firstResult.soklista.sokdata;

//     idHandler.communeList = communeListResult;

//     appendItemToHtmlId(idHandler.communeList, listOfCommunes);

//     formOfCommunes.style.display = 'block';
//     doSearch.style.display = 'block';
//   }
// });

// /*

// Listens on commune form and if commune is choosen the id of the specific commune is fetched
// and stored in variable for building search string


// */

// formOfCommunes.addEventListener('change', async e => {
//   e.preventDefault();
//   if (listOfCommunes.value !== '...') {
//     idHandler.communeId = idHandler.getListId(
//       listOfCommunes.value,
//       idHandler.communeList
//     );

//     let workCategoryQueryString = `${apiCall}platsannonser/soklista/yrkesomraden`;

//     let workCategoryListResult = await callFetch(workCategoryQueryString);
//     idHandler.workCategoryList = await workCategoryListResult.soklista.sokdata;
//     console.log(idHandler.workCategoryList);

//     appendItemToHtmlId(idHandler.workCategoryList, listOfWorkCategory);
//     formOfWorkCategory.style.display = 'block';
//   }
// });

// /*

// On choice listener fetches workcategories and append searchresult to DOM

// */

// formOfWorkCategory.addEventListener('change', async e => {
//   e.preventDefault();
//   console.log(listOfWorkCategory.value);
//   if (listOfWorkCategory.value !== '...') {
//     idHandler.workCategoryId = idHandler.getListId(
//       listOfWorkCategory.value,
//       idHandler.workCategoryList
//     );
//     let workGroupQueryString = `${apiCall}platsannonser/soklista/yrkesgrupper?yrkesomradeid=1`;

//     let workGroupResult = await callFetch(workGroupQueryString);
//     idHandler.workGroupResultList = await workGroupResult.soklista.sokdata;

//     console.log(idHandler.workGroupResultList);
//   }
// });

// /*

// Search button that take the stored id of region and commune and makes a query. If commune is left blank
// search query is built only with region id. After query the fetched data is appended inside main. The variables
// is then restored to default value in preparation for new search and search button and commune dropdwn is 
// hidden again with display: none.

// */

// doSearch.addEventListener('click', async e => {
//   // Diffrent search queries based on selected chioce

//   let amountOfResult = `&sida=1&antalrader=${numberOfResults.value}`;
//   let customQueryString = `${apiCall}platsannonser/matchning?lanid=${
//     idHandler.regionId
//   }${amountOfResult}`;

//   let customQueryStringWithCommune = (customQueryString += `&kommunid=${
//     idHandler.communeId
//   }${amountOfResult}`);

//   let customQueryStringWithCommuneAndWorkcategory = (customQueryStringWithCommune += `&yrkesomradeid=${
//     idHandler.workCategoryId
//   }${amountOfResult}`);

//   let customQueryStringWithoutCommuneButWorkcategory = (customQueryString += `&yrkesomradeid=${
//     idHandler.workCategoryId
//   }${amountOfResult}`);

//   // Scenario building on selected choices

//   if (idHandler.communeId === '') {
//     let regionCustomSearchResult = await callFetch(customQueryString);

//     insertArticles(regionCustomSearchResult.matchningslista.matchningdata);
//   } else if (idHandler.workCategoryId === '') {
//     let regionAndCommuneCustomSearchResult = await callFetch(
//       customQueryStringWithCommune
//     );

//     insertArticles(
//       regionAndCommuneCustomSearchResult.matchningslista.matchningdata
//     );
//   } else if (idHandler.workCategoryId !== '' && idHandler.communeId === '') {
//     let regionAndWorkcategoryResult = await callFetch(
//       customQueryStringWithoutCommuneButWorkcategory
//     );

//     insertArticles(regionAndWorkcategoryResult.matchningslista.matchningdata);
//   } else {
//     regionCommuneAndWorkCustomSearchResult = await callFetch(
//       customQueryStringWithCommuneAndWorkcategory
//     );

//     insertArticles(
//       regionCommuneAndWorkCustomSearchResult.matchningslista.matchningdata
//     );
//   }

//   // reset fetched ids
//   idHandler.communeId = '';
//   idHandler.regionId = '';
//   idHandler.workCategoryId = '';
// });

// /** Function that returns an object with the details for a given anonsId.
//  * Use "await getJobDetails(jobId)" (Otherwise it'll return an unresolved promise)
//  * */

// const getJobDetails = async jobId => {
//   let queryString = `${apiCall}platsannonser/${jobId}`;
//   return await callFetch(queryString);
// };

// // Add Event listener for clicks inside main container
// mainContainer.addEventListener('click', async e => {
//   if (e.target.classList.contains('expand-job-ad')) { // if open ad button
//     const annonsID = e.target.parentElement.id; // get current ad id
//     let annonsContent = await getJobDetails(annonsID); // fetch the full ad
//     let annonsText = annonsContent.platsannons.annons.annonstext; // get the text for the ad
//     annonsText = '<p>' + annonsText.replace(/\n([ \t]*\n)+/g, '</p><p>') // make the text nice
//       .replace(/\n/g, '<br />') + '</p>';
//     let lastDayApply = formatDate(annonsContent.platsannons.ansokan.sista_ansokningsdag); // format the date for last application date
//     // create the full ad object
//     let annonsObject = `
//       <h2 class="single-rubrik">${
//         annonsContent.platsannons.annons.annonsrubrik
//       }</h2>
//       <div class="single-ad-left">
//     <p>${annonsText}</p>
//     <a class="apply-link" href="${
//       annonsContent.platsannons.ansokan.webbplats
//     }" target="_blank">Ansök nu</a>
//     </div>
//     <div class="single-ad-right">
//     ${
//       annonsContent.platsannons.arbetsplats.logotypurl === undefined
//         ? ''
//         : '<img src="' + annonsContent.platsannons.arbetsplats.logotypurl + '">'
//     }
//     <span class="job-title"><i class="fas fa-tag"></i>${
//       annonsContent.platsannons.annons.yrkesbenamning
//     }</span>
//      <span class="work-place"><i class="fas fa-at"></i>${
//        annonsContent.platsannons.arbetsplats.arbetsplatsnamn
//      }</span>
//      <span class="location"><i class="fas fa-map-marker-alt"></i>${
//        annonsContent.platsannons.annons.kommunnamn
//      }</span>
//      <span class="latest-application-date"><i class="far fa-clock"></i>Ansök senast ${lastDayApply}</span>
//   <a class="apply-link" href="${
//     annonsContent.platsannons.ansokan.webbplats
//   }" target="_blank">Ansök nu</a>
//      </div>
//     </div>
//     `;
//     singleAdContainerInner.dataset.annonsid = annonsID; // set the data id of the ad
//     singleAdContainerInnerContent.innerHTML = ''; // make sure the full ad container is empty
//     scrollPosition = window.pageYOffset; // store the scroll position for when we close the full ad (to be able to get back to same location)
//     singleAdContainerInnerContent.insertAdjacentHTML('beforeend', annonsObject); // insert the full ad
//     window.scrollTo(0, 0); // scroll to top
//     mainWrapper.classList.toggle('fadeout'); // fade out the main content with css animation
//     singleAdContainer.classList.toggle('hidden'); // show and slide the main ad container with css animation
//     document.addEventListener('keyup', event => { // add event listner for escape clicks for closing the ad
//       // If Escape button key strokes...
//       if (event.key === 'Escape' || event.keyCode === 27) {
//         singleAdContainer.classList.add('hidden'); // ...close the expanded job ad
//         mainWrapper.classList.remove('fadeout'); // fade in the content again
//         setTimeout(function () { // delay the execution of the following events
//           singleAdContainerInnerContent.innerHTML = ''; // remove the ad content to restore the original scroll length
//           window.scrollTo({ // Scroll back
//             top: scrollPosition,
//             behavior: 'smooth'
//           });
//         }, 200);
//       }
//     });
//     closeButton.addEventListener('click', function (e) { // add listener for clicks on the close button 
//       e.preventDefault();
//       singleAdContainer.classList.add('hidden'); // Hide the expanded job ad
//       mainWrapper.classList.remove('fadeout'); // Fade in the main content
//       setTimeout(function () {
//         singleAdContainerInnerContent.innerHTML = ''; // Empty the ad content
//         window.scrollTo({ // Scroll back
//           top: scrollPosition,
//           behavior: 'smooth'
//         });
//       }, 200);
//     });
//   }
// });