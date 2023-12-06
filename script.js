//Module to handle layout of game grid
const gameBoard = (() => {
  const GRID_SIZE = 9;
  const grid = Array(GRID_SIZE).fill("");
  const gridCells = document.getElementById("gameBoardWrapper").children;

  const updateGrid = () => {
    for (let i = 0; i < GRID_SIZE; i++) {
      let cellContent = gridCells.item(i);
      cellContent.setAttribute("id", i);
      cellContent.textContent = grid[i];
    }
  };

  return { grid, gridCells, updateGrid };
})();

//Factory function to create player
const player = (name, marker) => {
  const takeTurn = (gridCell) => {
    if (gameBoard.grid[gridCell] === "") {
      gameBoard.grid[gridCell] = marker;
    }
  };

  return { name, marker, takeTurn };
};

const playerOne = player("Player One", "X");
const playerTwo = player("Player Two", "O");

// Module to contorl game flow
const gameController = (() => {
  const statusHeading = document.getElementById("gameStatus");
  let currentPlayer = playerOne;

  const switchPlayer = () => {
    currentPlayer = currentPlayer === playerOne ? playerTwo : playerOne;
    statusHeading.textContent =
      currentPlayer.name + "(" + currentPlayer.marker + ")'s" + " Turn";
  };

  const getAllIndexes = (arr, mark) => {
    return arr.map((elm, idx) => (elm === mark ? idx : "")).filter(String);
  };

  const checkForWin = (player) => {
    const markerMap = getAllIndexes(gameBoard.grid, player.marker);
    const checker = (arr, target) => target.every((v) => arr.includes(v));

    /////Try another way to do this? Create a 2D array, and search for matching items
    if (
      checker(markerMap, [0, 1, 2]) ||
      checker(markerMap, [3, 4, 5]) ||
      checker(markerMap, [6, 7, 8]) ||
      checker(markerMap, [0, 3, 6]) ||
      checker(markerMap, [1, 4, 7]) ||
      checker(markerMap, [2, 5, 8]) ||
      checker(markerMap, [0, 4, 8]) ||
      checker(markerMap, [2, 4, 6])
    ) {
      statusHeading.textContent =
        player.name + "(" + player.marker + ")" + " Wins!";
      statusHeading.classList.add("win");
      return true;
    }
  };

  const runGame = () => {
    gameBoard.updateGrid();

    function runTurn() {
      currentPlayer.takeTurn(this.id);
      gameBoard.updateGrid();
      switchPlayer();

      if (checkForWin(playerOne) || checkForWin(playerTwo)) {
        for (let i = 0; i < 9; i++) {
          gameBoard.gridCells[i].removeEventListener("click", runTurn);
        }
      }
    }

    for (let i = 0; i < 9; i++) {
      gameBoard.gridCells[i].addEventListener("click", runTurn);
    }

    resetButton = document.getElementById("reset");
    resetButton.addEventListener("click", () => {
      for (let i = 0; i < 9; i++) {
        let cellContent = gameBoard.gridCells.item(i);
        cellContent.textContent = "";
        gameBoard.grid[i] = "";
        gameBoard.gridCells[i].removeEventListener("click", runTurn);
        statusHeading.classList.remove("win");
        statusHeading.textContent =
          currentPlayer.name +
          "(" +
          currentPlayer.marker +
          "), Click to Start!";
      }
      for (let i = 0; i < 9; i++) {
        gameBoard.gridCells[i].addEventListener("click", runTurn);
      }
    });
  };

  return { runGame };
})();

gameController.runGame();
