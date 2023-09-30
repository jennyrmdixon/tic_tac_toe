// Module to create gameboard (array)

const gameBoard = (() => {
  let grid = ["", "", "", "", "", "O", "", "", ""];
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
  const takeTurn = (id) => {

    if (gameBoard.grid[id] === "") {
      gameBoard.grid[id] = marker;
      gameBoard.updateGrid();
      gameController.switchPlayer();
    }
  };

  return { name, marker, takeTurn };
}

let playerOne = player("Player One", "X");
let playerTwo = player("Player Two", "O");

// displayController
const gameController  = (() => { 
  let currentPlayer = playerOne;
  const switchPlayer = () => {
  currentPlayer = currentPlayer === playerOne ? playerTwo : playerOne;
}
const runGame = () => {
  gameBoard.updateGrid();

  for (let i = 0; i < 9; i++) {
    gameBoard.gridCells[i].addEventListener("click", function () {
      currentPlayer.takeTurn(i);
    });
  }}
   return {switchPlayer, runGame, currentPlayer};
})();

gameController.runGame();