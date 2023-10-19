
const gameBoard = (() => {
  let grid = ["", "", "", "", "", "", "", "", ""];
  let gridCells = document.getElementById('gameBoardWrapper').children;

  const updateGrid = () => {
    for (let i = 0; i < 9; i++) {
      let cellContent = gridCells.item(i);
      cellContent.setAttribute('id', i);
      cellContent.textContent = grid[i];
    }
  }
//Why does this work when resetting grid did not?
//Can you simplify things?
  const resetGrid = () => {
    for (let i = 0; i < 9; i++) {
      let cellContent = gridCells.item(i);
      cellContent.textContent = "";
    }
    for (let i = 0; i < 9; i++) {
        grid[i] = "";
    }
  }

  return { grid, gridCells, updateGrid, resetGrid }
})();


//Factory function to create player
const player = (name, marker) => {
  const takeTurn = (gridCell) => {

    if (gameBoard.grid[gridCell] === "") {
      gameBoard.grid[gridCell] = marker;
    }
  };

  return { name, marker, takeTurn };
}

let playerOne = player("Player One", "X");
let playerTwo = player("Player Two", "O");

// Module to contorl game flow
const gameController  = (() => { 
  let statusHeading = document.getElementById('gameStatus');
  let currentPlayer = playerOne;

  const switchPlayer = () => {
  currentPlayer = currentPlayer === playerOne ? playerTwo : playerOne;
  statusHeading.textContent = currentPlayer.name + "(" + currentPlayer.marker + ")'s"  + " turn";

}

const getAllIndexes = (arr, mark) => {
  return arr.map((elm, idx) => elm === mark ? idx : '').filter(String);
}

const checkForWin = (player) => {
  let markerMap = getAllIndexes(gameBoard.grid, player.marker);
  let checker = (arr, target) => target.every(v => arr.includes(v));

  //Try another way to do this? Create a 2D array, and search for matching items
  if (
    checker(markerMap, [0,1,2]) ||
    checker(markerMap, [3,4,5]) ||
    checker(markerMap, [6,7,8]) ||
    checker(markerMap, [0,3,6]) ||
    checker(markerMap, [1,4,7]) ||
    checker(markerMap, [2,5,8]) ||
    checker(markerMap, [0,4,8]) ||
    checker(markerMap, [2,4,6]) 
  ) {
    statusHeading.textContent = player.name + "(" + player.marker + ")"  + " wins!";
    statusHeading.classList.add('win');  
    return true;                                    
  }

}

const runGame = () => {
  gameBoard.updateGrid();


  for (let i = 0; i < 9; i++) {
    gameBoard.gridCells[i].addEventListener("click", runTurn);
  }

  function runTurn() {
    currentPlayer.takeTurn(this.id);
    gameBoard.updateGrid();
    switchPlayer();

    if (checkForWin(playerOne) || checkForWin(playerTwo)) {
      for (let i = 0; i < 9; i++) {
        gameBoard.gridCells[i].removeEventListener("click", runTurn);
      }
    }
    console.log(gameBoard.grid)

  }

  //Experiment with this - why didn't the grid clear when you just reset the grid? Is there another way?
  resetButton = document.getElementById("reset");
  resetButton.addEventListener("click", () => {
    gameBoard.resetGrid();
    for (let i = 0; i < 9; i++) {
      gameBoard.gridCells[i].removeEventListener("click", runTurn);
    }    
    runGame();
    console.log("reset " + gameBoard.grid)
    //After this, there seems to be another version of the grid saved, AND it is not shown on the frontend

  })
}

return {switchPlayer, runGame, checkForWin, currentPlayer};
})();

gameController.runGame();


