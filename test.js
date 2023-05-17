let character = document.getElementById('character');
let characterJump = document.getElementById('characterJump');
let characterBottom = parseInt(window.getComputedStyle(character).getPropertyValue('bottom'));
let characterRight = parseInt(window.getComputedStyle(character).getPropertyValue('right'));
let characterWidth = parseInt(window.getComputedStyle(character).getPropertyValue('width'));
let ground = document.getElementById('ground');
let groundBottom = parseInt(window.getComputedStyle(ground).getPropertyValue('bottom'));
let groundHeight = parseInt(window.getComputedStyle(ground).getPropertyValue('height'));
let isJumping = false;
let upTime;
let downTime;
let displayScore = document.getElementById('score');
let score = 0;
let finalScore = 0;
let activeGame = true;
let remainingLives = 5; // Number of lives remaining
let lives = document.getElementById('life');

// Jumping function
function jump() {
  if (isJumping) return;
  character.style.visibility = "hidden";
  characterJump.style.visibility = "visible"; 
  upTime = setInterval(() => {
    if (characterBottom >= groundHeight + 180) {
      clearInterval(upTime);
      downTime = setInterval(() => {
        if (characterBottom <= groundHeight + 10) {
          clearInterval(downTime);
          isJumping = false;
          character.style.visibility = "visible";
          characterJump.style.visibility = "hidden"; 
        }
        characterBottom -= 10;
        character.style.bottom = characterBottom + 'px';
      }, 15);
    }
    characterBottom += 10;
    character.style.bottom = characterBottom + 'px';
    isJumping = true;
  }, 15);
}

// Function to show the score
function showScore() {
  score++;
  displayScore.innerText = score;
}

// Function to generate obstacles
function generateObstacle() {
  let obstacles = document.querySelector('.obstacles');
  let obstacle = document.createElement('div');
  obstacle.setAttribute('class', 'obstacle');
  obstacles.appendChild(obstacle);

  let obstacleRight = -20;
  let obstacleBottom = 70;
  let obstacleWidth = 50;
  let obstacleHeight = 50;

  function moveObstacle() {
    obstacleRight += 15;
    obstacle.style.right = obstacleRight + 'px';
    obstacle.style.bottom = obstacleBottom + 'px';
    obstacle.style.width = obstacleWidth + 'px';
    obstacle.style.height = obstacleHeight + 'px';
    if (activeGame == true && characterRight >= obstacleRight - characterWidth && characterRight <= obstacleRight && characterBottom <= obstacleBottom + obstacleHeight) {
      remainingLives--; // Reduce the remaining lives
      if (remainingLives <= 0) {
        activeGame = false;
        document.getElementById("end").style.visibility = "visible";
        finalScore = score;
        document.getElementById("endScore").innerHTML = finalScore;
      } else {
        resetGame(); // Start over the game
        updateLifelines();
      }
    }
  }
  
  let obstacleInterval = setInterval(moveObstacle, 50);
  let obstacleTimeout = setTimeout(generateObstacle, Math.floor(Math.random() * 1000) + 400);
}

function updateLifelines() {
  const lifelineElements = document.getElementsByClassName('life');
  
  for (let i = 0; i < lifelineElements.length; i++) {
    if (i < remainingLives) {
      lifelineElements[i].style.opacity = 1; // Display lifeline
    } else {
      lifelineElements[i].style.opacity = 0; // Hide lifeline
    }
  }
}

// Main function that manages intervals and event listeners
function startGame() {
  setInterval(showScore, 100);
  generateObstacle();
  document.addEventListener('keydown', control);
}

// Function to handle the ArrowUp key for jumping
function control(e) {
  if (e.key == 'ArrowUp') {
    jump();
  }
}

// Function to reload the page
function reload() {
  location.reload();
}

function resetGame() {
  // Reset game variables and character position
  characterBottom = 70;
  character.style.bottom = characterBottom + 'px';

  // // Update the display of lifelines
  // updateLifelines();
}

startGame();