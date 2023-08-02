// using selectors inside the element

const questions = document.querySelectorAll('.question');

questions.forEach((quest) => {
    // console.log(quest);

    const btn = quest.querySelector('.question-btn');
    // console.log(btn);
    btn.addEventListener('click', () => {
        questions.forEach((item) => {
            if(item !== quest) {
                item.classList.remove('show-text');
            }
        })
        quest.classList.toggle('show-text');
    })
})

// traversing the dom

// const questBtn = document.querySelectorAll('.question-btn');

// questBtn.forEach((btn) => {
//     btn.addEventListener('click', (e) => {
//         // console.log(e.currentTarget.parentElement.parentElement);

//         const question = e.currentTarget.parentElement.parentElement;
//         question.classList.toggle('show-text');
//     })
// })