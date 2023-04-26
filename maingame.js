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
    if (characterBottom >= groundHeight + 150) {
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
    characterBottom += 10;
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
  let obstacleWidth = 30;
  let obstacleHeight = Math.floor(Math.random() * 40) + 20;

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
  if (e.key == 'ArrowUp' || e.key == ' ') {
    jump();
  }
}

//the keydown allows the character to jump when both the up arrow and space key is down apparently?
document.addEventListener('keydown', control);


//help we need: how to make less math.random obstacles have random distance between them
//how to make the obstacles appear as different characters between four or five png/jpg
//how do we go from the alert game over to the result screen and how does it show different results?
//if we want to keep the left and right movement then what must be done for it not to call game over if you move?
//the character hits the obstacle but it stops a bit before? why is that?
//the keydown allows the character to jump when both the up arrow and space key is down apparently? Where have I added that code?? :'D