//now the work begins
//save high score function
const username = document.getElementById('username');
const saveScoreBtn = document.getElementById('saveScoreBtn');
const finalScore = document.getElementById('finalScore');
const mostRecentScore = localStorage.getItem('mostRecentScore');

//local storage stores data as strings so to av an array there
//we need to use json stringfy for numbers
//then const hgihscores is equal to this values
//JSON.parse to parse to string
//we either get whats in local storage or we show an empty array
//so add ....||[]

const highScores = JSON.parse(localStorage.getItem('highScores')) || [];

const Max_HIGH_SCORE = 5;

finalScore.innerText = mostRecentScore;

//condition for enabling save button
username.addEventListener('keyup', () => {
 //enable save button if there is data in the field
 saveScoreBtn.disabled = !username.value;
 });

saveHighScore = e=> {
   console.log("good");
   e.preventDefault();

   //trying to save the high score
   //N.B i used json scripting
   const score = {
      score: Math.floor(Math.random()*100),
      name: username.value
   };
   //to push the score to our array
   highScores.push(score);
   //to sort the high scores
   highScores.sort((a,b) => b.score - a.score);
   //will return b if its greater
   highScores.splice(5);
   //would take only 5 values and cut off the rest

   //now to update our local storage
   localStorage.setItem("highScores", JSON.stringify(highScores));
   //when the above is done to go back home
   window.location.assign("/");
   console.log(highScores);
   //testing
   //console.log(score);
};