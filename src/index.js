
/********************************************************************************
DOM nodes
********************************************************************************/

const gameCont = document.getElementById("game-container");
const red = document.getElementById('red')
const blue = document.getElementById('blue')
const green = document.getElementById('green')
const yellow = document.getElementById('yellow')
const startBtn = document.getElementById("start-btn")

/*****************
  Global Variable
******************/

let colorsToRender = []; //CG
let colorToMatch = []; //CG
let userInputArr = [];

/********************************************************************************
Eventlisteners
********************************************************************************/

 startBtn.addEventListener("click", function(e){
   colorPicker();
   renderColor(colorsToRender);

 });

gameCont.addEventListener("click", function (e){
  userInputArr.push(e.target)
  userIndex = userInputArr.length - 1

  if(userInputArr[userIndex] === colorToMatch[userIndex]){
    console.log("yese")
    if(userInputArr.length === colorToMatch.length){
      colorPicker();
      renderColor(colorsToRender);
    }
  } else {
      alert('Game Over')
      colorsToRender = []; //CG
      colorToMatch = []; //CG
      userInputArr = [];
    }
});




/********************************************************************************
Functions
********************************************************************************/
function colorPicker(){
  let randColor = Math.floor(Math.random() * 4);
  switch (randColor){
    case 0:
     colorsToRender.push(redFlipper);
     break;
    case 1:
      colorsToRender.push(blueFlipper);
      break;
    case 2:
      colorsToRender.push(greenFlipper);
      break;
    case 3:
      colorsToRender.push(yellowFlipper);
  }
}

function renderColor(arr) {
  arr.forEach(function(item, index) {
    return setTimeout(function() {
      return item();
    }, index * 400);
  })
}

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
  console.log('r')
  colorToMatch.push(red)
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
  console.log('b')
  colorToMatch.push(blue)
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
  console.log('g')
  colorToMatch.push(green)
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
  console.log('y')
  colorToMatch.push(yellow)
}
