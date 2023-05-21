let character = document.getElementById("character");
// let characterJump = document.getElementById("characterJump");
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
let gameOver = false; // New variable to track game state

// function startGame() {
//   var startScreen = document.getElementById("start");
//   var gameScreen = document.getElementById("game");
//   // Hide the start screen
//   startScreen.style.display = "none";

//   // Show the game screen
//   gameScreen.style.display = "block";

//   // Call our game initialization code or start the game here
//   playGame();
// }

// document.addEventListener("DOMContentLoaded", startGame);

// function playGame() {

// }

function jump() {
  if (isJumping) return;
  upTime = setInterval(() => {
    //how high up the character jumps is the number currently at 350
    if (characterBottom >= groundHeight + 350) {
      clearInterval(upTime);
      downTime = setInterval(() => {
        //the number 90 below makes sure the character lands on the same height
        if (characterBottom <= groundHeight + 90) {
          clearInterval(downTime);
          isJumping = false;
        }
        //Character bottom steers the fact that the character will move back down automatically. without this number the character moves up but never goes back down.
        characterBottom -= 5;
        character.style.bottom = characterBottom + "px";
        //the number below steers to slow down the speed of the landing of the character.
      }, 15);
    }
    //how fast the character jumps is the number 5 below
    characterBottom += 5;
    character.style.bottom = characterBottom + "px";
    isJumping = true;
    //the number below steers how fast the character lands currently at 15 ------------ same thing here. what's the difference?
  }, 15);
}

// Function to show the score
function showScore() {
  if (gameOver) return;
  score++;
  displayScore.innerText = score;
  //change score from 100 to 600!!!! 
  if (score >= 100) {
    // Call the function that handles winning the game
    winGame();
  }
}

//Function to generate a second obstacle
// function generateObstacleTwo() {
//   let obstaclesTwo = document.querySelector(".obstaclesTwo");
//   let obstacleTwo = document.createElement("div");
//   obstacleTwo.setAttribute("class", "obstaclesTwo");
//   obstaclesTwo.appendChild(obstacleTwo);

//   let obstacleTwoRight = -200;
//   let obstacleTwoBottom = -30;
//   let obstacleTwoWidth = 200;
//   let obstacleTwoHeight = 200;

//   function moveObstacleTwo() {
//     //Number 10 decides how quick the obstacles move
//     obstacleTwoRight += 10;
//     obstacleTwo.style.right = obstacleTwoRight + "px";
//     obstacleTwo.style.bottom = obstacleTwoBottom + "px";
//     obstacleTwo.style.width = obstacleTwoWidth + "px";
//     obstacleTwo.style.height = obstacleTwoHeight + "px";
//     // Check for collision using the modified hitbox values
//     if (
//       activeGame == true &&
//       characterRight >= obstacleTwoRight - characterWidth &&
//       characterRight <= obstacleTwoRight &&
//       characterBottom <= obstacleTwoBottom + obstacleTwoHeight
//     ) {
//       gameOver = true;
//       activeGame = false;
//       document.getElementById("end").style.visibility = "visible";
//       finalScore = score;
//       document.getElementById("endScore").innerHTML = finalScore;
//     }
//   }

//   let obstacleTwoInterval = setInterval(moveObstacleTwo, 100);
//   let obstacleTwoTimeout = setTimeout(
//     generateObstacleTwo,
//     Math.floor(Math.random() * 3000) + 4000
//   );
// }

//Function to generate the snail
function generateObstacle() {
  let obstacles = document.querySelector(".obstacles");
  let obstacle = document.createElement("div");
  obstacle.setAttribute("class", "obstacle");
  obstacles.appendChild(obstacle);

  let obstacleRight = -270;
  let obstacleBottom = -30;
  let obstacleWidth = 200;
  let obstacleHeight = 200;

  function moveObstacle() {
    //Number 10 decides how quick the obstacles move
    obstacleRight += 10;
    obstacle.style.right = obstacleRight + "px";
    obstacle.style.bottom = obstacleBottom + "px";
    obstacle.style.width = obstacleWidth + "px";
    obstacle.style.height = obstacleHeight + "px";
    if (
      activeGame == true &&
      characterRight >= obstacleRight - characterWidth &&
      characterRight <= obstacleRight &&
      characterBottom <= obstacleBottom + obstacleHeight
    ) {
      gameOver = true;
      activeGame = false;
      document.getElementById("end").style.visibility = "visible";
      finalScore = score;
      document.getElementById("endScore").innerHTML = finalScore;
    }
  }

  let obstacleInterval = setInterval(moveObstacle, 50);
  let obstacleTimeout = setTimeout(
    generateObstacle,
    Math.floor(Math.random() * 4000) + 3000
  );
}

// Main function that manages intervals and event listeners
function startGame() {
  setInterval(showScore, 100);
  generateObstacle();
  document.addEventListener("keydown", control);
}

// Function to handle the ArrowUp key for jumping
function control(e) {
  if (e.key == "ArrowUp") {
    jump();
  }
}

function winGame() {
  // Display a message or perform any other actions for winning the game
  gameOver = true;
  activeGame = false;
  document.getElementById("win").style.visibility = "visible";
}

// Function to reload the page
function reload() {
  location.reload();
}

startGame();

// In this version, the startGame() function is the main function that encapsulates the intervals and event listeners. It is responsible for starting the game and managing the intervals for showing the score and generating obstacles. The control() function is also included in the startGame() function, which handles the ArrowUp key event for jumping.
// By calling the startGame() function, you initiate the game and all the necessary intervals and

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

// ta bort ett liv + en bild(child)
// i krock if
// if liv = 0 då visar vi endgame.
