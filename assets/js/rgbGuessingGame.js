var numberOfSquares = 6;
var randomColorsArray;
var theRandomPositionOfColorArray;
var randomPickedColor;
var livesCounter = 5;
var currMode = "";
var rgbMainGuess = document.getElementById("rgbColor");
var squares = document.querySelectorAll(".square");
var lives = document.getElementById("lives");
var h1 = document.getElementById("colorPresenter");
var resetButton = document.getElementById("reset");
var modeButtons = document.querySelectorAll(".mode");


initialize();

function initialize(){
  modeButtonsSetUp();
  setUpSquaresAndSquareOnClickEvents();
  reset(currMode);
}

function setUpSquaresAndSquareOnClickEvents(){
  for(var i = 0; i < squares.length; i++){
    squares[i].addEventListener("click", function(){
      var clickedColor = this.style.backgroundColor;
      if(clickedColor === rgbMainGuess.textContent){
        changeColorToCorrectColor(clickedColor);
        h1.style.backgroundColor = clickedColor;
        resetButton.textContent = "Next Level";
      }
      else{
        this.style.backgroundColor = "#232323";
        if(livesCounter === 0){
          alert("You lose! Try Again!");
          reset(currMode);
        }
        else{
          livesCounter -= 1;
          lives.textContent = livesCounter;
        }
      }
    });
  }
}

function modeButtonsSetUp(){
  for(var i = 0; i < modeButtons.length; i++){
    modeButtons[i].addEventListener("click", function(){
      modeButtons[0].classList.remove("selected");
      modeButtons[1].classList.remove("selected");
      modeButtons[2].classList.remove("selected");
      this.classList.add("selected");

      if(this.textContent === "Easy"){
        numberOfSquares = 3;
        setLives(this);
        currMode = "Easy";
      }
      else if(this.textContent === "Medium"){
        numberOfSquares = 6;
        setLives(this);
        currMode = "Medium";
      }
      else{
        numberOfSquares = 9;
        setLives(this);
        currMode = "Hard";
      }

      reset(this);
    });
  }
}

function setLives(currentMode){
  if(currentMode.textContent === "Easy" || currentMode === "Easy"){
      livesCounter = 1000;
      lives.textContent = livesCounter;
    }
    else if(currentMode.textContent === "Medium" || currentMode === "Medium"){
      livesCounter = 5;
      lives.textContent = livesCounter;
    }
    else{
      livesCounter = 3;
      lives.textContent = livesCounter;
    }
}

function reset(currentMode){
  randomColorsArray = getArrayOfRandomColors(numberOfSquares);
  theRandomPositionOfColorArray = getRandomInt(0, (randomColorsArray.length) - 1);
  randomPickedColor = randomColorsArray[theRandomPositionOfColorArray];
  rgbMainGuess.textContent = randomPickedColor;
  lives.textContent = "";
  resetButton.textContent = "New Color";

  for(var i = 0; i < squares.length; i++){
    if(randomColorsArray[i]){
      squares[i].style.display = "block";
      squares[i].style.backgroundColor = randomColorsArray[i];
    }
    else{
      squares[i].style.display = "none";
    }
  }
  h1.style.backgroundColor = "steelblue";

  if(livesCounter === 0){
    setLives(currentMode);
  }

}

resetButton.addEventListener("click", function(){
  reset(currMode);
});

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getArrayOfRandomColors(numOfColors){
  var colors = [];
  for(var i = 0; i < numOfColors; i++){
    colors.push(getRandomColor());
  }
  return colors;
}

function getRandomColor(){
  var redVal = getRandomInt(0, 255);
  var greenVal = getRandomInt(0, 255);
  var blueVal = getRandomInt(0, 255);

  return "rgb(" + redVal.toString() + ", " + greenVal.toString() + ", " + blueVal.toString() + ")";
}

function changeColorToCorrectColor(correctColor){
  for(var i = 0; i < numberOfSquares; i++){
    squares[i].style.backgroundColor = correctColor;
  }
}
