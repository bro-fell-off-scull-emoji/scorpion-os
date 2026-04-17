const boardElement = document.getElementById('board');
const statusElement = document.getElementById('status');
const resetBtn = document.getElementById('resetBtn');
const cells = document.querySelectorAll('.cell');

let currentPlayer = "X"; // Human is always X
let gameState = ["", "", "", "", "", "", "", "", ""];
let gameActive = true;

const winningConditions = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
];

function handleCellClick(e) {
    const clickedCell = e.target;
    const clickedIndex = parseInt(clickedCell.getAttribute('data-index'));

    // If spot is taken, game is over, or it's CPU's turn, ignore click
    if (gameState[clickedIndex] !== "" || !gameActive || currentPlayer === "O") return;

    makeMove(clickedIndex, "X");

    if (gameActive) {
        statusElement.innerText = "CPU is thinking...";
        // Delay CPU move slightly so it doesn't feel instant/robotic
        setTimeout(computerMove, 600);
    }
}

function computerMove() {
    if (!gameActive) return;

    // 1. Find all empty indices
    const availableMoves = gameState
        .map((val, index) => val === "" ? index : null)
        .filter(val => val !== null);

    if (availableMoves.length > 0) {
        // 2. Pick a random one
        const randomIndex = availableMoves[Math.floor(Math.random() * availableMoves.length)];
        makeMove(randomIndex, "O");
    }
}

function makeMove(index, player) {
    gameState[index] = player;
    const cell = document.querySelector(`[data-index='${index}']`);
    cell.innerText = player;
    cell.classList.add(player.toLowerCase(), 'taken');

    checkResult();
}

function checkResult() {
    let roundWon = false;
    for (let condition of winningConditions) {
        const [a, b, c] = condition;
        if (gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c]) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        statusElement.innerText = currentPlayer === "X" ? "You Won! 🎉" : "CPU Wins! 🤖";
        gameActive = false;
        return;
    }

    if (!gameState.includes("")) {
        statusElement.innerText = "It's a Draw!";
        gameActive = false;
        return;
    }

    // Toggle turn
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    if (currentPlayer === "X") {
        statusElement.innerText = "Your Turn (X)";
    }
}

function restartGame() {
    currentPlayer = "X";
    gameState = ["", "", "", "", "", "", "", "", ""];
    gameActive = true;
    statusElement.innerText = "Your Turn (X)";
    cells.forEach(cell => {
        cell.innerText = "";
        cell.classList.remove('x', 'o', 'taken');
    });
}

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
resetBtn.addEventListener('click', restartGame);
