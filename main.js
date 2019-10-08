const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));
const progressText = document.getElementById("progressText");
const scoreText = document.getElementById("score");
const progressBarfull = document.getElementById("progressBarfull");


let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

let questions = [
    {
        question: "Inside which HTML element do we put the javascript",
        choice1: "<script>",
        choice2: "<javascript>",
        choice3: "<js>",
        choice4: "<scripting>",
        answer:1
    },
    {
        question: "what is 2*2?",
        choice1: "1",
        choice2: "22",
        choice3: "4",
        choice4: "four",
        answer:3

    },
    {
        question: "what is the square of 12?",
        choice1: "12.dotproduct.12",
        choice2: "14.4",
        choice3: "14four",
        choice4: "144",
        answer:4
    }
];
//constants
const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 3;

startGame = () => {
    questionCounter = 0;
    score = 0;
    availableQuestions = [... questions];
    getNewQuestion();
};

getNewQuestion = () => {

    if(availableQuestions.length ==0 || questionCounter > MAX_QUESTIONS){
        //go to the end page
        return window.location.assign("./end.html");
    }

    questionCounter++;
    //to update score and question counter constructs
    //"Question " + questionCounter + "/" + MAX_QUESTIONS  <--or
    progressText.innerText=`Question ${questionCounter}/${MAX_QUESTIONS}`;
    //to update the progress bar
    progressBarfull.style.width = `${(questionCounter/ MAX_QUESTIONS) * 100}%`;
    console.log((questionCounter / MAX_QUESTIONS) * 100);

    const questionIndex = Math.floor(Math.random()* availableQuestions.length );
    currentQuestion = availableQuestions[questionIndex];
    question.innerText = currentQuestion.question;

    choices.forEach( choice => {
        const number = choice.dataset['number'];
        choice.innerText = currentQuestion['choice' + number];
    });

    availableQuestions.splice(questionIndex, 1);
    acceptingAnswers = true;
};

choices.forEach(choice => {
    choice.addEventListener("click", e =>{
        if(!acceptingAnswers) return;

        acceptingAnswers = false;
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset['number'];


        const classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect';
        //console.log(classToApply);

        if(classToApply == 'correct') {
            incrementScore(CORRECT_BONUS);
        }

        selectedChoice.parentElement.classList.add(classToApply);

        setTimeout( () => {
            selectedChoice.parentElement.classList.remove(classToApply);
            getNewQuestion();
        }, 1000);
       // console.log(selectedAnswer == currentQuestion.answer);

    });
});

incrementScore = num => {
    score +=num;
    scoreText.innerText = score;
}

startGame();

   
