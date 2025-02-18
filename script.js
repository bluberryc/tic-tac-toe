let board = ['', '', '', '', '', '', '', '', ''];
let playerTurn = true;  // true = Player (❤️), false = Robot (X)
let gameOver = false;

const statusText = document.getElementById('status-text');

function makeMove(index) {
  if (gameOver || board[index] !== '') return;
  board[index] = playerTurn ? '❤️' : 'X';
  updateBoard();
  if (checkWin('❤️')) {
    statusText.innerHTML = "You've won my heart!";
    gameOver = true;
    crossHearts();
  } else if (checkWin('X')) {
    gameOver = true;
  } else {
    playerTurn = !playerTurn;
    if (!playerTurn) robotMove();
  }
}

function robotMove() {
  const availableMoves = board.map((value, index) => value === '' ? index : -1).filter(index => index !== -1);
  let move = availableMoves[Math.floor(Math.random() * availableMoves.length)];
  board[move] = 'X';
  updateBoard();
  if (checkWin('X')) {
    gameOver = true;
  } else {
    playerTurn = true;
  }
}

function checkWin(player) {
  const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  return winningCombinations.some(combination => 
    combination.every(index => board[index] === player)
  );
}

function updateBoard() {
  board.forEach((cell, index) => {
    document.querySelectorAll('.cell')[index].innerText = cell;
  });
}

function crossHearts() {
  document.querySelectorAll('.cell').forEach((cell, index) => {
    if (board[index] === '❤️') {
      cell.style.textDecoration = 'line-through';
    }
  });
}

function resetGame() {
  board = ['', '', '', '', '', '', '', '', ''];
  playerTurn = true;
  gameOver = false;
  statusText.innerHTML = '';
  document.querySelectorAll('.cell').forEach(cell => {
    cell.innerText = '';
    cell.style.textDecoration = 'none';
  });
}
