let currentPlayer = 'X';
let board = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;
let playerNames = { X: 'Player 1', O: 'Player 2' };

const statusDisplay = document.getElementById('status');
const boardElement = document.getElementById('board');
const startScreen = document.getElementById('startScreen');
const gameScreen = document.getElementById('gameScreen');
const resultScreen = document.getElementById('resultScreen');
const resultMessage = document.getElementById('resultMessage');

function startGame() {
  const p1 = document.getElementById('player1').value.trim();
  const p2 = document.getElementById('player2').value.trim();

  if (!p1 || !p2) {
    alert("Please enter both player names.");
    return;
  }

  playerNames.X = p1;
  playerNames.O = p2;
  board = ['', '', '', '', '', '', '', '', ''];
  currentPlayer = 'X';
  gameActive = true;

  startScreen.classList.remove('active');
  gameScreen.classList.add('active');
  resultScreen.classList.remove('active');

  renderBoard();
  updateStatus();
}

function renderBoard() {
  boardElement.innerHTML = '';
  board.forEach((cell, index) => {
    const cellDiv = document.createElement('div');
    cellDiv.classList.add('cell');
    cellDiv.dataset.index = index;
    cellDiv.innerText = cell;
    cellDiv.addEventListener('click', handleCellClick);
    boardElement.appendChild(cellDiv);
  });
}

function handleCellClick(e) {
  const index = e.target.dataset.index;

  if (!gameActive || board[index]) return;

  board[index] = currentPlayer;
  e.target.innerText = currentPlayer;

  if (checkWin()) {
    showResult(`${playerNames[currentPlayer]} WINS!`);
    return;
  }

  if (!board.includes('')) {
    showResult("IT'S A DRAW!");
    return;
  }

  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  updateStatus();
}

function updateStatus() {
  statusDisplay.innerText = `PLAYER ${playerNames[currentPlayer].toUpperCase()}'S TURN`;
}

function checkWin() {
  const winPatterns = [
    [0,1,2], [3,4,5], [6,7,8],
    [0,3,6], [1,4,7], [2,5,8],
    [0,4,8], [2,4,6]
  ];

  return winPatterns.some(pattern => {
    return pattern.every(index => board[index] === currentPlayer);
  });
}

function showResult(message) {
  gameActive = false;
  gameScreen.classList.remove('active');
  resultMessage.innerText = message;
  resultScreen.classList.add('active');
}

function restartGame() {
  board = ['', '', '', '', '', '', '', '', ''];
  currentPlayer = 'X';
  gameActive = true;
  renderBoard();
  updateStatus();
}

function newGame() {
  document.getElementById('player1').value = '';
  document.getElementById('player2').value = '';
  resultScreen.classList.remove('active');
  startScreen.classList.add('active');
}
