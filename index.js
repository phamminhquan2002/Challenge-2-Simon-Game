let buttonColors = ["green", "red", "yellow", "blue"];
let gamePattern = [];
let userPattern = [];
let level = 0;
let keypress = 0;
let gameOver = false;

function nextSequence() {
    level++;
    $("h1").text(`Level ${level}`);
    let randomNumber = Math.floor(Math.random() * 4);
    let randomColor = buttonColors[randomNumber];
    gamePattern.push(randomColor);

    playSound(randomColor);
    
    $(`.${randomColor}`).fadeOut(100).fadeIn(100);
    console.log("Game: "+gamePattern);
}

$(document).keypress(e=>{
    keypress++;
    if (keypress === 1){
        nextSequence();
        userPattern = [];
    }
});



$(".btn").click(e=>{
    let currentColor =  e.target.getAttribute("id");
    console.log(currentColor);
    userClickEffect(currentColor);
    userPattern.push(currentColor);
    console.log("User: "+userPattern);
    checkAnswer();
});

function checkAnswer() {
    let currentClick = userPattern.length - 1;
    if (userPattern[currentClick] != gamePattern[currentClick]){
        console.log("failed!");
        gameOver = true;
        resetGame();
    }

    if (currentClick === gamePattern.length - 1 && gameOver === false){
        userPattern = [];
        setTimeout(() => {
            nextSequence();
        }, 1000);
    }

}

function resetGame() {
    $("h1").text("Game Over, Press Any Key to Restart");
    $("body").addClass("game-over");
    setTimeout(() => {
        $("body").removeClass("game-over");
    }, 200);
    
    gamePattern = [];
    level = 0;
    keypress = 0;
    gameOver = false;
}

function userClickEffect(color) {
    playSound(color);
    $(`.${color}`).addClass("pressed");
    setTimeout(() => {
        $(`.${color}`).removeClass("pressed");
    }, 100);
}

function playSound(color) {
    let sound = new Audio(`sounds/${color}.mp3`);
    sound.play();
}

