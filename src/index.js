
/********************************************************************************
DOM nodes
********************************************************************************/

const gameCont = document.getElementById('game-container');
const lbCont = document.getElementById('leaderboard-container')
const red = document.getElementById('red')
const blue = document.getElementById('blue')
const green = document.getElementById('green')
const yellow = document.getElementById('yellow')
const startBtn = document.getElementById('start-btn')
let cardCont;
let userName;
const userCard = document.getElementById('user-card')


/*****************
  Global Variable
******************/

let colorsToRender = []; //calls in functions to render the colors in order
let colorToMatch = []; //div elements(red, green, blue, yellow) that the user must match
let userInputArr = []; //div elements(red, green, blue, yellow) the user has clicked
let score = 0;

/********************************************************************************
Eventlisteners
********************************************************************************/

startBtn.addEventListener("click", function(e){
   colorPicker(); //populates colorsToRender array
   renderColor(colorsToRender); //renders the order of colors the user must match
});

gameCont.addEventListener("click", function (e){
  userInputArr.push(e.target)
  userIndex = userInputArr.length - 1
  colorsToRender[userIndex]();

  //conditional-if user is right, continue
  if(userInputArr[userIndex] === colorToMatch[userIndex]){
    //if the userInputArr matches the colorToMatch end round and renderColor
    if(userInputArr.length === colorToMatch.length){
      userInputArr = []
      setTimeout(function(){
        colorPicker();
        renderColor(colorsToRender);
      }, 800)

    }
  } else { //game over

      // confirm(`Game Over! Play again? your Score: ${colorToMatch.length-1}`)

       fetchGames();
      // cardCont = document.querySelector('.card-body')
      // cardListener()
      userCard.innerHTML =
      `  <div class="card text-center">
          <div class="card-header">
            Your Score: ${colorToMatch.length-1}
        </div>
        <div class="card-body">
         <h5 class="card-title">Enter Name</h5>

         <p class="card-text">To be added to Scoreboard </p>
         <input id="user-name-form" type= "text"></br>
         <a href="#" id="yes-btn" class="btn btn-primary">Yes</a>
         <a href="#" id="no-btn" class="btn btn-primary">No</a>
       </div>
       </div>`
       colorsToRender = []; //CG
       colorToMatch = []; //CG
       userInputArr = [];
    }
});


function cardListener() {
  cardCont.addEventListener("click", function (e){

    if(e.target.id === "yes-btn"){
      postUserAndGame();
    } else if(e.target.id === "no-btn"){
      userCard.innerHTML = ''
    }
  })
}




/********************************************************************************
Functions
********************************************************************************/
function colorPicker(){
  let randColor = Math.floor(Math.random() * 4);
  switch (randColor){
    case 0:
     colorsToRender.push(redFlipper);
     colorToMatch.push(red)
     break;
    case 1:
      colorsToRender.push(blueFlipper);
      colorToMatch.push(blue)
      break;
    case 2:
      colorsToRender.push(greenFlipper);
        colorToMatch.push(green)
      break;
    case 3:
      colorsToRender.push(yellowFlipper);
        colorToMatch.push(yellow)
  }

}

function renderColor(arr) {

  arr.forEach(function(item, index) {
    return setTimeout(function() {
      return item();
    }, index * 400);
  })
}

function fetchGames(){
  fetch('http://localhost:3000/api/v1/games')
  .then(res => res.json())
  .then(games => {

    lbCont.innerHTML = ''
    const leaders = Object.values(games).sort((a,b) => a.score - b.score)
    renderLB(leaders.reverse().slice(0, 5))

     //update card container and username to be the actual element
     cardCont = document.querySelector('.card-body')
     userName = document.getElementById('user-name-form')

     //add event listener to card container
     cardListener()
  })
}

function renderLB(arr) {
  arr.map(game => {
      game.map(match => {
        return lbCont.innerHTML +=
        `<li>${match.attributes.user.name}: ${match.attributes.score}</li>`
      })
    })
  }


function postUserAndGame(){
  fetch('http://localhost:3000/api/v1/users', {
    method: "POST",
    headers: {
      "Content-Type": "application/json", 'accept': 'application/json'
    },
    body: JSON.stringify({
      name: userName.value,
      score: score
    })
  })
  .then(res => res.json())
  .then(data => {
    fetchGames()

    // userName.value = ''
    userCard.innerHTML = ''
  })
}

/********Flipper Functions*******************/
//Red Flipper
function changeRed() {
  red.style.backgroundColor = "#8B0000"
}

function changeRedBack() {
  red.style.backgroundColor = "#FF0000"
}

function redFlipper() {
  changeRed();
  setTimeout(changeRedBack, 300);
}

//Blue Flipper
function changeBlue() {
  blue.style.backgroundColor = "#000099"
}

function changeBlueBack() {
  blue.style.backgroundColor = "#0000FF"
}

function blueFlipper() {
  changeBlue();
  setTimeout(changeBlueBack, 300);
}

//Green Flipper
function changeGreen() {
  green.style.backgroundColor = "#006600"
}

function changeGreenBack() {
  green.style.backgroundColor = "#009900"
}

function greenFlipper() {
  changeGreen();
  setTimeout(changeGreenBack, 300);
}

//Yellow Flipper
function changeYellow() {
  yellow.style.backgroundColor = "#E5E500"
}

function changeYellowBack() {
  yellow.style.backgroundColor = "#FFFF00"
}

function yellowFlipper() {
  changeYellow();
  setTimeout(changeYellowBack, 300);
}
