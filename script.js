
let player1 = document.getElementById('player1');
let player2 = document.getElementById('player2');

let cells = document.querySelectorAll('[data-cell]');
let resetBtn = document.getElementById('resetBtn');
let playAgainBtn = document.getElementById('playAgainBtn');
let popupModal = document.getElementById('popupModal');
let overLay = document.getElementById('overLay');
let endMessage = document.getElementById('popup_message');

let cellRow = document.getElementById('row');

let playerX = 'X';
let playerO = 'O';
let currentPlayer = playerX;
let isPlaying = true;

let gameBoard = ['', '', '', '', '', '', '', '', ''];

const winningCombination = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8], // Diagonal
    [2, 4, 6]
];

// Get the click of cell
cells.forEach(cell => cell.addEventListener('click', handleClickCell, { once: true }));

// Function to handle the click of cell
function handleClickCell(event) {
    const cell = event.target;
    const cellIndex = Array.from(cells).indexOf(cell);

    if (cell.innerHTML === '' && isPlaying) {
        cell.innerHTML = currentPlayer;
        gameBoard[cellIndex] = currentPlayer;
        checkWinner();
    }
}

// Handle current player
function switchPlayer() {
    currentPlayer = currentPlayer === playerX ? playerO : playerX;
    player1.innerHTML = `${currentPlayer}'s Turn`;
}

// Function to check winner
function checkWinner() {
    let won = false;

    for (let i = 0; i < winningCombination.length; i++) {
        const [a, b, c] = winningCombination[i];
        let cellA = gameBoard[a];
        let cellB = gameBoard[b];
        let cellC = gameBoard[c];

        if (cellA === '' || cellB === '' || cellC === '') {
            continue;
        }
        if (cellA === cellB && cellB === cellC) {
            won = true;
            break;
        }
    }

    if (won) {
        player2.innerHTML = `${currentPlayer} wins!`;
        isPlaying = false;
    } else if (!gameBoard.includes('')) {
        player2.innerHTML = 'Game Draw!';
        isPlaying = false;
    } else {
        switchPlayer();
    }
}

// Reset the game (Add event listeners for reset and play again buttons)
resetBtn.addEventListener('click', resetGame);
playAgainBtn.addEventListener('click', resetGame);

function resetGame() {
    gameBoard = ['', '', '', '', '', '', '', '', ''];
    cells.forEach(cell => {
        cell.innerHTML = '';
        cell.addEventListener('click', handleClickCell, { once: true });
    });
    currentPlayer = playerX;
    player1.innerHTML = `${currentPlayer}'s Turn`;
    player2.innerHTML = '';
    isPlaying = true;
}
