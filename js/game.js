const leftBallOne = document.getElementById('left-1');
const leftCircle = document.querySelector('.circle-left-container')
const rightCircle = document.querySelector('.circle-right-container')


console.log(leftBallOne.getBoundingClientRect())

// setInterval(() => {
//     console.log(+leftBallOne.getBoundingClientRect().left.toFixed(0))
// }, 500);

// console.log(leftBallOne.getBoundingClientRect().left.toFixed(0))
// console.log(leftBallOne.getBoundingClientRect().left.toFixed(0) === 315) 

console.log(leftCircle)
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