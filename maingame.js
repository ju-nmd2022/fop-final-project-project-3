let character = document.getElementById('character')
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

//jumping function
function jump() {
  if(isJumping) return;
  upTime = setInterval(() => {
//how high up the character jumps is the number currently at 150
    if (characterBottom >= groundHeight + 180) {
      clearInterval(upTime);
      downTime = setInterval(() => {
        //the number 10 below makes sure the character lands on the grass
        if(characterBottom <= groundHeight + 10) {
          clearInterval(downTime);
          isJumping = false;
        }
      characterBottom -= 10;
      character.style.bottom = characterBottom + 'px';
    //the number below steers how fast the character lands currently at 20
    }, 15);
  }
  //how high the character jumps is the number 10 below
    characterBottom += 10;
    character.style.bottom = characterBottom + 'px';
    isJumping = true;
//the number below steers how fast the character lands currently at 20
  }, 15);
}

//this shows the high score in the top left corner
function showScore() {
  score++;
  displayScore.innerText = score;
}

setInterval(showScore, 100);

//this is the random way to display the obstacles. 
function generateObstacle(){
  let obstacles = document.querySelector('.obstacles');
  let obstacle = document.createElement('div');
  obstacle.setAttribute('class', 'obstacle');
  obstacles.appendChild(obstacle);

  let obstacleRight = -20;
  let obstacleBottom = 70;
  let obstacleWidth = 50;
  let obstacleHeight = 50;

  function moveObstacle(){
  //the number below 15 lets us know how fast or slow it goes in a way...
    obstacleRight += 15;
    obstacle.style.right = obstacleRight + 'px';
    obstacle.style.bottom = obstacleBottom + 'px';
    obstacle.style.width = obstacleWidth + 'px';
    obstacle.style.height = obstacleHeight + 'px';
    if(activeGame == true && characterRight >= obstacleRight - characterWidth && characterRight <= 
      obstacleRight && characterBottom <= obstacleBottom + obstacleHeight) {
      // alert('Game Over! Your score is: '+score);
      activeGame = false;
      document.getElementById("end").style.visibility = "visible";
      //fix so that the counter stops
      finalScore = score;
      document.getElementById("endScore").innerHTML = finalScore;
      // clearInterval(obstacleInterval);
      // clearTimeout(obstacleTimeout);
    }
  }
  let obstacleInterval = setInterval(moveObstacle, 50);
  let obstacleTimeout = setTimeout(generateObstacle, Math.floor(Math.random() * 1000) + 500);
}

generateObstacle();

//this is the control function of the arrowup key to make the character jump
function control(e) {
  if (e.key == 'ArrowUp') {
    jump();
  }
}

//the keydown allows the character to jump when the up arrow is down.
document.addEventListener('keydown', control);

function reload() {
  location.reload();
}

//add background image here to make it stop when the rabbit dies.
//change source attribute for rabbit, sprite.
//max lives and min lives loop life number, paint pictures next to eachother
//request animation frame (for intervals)-put all interval function into one (draw)

//how to use parallax effect for a number of images to move with different speeds?
//how do we add lives: 5 at the top right corner and how do you code so when you die you lose a life?
//how do we create an interval function to put all interval into one function?
//how do we make the rabbit into a sprite? we have him normal, jumping with paws out and one where he's dead
//the counter won't stop on the result screen

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