let currentPlayer = 'X';
let gameBoard = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;

const board = document.getElementById('board');
const backgrounds = [
    'url("imgs/mountains-1587287_1280.jpg")',
    'url("imgs/world-smile-day-emojis-composition.jpg")',
    'url("imgs/tiger-3389015_1280.jpg")',
    'url("imgs/ocean-3605547_1280.jpg")',
    'url("imgs/landscape-3688040_1280.jpg")',
    'url("imgs/sad-2635043_1280.jpg")',
    'url("imgs/valse-4648261_1280.jpg")',
    'url("imgs/beach-4852830_1280.jpg")',
    'url("imgs/corgi-4415649_1280.jpg")',
    'url("imgs/relaxing-1979674_1280.jpg")'
];

let currentBackgroundIndex = 0;

function handleCellClick(index) {
    if (gameBoard[index] === '' && gameActive) {
        gameBoard[index] = currentPlayer;
        document.getElementsByClassName('cell')[index].innerText = currentPlayer;

        if (checkWinner()) {
            alert(`Congratulations, Player ${currentPlayer}! You win! 🎉`);
            gameActive = false;
        } else if (gameBoard.every(cell => cell !== '')) {
            alert('It\'s a tie! 😊');
            gameActive = false;
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            makeComputerMove();
        }
    }
}

function makeComputerMove() {
    if (gameActive) {
        setTimeout(() => {
            let emptyCells = gameBoard.reduce((acc, cell, index) => {
                if (cell === '') {
                    acc.push(index);
                }
                return acc;
            }, []);

            if (emptyCells.length > 0) {
                const randomIndex = Math.floor(Math.random() * emptyCells.length);
                const computerMove = emptyCells[randomIndex];
                
                gameBoard[computerMove] = currentPlayer;
                document.getElementsByClassName('cell')[computerMove].innerText = currentPlayer;

                if (checkWinner()) {
                    alert(`Congratulations, Player ${currentPlayer}! You win! 🎉`);
                    gameActive = false;
                } else if (gameBoard.every(cell => cell !== '')) {
                    alert('It\'s a tie! 😊');
                    gameActive = false;
                } else {
                    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
                }
            }
        }, 400); 
    }
}

function resetGame() {
    currentPlayer = Math.random() < 0.5 ? 'X' : 'O';
    
    gameBoard = ['', '', '', '', '', '', '', '', ''];
    gameActive = true;

    const cells = document.getElementsByClassName('cell');
    Array.from(cells).forEach((cell, index) => {
        cell.innerText = '';
    });

    alert(`Let's play! ${currentPlayer === 'X' ? 'Player X' : 'Computer O'} goes first.`);
    
    if (currentPlayer === 'O') {
        makeComputerMove();
    }
}


function checkWinner() {
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], 
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]             
    ];

    return winPatterns.some(pattern =>
        gameBoard[pattern[0]] !== '' &&
        gameBoard[pattern[0]] === gameBoard[pattern[1]] &&
        gameBoard[pattern[1]] === gameBoard[pattern[2]]
    );
}

function changeBackground() {
    currentBackgroundIndex = (currentBackgroundIndex + 1) % backgrounds.length;
    document.body.style.backgroundImage = backgrounds[currentBackgroundIndex];
    document.body.style.transition = 'background-image 0.3s ease-in-out';

    setTimeout(() => {
        document.body.style.transition = 'none';
    }, 300);
}

document.addEventListener('keydown', handleKeyPress);
function handleKeyPress(event) {
    if (event.keyCode === 32) {
        changeBackground();
    }
}
