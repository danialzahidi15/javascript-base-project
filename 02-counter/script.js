let count = 0;

const value = document.querySelector('#value');
const btns = document.querySelectorAll('.btn');

btns.forEach((btn) => {
    btn.addEventListener('click', (e) => {
        // console.log(e.currentTarget.classList);
        const step = e.currentTarget.classList;

        if(step.contains('decrease')) {
            count--;
        } else if(step.contains('increase')) {
            count++;
        } else {
            count = 0;
        }

        if(count > 0) {
            value.style.color = 'green';
        } else if(count < 0) {
            value.style.color = 'red';
        } else if (count === 0) {
            value.style.color = 'black';
        }

        value.textContent = count;
    });
});