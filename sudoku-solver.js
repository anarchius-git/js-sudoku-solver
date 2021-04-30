var gameTime = 50;

///////////////////////////////////////////////////////
// Core Functions

function isValid(passedGrid, row, col, value){
	// This function checks if a given value is valid. Note, this is checking for validity, not correctness.
	// It takes a grid, a row, a column and a value that we are checking for validity of. We are going to perform three checks
	
	// Check 1: Make sure that the number is unique across the row
	for(x = 0; x < 9; x++){
		if(passedGrid[row][x] == value) return false;
	}
	
	// Check 2: Make sure that the number is unique down the column
	for(x=0; x < 9; x++){
		if(passedGrid[x][col] == value) return false;
	}
	
	// Check 3: Make sure that the number is unique in the box
	boxRowStart = row - (row % 3);
	boxColStart = col - (col % 3);
	for(var i = 0; i < 3; i++){
		for(var j = 0; j < 3; j++){
			if(passedGrid[i + boxRowStart][j + boxColStart] == value){
				return false;
			}
		}
	}
	
	// If all three checks do not return a false, then that number is valid in that position
	return true;
}

function solveSudoku(toSolveGrid){
	// This is the recursive function that will try to solve the passed grid.
	// Step 1. We check to see if there is any unsolved space. 
	// If we find an unsolved space, we then pick the first number that fits in that space
	// Then we recursively call the board with this one additional value in place
	var unsolvedRow = -1;
	var unsolvedCol = -1;
	var solvedGrid = true; // We assume the grid is solved till we find an unsolved cell position
	for(var i = 0; i < 9; i++){
		for(var j = 0; j < 9; j++) {
			if(toSolveGrid[i][j] == 0){
				// We found an unsolved grid. Grab the values of the i and j; set the solvedGrid to false and break out.
				unsolvedRow = i;
				unsolvedCol = j;
				solvedGrid = false;
				break; // stop running through the j loop
			}
		}
		if(!solvedGrid){
			break; // no point in continuing through the rest of the i loop
		}
	}
	
	if (solvedGrid) {
		// woohoo
		return true;
	}
	
	for(var potentialValue = 1; potentialValue <= 9; potentialValue++) {
		if(isValid(toSolveGrid, unsolvedRow, unsolvedCol, potentialValue)){
			// We have a potential value for the cell
			toSolveGrid[unsolvedRow][unsolvedCol] = potentialValue;
			// Now recurse
			if(solveSudoku(toSolveGrid)){
				// Yay, the Grid is now solved
				//console.table(sudokuGrid);
				return true;
			} else {
				// Backtrack, reset the cell like it is an unsolved cell
				toSolveGrid[unsolvedRow][unsolvedCol] = 0;
			}
		}
	}
	return false; // We failed because we could not find a single value that works for the unsolved cell we were trying to solve for
}

///////////////////////////////////////////////////////
// Callable Functions

function solveBoard(){
	// The main solving function
	// alert("hello");
	sudokuGrid = [
		[ 3, 0, 6, 5, 0, 8, 4, 0, 0 ],
		[ 5, 2, 0, 0, 0, 0, 0, 0, 0 ],
		[ 0, 8, 7, 0, 0, 0, 0, 3, 1 ],
		[ 0, 0, 3, 0, 1, 0, 0, 8, 0 ],
		[ 9, 0, 0, 8, 6, 3, 0, 0, 5 ],
		[ 0, 5, 0, 0, 9, 0, 6, 0, 0 ],
		[ 1, 3, 0, 0, 0, 0, 2, 5, 0 ],
		[ 0, 0, 0, 0, 0, 0, 0, 7, 4 ],
		[ 0, 0, 5, 2, 0, 6, 3, 0, 0 ] 
	];
	console.table(sudokuGrid);
	setBoardColors(sudokuGrid);
	updateBoardValues(sudokuGrid);

	if(solveSudoku(sudokuGrid)){
		// Recursion successfully completed
		console.table(sudokuGrid);
		updateBoardValues(sudokuGrid);
	} else {
		console.log("No Answer");
	}

	//for(var i = 0; i < 9; i++){
	//	for(var j = 0; j < 9; j++){
	//		console.log(isValid(sudokuGrid, i, j, 1));
	//	}
	//}
	
}

///////////////////////////////////////////////////////
// UI Functions

function drawBoard(){
	// This function draws the grid without needing to edit the table manually
	var tableRef = document.getElementById("sudoku-board");
	//tableRef.removeChild();
	for(var i=0; i < 9; i++){
		var tableRow = document.createElement("tr");
		tableRow.setAttribute("id", "row-" + i);
		for(var j=0; j < 9; j++){
			var tableCell = document.createElement("td");
			var tableText = document.createElement("h3");
			tableText.classList.add("text-center");
			var sNumber = document.createElement("span");
			sNumber.setAttribute("id", "cell-" + i + "-" + j);
			sNumber.classList.add("badge");
			sNumber.classList.add("badge-secondary");
			sNumber.innerText = "0";
			tableText.appendChild(sNumber);
			tableCell.appendChild(tableText);
			tableRow.appendChild(tableCell);
		}
		tableRef.appendChild(tableRow);
	}
}

function setBoardColors(currentGrid){
	// Set the colors of the background differently for input values
	for(var i = 0; i < 9; i++){
		for(var j = 0; j < 9; j++){
			if(currentGrid[i][j] != 0){
				var cellID = document.getElementById("cell-" + i + "-" + j);
				cellID.classList.remove("badge-secondary");
				cellID.classList.add("badge-danger");
			}
		}
	}
}

function updateBoardValues(currentGrid){
	// Set the values of the board based on the grid
	for(var i = 0; i < 9; i++){
		for(var j = 0; j < 9; j++){
			if(currentGrid[i][j] != 0){
				var cellID = document.getElementById("cell-" + i + "-" + j);
				cellID.innerText = currentGrid[i][j];
			}
		}
	}
}

// https://www.sitepoint.com/delay-sleep-pause-wait/
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function pause(miliseconds) {
	var currentTime = new Date().getTime();
	while (currentTime + miliseconds >= new Date().getTime()) {
	}
}

//async function delayedGreeting() {
//  console.log("Hello");
//  await sleep(2000);
//  console.log("World!");
//}

//delayedGreeting();
//console.log("Goodbye!");