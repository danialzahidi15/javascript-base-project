const navToggle = document.querySelector('.nav-toggle');
const links = document.querySelector('.links');

navToggle.addEventListener('click', () => {
    // console.log(links.classList.contains('random'));
    // console.log(links.classList.contains('links'));

    // if(links.classList.contains('hidden')) {
    //     links.classList.remove('hidden');
    // } else {
    //     links.classList.add('hidden');
    // }

    links.classList.toggle('hidden');
});
