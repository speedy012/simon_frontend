
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
const cardCont = document.querySelector('.card-body')
const userName = document.getElementById('user-name-form')



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
    console.log("clicked the right one");
    //if the userInputArr matches the colorToMatch end round and renderColor
    if(userInputArr.length === colorToMatch.length){
      userInputArr = []
      setTimeout(function(){
        colorPicker();
        renderColor(colorsToRender);
      }, 800)

    }
  } else { //game over
      score = colorsToRender.length-1
      cardDiv;
      // confirm(`Game Over! Play again? your Score: ${colorToMatch.length-1}`)
      colorsToRender = []; //CG
      colorToMatch = []; //CG
      userInputArr = [];
      fetchUsers();
    }
});



const cardDiv = cardCont.addEventListener("click", function (e){
  if(e.target.id === "yes-btn"){
    postUserAndGame();

  } else if(e.target.id === "no-btn"){
    console.log("sumthing")
  }

})





/********************************************************************************
Functions
********************************************************************************/
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
