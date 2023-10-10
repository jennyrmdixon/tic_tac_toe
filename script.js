// Module to create gameboard (array)
const gameBoard = (() => {
  let grid = ["", "", "", "", "", "", "", "", ""];
  let gridCells = document.getElementById('gameBoardWrapper').children;
  const updateGrid  = (() => {
  for (let i = 0; i < 9; i++) {
    let cellContent = gridCells.item(i);
    cellContent.setAttribute('id',i);
    cellContent.textContent = grid[i];
  }
})
  return {grid, gridCells, updateGrid}
}) ();

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
  let currentPlayer = playerOne;
  const switchPlayer = () => {
  currentPlayer = currentPlayer === playerOne ? playerTwo : playerOne;
}

const getAllIndexes = (arr, mark) => {
  return arr.map((elm, idx) => elm === mark ? idx : '').filter(String);
}

const checkForWin = (player) => {
  let markerMap = getAllIndexes(gameBoard.grid, player.marker);
  let checker = (arr, target) => target.every(v => arr.includes(v));

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
    let statusHeading = document.getElementById('gameStatus');
    statusHeading.textContent = player.name + " wins!";
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
    
    if (checkForWin(playerOne) || checkForWin(playerTwo)) {
      for (let i = 0; i < 9; i++) {
        gameBoard.gridCells[i].removeEventListener("click", runTurn);
      }
    }
    switchPlayer();
  }
}

return {switchPlayer, runGame, checkForWin, currentPlayer};
})();

gameController.runGame();
