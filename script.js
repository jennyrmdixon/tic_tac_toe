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
      gameBoard.updateGrid();
      gameController.checkForWin(playerOne);
      gameController.checkForWin(playerTwo);
      gameController.switchPlayer();
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
  console.log("Win check" + player.marker);
  let markerMap = getAllIndexes(gameBoard.grid, player.marker);
  let checker = (arr, target) => target.every(v => arr.includes(v));

  console.log(markerMap);

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
    alert(player.name + " wins!");
  }

}

const runGame = () => {
  gameBoard.updateGrid();

   for (let i = 0; i < 9; i++) {
    gameBoard.gridCells[i].addEventListener("click", function () {
      ///Move this to before click
      // checkForWin(playerOne);
      // checkForWin(playerTwo);
      currentPlayer.takeTurn(i);

     });
  }
}
   return {switchPlayer, runGame, checkForWin, currentPlayer};
})();

gameController.runGame();