// Link
const leftCircle = document.querySelector('.circle-left-container')
const leftBallOne = document.getElementById('left-1');
const leftBallTwo = document.getElementById('left-2');

const rightCircle = document.querySelector('.circle-right-container')
const rightBallOne = document.getElementById('right-1');
const rightBallTwo = document.getElementById('right-2');

const lines = document.querySelectorAll('.line')

const points = document.querySelector('.points');
const timer = document.querySelector('.time');


// Method for coordinates
// console.log(leftBallOne.getBoundingClientRect())

// create a array to stock each ball created
let currentBalls = [];
let score = 0;
let time = 60;
let intervalId = 0;


// Functions
function newBalls() {
    setInterval(() => {
        let randomIndex = Math.floor(Math.random()*lines.length);
        const balls = document.createElement('div');
        balls.classList.add('line-ball');
        lines[randomIndex].appendChild(balls)
        
        // setInterval(() => {
        //     console.log(Number(leftCircle.getBoundingClientRect().x.toFixed(0)) + "-" + Number(leftCircle.getBoundingClientRect().y.toFixed(0)))
        //     console.log(Number(balls.getBoundingClientRect().x.toFixed(0)) + "-" + Number(balls.getBoundingClientRect().y.toFixed(0)))
        // }, 20);

        currentBalls.push(balls)
        
        // Calculate the realtime position of each balls and circleBalls
        setInterval(() => {
            currentBalls.forEach(ball => {
                checkSameCoordinates(leftBallOne, ball)
                checkSameCoordinates(leftBallTwo, ball)
                checkSameCoordinates(rightBallOne, ball)
                checkSameCoordinates(rightBallTwo, ball)
            });
        }, 40);
        
        // Remove ball if it reaches the end of the line /!\/!\/!\ Adjust the duration depending on the animation.
        setTimeout(() => {
        lines[randomIndex].removeChild(lines[randomIndex].firstChild) }, 10000) 

    }, 4000);
}

function checkSameCoordinates(circleBall, lineBall) {
    let circleBallX = Number(circleBall.getBoundingClientRect().x.toFixed(0)) + 7 ; // to trigger the center add the radius
    let circleBallY = Number(circleBall.getBoundingClientRect().y.toFixed(0)) + 7;

    let lineBallX = Number(lineBall.getBoundingClientRect().x.toFixed(0)) + 5;  // to trigger the center add the radius
    let lineBallY = Number(lineBall.getBoundingClientRect().y.toFixed(0)) + 5;
    if ((circleBallX === lineBallX + 5 || circleBallX === lineBallX - 5) && (circleBallY === lineBallY + 5 || circleBallY === lineBallY - 5)) {
        console.log("it works");
        lineBall.remove()
        score++
        console.log(score)
        points.textContent = score;   
    }
}

function startTimer() {
    intervalId = setInterval(() => {
      time--;
      timer.textContent = time;
    }, 1000);

  }
  
newBalls()
startTimer()


//Event listeners

document.addEventListener('keydown', function (event) {
    if (event.key === 'q') {
        leftCircle.classList.toggle('reverse')
        // setInterval(() => {
        // console.log(+leftBallOne.getBoundingClientRect().left.toFixed(0))
        // }, 4000);
        //DOUBLE THE NUMBER OF REFERENCE…
    }
})
document.addEventListener('keydown', function (event) {
    if (event.key === 'd') {        
        leftCircle.classList.toggle('reverse')
    }
})


document.addEventListener('keydown', function (event) {
    if (event.key === 'ArrowLeft') {
        rightCircle.classList.toggle('reverse')
    }
})
document.addEventListener('keydown', function (event) {
    if (event.key === 'ArrowRight') {        
        rightCircle.classList.toggle('reverse')
    }
})