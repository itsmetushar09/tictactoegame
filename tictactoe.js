function gameGrid() {
    const rows = 3;
    const columns = 3;
    const grid = [];

    for (let i = 0; i < rows; i++) {
        grid[i] = []; // Initializes an empty 1D array for each row
        for (let j = 0; j < columns; j++) {
            grid[i].push(' ');
        }
    }

    const getGrid = () => grid;

    const makeMark = (player, row, column) => {
        if (grid[row][column] === ' ') {
            grid[row][column] = player;
        } else return;
    };

    const printGrid = () => console.log(grid);

    return { getGrid, makeMark, printGrid };
}

function gameController(playerOneName = "X", playerTwoName = "O") {
    const players = [
        { name: playerOneName },
        { name: playerTwoName }
    ];

    let activePlayer = players[0];
    const { getGrid, makeMark, printGrid } = gameGrid();
    const grid = getGrid();

    const getActivePlayer = () => activePlayer;

    const switchActivePlayer = () => {
        activePlayer = (activePlayer === players[0]) ? players[1] : players[0];
    };

    const gridAvailable = () => grid.some(row => row.includes(' '));

    const checkWinCondition = () => {
        const symbol = getActivePlayer().name;

        // Check rows & columns
        for (let i = 0; i < 3; i++) {
            if (grid[i].every(cell => cell === symbol)) return true;
            if (grid.every(row => row[i] === symbol)) return true;
        }

        // Check diagonals
        if (grid[0][0] === symbol && grid[1][1] === symbol && grid[2][2] === symbol) return true;
        if (grid[0][2] === symbol && grid[1][1] === symbol && grid[2][0] === symbol) return true;

        return false;
    };

    const playRound = (row, column, targetButton) => {
        if (gridAvailable()) {
            if (grid[row][column] === ' ') {
                makeMark(getActivePlayer().name, row, column);
                targetButton.textContent = getActivePlayer().name;
                printGrid();

                if (checkWinCondition()) {
                    setTimeout(() => {
                        alert(`${getActivePlayer().name} wins!`);
                        location.reload(); // Restart game after win
                    }, 100);
                    return;
                }

                switchActivePlayer();
            } else {
                console.log('Space occupied. Choose another position.');
            }
        }
    };

    const playerMoveButton = () => {
        const buttons = document.querySelectorAll('button');

        buttons.forEach(button => {
            button.addEventListener('click', event => {
                if (event.target.textContent === 'X' || event.target.textContent === 'O') {
                    alert("Select a different Cell!");
                    return;
                }

                const playerMoveId = event.target.id;
                const targetButton = document.getElementById(playerMoveId);
                const [row, column] = playerMoveId.split(',').map(Number);

                playRound(row, column, targetButton);
            });
        });
    };

    return { playerMoveButton };
}

const game = gameController();
game.playerMoveButton();
