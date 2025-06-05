const gameArea = document.getElementById('game-area');
const livesDisplay = document.getElementById('lives');
const scoreDisplay = document.getElementById('score');
const difficultySelect = document.getElementById('difficulty');
const popSound = new Audio('pop.mp3');
const failSound = new Audio('fail.mp3');
const highScoreDisplay = document.getElementById('high-score');
let highScore = localStorage.getItem('highScore') || 0;
highScoreDisplay.textContent = highScore;


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
  let clicked = false;


  const x = Math.random() * (gameArea.clientWidth - 50);
  const y = Math.random() * (gameArea.clientHeight - 50);
  square.style.left = `${x}px`;
  square.style.top = `${y}px`;

  gameArea.appendChild(square);

  const timeout = setTimeout(() => {
    if (gameArea.contains(square)) {
      gameArea.removeChild(square);
      failSound.play();
      gameArea.classList.add('shake');
      setTimeout(() => gameArea.classList.remove('shake'), 300);
      lives--;
      livesDisplay.textContent = lives;

      if (lives === 0) {
        alert("u lost haha git gud. final score: " + score);
        location.reload();
      }
    }
  }, getTimeoutDuration());

  function handleClick(e) {
    if (clicked) return;
    clicked = true;
    e.preventDefault?.();
    clearTimeout(timeout);
    if (gameArea.contains(square)) {
      square.classList.add('hit');
setTimeout(() => {
  if (gameArea.contains(square)) {
    gameArea.removeChild(square);
  }
}, 200);

      popSound.play();
      score++;
      scoreDisplay.textContent = score;
    }
  if (score > highScore) {
  highScore = score;
  highScoreDisplay.textContent = highScore;
  localStorage.setItem('highScore', highScore);
    }
  }

  square.addEventListener('click', handleClick);
  square.addEventListener('touchstart', handleClick, { passive: false });
}

let gameInterval;

document.getElementById('start-button').addEventListener('click', () => {
  if (gameInterval) return;
  gameInterval = setInterval(createSquare, 1200);
  document.getElementById('start-button').disabled = true;
  difficultySelect.disabled = true;
});

// Disable double-tap zoom on iOS
let lastTouch = 0;
gameArea.addEventListener('touchend', (e) => {
  const now = new Date().getTime();
  if (now - lastTouch <= 300) {
    e.preventDefault();
  }
  lastTouch = now;
});

document.getElementById('reset-high-score').addEventListener('click', () => {
  const confirmReset = confirm("are you sure you want to reset the high score?");
  if (confirmReset) {
    localStorage.removeItem('highScore');
    highScore = 0;
    highScoreDisplay.textContent = highScore;
  }
});
