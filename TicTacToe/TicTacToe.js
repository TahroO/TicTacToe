var message = document.getElementById("message");
// 0 leer, 1 x, -1 o
var board = [
  [0, 0, 0],
  [0, 0, 0],
  [0, 0, 0]
];
var player = 1;
var fields = document.querySelectorAll(".field");

function startGame() {
  player = 1;
  board = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0]
  ];
  for (var i = 0; i < fields.length; i++) {
    fields[i].classList.remove("player-x", "player-o");
  }
  message.innerText = "Player X ist am Zug!";
}

function initialise() {
  for (var i = 0; i < fields.length; i++) {
    var fieldNow = fields[i];
    fieldNow.addEventListener('click', playerClick);
  }
}

function isValidMove(row, column) {
  return board[row][column] === 0;
}

function isWin() {
  // Check all values for each row.
  var diagonal1 = 0;
  var diagonal2 = 0;
  for (var i = 0; i < 3; i++) {
    var horizontal = 0;
    var vertical = 0;
    diagonal1 += board[i][i];
    diagonal2 += board[i][2 - i];
    for (var j = 0; j < 3; j++) {
      // summarize fields value
      horizontal += board[i][j];
      vertical += board[j][i];
    }
    if (Math.abs(horizontal) === 3 || Math.abs(vertical) === 3) {
      return true;
    }
  }
  return Math.abs(diagonal1) === 3 || Math.abs(diagonal2) === 3;
}

function isDraw() {
  var result = 0;
  for (var i = 0; i < 3; i++) {
    for (var j = 0; j < 3; j++) {
      result += Math.abs(board[i][j]);
    }
  }
  return result === 9;
}

function playerClick(event) {
  // Clicked table data element.
  var cell = event.target;
  // Row of clicked cell.
  var row = cell.dataset.row;
  // Column of clicked cell.
  var column = cell.dataset.column;
  if (isValidMove(row, column) && !isWin() && !isDraw()) {
    // Update class names.
    var playerClass = player === 1 ? "player-x" : "player-o";
    cell.classList.add(playerClass);
    // Update array.
    board[row][column] = player;
    var playerName = player === 1 ? "X" : "O";
    // Check win conditions.
    if(isWin())
    {
      message.innerText = "Player " + playerName + " hat gewonnen!";
      return;
    }
    if(isDraw())
    {
      message.innerText = "Draw!";
      return;
    }
    // Toggle player.
    player *= -1;
    message.innerText = "Player " + playerName + " ist am Zug!";
  }

}

initialise();


