var message = document.getElementById("message");
var board = null;
var player = 1;
// Reference all div fields.
var fields = document.querySelectorAll(".field");
// Preventing clicks if game is not running.
var isRunning = false;
// Values to store in field when clicked depending on player.
var PLAYER_X = 1, PLAYER_Y = -1;

function startGame() {
    // Hide start button.
    document.body.classList.add("running");
    isRunning = true;
    // Set default player to x.
    player = PLAYER_X;
    board = [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0]
    ];
    // Clear board.
    for (var i = 0; i < fields.length; i++) {
        fields[i].classList.remove("player-x", "player-o");
    }
    message.innerText = "Player X ist am Zug!";
}

function stopGame(text) {
    // Stop game after win or draw, show play button again.
    document.body.classList.remove("running");
    message.innerText = text;
    isRunning = false;
}

function initialise() {
    // Add event listener to all fields.
    for (var i = 0; i < fields.length; i++) {
        var fieldNow = fields[i];
        fieldNow.addEventListener("click", playerClick);
    }
}

function isValidMove(row, column) {
    // Check if field is free and game is running.
    return board[row][column] === 0 && isRunning;
}

function isWin() {
    // Player represented by values +1 and -1.
    // Sum for win condition is 3 in absolute values.
    var diagonal1 = 0;
    var diagonal2 = 0;
    for (var i = 0; i < 3; i++) {
        var horizontal = 0;
        var vertical = 0;
        // Coordinates 0,0 / 1,1 / 2,2.
        diagonal1 += board[i][i];
        // Coordinates 0,2 / 1,1 / 2,0.
        diagonal2 += board[i][2 - i];
        for (var j = 0; j < 3; j++) {
            // Summarize horizontal and vertical fields values.
            // 9 Loops for each field.
            horizontal += board[i][j];
            vertical += board[j][i];
        }
        // Sum values are converted to absolute values / always positive.
        // If a sum of 3 is reached -> is win.
        if (Math.abs(horizontal) === 3 || Math.abs(vertical) === 3) {
            return true;
        }
    }
    return Math.abs(diagonal1) === 3 || Math.abs(diagonal2) === 3;
}

function isDraw() {
    // Check all values of fields, storing result in absolute values.
    var result = 0;
    for (var i = 0; i < 3; i++) {
        for (var j = 0; j < 3; j++) {
            result += Math.abs(board[i][j]);
        }
    }
    // All fields clicked -> sum of all absolute values = 9
    // and not isWin comes true.
    return result === 9;
}

function playerClick(event) {
    // Clicked field.
    var cell = event.target;
    // Field coordinates set in div containers -> data row, data column.
    var row = parseInt(cell.dataset.row);
    var column = parseInt(cell.dataset.column);
    if (isValidMove(row, column)) {
        // Determining current players class.
        var playerClass = player === PLAYER_X ? "player-x" : "player-o";
        // Add current player class to field.
        cell.classList.add(playerClass);
        // Storing current player value in field.
        board[row][column] = player;
        // If win stop game.
        if (isWin()) {
            stopGame("Player " + (player === PLAYER_X ? "X" : "O") + " hat gewonnen!");
            return;
        }
        // If draw stop game.
        if (isDraw()) {
            stopGame("Draw!");
            return;
        }
        // Toggle player each turn.
        player *= -1;
        // Display current player.
        message.innerText = "Player " + (player === PLAYER_X ? "X" : "O") + " ist am Zug!";
    }
}

// Initialise event listener on fields.
initialise();


