const cells = document.querySelectorAll('.cell');
const resetButton = document.getElementById('reset-button');
const playerX = document.getElementById('playerX');
const playerO = document.getElementById('playerO');
let currentPlayer = 'X';

function handleClick(event) {
    const cell = event.target;
    if (cell.dataset.player) return;
    cell.dataset.player = currentPlayer;
    cell.textContent = currentPlayer;

    if (checkWin(currentPlayer)) {
        setTimeout(() => {
            alert(`${currentPlayer} wins!`);
            resetGame();
        }, 100);
    } else if (checkDraw()) {
        setTimeout(() => {
            alert('It\'s a draw!');
            resetGame();
        }, 100);
    } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        updatePlayerTurn();
    }
}

function checkWin(player) {
    const winConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    return winConditions.some(condition => {
        return (
            cells[condition[0]].dataset.player === player &&
            cells[condition[1]].dataset.player === player &&
            cells[condition[2]].dataset.player === player
        );
    });
}

function checkDraw() {
    return [...cells].every(cell => cell.dataset.player);
}

function resetGame() {
    currentPlayer = 'X';
    cells.forEach(cell => {
        cell.dataset.player = '';
        cell.textContent = '';
    });
    updatePlayerTurn();
}

function updatePlayerTurn() {
    if (currentPlayer === 'X') {
        playerX.textContent = "Player X's Turn";
        playerO.textContent = "Player O";
    } else {
        playerO.textContent = "Player O's Turn";
        playerX.textContent = "Player X";
    }
}

cells.forEach(cell => cell.addEventListener('click', handleClick));
resetButton.addEventListener('click', resetGame);

updatePlayerTurn();
