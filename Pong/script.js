const canvas = document.getElementById('pongCanvas');
const ctx = canvas.getContext('2d');

canvas.width = 600;
canvas.height = 400;

const paddleWidth = 10, paddleHeight = 80;
const ballRadius = 8;
let ballX = canvas.width / 2, ballY = canvas.height / 2;
let ballSpeedX = 2; 
let ballSpeedY = 2; 

let player1Y = (canvas.height - paddleHeight) / 2;
let player2Y = (canvas.height - paddleHeight) / 2;

const playerSpeed = 25;

let player1Score = 0, player2Score = 0;
let totalGames = null, gameOver = false;
let isGameStarted = false;  // Variável para controlar o início do jogo

function updatePlayerNames() {
  const player1Name = document.getElementById('player1Name').value;
  const player2Name = document.getElementById('player2Name').value;
  
  document.getElementById('player1Display').textContent = player1Name;
  document.getElementById('player2Display').textContent = player2Name;
}

function resetBall() {
  ballX = canvas.width / 2;
  ballY = canvas.height / 2;
  ballSpeedX = -ballSpeedX;
}

function drawPaddle(x, y) {
  ctx.fillStyle = 'white';
  ctx.fillRect(x, y, paddleWidth, paddleHeight);
}

function drawBall() {
  ctx.beginPath();
  ctx.arc(ballX, ballY, ballRadius, 0, Math.PI * 2);
  ctx.fillStyle = 'white';
  ctx.fill();
  ctx.closePath();
}

function drawNet() {
  for (let i = 0; i < canvas.height; i += 30) {
    ctx.fillStyle = 'white';
    ctx.fillRect(canvas.width / 2 - 1, i, 2, 20);
  }
}

function updateGame() {
  if (!isGameStarted || gameOver) return;  // Checar se o jogo começou ou terminou

  ballX += ballSpeedX;
  ballY += ballSpeedY;

  if (ballY + ballRadius > canvas.height || ballY - ballRadius < 0) {
    ballSpeedY = -ballSpeedY;
  }

  if (ballX - ballRadius < 0) {
    player2Score++;
    document.getElementById('player2Score').textContent = player2Score;
    checkGameOver();
    resetBall();
  }

  if (ballX + ballRadius > canvas.width) {
    player1Score++;
    document.getElementById('player1Score').textContent = player1Score;
    checkGameOver();
    resetBall();
  }

  if (ballX - ballRadius < paddleWidth && ballY > player1Y && ballY < player1Y + paddleHeight) {
    ballSpeedX = -ballSpeedX;
  }
  
  if (ballX + ballRadius > canvas.width - paddleWidth && ballY > player2Y && ballY < player2Y + paddleHeight) {
    ballSpeedX = -ballSpeedX;
  }

  draw();
}

function checkGameOver() {
  if (player1Score >= totalGames || player2Score >= totalGames) {
    gameOver = true;
    alert(`Fim do jogo! ${player1Score >= totalGames ? document.getElementById('player1Name').value : document.getElementById('player2Name').value} venceu!`);
  }
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  drawNet();
  drawPaddle(0, player1Y); 
  drawPaddle(canvas.width - paddleWidth, player2Y); 
  drawBall();
}

function movePlayer1(e) {
  switch (e.key) {
    case 'w':
    case 'W':
      if (player1Y > 0) player1Y -= playerSpeed;
      break;
    case 's':
    case 'S':
      if (player1Y + paddleHeight < canvas.height) player1Y += playerSpeed;
      break;
  }
}

function movePlayer2(e) {
  switch (e.key) {
    case 'ArrowUp':
      if (player2Y > 0) player2Y -= playerSpeed;
      break;
    case 'ArrowDown':
      if (player2Y + paddleHeight < canvas.height) player2Y += playerSpeed;
      break;
  }
}

document.addEventListener('keydown', movePlayer1);
document.addEventListener('keydown', movePlayer2);

document.getElementById('startGame').addEventListener('click', function() {
  player1Score = 0;
  player2Score = 0;
  document.getElementById('player1Score').textContent = 0;
  document.getElementById('player2Score').textContent = 0;
  
  totalGames = parseInt(document.getElementById('numGames').value);
  gameOver = false;
  isGameStarted = true;  // Iniciar o jogo

  updatePlayerNames();
});

setInterval(updateGame, 1000 / 60);
