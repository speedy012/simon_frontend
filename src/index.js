
/********************************************************************************
DOM nodes
********************************************************************************/

let gameCont;
let lbCont = document.getElementById('leaderboard-container')
let cardCont = document.querySelector('.card-body')
let userName = document.getElementById('user-name-form')
let master = document.getElementById('master')
let startBtn;
let red;
let blue;
let green;
let yellow;
let playBtn;



/*****************
  Global Variable
******************/

let colorsToRender = []; //calls in functions to render the colors in order
let colorToMatch = []; //div elements(red, green, blue, yellow) that the user must match
let userInputArr = []; //div elements(red, green, blue, yellow) the user has clicked
let score = 0;







/********************************************************************************
Functions
********************************************************************************/

function startNewRound() {
  userInputArr = []
  setTimeout(function(){
    colorPicker();
    renderColor(colorsToRender);
  }, 800)
}

function gameOver() {
  score = colorsToRender.length-1
  cardDiv;
  // confirm(`Game Over! Play again? your Score: ${colorToMatch.length-1}`)
  colorsToRender = []; //CG
  colorToMatch = []; //CG
  userInputArr = [];
  fetchUsers();
}

function renderMainPage() {
  master.innerHTML =
  `<h2> Welcome to Simon!</h2>
  <p> Press play to get started!</p>
  <button id="play-btn" type="button">Play</button>`
  playBtn = document.getElementById('play-btn')
}

function renderGameBoard() {
  master.innerHTML =
  `<div id="game-container">
    <div id="red" class="color">
    </div>
    <div id="blue" class="color">
    </div>
    <div id="green" class="color">
    </div>
    <div id="yellow" class="color">
    </div>
  </div>
  <div id="start-container">
    <button id="start-btn" type="button">Start</button>
  </div>`
      startBtn = document.getElementById('start-btn')
      red = document.getElementById('red')
      blue = document.getElementById('blue')
      green = document.getElementById('green')
      yellow = document.getElementById('yellow')
      gameCont = document.getElementById('game-container');
}


function colorPicker(){
  let randColor = Math.floor(Math.random() * 4);
  switch (randColor){
    case 0:
     colorsToRender.push(redFlipper);
     console.log("Just added a color to colors to render", colorsToRender);
     colorToMatch.push(red)
     break;
    case 1:
      colorsToRender.push(blueFlipper);
      console.log("Just added a color to colors to render", colorsToRender);
      colorToMatch.push(blue)
      break;
    case 2:
      colorsToRender.push(greenFlipper);
      console.log("Just added a color to colors to render", colorsToRender);
        colorToMatch.push(green)
      break;
    case 3:
      colorsToRender.push(yellowFlipper);
      console.log("Just added a color to colors to render", colorsToRender);
        colorToMatch.push(yellow)
  }
  console.log("color to match", colorToMatch);
}

function renderColor(arr) {
  console.log("render color", colorsToRender);
  arr.forEach(function(item, index) {
    return setTimeout(function() {
      return item();
    }, index * 400);
  })
}

function fetchUsers(){
  fetch('http://localhost:3000/api/v1/users')
  .then(res => res.json())
  .then(users => renderLB(users.data))
}

function renderLB(arr) {
  arr.forEach(user => {
    lbCont.innerHTML +=
    `<p> Username: ${user.attributes.name}</p>
        <p> ${score}</p>`
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
    lbCont.innerHTML +=
    `<p> Username: ${data.data.attributes.name}</p>
      <p> ${data.data.relationships.games.data[0].score}</p>`
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


/********************************************************************************
Eventlisteners
********************************************************************************/

document.addEventListener('DOMContentLoaded', e => {
renderMainPage()
})


master.addEventListener('click', e => {

  console.log(e.target)

  if (e.target === playBtn) {
    renderGameBoard()
  } else if (e.target === startBtn) {
    console.error("lolz");
    colorPicker(); //populates colorsToRender array
    renderColor(colorsToRender); //renders the order of colors the user must match
  } else if (e.target === gameCont) {
      userInputArr.push(e.target)
      userIndex = userInputArr.length - 1
      colorsToRender[userIndex]();
      //conditional-if user is right, continue
      if(userInputArr[userIndex] === colorToMatch[userIndex]){
        console.log("clicked the right one");
        //if the userInputArr matches the colorToMatch end round and renderColor
        if(userInputArr.length === colorToMatch.length){
          startNewRound()
        }
      } else { //game over
        gameOver()
      }
    }
})







//
// startBtn.addEventListener("click", function(e){
//    colorPicker(); //populates colorsToRender array
//    renderColor(colorsToRender); //renders the order of colors the user must match
// });

// gameCont.addEventListener("click", function (e){
//   userInputArr.push(e.target)
//   userIndex = userInputArr.length - 1
//   colorsToRender[userIndex]();
//
//   //conditional-if user is right, continue
//   if(userInputArr[userIndex] === colorToMatch[userIndex]){
//     console.log("clicked the right one");
//     //if the userInputArr matches the colorToMatch end round and renderColor
//     if(userInputArr.length === colorToMatch.length){
//       startNewRound()
//     }
//   } else { //game over
//     gameOver()
//     }
// });


//
// const cardDiv = cardCont.addEventListener("click", function (e){
//   if(e.target.id === "yes-btn"){
//     postUserAndGame();
//
//   } else if(e.target.id === "no-btn"){
//     console.log("sumthing")
//   }
//
// })
