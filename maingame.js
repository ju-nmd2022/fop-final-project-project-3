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
let displayScore = document.getElementById("score");
let score = 0;
let finalScore = 0;
let activeGame = true;
let gameOver = false; // Variable to track game state
let obstacles = []; // Array to store the obstacles

//function to generate the obstacles
function generateObstacle() {
  const obstacleArray = ["snail", "ladybug", "grasshopper", "bee", "fly"];
  let randomObstacle =
    obstacleArray[Math.floor(Math.random() * obstacleArray.length)];
  let obstacle = document.createElement("div");
  obstacle.setAttribute("class", "obstacle");

  obstacle.style.backgroundImage = "url('images/" + randomObstacle + ".png";
  obstacles.push(obstacle);
  document.querySelector(".obstacles").appendChild(obstacle);

  let obstacleRight = -100;
  let obstacleBottom = -25;
  let obstacleWidth = 200;
  let obstacleHeight = 200;

  // Set initial position and size
  obstacle.style.right = obstacleRight + "px";
  obstacle.style.bottom = obstacleBottom + "px";
  obstacle.style.width = obstacleWidth + "px";
  obstacle.style.height = obstacleHeight + "px";
  obstacle.style.border = "solid 0px black";
  obstacle.style.backgroundPosition = "top";

  function moveObstacle() {
    obstacleRight += 10;
    obstacle.style.right = obstacleRight + "px";

    // collision detection
    if (
      activeGame &&
      characterRight >= obstacleRight - characterWidth &&
      characterRight <= obstacleRight + 170 &&
      characterBottom + 30 <= obstacleBottom + obstacleHeight
    ) {
      // collision occurred, call loseGame function
      loseGame();
    }
  }

  setInterval(moveObstacle, 50);
  setTimeout(generateObstacle, Math.floor(Math.random() * 4000) + 3000);
}

// main function that manages intervals and event listeners
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
  document.getElementById("end").style.visibility = "visible";
  finalScore = score;
  document.getElementById("endScore").innerHTML = finalScore;
}

function winGame() {
  gameOver = true;
  activeGame = false;
  document.getElementById("win").style.visibility = "visible";
}

function jump() {
  if (isJumping) return;
  upTime = setInterval(() => {
    //how high up the character jumps is the number currently at 300
    if (characterBottom >= groundHeight + 300) {
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
    //the number below steers how fast the character lands currently at 15 ------------ same thing here. what's the difference?
  }, 21);
}

// function to show the score
function showScore() {
  if (!activeGame) return;
  score++;
  displayScore.innerText = score;
  // if you score 600 you win the game
  if (score >= 600) {
    // call the function that handles winning the game
    winGame();
  }
}

// function to handle the ArrowUp key for jumping
//what it means to have two == signs?
function control(e) {
  if (e.key === "ArrowUp") {
    jump();
  }
}

// function to reload the page
function reload() {
  location.reload();
}
