const highScoresList = document.getElementById('highScoresList');
const highScores = JSON.parse(localStorage.getItem('highScores')) || [];

//to iterate through each score and add an li to eaCH UL using map
//.join joins all the items
//note before that local storage is unsecure and data in it could be changed
// consider saving in a data base elsewhere for some serious shit
highScoresList.innerHTML = highScores
.map(score =>{
 return `<li class="high-score">${score.name} - ${score.score}</li>`;
})
.join("");