function startGame() {
    var startScreen = document.getElementById('start-screen');
    var gameScreen = document.getElementById('game-screen');
  
    // Hide the start screen
    startScreen.style.display = 'none';
  
    // Show the game screen
    gameScreen.style.display = 'block';
  
    // Call your game initialization code or start the game here
    // For example:
    initializeGame();
  }
  
  function initializeGame() {
    // Your game initialization code goes here
    console.log('Game initialized!');
  }