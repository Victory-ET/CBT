//creating our const variables
const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));
const progressText = document.getElementById("progressText");
const scoreText = document.getElementById("score");
const progressBarfull = document.getElementById("progressBarfull");
const loader = document.getElementById("loader");
const game = document.getElementById("game");
const h1 = document.querySelectorAll("h1");
const p = document.querySelectorAll("p");
const a = document.querySelectorAll("a");

//for new body and text color
var newbod, newcol;
var text;

let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];
//question arrays


let questions = [];
//we will try to fetch it from a database online later
//questions transferred to json file
//using fetch api to fetch the questions
//.then are special stuffs do what they look like
//changing the  fetch from questions.json to a online database
//opentdb.com
//it takes time for questions to load so we will create a loader to cover that up
fetch('https://opentdb.com/api.php?amount=10&category=18&type=multiple')
.then(res =>{
    console.log(res);
    return res.json();
}).then (loadedQuestions =>{
   questions = loadedQuestions.results.map( loadedQuestion => {
        const formattedQuestion ={
            question: loadedQuestion.question
        };

        const answerChoices =[...loadedQuestion.incorrect_answers];
        formattedQuestion.answer =Math.floor(Math.random()*3)+1;
        answerChoices.splice(formattedQuestion.answer -1, 0, loadedQuestion.correct_answer);
        answerChoices.forEach((choice, index)=>{
        formattedQuestion["choice"+(index+1)] = choice;
        })
        return formattedQuestion;
    });
    //questions = loadedQuestions;
    

    startGame();
})
.catch(err =>{
    console.error(err);
    //anyways incase of error on loading questions
    //you might want to direct the user to home page
    //back this is the place 
});

//constants 
const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 10;

//rendering of questions
startGame = () => {
    questionCounter = 0;
    score = 0;
    availableQuestions = [... questions];
    getNewQuestion();
    //now adding a loader in between questions
    game.classList.remove("hidden");
    loader.classList.add("hidden");

};

//function to goto end .html if there are no more questions to render
getNewQuestion = () => {
    
    if(availableQuestions.length ==0 || questionCounter > MAX_QUESTIONS){
        //trying to save high score in a local storage
        localStorage.setItem('mostRecentScore', score);
        //go to the end page
        return window.location.assign("./end.html");
    }

    questionCounter++;
    //to update score and question counter constructs
    //"Question " + questionCounter + "/" + MAX_QUESTIONS  <--or
    progressText.innerHTML=`Question ${questionCounter}/${MAX_QUESTIONS}`;
    //to update the progress bar
    progressBarfull.style.width = `${(questionCounter/ MAX_QUESTIONS) * 100}%`;
    //console.log((questionCounter / MAX_QUESTIONS) * 100);

    const questionIndex = Math.floor(Math.random()* availableQuestions.length );
    currentQuestion = availableQuestions[questionIndex];
    question.innerHTML = currentQuestion.question;

    choices.forEach( choice => {
        const number = choice.dataset['number'];
        choice.innerHTML = currentQuestion['choice' + number];
    });

    availableQuestions.splice(questionIndex, 1);
    //splice means it will take only one value and cut off the rest
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

        //on correct answer to increment score
        if(classToApply == 'correct') {
            incrementScore(CORRECT_BONUS);
        }
        //adding and removing the css class for correct and incorrect
        //answers
        selectedChoice.parentElement.classList.add(classToApply);

        setTimeout( () => {
            selectedChoice.parentElement.classList.remove(classToApply);
            getNewQuestion();
        }, 1000);
       // console.log(selectedAnswer == currentQuestion.answer);

    });
});

//score increment
incrementScore = num => {
    score +=num;
    scoreText.innerText = score;
}
// start game was formally here but i want it to be called
//when the questions have been loaded from the json file

 //color chaNGE FUNCTION  
window.addEventListener('load',function(){
    newbod=JSON.parse(sessionStorage.getItem('bod'));
    newcol=JSON.parse(sessionStorage.getItem('col'));
    document.body.style.background=newbod;
    
    for(i = 0; i < a.length; i++){
        a[i].style.color=newcol;
       
    }
    
    for(i = 0; i < h1.length; i++){
        h1[i].style.color=newcol;
       
    }

    for(i = 0; i < p.length; i++){
        p[i].style.color=newcol;
       
    }
    /**text=[h1,p,a];
    function helper(arr){
        for(i in arr){
            (arr[i]).style.color=newcol;
        }
    };
    helper(text);
    **/

});
