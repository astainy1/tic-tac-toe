//Script starts

//Test connection
// alert("Hello world")


/*
Algorithm for Tic Tac Toe Game

1. Initialize the Game Board:
    a. Create a 3x3 grid to represent the game board.
    b. Initialize each cell of the grid to be empty.

2. Define Players:
    a. Define two players, Player 1 (X) and Player 2 (O).
    b. Set the current player to Player 1 initially.

3. Setup Game Interface:
    a. Create an HTML structure to display the game board.
    b. Add event listeners to each cell to handle player moves.

4. Handle Player Moves:
    a. When a cell is clicked, check if it is empty.
    b. If the cell is empty, place the current player's symbol (X or O) in the cell.

5. Update the game board to reflect the move.
    a. Check for a Win or Draw:
    b. After each move, check if the current player has won the game.

6. To check for a win, verify if any row, column, or diagonal contains the same symbol.
    a. If a player wins, display a message and end the game.
    b. If all cells are filled and no player has won, declare a draw.

7. Switch Players:
    a. If the game is not over, switch to the other player.
    b. Reset the Game:
    c. Provide a way to reset the game (e.g., a reset button).
    d. When the game is reset, clear the game board and set the current player to Player 1.

*/

// Get reference to all HTML elements
let showTurn = document.getElementById('player1');
let player2 = document.getElementById('player2');

// Get other useful elements
let cells = document.querySelectorAll('[data-cell]');
let resetBtn = document.getElementById('resetBtn');
let playAgainBtn = document.getElementById('playAgainBtn');
let popupModal = document.getElementById('popupModal');
let overLay = document.getElementById('overLay');
let endMessage = document.getElementById('popup_message');

// Define players
let playerX = 'X';
let playerO = 'O';
let currentPlayer = playerX;
let isPlaying = false;

let gameBoard = ['', '', '', '', '', '', '', '', ''];

// Winning combinations
const winningCombination = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

// Load sound effects
const clickSound = new Audio('click.mp3');
const winnerSound = new Audio('winner.mp3');
const gameDraw = new Audio('game-draw.mp3')

// Add event listeners to each cell to handle player moves
cells.forEach(cell => cell.addEventListener('click', handleClick, { once: true }));

// Handle click function
function handleClick(e) {
    const cell = e.target;
    const cellIndex = Array.from(cells).indexOf(cell);

    if (cell.innerHTML === '') {
        cell.textContent = currentPlayer;
        gameBoard[cellIndex] = currentPlayer;

        // Play click sound
        clickSound.play();

        // Invoke check winner
        checkWinner();
    }
}

// Function to switch player
function switchPlayer() {
    currentPlayer = currentPlayer === playerX ? playerO : playerX;
    showTurn.textContent = `Player ${currentPlayer}'s Turn`;
}

// Function to check for win
function checkWinner() {
    let flag = false;

    for (let i = 0; i < winningCombination.length; i++) {
        const winElements = winningCombination[i];
        const cellA = gameBoard[winElements[0]];
        const cellB = gameBoard[winElements[1]];
        const cellC = gameBoard[winElements[2]];

        if (cellA === '' || cellB === '' || cellC === '') {
            continue;
        }

        if (cellA === cellB && cellB === cellC) {
            flag = true;
            break;
        }
    }

    if (flag) {
        endMessage.innerHTML = `<h2> Congratulations! </h2> <br> Player ${currentPlayer} Wins!`;
        // Play winner sound
        winnerSound.play();

        isPlaying = false;

        popUpModal();

    } else if (!gameBoard.includes('')) {

        endMessage.innerHTML = `<h2>Oops!</h2> <br> <strong> Game Draw! </strong>`;
        gameDraw.play();

        isPlaying = false;

        popUpModal();

    } else {
        switchPlayer();
    }
}

// Reset Playing Board
function resetBoard() {
    gameBoard = ['', '', '', '', '', '', '', '', ''];

    cells.forEach(cell => {

        cell.innerHTML = '';

        cell.addEventListener('click', handleClick, { once: true });
    });

    currentPlayer = playerX;
    showTurn.textContent = `Player ${playerX}'s Turn`;
    isPlaying = true;
}

// function for play again button
function playAgain() {

    resetBoard();

    popupModal.classList.remove('modal');
    overLay.classList.remove('overlay');
}

// function for reset button
function popUpModal() {
    popupModal.classList.add('modal');
    overLay.classList.add('overlay');
    resetBoard();
}

playAgainBtn.addEventListener('click', playAgain);

resetBtn.addEventListener('click', resetBoard);
