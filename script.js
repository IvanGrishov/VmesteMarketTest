const DATA = [
    {
        question: "Какой тег нужно добавить для переноса строки, сохранив при этом валидность XHTML 1.1?",
        answers: [
            {
                id: '1',
                value: '<xmp class="codetext"><br /></xmp>',
                correct: true,
            },
            {
                id: '2',
                value: '<xmp class="codetext"><hr></xmp>',
                correct: false,
            },
            {
                id: '3',
                value: '<xmp class="codetext"><hr /></xmp>',
                correct: false,
            },
            {
                id: '4',
                value: '<xmp class="codetext"><br></xmp>',
                correct: false,
            }
        ]
    },
    {
        question: "Какая ошибка в следующем коде: <xmp class='codetext codetext-link'><a href='page.html'><b><i>Страница 1</i></a></xmp>",
        answers: [
            {
                id: '5',
                value: 'Внутри тега <a> не может быть тег <xmp class="codetext"><b></xmp> и/или тег <xmp class="codetext"><i></xmp>.',
                correct: false,
            },
            {
                id: '6',
                value: 'Не указан обязательный атрибут title у тега <xmp class="codetext"><a></xmp> .',
                correct: false,
            },
            {
                id: '7',
                value: 'Не указан обязательный атрибут alt у тега <xmp class="codetext"><a></xmp>.',
                correct: false,
            },
            {
                id: '8',
                value: 'Не закрыт тег <xmp class="codetext"><b></xmp>',
                correct: true,
            }
        ]
    },
    {
        question: "Александру требуется написать химическую формулу тетрасульфида димышьяка (As<sub>2</sub>S<sub>4</sub>). Каким образом это можно сделать?",
        answers: [
            {
                id: '9',
                value: '<xmp class="codetext">As<sup>2</sup>S<sup>4</sup></xmp>',
                correct: false,
            },
            {
                id: '10',
                value: '<xmp class="codetext">As<pow>2</pow>S<pow>4</pow></xmp>',
                correct: false,
            },
            {
                id: '11',
                value: '<xmp class="codetext">As<sub>2</sub>S<sub>4</sub></xmp>',
                correct: true,
            },
            {
                id: '12',
                value: '<xmp class="codetext">As<sup>2S<sup>4</xmp>',
                correct: false,
            }
        ]
    }
];

let localResults = {};

const quiz = document.getElementById('quiz');
const questions = document.getElementById('questions');
const indicator = document.getElementById('indicator');
const result = document.getElementById('result');
const btnNext = document.getElementById('btn-next');
const btnRestart = document.getElementById('btn-restart');



const renderQuestions = (index) => {
    renderIndicator(index + 1);

    questions.dataset.currentStep = index;

    const renderAnswers = () => DATA[index].answers
        .map((answer) => `
            <li>
                <label>
                    <input class="answer-input" type="radio" name=${index} value=${answer.id}>
                    ${answer.value}
                </label>
            </li>
        `)
        .join('');

    questions.innerHTML = `
        <div class="quiz-questions-item">
            <div class="quiz-questions-item__question">${DATA[index].question}</div>
            <ul class="quiz-questions-item__answers">${renderAnswers()}</ul>
        </div>
    `;
};

const renderResults = () => {
    let content = '';
    let score = 0;

    const getScore = (answer, questionIndex) => {
        if (answer.correct && answer.id === localResults[questionIndex]) {
            score++;
        } 
        return score;
    }

    const getAnswers = (questionIndex) => DATA[questionIndex].answers
        .map((answer) => getScore(answer, questionIndex))
        .join('');

    DATA.forEach((question, index) => {
        getAnswers(index)
        content = `
            <div class="quiz-results-item">
                <div class="quiz-results-item__score">Ваши баллы: <span class="quiz-results-item__quantity">${score}</span></div>
            </div>  
        `;
    });

    result.innerHTML = content;
};

const renderIndicator = (currentStep) => {
    indicator.innerHTML = `${currentStep}/${DATA.length}`;
};

quiz.addEventListener('change', (event) => {
    if (event.target.classList.contains('answer-input')) {
        localResults[event.target.name] = event.target.value;
        btnNext.disabled = false;
    }
})
quiz.addEventListener('click', (event) => {
    //вперед или сначала
    if (event.target.classList.contains('btn-next')) {
        const nextQuestionIndex = +questions.dataset.currentStep + 1;
        

        if (DATA.length === nextQuestionIndex) {
            questions.classList.add('questions--hidden');
            indicator.classList.add('indicator--hidden');
            result.classList.add('indicator--visible');
            btnNext.classList.add('btn-next--hidden');
            btnRestart.classList.add('btn-restart--visible');
            renderResults();
        } else {
            renderQuestions(nextQuestionIndex);
        }

        btnNext.disabled = true;
    }
    if (event.target.classList.contains('btn-restart')) {
        localResults = {};
        result.innerHTML = '';

        questions.classList.remove('questions--hidden');
        indicator.classList.remove('indicator--hidden');
        result.classList.remove('indicator--visible');
        btnNext.classList.remove('btn-next--hidden');
        btnRestart.classList.remove('btn-restart--visible');

        renderQuestions(0);
    }
})

renderQuestions(0);



const homeScreen = document.querySelector('.home-screen');

homeScreen.addEventListener('click', function(event) {
    if (event.target.classList.contains('home-screen__button')) {
        homeScreen.classList.add('fade-screen');
        quiz.classList.remove('fade-screen');
    }
})