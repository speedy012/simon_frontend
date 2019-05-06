
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

const colorArr = [];



/********************************************************************************
Eventlisteners
********************************************************************************/

 startBtn.addEventListener("click", function(e){
   colorPicker();
   renderColor(colorArr);

 });




/********************************************************************************
Functions
********************************************************************************/
function colorPicker(){
  let randColor = Math.floor(Math.random() * 4);
  switch (randColor){
    case 0:
     colorArr.push(redFlipper);
     break;
    case 1:
      colorArr.push(blueFlipper);
      break;
    case 2:
      colorArr.push(greenFlipper);
      break;
    case 3:
      colorArr.push(yellowFlipper);
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
}
