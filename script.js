const gameArea = document.getElementById('game-area');
const livesDisplay = document.getElementById('lives');
const scoreDisplay = document.getElementById('score');

let lives = 3;
let score = 0;

function createSquare() {
  const square = document.createElement('div');
  square.classList.add('square');

  const x = Math.random() * (gameArea.clientWidth - 50);
  const y = Math.random() * (gameArea.clientHeight - 50);
  square.style.left = `${x}px`;
  square.style.top = `${y}px`;

  gameArea.appendChild(square);

  const timeout = setTimeout(() => {
    if (gameArea.contains(square)) {
      gameArea.removeChild(square);
      lives--;
      livesDisplay.textContent = lives;
      if (lives === 0) {
        alert("you lost haha git gud. final score: " + score);
        location.reload();
      }
    }
  }, 1000);

  function handleClick(e) {
    e.preventDefault?.();
    clearTimeout(timeout);
    if (gameArea.contains(square)) {
      gameArea.removeChild(square);
      score++;
      scoreDisplay.textContent = score;
    }
  }

  square.addEventListener('click', handleClick);
  square.addEventListener('touchstart', handleClick, { passive: false });
}

setInterval(createSquare, 1200);