//The following 20 lines of code were adapted from https://www.youtube.com/watch?v=a0TyCnFgqlk&t=263s
let character = document.getElementById("character");
let characterBottom = parseInt(
  window.getComputedStyle(character).getPropertyValue("bottom")
);
let characterRight = parseInt(
  window.getComputedStyle(character).getPropertyValue("right")
);
let characterWidth = parseInt(
  window.getComputedStyle(character).getPropertyValue("width")
);
let ground = document.getElementById("ground");
let groundBottom = parseInt(
  window.getComputedStyle(ground).getPropertyValue("bottom")
);
let groundHeight = parseInt(
  window.getComputedStyle(ground).getPropertyValue("height")
);
let isJumping = false;
let upTime;
let downTime;
// The following 3 lines of code were adapted from https://www.youtube.com/watch?v=IO1M_SO0ow4
let displayScore = document.getElementById("score");
let score = 0;
let finalScore = 0;
// The following lines of code was added by courtesy of Chat GPT.
let activeGame = true;
let gameOver = false; // Variable to track game state
let obstacles = []; // Array to store the obstacles

//function to generate the obstacles
//The following 43 lines of code were adapted from https://www.youtube.com/watch?v=a0TyCnFgqlk&t=263s
function generateObstacle() {
  // The following 3 lines of code were added by courtesy of Emma Åkerberg.
  const obstacleArray = ["snail", "ladybug", "grasshopper", "fly", "bug"];
  let randomObstacle =
    obstacleArray[Math.floor(Math.random() * obstacleArray.length)];
  let obstacle = document.createElement("div");
  obstacle.setAttribute("class", "obstacle");

  // The following 1 line of code was added by courtesy of Emma Åkerberg.
  obstacle.style.backgroundImage = "url('images/" + randomObstacle + ".png";
  //The following 1 line of code was added by courtesy of Chat GPT.
  obstacles.push(obstacle);
  document.querySelector(".obstacles").appendChild(obstacle);

  let obstacleRight = -170;
  let obstacleBottom = 2;
  let obstacleWidth = 200;
  let obstacleHeight = 200;

  // Set initial position and size
  obstacle.style.right = obstacleRight + "px";
  obstacle.style.bottom = obstacleBottom + "px";
  obstacle.style.width = obstacleWidth + "px";
  obstacle.style.height = obstacleHeight + "px";
  obstacle.style.backgroundPosition = "top";

  function moveObstacle() {
    obstacleRight += 10;
    obstacle.style.right = obstacleRight + "px";

    // collision detection
    if (
      activeGame &&
      characterRight >= obstacleRight - characterWidth &&
      characterRight <= obstacleRight + -35 &&
      characterBottom <= obstacleBottom + obstacleHeight - 30
    ) {
      // collision occurred, call loseGame function
      loseGame();
    }
  }

  setInterval(moveObstacle, 50);
  setTimeout(generateObstacle, Math.floor(Math.random() * 4000) + 3000);
}

// main function that manages intervals and event listeners
// The following 28 lines of code were added by courtesy of Chat GPT.
function startGame() {
  gameOver = false;
  activeGame = true;
  // Hide the start screen
  var startScreen = document.getElementById("start");
  startScreen.style.display = "none";

  // Show the game screen
  var gameScreen = document.getElementById("game");
  gameScreen.style.display = "block";
  setInterval(showScore, 100);
  generateObstacle();

  document.addEventListener("keydown", control);
}

function loseGame() {
  gameOver = true;
  activeGame = false;
  // The following 1 line of code was adapted from https://www.youtube.com/watch?v=fYoFzkPC2O4&list=WL&index=24
  document.getElementById("end").style.visibility = "visible";
  finalScore = score;
  document.getElementById("endScore").innerHTML = finalScore;
}

function winGame() {
  gameOver = true;
  activeGame = false;
  // The following 1 line of code was adapted from https://www.youtube.com/watch?v=fYoFzkPC2O4&list=WL&index=24
  document.getElementById("win").style.visibility = "visible";
}

// character jump function
//The following 24 lines of code were adapted from https://www.youtube.com/watch?v=a0TyCnFgqlk&t=263s
function jump() {
  if (isJumping) return;
  upTime = setInterval(() => {
    //how high up the character jumps is the number currently at 300
    if (characterBottom >= groundHeight + 260) {
      clearInterval(upTime);
      downTime = setInterval(() => {
        if (characterBottom <= groundHeight) {
          clearInterval(downTime);
          isJumping = false;
        }
        //character bottom steers the fact that the character will move back down automatically. without this number the character moves up but never goes back down.
        characterBottom -= 4;
        character.style.bottom = characterBottom + "px";
        //the number below steers to slow down the speed of the landing of the character.
      }, 21);
    }
    //how fast the character jumps is the number 4 below
    characterBottom += 4;
    character.style.bottom = characterBottom + "px";
    isJumping = true;
    //the number below steers how fast the character flies up
  }, 21);
}

// function to show the score
// The following 4 lines of code were adapted from https://www.youtube.com/watch?v=IO1M_SO0ow4
function showScore() {
  if (!activeGame) return;
  score++;
  displayScore.innerText = score;
  // if you score 600 you win the game
  // The following 5 lines of code were added by courtesy of Chat GPT.
  if (score >= 600) {
    // call the function that handles winning the game
    winGame();
  }
}

// function to handle the ArrowUp key for jumping
//The following 5 lines of code were adapted from https://www.youtube.com/watch?v=a0TyCnFgqlk&t=263s
function control(e) {
  if (e.key === "ArrowUp") {
    jump();
  }
}

// function to reload the page
// The following 2 lines of code were adapted from https://www.youtube.com/watch?v=fYoFzkPC2O4&list=WL&index=24
function reload() {
  location.reload();
}
