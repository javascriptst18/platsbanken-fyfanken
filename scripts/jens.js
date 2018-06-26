const mainContainer = document.querySelector('main');

mainContainer.addEventListener('click', function (e) {
    if (e.target.id === 'expandJobAd') {
        let articleNodes = document.querySelectorAll('article');
        for (let article of articleNodes) {
            article.classList.remove('expanded');
        }
        e.target.parentElement.classList.add('expanded');
    }
})