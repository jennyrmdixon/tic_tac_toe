
//Reset win while playing game
//Can you reduce the number of vairalbe shared between functions?
//Can use a method to return a variable instead of sharing?
//Problem  - logic is broken, winner dosen't save. Rethink org to see if you can make solving things more clear.
//Learn more about event listeners 
//How to reduce returned values from GameBoard?

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

  return { grid, gridCells, updateGrid}
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

  //define players in here ?

  let statusHeading = document.getElementById('gameStatus');
  let currentPlayer = playerOne;

  const switchPlayer = () => {
  console.log("Before switch:" + currentPlayer.name);
  currentPlayer = currentPlayer === playerOne ? playerTwo : playerOne;
  statusHeading.textContent = currentPlayer.name + "(" + currentPlayer.marker + ")'s"  + " turn";
  console.log("After switch:" + currentPlayer.name);
}

const getAllIndexes = (arr, mark) => {
  return arr.map((elm, idx) => elm === mark ? idx : '').filter(String);
}

const checkForWin = (player) => {
  let markerMap = getAllIndexes(gameBoard.grid, player.marker);
  let checker = (arr, target) => target.every(v => arr.includes(v));

  /////Try another way to do this? Create a 2D array, and search for matching items
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
      //This is hapenning multiple times, trying to move
    };

   function runTurn() {
    currentPlayer.takeTurn(this.id);//add code to take turn in here?
    gameBoard.updateGrid();
    switchPlayer();


    if (checkForWin(playerOne) || checkForWin(playerTwo)) {
      for (let i = 0; i < 9; i++) {
        gameBoard.gridCells[i].removeEventListener("click", runTurn);
      }
    }
    
   }

  resetButton = document.getElementById("reset");
  resetButton.addEventListener("click", () => {    
    for (let i = 0; i < 9; i++) {
      let cellContent = gameBoard.gridCells.item(i);
      cellContent.textContent = "";
      gameBoard.grid[i] = "";
      gameBoard.gridCells[i].removeEventListener("click", runTurn);
      statusHeading.classList.remove('win');  
      statusHeading.textContent =   currentPlayer.name + "(" + currentPlayer.marker + "), Click to Start!"
    }
    for (let i = 0; i < 9; i++) {
      gameBoard.gridCells[i].addEventListener("click", runTurn);
      //This is hapenning multiple times
    };
  
  })
}


return {runGame};
})();

gameController.runGame();


