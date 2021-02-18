// LINKS
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
const linesZone = document.querySelector("#lines-zone");

const points = document.querySelector(".points");
const finalScore = document.querySelector(".final-score");
const timer = document.querySelector(".time");

// SOUNDS
const audio = new Audio("./sounds/cello1.mp3");
audio.volume = 0.6;
const drop = new Audio("./sounds/drop.mp3");
drop.volume = 0.4;

// create a array to stock each ball created
let currentBalls = [];

let score = 0;
let time = 60;
let intervalId = 0;
let intervalId2 = 0;
let intervalTime = 0;

let i = 0;
let ballIndex = "ball" + i;

// FUNCTIONS
// Create Balls on horizontal lines and remove it at the end.
function newBalls() {
  intervalId = setInterval(() => {
    ballIndex = "ball" + i++;
    let randomIndex = Math.floor(Math.random() * lines.length);
    const balls = document.createElement("div");
    balls.setAttribute("id", ballIndex);
    balls.classList.add("line-ball");
    RandomColors(balls);
    lines[randomIndex].appendChild(balls);

    currentBalls.push(balls);
    // Calculate the realtime position of each balls and circleBalls
    intervalId2 = setInterval(() => {
      currentBalls.forEach((ball) => {
        addPoints(leftBallOne, ball);
        addPoints(leftBallTwo, ball);
        addPoints(rightBallOne, ball);
        addPoints(rightBallTwo, ball);
      });
    }, 40);
    let element = document.getElementById(ballIndex);

    // Remove ball if it reaches the end of the line
    //!\/!\/!\ Adjust the duration depending on the animation.
    setTimeout(() => {
      element.remove();
    }, 4900);
  }, 1000);
}

// Add a random class
function RandomColors(ball) {
  let randomColor = Math.floor(Math.random() * 2);
  if (randomColor === 1) {
    ball.classList.add("yellow");
  } else {
    ball.classList.add("blue");
  }
}

// Check if big and small balls are in the same area (add a tolerance of 12px (-6/+6))
function checkSameCoordinates(circleBall, lineBall) {
  let circleBallX = Number(circleBall.getBoundingClientRect().x.toFixed(0)) + 7; // to trigger the center add the radius
  let circleBallY = Number(circleBall.getBoundingClientRect().y.toFixed(0)) + 7;

  let lineBallX = Number(lineBall.getBoundingClientRect().x.toFixed(0)) + 5; // to trigger the center add the radius
  let lineBallY = Number(lineBall.getBoundingClientRect().y.toFixed(0)) + 5;

  if (
    circleBallX - 6 <= lineBallX &&
    circleBallX + 6 >= lineBallX &&
    circleBallY <= lineBallY + 6 &&
    circleBallY >= lineBallY - 6
  ) {
    return true;
  } else {
    return false;
  }
}

// Controls the value of the class.
function checkColor(circleBall, lineBall) {
  if (
    (circleBall.classList.contains("blue") &&
      lineBall.classList.contains("blue")) ||
    (circleBall.classList.contains("yellow") &&
      lineBall.classList.contains("yellow"))
  ) {
    return true;
  } else {
    return false;
  }
}

// Add animation to the big balls
function addHalo(circleBall) {
  let halo = document.createElement("span");
  halo.classList.add("halo");
  circleBall.appendChild(halo);
  setTimeout(function () {
    halo.parentNode.removeChild(halo);
  }, 300);
}

// Display the info about the points you gain/lose after each balls grabed
function infoPoint(circleBall, lineBall) {
  const info = document.querySelector(".plus-minus");
  info.classList.add("anim-point");
  if (!checkColor(circleBall, lineBall)) {
    info.innerText = "-5";
    info.style.left = "40%";
  } else if (checkColor(circleBall, lineBall)) {
    info.innerText = "+15";
  }
  setTimeout(function () {
    info.classList.remove("anim-point");
  }, 700);
}
// play animations addHalo()-infoPoint(), and remove the element
function grabBallsAnimation(circleBall, lineBall) {
  addHalo(circleBall);
  infoPoint(circleBall, lineBall);
  drop.play();
  lineBall.remove();
}

// Increase/Decrease the score and
function addPoints(circleBall, lineBall) {
  if (
    checkColor(circleBall, lineBall) &&
    checkSameCoordinates(circleBall, lineBall)
  ) {
    grabBallsAnimation(circleBall, lineBall);
    score += 15;
    points.textContent = score;
  } else if (
    !checkColor(circleBall, lineBall) &&
    checkSameCoordinates(circleBall, lineBall)
  ) {
    grabBallsAnimation(circleBall, lineBall);
    score -= 5;
    points.textContent = score;
  }
}

function timeCountdown() {
  intervalTime = setInterval(() => {
    if (time > 0) {
      timer.textContent = time;
      time--;
    } else {
      stopTheGame();
      addScoreBoard();
      getHighScore();
      changeHighScore();
    }
  }, 1200);
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
  audio.volume = 0.3;
  gameContainer.remove();
  scoreWrapper.style.display = "flex";
  finalScore.textContent = score;
}

// LOCAL STORAGE
//set initial value for high score
const highScore = document.getElementById("high-score");
console.log(highScore);

let highestscore = localStorage.getItem("highscore");
function getHighScore() {
  const newScore = finalScore.textContent;
  console.log("newScore is called - " + newScore);
  if (highestscore !== null) {
    if (newScore > Number(highestscore)) {
      localStorage.setItem("highscore", newScore);
      highestscore = localStorage.getItem("highscore");
      console.log("highscore is =" + highestscore);
      return highestscore;
    }
  } else {
    localStorage.setItem("highscore", newScore);
    highestscore = localStorage.getItem("highscore");
    return highestscore;
  }
}
function changeHighScore() {
  highScore.textContent = highestscore;
}

// Change rules depending on the media
const rulesText = document.querySelector("#rules-text");
const mediaQuery = window.matchMedia("(max-width: 1366px)");

if (mediaQuery.matches && navigator.maxTouchPoints > 1) {
  rulesText.textContent =
    "Tap on each circle to change their direction and grab a maximum of orbs.";
}

//EVENT LISTENERS
playBtn.addEventListener("click", function () {
  audio.play();
  setTimeout(startTheGame, 2500);

  gameIntro.style.display = "none";
  gameWrapper.style.display = "flex";
  gameWrapper.classList.add("fadein");
});

document.addEventListener("keypress", function (event) {
  if (event.key === "q") {
    leftCircle.classList.remove("reverse");
  }
});

document.addEventListener("keypress", function (event) {
  if (event.key === "d") {
    leftCircle.classList.add("reverse");
  }
});

document.addEventListener("keydown", function (event) {
  if (event.key === "ArrowLeft") {
    rightCircle.classList.remove("reverse");
  }
});

document.addEventListener("keydown", function (event) {
  if (event.key === "ArrowRight") {
    rightCircle.classList.add("reverse");
  }
});

playAgain.addEventListener("click", function () {
  document.location.reload();
});

// FOR MULTITOUCH DEVICES
if (navigator.maxTouchPoints > 1) {
  leftCircle.addEventListener("click", function (event) {
    leftCircle.classList.toggle("reverse");
  });

  rightCircle.addEventListener("click", function (event) {
    rightCircle.classList.toggle("reverse");
  });
}
