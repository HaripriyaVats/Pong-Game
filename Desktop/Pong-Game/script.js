let ball = document.querySelector(".ball");
let board = document.querySelector(".board");
let leftPaddle = document.querySelector(".left");
let rightPaddle = document.querySelector(".right");
let boardDimension = board.getBoundingClientRect();

let x = true;
let y = true;
let leftPlayerLives = 3;
let rightPlayerLives = 3;

//function to change color of lives icon
function setColor(index) {
    let allIcons = document.querySelectorAll(".fa-heart");
    allIcons[index].style.color = "#240b46";
}

//function to listen to the user input and move paddles accordingly
document.addEventListener("keydown", function (e) {
    // console.log(e);
    if (e.key == "w") {
        movePaddle(leftPaddle, -35);
    } else if (e.key == "s") {
        movePaddle(leftPaddle, 35);
    } else if (e.key == "ArrowUp") {
        movePaddle(rightPaddle, -35);
    } else if (e.key == "ArrowDown") {
        movePaddle(rightPaddle, 35);
    }
});

//function to move paddles
function movePaddle(currPaddle, change) {
    // console.log(change);
    let currPaddleDimension = currPaddle.getBoundingClientRect();
    if (currPaddleDimension.top + change >= boardDimension.top && currPaddleDimension.bottom + change <= boardDimension.bottom) {
        currPaddle.style.top = currPaddleDimension.top + change + "px";
    }
}

//function to move ball
function moveBall() {
    let ballDimension = ball.getBoundingClientRect();

    //check ball's movement horizontally
    let leftPaddleDimension = leftPaddle.getBoundingClientRect();
    let rightPaddleDimension = rightPaddle.getBoundingClientRect();
    //if collision with boundary
    let hasCollidedLeftBoundary = ballDimension.left < boardDimension.left;
    let hasCollidedRightBoundary = ballDimension.right > boardDimension.right;
    if (hasCollidedLeftBoundary) {
        leftPlayerLives--;
        setColor(leftPlayerLives);
        if (leftPlayerLives == 0) {
            alert("Game Over! \n ✨Right Player Won!✨");
            document.location.reload();
        }
        return resetGame();
    } else if (hasCollidedRightBoundary) {
        rightPlayerLives--;
        setColor(rightPlayerLives + 3);
        if (rightPlayerLives == 0) {
            alert("Game Over! \n ✨Left Player Won!✨");
            document.location.reload();
        }
        return resetGame();
    }
    //checking collision with left paddle
    if (ballDimension.left <= leftPaddleDimension.right &&
        ballDimension.right >= leftPaddleDimension.right &&
        ballDimension.top + 22 >= leftPaddleDimension.top &&
        ballDimension.bottom - 22 <= leftPaddleDimension.bottom) {
        x = true;
    }
    //checking collision with right paddle
    if (ballDimension.left <= rightPaddleDimension.left &&
        ballDimension.right >= rightPaddleDimension.left &&
        ballDimension.top + 22 >= rightPaddleDimension.top &&
        ballDimension.bottom - 22 <= rightPaddleDimension.bottom) {
        x = false;
    }

    //check if ball is in vertical dimensions of board
    if (ballDimension.top <= boardDimension.top || ballDimension.bottom >= boardDimension.bottom) {
        y = !y;
    }
    ball.style.top = (y == true) ? ballDimension.top + 5 + "px" : ballDimension.top - 5 + "px";
    ball.style.left = (x == true) ? ballDimension.left + 5 + "px" : ballDimension.left - 5 + "px";
    requestAnimationFrame(moveBall);
}

//function to reset the game when a life is lost
function resetGame() {
    ball.style.top = 50 + "%";
    ball.style.left = 50 + "%";
    requestAnimationFrame(moveBall);
}

requestAnimationFrame(moveBall);