const gameArea = document.getElementById('game-area');
const livesDisplay = document.getElementById('lives');
const scoreDisplay = document.getElementById('score');
const difficultySelect = document.getElementById('difficulty');
const popSound = new Audio('pop.mp3');
const failSound = new Audio('fail.mp3');

let lives = 3;
let score = 0;

function getTimeoutDuration() {
  const difficulty = difficultySelect.value;
  if (difficulty === "easy") return 3000;
  if (difficulty === "hard") return 500;
  return 1500; // normal
}

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
      failSound.play();
      lives--;
      livesDisplay.textContent = lives;
      if (lives === 0) {
        alert("u lost haha git gud. final score: " + score);
        location.reload();
      }
    }
  }, getTimeoutDuration());

  function handleClick(e) {
    e.preventDefault?.();
    clearTimeout(timeout);
    if (gameArea.contains(square)) {
      gameArea.removeChild(square);
      popSound.play();
      score++;
      scoreDisplay.textContent = score;
    }
  }

  square.addEventListener('click', handleClick);
  square.addEventListener('touchstart', handleClick, { passive: false });
}

let gameInterval;

document.getElementById('start-button').addEventListener('click', () => {
  if (gameInterval) return; // Evita doble clic
  gameInterval = setInterval(createSquare, 1200);
  document.getElementById('start-button').disabled = true; // Desactiva el botó
  difficultySelect.disabled = true; // Bloca la dificultat
});