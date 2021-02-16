// Link
const playBtn = document.querySelector("#play-btn");
const playAgain = document.querySelector("#play-again");

const gameIntro = document.querySelector("#intro-wrapper");
const gameContainer = document.querySelector("#game-container");
const gameWrapper = document.querySelector("#game-wrapper");
const scoreWrapper = document.querySelector("#score-wrapper");

const leftCircle = document.querySelector(".circle-left-container");
const leftBallOne = document.getElementById("left-1");
const leftBallTwo = document.getElementById("left-2");

const rightCircle = document.querySelector(".circle-right-container");
const rightBallOne = document.getElementById("right-1");
const rightBallTwo = document.getElementById("right-2");

const lines = document.querySelectorAll(".line");

const points = document.querySelector(".points");
const finalScore = document.querySelector(".final-score");
const timer = document.querySelector(".time");

// Method for coordinates
// console.log(leftBallOne.getBoundingClientRect())

// create a array to stock each ball created
let currentBalls = [];

let score = 0;
let time = 60;
let intervalId = 0;
let intervalId2 = 0;
let intervalTime = 0;

// Functions
function newBalls() {
  intervalId = setInterval(() => {
    let randomIndex = Math.floor(Math.random() * lines.length);
    const balls = document.createElement("div");
    balls.classList.add("line-ball");
    let randomColor = Math.floor(Math.random() * 2);
    if (randomColor === 1) {
      balls.classList.add("yellow");
    } else {
      balls.classList.add("blue");
    }
    
    lines[randomIndex].appendChild(balls);

    currentBalls.push(balls);
    // Calculate the realtime position of each balls and circleBalls
    intervalId2 = setInterval(() => {
      currentBalls.forEach((ball) => {
        addPoints(leftBallOne, ball);
        addPoints(leftBallTwo, ball);
        addPoints(rightBallOne, ball);
        addPoints(rightBallTwo, ball);
        // console.log('ball is checked')
      });
    }, 40);

    // Remove ball if it reaches the end of the line
    //!\/!\/!\ Adjust the duration depending on the animation.
    setTimeout(() => {
      lines[randomIndex].removeChild(lines[randomIndex].firstChild);
      // currentBalls.unshift() clean the array
    }, 5000);
  }, 1200);
}

function checkSameCoordinates(circleBall, lineBall) {
  let circleBallX = Number(circleBall.getBoundingClientRect().x.toFixed(0)) + 7; // to trigger the center add the radius
  let circleBallY = Number(circleBall.getBoundingClientRect().y.toFixed(0)) + 7;

  let lineBallX = Number(lineBall.getBoundingClientRect().x.toFixed(0)) + 5; // to trigger the center add the radius
  let lineBallY = Number(lineBall.getBoundingClientRect().y.toFixed(0)) + 5;

  if (
    circleBallX - 6 <= lineBallX && circleBallX + 6 >= lineBallX &&
    circleBallY <= lineBallY + 6 && circleBallY >= lineBallY - 6) {
    return true;
  }
  else {
    return false;
  }
}

function checkColor(circleBall, lineBall) {
  if ( (circleBall.classList.contains('blue') && lineBall.classList.contains('blue')) 
    || (circleBall.classList.contains('yellow') && lineBall.classList.contains('yellow'))){
    return true;
  } else {
    return false;
  }
}

function addPoints(circleBall, lineBall) {
  if (checkColor(circleBall, lineBall) && checkSameCoordinates(circleBall, lineBall)) {
    addHalo(circleBall)
    lineBall.remove();
    // currentBalls.slice(lineBall, 1) // clean the array not sure it works
    score += 10;
    points.textContent = score;
  }
  else if (!checkColor(circleBall, lineBall) && checkSameCoordinates(circleBall, lineBall)) {
    console.log("score -5 is called")
    console.log(typeof score +"-"+ score + "\n------\n")
    score -= 5;
    console.log(typeof score +"-"+ score)
    points.textContent = score;
  }


}

function addHalo(circleBall) {
  let halo = document.createElement('span');
  halo.classList.add('halo')
  circleBall.appendChild(halo);
}

function timeCountdown() {
  intervalTime = setInterval(() => {
    if (time > 0) {
      timer.textContent = time;
      time--;
    } else {
      stopTheGame();
      addScoreBoard();
    }
  }, 1000);
}

function startTheGame() {
  newBalls();
  timeCountdown();
}

function stopTheGame() {
  time = 0;
  timer.textContent = time;
  currentBalls = [];
  clearInterval(intervalId);
  clearInterval(intervalId2);
  clearInterval(intervalTime);
}
function addScoreBoard() {
  gameContainer.remove();
  scoreWrapper.style.display = "flex";
  finalScore.textContent = score;
}

//Event listeners
playBtn.addEventListener("click", function () {
  console.log("hello");
  setTimeout(startTheGame, 1000);

  gameIntro.style.display = "none";
  gameWrapper.style.display = "flex";
  gameWrapper.classList.add("fadein");
});

document.addEventListener("keydown", function (event) {
  if (event.key === "q") {
    leftCircle.classList.toggle("reverse");
  }
});

document.addEventListener("keydown", function (event) {
  if (event.key === "d") {
    leftCircle.classList.toggle("reverse");
  }
});

document.addEventListener("keydown", function (event) {
  if (event.key === "ArrowLeft") {
    rightCircle.classList.toggle("reverse");
  }
});

document.addEventListener("keydown", function (event) {
  if (event.key === "ArrowRight") {
    rightCircle.classList.toggle("reverse");
  }
});

playAgain.addEventListener("click", function () {
  document.location.reload();
});