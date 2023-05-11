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
    }, 20);
  }
  //how high the character jumps is the number 10 below
    characterBottom += 15;
    character.style.bottom = characterBottom + 'px';
    isJumping = true;
//the number below steers how fast the character lands currently at 20
  }, 20);
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
  // Math.floor(Math.random() * 40) + 20; this one we will use instead how often the obstacles show up

  function moveObstacle(){
  //the number below 15 lets us know how fast or slow it goes in a way...
    obstacleRight += 15;
    obstacle.style.right = obstacleRight + 'px';
    obstacle.style.bottom = obstacleBottom + 'px';
    obstacle.style.width = obstacleWidth + 'px';
    obstacle.style.height = obstacleHeight + 'px';
    if(characterRight >= obstacleRight - characterWidth && characterRight <= 
      obstacleRight + obstacleWidth && characterBottom <= obstacleBottom + obstacleHeight) {
      alert('Game Over! Your score is: '+score);
      clearInterval(obstacleInterval);
      clearTimeout(obstacleTimeout);
      location.reload();
    }
  }
  let obstacleInterval = setInterval(moveObstacle, 50);
  let obstacleTimeout = setTimeout(generateObstacle, 1000);
}

generateObstacle();

//this is the control function of the arrowup key to make the character jump
function control(e) {
  if (e.key == 'ArrowUp') {
    jump();
  }
}

//the keydown allows the character to jump when both the up arrow and space key is down apparently?
document.addEventListener('keydown', control);

//how to use math.random to have the obstacles appear with random distance between
//how to make the obstacles appear as different characters between four or five png/jpg
//if we want to keep the left and right movement then what must be done for it not to call game over if you move?
//the character hits the obstacle but it stops a bit before? how do we change that?
//how do we make a five life with the hearts that removes them, what code can we use?

//add background image here to make it stop when the rabbit dies.