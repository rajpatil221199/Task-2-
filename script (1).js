const board = document.getElementById('board');
const status = document.getElementById('status');
const resetBtn = document.getElementById('reset-btn');
const clickSound = document.getElementById('click-sound');
const winSound = document.getElementById('win-sound');
const gameOverSound = document.getElementById('game-over-sound');

let currentPlayer = 'X';
let gameState = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function handleCellClick(index) {
    if (gameState[index] !== '' || !gameActive) return;

    gameState[index] = currentPlayer;
    renderBoard();
    handleResultValidation();
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    clickSound.play();
}

function handleResultValidation() {
    for (let i = 0; i < winningConditions.length; i++) {
        const [a, b, c] = winningConditions[i];
        if (gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c]) {
            status.textContent = `${currentPlayer} wins!`;
            gameActive = false;
            winSound.play();
            return;
        }
    }

    if (!gameState.includes('')) {
        status.textContent = 'It\'s a draw!';
        gameActive = false;
        gameOverSound.play();
        return;
    }

    status.textContent = `${currentPlayer}'s turn`;
}

function renderBoard() {
    board.innerHTML = '';
    gameState.forEach((cell, index) => {
        const cellElement = document.createElement('div');
        cellElement.classList.add('square');
        cellElement.textContent = cell;
        cellElement.addEventListener('click', () => handleCellClick(index));
        board.appendChild(cellElement);
    });
}

function resetGame() {
    currentPlayer = 'X';
    gameState = ['', '', '', '', '', '', '', '', ''];
    gameActive = true;
    status.textContent = `${currentPlayer}'s turn`;
    renderBoard();
}

resetBtn.addEventListener('click', resetGame);

resetGame();
