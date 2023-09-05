const btn = document.querySelectorAll('.tab-btn');
const about = document.querySelector('.about');
const articles = document.querySelectorAll('.content');

about.addEventListener('click', (e) => {
    const tabs = e.target.dataset.names;
    if(tabs) {
        btn.forEach((button) => {
            button.classList.remove('active');
            e.target.classList.add('active');
        })

        articles.forEach((article) => {
            article.classList.remove('active');
        })
        const element = document.getElementById(tabs);
        element.classList.add('active');   
    }
});