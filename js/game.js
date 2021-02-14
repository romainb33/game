// Link
const leftCircle = document.querySelector('.circle-left-container')
const leftBallOne = document.getElementById('left-1');
const leftBallTwo = document.getElementById('left-2');

const rightCircle = document.querySelector('.circle-right-container')
const rightBallOne = document.getElementById('right-1');
const rightBallTwo = document.getElementById('right-2');

const lines = document.querySelectorAll('.line')

const score = document.querySelector('#score');
const time = document.querySelector('#time');


// Method for coordinates
// console.log(leftBallOne.getBoundingClientRect())

// setInterval(() => {
//     console.log(+leftBallOne.getBoundingClientRect().left.toFixed(0))
// }, 500);

// console.log(leftBallOne.getBoundingClientRect().left.toFixed(0))

// create a array to stock each ball created
let currentBalls = [];

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
            });
        }, 10);
        
        // Remove ball if it reaches the end of the line /!\/!\/!\ Adjust the duration depending on the animation.
        setTimeout(() => {
        lines[randomIndex].removeChild(lines[randomIndex].firstChild) }, 20000) 

    }, Math.random()*1500);
}

function checkSameCoordinates(circleBall, lineBall) {
    if (Number(circleBall.getBoundingClientRect().x.toFixed(0)) == Number(lineBall.getBoundingClientRect().x.toFixed(0))
    && Number(circleBall.getBoundingClientRect().y.toFixed(0)) == Number(lineBall.getBoundingClientRect().y.toFixed(0))) {
        console.log("it works")
        lineBall.remove()
    }
}
// SOME TEST ABOUT THE TOLERANCE
// function checkSameCoordinates(circleBall, lineBall) {
//     if ((Number(circleBall.getBoundingClientRect().top.toFixed(1)) - 0.5 <= Number(lineBall.getBoundingClientRect().top.toFixed(1)) && Number(lineBall.getBoundingClientRect().top.toFixed(1))  >= Number(circleBall.getBoundingClientRect().top.toFixed(1)) + 0.5)
//     && (Number(circleBall.getBoundingClientRect().left.toFixed(1)) - 0.5 <= Number(lineBall.getBoundingClientRect().left.toFixed(1)) && Number(lineBall.getBoundingClientRect().left.toFixed(1)) >= Number(circleBall.getBoundingClientRect().left.toFixed(1)) + 0.5)) {
//         console.log("it works")
//         lineBall.remove()
//     }
// }

newBalls()




//Event listeners

document.addEventListener('keydown', function (event) {
    if (event.key === 'q') {
        
        leftCircle.classList.toggle('reverse')
        // console.log('q is called')
        console.log(leftCircle)
        console.log(leftBallOne.getBoundingClientRect().left.toFixed(0))

        setInterval(() => {
        console.log(+leftBallOne.getBoundingClientRect().left.toFixed(0))
        }, 4000);
        //DOUBLE THE NUMBER OF REFERENCE…
    }
})
document.addEventListener('keydown', function (event) {
    if (event.key === 'd') {
        
        rightCircle.classList.toggle('reverse')
        // console.log('d is called')
        console.log(rightCircle)

    }
})

