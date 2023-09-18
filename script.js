// Module to create gameboard (array)
  // const gameBoard = (() => {
  //   const grid = [];
  //   let gameBoardWrapper = document.getElementById("gameBoardWrapper");
  //   for (let i = 0; i < 6; i++) {
  //       let div = gameBoardWrapper.appendChild(document.createElement('div'));
  //       div.classList.add('gridCell');

  //       grid.push(div);        
  //   };
  //   return {
  //   grid
  //   };
  // })();

  //Option A - HTML rendered by javascript
  //Add p class to each rendered grid item
  //Add text "X" or "O" to p class
  //grid = each HTML itme

  //var elements = document.getElementById('myDiv').children
  // elements.item(n)

// Module to create gameboard (array)
//

const gameBoard = (() => {
  const grid = ["X", "O", "X", "O", "X", "O"];
  let gridCells = document.getElementById('gameBoardWrapper').children;
  for (let i = 0; i < 6; i++) {
    let cellContent = gridCells.item(i).appendChild(document.createElement('p'));
    cellContent.textContent = grid[i];

  }
}) ();


//Factory fun)ction to create player


//Player name(
//Player actions (X, O, choose location)

//Module to control display