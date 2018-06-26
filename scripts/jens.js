const mainContainer = document.querySelector('main');

mainContainer.addEventListener('click', function (e) {
    if (e.target.classList.contains('expand-job-ad')) {
        let articleNodes = document.querySelectorAll('article');
        for (let article of articleNodes) {
            article.classList.remove('expanded');
        }
        e.target.parentElement.classList.add('expanded');
        let jobAdTarget = e.target.parentElement;
        document.addEventListener('click', function (e) {
            if (!e.target.closest('.expanded')) {
                jobAdTarget.classList.remove('expanded');
            }
        });
        document.addEventListener('keyup', event => {
            if (event.key === 'Escape' || event.keyCode === 27) {
                jobAdTarget.classList.remove('expanded');
            }
        });
        e.target.parentElement.scrollIntoView();
    }
})