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

//function to generate the snail
function generateObstacle() {
  let obstacle = document.createElement("div");
  obstacle.setAttribute("class", "obstacle");
  obstacles.push(obstacle);
  document.querySelector(".obstacles").appendChild(obstacle);

  let obstacleRight = -170;
  let obstacleBottom = -30;
  let obstacleWidth = 220;
  let obstacleHeight = 220;

  // Set initial position and size
  obstacle.style.right = obstacleRight + "px";
  obstacle.style.bottom = obstacleBottom + "px";
  obstacle.style.width = obstacleWidth + "px";
  obstacle.style.height = obstacleHeight + "px";

  function moveObstacle() {
    obstacleRight += 10;
    obstacle.style.right = obstacleRight + "px";

    // collision detection
    if (
      activeGame &&
      characterRight >= obstacleRight - characterWidth &&
      characterRight <= obstacleRight +150 &&
      characterBottom <= obstacleBottom + obstacleHeight
    ) {
      // collision occurred, call loseGame function
      loseGame();
    }

    if (parseInt(obstacle.style.right) >= window.innerWidth) {
      obstacle.parentNode.removeChild(obstacle);
      obstacles.splice(obstacles.indexOf(obstacle), 1);
    }
  }

setInterval(moveObstacle, 50);
setTimeout(
    generateObstacle,
    Math.floor(Math.random() * 4000) + 3000
  );
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
    //how high up the character jumps is the number currently at 350
    if (characterBottom >= groundHeight + 400) {
      clearInterval(upTime);
      downTime = setInterval(() => {
        //the number 90 below makes sure the character lands on the same height
        if (characterBottom <= groundHeight) {
          clearInterval(downTime);
          isJumping = false;
        }
        //character bottom steers the fact that the character will move back down automatically. without this number the character moves up but never goes back down.
        characterBottom -= 5;
        character.style.bottom = characterBottom + "px";
        //the number below steers to slow down the speed of the landing of the character.
      }, 21);
    }
    //how fast the character jumps is the number 5 below
    characterBottom += 3;
    character.style.bottom = characterBottom + "px";
    isJumping = true;
    //the number below steers how fast the character lands currently at 15 ------------ same thing here. what's the difference?
  }, 21);
}

// function to show the score
function showScore() {
  if (!activeGame) return;
  // if (gameOver) return;
  score++;
  displayScore.innerText = score;
  //change score from 100 to 600 before sending in the game!!!! 
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

  // let obstacleSources = [
  //   "images/snail.png",
  //   "images/ladybug.png",
  //   "images/fly.png",
  // ];

  // // Select a random obstacle source
  // let randomSource = obstacleSources[Math.floor(Math.random() * obstacleSources.length)];

  // let obstacle = document.createElement("div");
  // obstacle.setAttribute("class", "obstacle");
  // obstacle.style.backgroundImage = `url(${randomSource})`;
  // obstacles.push(obstacle);
  // document.querySelector(".obstacles").appendChild(obstacle);

  // let obstacleRight = -270;
  // let obstacleBottom = -30;
  // // let obstacleWidth = 200;
  // // let obstacleHeight = 200;
  // var obstacleWidth = randomObstacle.width;
  // var obstacleHeight = randomObstacle.height;

  // function moveObstacle() {
  //   obstacleRight += 10;
  //   obstacle.style.right = obstacleRight + "px";
  //   obstacle.style.bottom = obstacleBottom + "px";
  //   obstacle.style.width = obstacleWidth + "px";
  //   obstacle.style.height = obstacleHeight + "px";

  //   // Collision detection
  //   if (
  //     activeGame &&
  //     characterRight >= obstacleRight - characterWidth &&
  //     characterRight <= obstacleRight &&
  //     characterBottom <= obstacleBottom + obstacleHeight
  //   ) {
  //     // Collision occurred, call loseGame function
  //     loseGame();
  //   }
  // }

  // let obstacleInterval = setInterval(moveObstacle, 50);
  // let obstacleTimeout = setTimeout(
  //   generateObstacle,
  //   Math.floor(Math.random() * 4000) + 3000
  // );




// Old code
// let character = document.getElementById('character')
// let characterBottom = parseInt(window.getComputedStyle(character).getPropertyValue('bottom'));
// let characterRight = parseInt(window.getComputedStyle(character).getPropertyValue('right'));
// let characterWidth = parseInt(window.getComputedStyle(character).getPropertyValue('width'));
// let ground = document.getElementById('ground');
// let groundBottom = parseInt(window.getComputedStyle(ground).getPropertyValue('bottom'));
// let groundHeight = parseInt(window.getComputedStyle(ground).getPropertyValue('height'));
// let isJumping = false;
// let upTime;
// let downTime;
// let displayScore = document.getElementById('score');
// let score = 0;
// let finalScore = 0;
// let activeGame = true;

// //jumping function
// function jump() {
//   if(isJumping) return;
//   upTime = setInterval(() => {
// //how high up the character jumps is the number currently at 150
//     if (characterBottom >= groundHeight + 180) {
//       clearInterval(upTime);
//       downTime = setInterval(() => {
//         //the number 10 below makes sure the character lands on the grass
//         if(characterBottom <= groundHeight + 10) {
//           clearInterval(downTime);
//           isJumping = false;
//         }
//       characterBottom -= 10;
//       character.style.bottom = characterBottom + 'px';
//     //the number below steers how fast the character lands currently at 20
//     }, 15);
//   }
//   //how high the character jumps is the number 10 below
//     characterBottom += 10;
//     character.style.bottom = characterBottom + 'px';
//     isJumping = true;
// //the number below steers how fast the character lands currently at 20
//   }, 15);
// }

// //this shows the high score in the top left corner
// function showScore() {
//   score++;
//   displayScore.innerText = score;
// }

// setInterval(showScore, 100);

// //this is the random way to display the obstacles.
// function generateObstacle(){
//   let obstacles = document.querySelector('.obstacles');
//   let obstacle = document.createElement('div');
//   obstacle.setAttribute('class', 'obstacle');
//   obstacles.appendChild(obstacle);

//   let obstacleRight = -20;
//   let obstacleBottom = 70;
//   let obstacleWidth = 50;
//   let obstacleHeight = 50;

//   function moveObstacle(){
//     obstacleRight += 15;
//     obstacle.style.right = obstacleRight + 'px';
//     obstacle.style.bottom = obstacleBottom + 'px';
//     obstacle.style.width = obstacleWidth + 'px';
//     obstacle.style.height = obstacleHeight + 'px';
//     if(activeGame == true && characterRight >= obstacleRight - characterWidth && characterRight <=
//       obstacleRight && characterBottom <= obstacleBottom + obstacleHeight) {
//       activeGame = false;
//       document.getElementById("end").style.visibility = "visible";
//       finalScore = score;
//       document.getElementById("endScore").innerHTML = finalScore;
//     }
//   }
//   let obstacleInterval = setInterval(moveObstacle, 50);
//   let obstacleTimeout = setTimeout(generateObstacle, Math.floor(Math.random() * 1000) + 400);
// }

// generateObstacle();

// //this is the control function of the arrowup key to make the character jump
// function control(e) {
//   if (e.key == 'ArrowUp') {
//     jump();
//   }
// }

// //the keydown allows the character to jump when the up arrow is down.
// document.addEventListener('keydown', control);

// function reload() {
//   location.reload();
// }

//add background image here to make it stop when the rabbit dies.
//max lives and min lives loop life number, paint pictures next to eachother
//request animation frame (for intervals)-put all interval function into one (draw)
//how do we add lives: 5 at the top right corner and how do you code so when you die you lose a life?
//how do we make the rabbit into a sprite? we have him normal, jumping with paws out and one where he's dead

//if we want our rabbit to move left and right
// let modifier = 20;
// // moving left and right
// window.addEventListener('keydown', (event) => {
//   switch (event.key) {
//     case 'ArrowRight':
//       character.style.left = (parseInt(getComputedStyle(character).left) + modifier) + "px";
//       break;
//     case 'ArrowLeft':
//       character.style.left = (parseInt(getComputedStyle(character).left) - modifier) + "px";
//       break;
//   }
// });
