
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
  colorsToRender[userIndex]();

  if(userInputArr[userIndex] === colorToMatch[userIndex]){
    console.log("clicked the right one");
    if(userInputArr.length === colorToMatch.length){
      userInputArr = []
      setTimeout(function(){
        colorPicker();
        renderColor(colorsToRender);
      }, 800)

    }
  } else {
      confirm(`Game Over! Play again? your Score: ${userIndex++}`)
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
  // console.log('r')
  // colorToMatch.push(red)
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
  // console.log('b')

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
  // console.log('g')

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
  // console.log('y')

}
