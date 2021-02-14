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

// Functions
function newBalls() {
    setInterval(() => {
        let randomIndex = Math.floor(Math.random()*lines.length);
        const balls = document.createElement('div');
        balls.classList.add('line-ball');
        console.log(balls)
        lines[randomIndex].appendChild(balls)
        
        console.log(balls)
        setTimeout(() => {
        lines[randomIndex].removeChild(lines[randomIndex].firstChild) }, 3000) 

    }, Math.random()*4000);
    
}

newBalls()

//Event listeners

document.addEventListener('keydown', function (event) {
    if (event.key === 'q') {
        
        leftCircle.classList.toggle('reverse')
        console.log('q is called')
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
        console.log('d is called')
        console.log(rightCircle)

    }
})

