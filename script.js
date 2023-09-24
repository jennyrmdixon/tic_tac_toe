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
//Maybe can be removed later
gameBoard.updateGrid();

//Factory function to create player

const player = (name, marker) => { 
  const takeTurn  = (() => {
  // let thisPlayer = gameController.currentPlayer;
    document.getElementById('gameBoardWrapper').addEventListener("click", function (e) {
    if (e.target.classList.contains("gridCell") && (!e.target.innerHTML) ) {
      const clickedElement = e.target; 
      const id = clickedElement.id;
      // console.log(thisPlayer.marker);
      // console.log = marker;
      gameBoard.grid[id] = marker;
      gameBoard.updateGrid();
      gameController.switchPlayer();
      // gameController.nextTurn();
    }   
  });
});

  return {name, marker, takeTurn};
}

let playerOne = player("Player One", "X");
let playerTwo = player("Player Two", "O");

// displayController
const gameController  = (() => { 
  let currentPlayer = playerOne;
  const switchPlayer = () => {
  currentPlayer = currentPlayer === playerOne ? playerTwo : playerOne;
  currentPlayer.takeTurn();
}
const startGame = () => {
  playerOne.takeTurn();
}
   return {switchPlayer, startGame, currentPlayer};
})();

gameController.startGame();