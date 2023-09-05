const colors = ["green", "red", "rgb(133,122,200)","rgba(190,211,134, 0.4)", "#f15025"];

const btn = document.getElementById('btn');
const color = document.querySelector('.color');

btn.addEventListener('click', () => {
    const randomNumber = getRandomNumber();

    document.body.style.backgroundColor = colors[randomNumber];
    color.textContent = colors[randomNumber]
})

const getRandomNumber = () => {
    return Math.floor(Math.random() * colors.length);
}