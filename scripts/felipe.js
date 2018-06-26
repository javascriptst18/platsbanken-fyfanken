const main = document.querySelector('main');

const insertArticles = arr => {
  for (article of arr) {
    let articleHtml = `
        <article id=${article.annonsid}>
           <h2>${article.annonsrubrik}</h2>
           <div class="snippets-job-ad">
            <p>${article.yrkesbenamning}</p>
            <p>Arbetsgivare: ${article.arbetsplatsnamn}</p>
            <p><a href=${article.annonsurl}>Gå till annons</a></p>

           </div>
           <button class="expand-job-ad">Mer info</button>
         </article>`;
    main.insertAdjacentHTML('beforeend', articleHtml);
  }
};
const appendArrToStockholm = async () => {
  let dataObj = await fetchStockholmsLan();
  totaltIStockholm = dataObj.antal_platsannonser;
  stockholm10 = await dataObj.matchningdata;
  insertArticles(stockholm10);
  //   let pushToDoc = await insertArticles(stockholm10);
  console.log(totaltIStockholm);
  return dataObj;
};

appendArrToStockholm();
