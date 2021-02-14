# Rules
The objective is to collect to reach the highest score in 60s;
On horizontal balls with 2 differents colors are moving and the player should catch them with the right circles
Each circles correspond to one kind of balls.

When the player catch correctly a ball he has 10points => if he catches 10 balls in a row he has a extra bonus score of 50pts.
When he make a mistake he lose 5 seconds on the timer.

# TODO

- add #intro-wrapper as an intro
- then add screen with the rules in three steps.

- *addEvent Listeners to control each circles.*

- *Create a function that create new balls on vertical lines every with a random time and on a random line*
    -  Math.random on setInterval()
    -  Math.random on querySelector('.line')
    
- *Create a function to check if vertical balls and circles balls have on the same coordinates if yes score ++*
    ```
    function checkIfSameCoordinates (circleball, lineball) {
        if (circleball.position === lineball.position && circleball.color === lineball.color) { 
            score.value += 10
            play sound goods
        } 
        else if (circleball.position === lineball.position && circleball.color !== lineball.color )  {
            timer.value -= 5 // animation css avec -5s
            play sounds pas good
        }
    }
    ```
- *Create a function timer*

- *Create a function when the game is over*
    ```
    function isFinished () {
        if (timer === 0) {
            //remove #game-wrapper && add a #final-wrapper with score
                if (score >= 500)  // "you’re a master"
                else if (score >= 200 && <500) // "good job…"
                else  //"hello n00b, try harder plz"
            // Btn playAgain
            // Btn Share the game    
        }
    }
    ```
