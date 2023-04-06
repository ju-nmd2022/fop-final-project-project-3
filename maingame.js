let modifier = 50;
let player = document.getElementById('character');

window.addEventListener('keydown', (event) => {
  switch (event.key) {
    case 'ArrowRight':
      player.style.left = (parseInt(getComputedStyle(player).left) + modifier) + "px";
      break;
    case 'ArrowLeft':
      player.style.left = (parseInt(getComputedStyle(player).left) - modifier) + "px";
      break;
  }
});
