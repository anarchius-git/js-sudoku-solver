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

function pickStandardBoard(stdBoardID){
	// This board picks a standard set of Sudoku vlaues and loads it onto the UI
	// The solve function will then have to read the UI and continue
	// If you use a non-standard value, i.e., -1, this function will return an empty board
	switch (stdBoardID){
		case 1:
			returnGrid = [
				[ 0, 7, 0, 0, 2, 0, 0, 0, 0 ],
				[ 0, 1, 0, 8, 6, 5, 0, 2, 4 ],
				[ 8, 0, 0, 0, 0, 3, 9, 6, 0 ],
				[ 0, 0, 0, 5, 9, 4, 3, 1, 6 ],
				[ 0, 9, 0, 0, 3, 0, 0, 4, 0 ],
				[ 4, 3, 5, 6, 1, 8, 0, 0, 0 ],
				[ 0, 8, 3, 7, 0, 0, 0, 0, 2 ],
				[ 2, 4, 0, 1, 5, 9, 0, 3, 0 ],
				[ 0, 0, 0, 0, 8, 0, 0, 7, 0 ]
			];
		break;
		case 2:
			returnGrid = [
				[ 6, 0, 9, 5, 0, 0, 0, 4, 0 ],
				[ 1, 0, 0, 0, 4, 0, 0, 0, 8 ],
				[ 0, 0, 0, 3, 0, 9, 0, 0, 5 ],
				[ 0, 0, 0, 1, 0, 0, 0, 5, 7 ],
				[ 7, 0, 3, 4, 0, 5, 2, 0, 9 ],
				[ 5, 4, 0, 0, 0, 6, 0, 0, 0 ],
				[ 8, 0, 0, 2, 0, 3, 0, 0, 0 ],
				[ 3, 0, 0, 0, 6, 0, 0, 0, 2 ],
				[ 0, 5, 0, 0, 0, 1, 7, 0, 6 ]
			];
		break;
		case 3:
			returnGrid = [
				[ 0, 5, 0, 0, 0, 0, 4, 9, 2 ],
				[ 0, 0, 0, 7, 0, 0, 0, 0, 0 ],
				[ 0, 0, 0, 9, 0, 0, 6, 3, 0 ],
				[ 9, 0, 0, 0, 0, 6, 0, 5, 3 ],
				[ 0, 0, 3, 1, 0, 9, 2, 0, 0 ],
				[ 1, 7, 0, 5, 0, 0, 0, 0, 9 ],
				[ 0, 2, 5, 0, 0, 1, 0, 0, 0 ],
				[ 0, 0, 0, 0, 0, 7, 0, 0, 0 ],
				[ 3, 9, 4, 0, 0, 0, 0, 2, 0 ]
			];
		break;
		case 4:
			returnGrid = [
				[ 0, 7, 0, 5, 9, 0, 0, 0, 0 ],
				[ 0, 0, 4, 1, 0, 0, 0, 9, 0 ],
				[ 0, 0, 0, 0, 7, 0, 2, 0, 8 ],
				[ 6, 0, 0, 3, 8, 0, 0, 4, 0 ],
				[ 9, 0, 2, 0, 0, 0, 1, 0, 3 ],
				[ 0, 3, 0, 0, 1, 7, 0, 0, 2 ],
				[ 8, 0, 1, 0, 6, 0, 0, 0, 0 ],
				[ 0, 2, 0, 0, 0, 1, 4, 0, 0 ],
				[ 0, 0, 0, 0, 5, 9, 0, 2, 0 ]
			];
		break;
		case 5:
			returnGrid = [
				[ 0, 0, 0, 4, 0, 7, 0, 0, 0 ],
				[ 0, 0, 3, 0, 0, 0, 2, 0, 0 ],
				[ 4, 2, 0, 1, 9, 0, 0, 0, 0 ],
				[ 3, 0, 0, 0, 8, 0, 7, 0, 5 ],
				[ 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
				[ 9, 0, 6, 0, 5, 0, 0, 0, 3 ],
				[ 0, 0, 0, 0, 4, 5, 0, 1, 9 ],
				[ 0, 0, 8, 0, 0, 0, 4, 0, 0 ],
				[ 0, 0, 0, 7, 0, 6, 0, 0, 0 ]
			];
		break;
		case 6:
			returnGrid = [
				[ 3, 0, 5, 6, 0, 2, 0, 9, 0 ],
				[ 0, 9, 7, 0, 0, 0, 6, 0, 0 ],
				[ 0, 0, 0, 0, 0, 0, 0, 0, 3 ],
				[ 8, 0, 0, 0, 0, 7, 0, 1, 0 ],
				[ 0, 1, 2, 0, 0, 0, 3, 4, 0 ],
				[ 0, 4, 0, 3, 0, 0, 0, 0, 2 ],
				[ 9, 0, 0, 0, 0, 0, 0, 0, 0 ],
				[ 0, 0, 8, 0, 0, 0, 4, 6, 0 ],
				[ 0, 6, 0, 5, 0, 8, 2, 0, 1 ]
			];
		break;
		case 7:
			returnGrid = [
				[ 0, 1, 0, 2, 0, 0, 4, 9, 0 ],
				[ 9, 5, 4, 0, 6, 0, 0, 0, 0 ],
				[ 2, 0, 0, 9, 0, 0, 0, 0, 0 ],
				[ 7, 0, 9, 0, 1, 0, 0, 8, 4 ],
				[ 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
				[ 6, 8, 0, 0, 2, 0, 9, 0, 3 ],
				[ 0, 0, 0, 0, 0, 2, 0, 0, 8 ],
				[ 0, 0, 0, 0, 4, 0, 3, 7, 9 ],
				[ 0, 7, 1, 0, 0, 8, 0, 5, 0 ]
			];
		break;
		case 8:
			returnGrid = [
				[ 0, 9, 0, 0, 0, 0, 8, 0, 0 ],
				[ 0, 0, 0, 0, 0, 9, 6, 7, 4 ],
				[ 0, 0, 7, 0, 4, 0, 0, 0, 3 ],
				[ 0, 4, 0, 0, 0, 2, 0, 5, 6 ],
				[ 0, 0, 6, 0, 5, 0, 7, 0, 0 ],
				[ 1, 5, 0, 6, 0, 0, 0, 8, 0 ],
				[ 6, 0, 0, 0, 9, 0, 1, 0, 0 ],
				[ 9, 7, 3, 2, 0, 0, 0, 0, 0 ],
				[ 0, 0, 1, 0, 0, 0, 0, 3, 0 ]
			];
		break;
		case 9:
			returnGrid = [
				[ 1, 0, 2, 0, 5, 8, 4, 0, 0 ],
				[ 8, 0, 0, 1, 0, 0, 0, 0, 2 ],
				[ 0, 5, 0, 0, 0, 0, 0, 1, 0 ],
				[ 0, 8, 0, 0, 1, 4, 0, 0, 0 ],
				[ 6, 0, 0, 0, 9, 0, 0, 0, 1 ],
				[ 0, 0, 0, 7, 6, 0, 0, 8, 0 ],
				[ 0, 4, 0, 0, 0, 0, 0, 7, 0 ],
				[ 3, 0, 0, 0, 0, 1, 0, 0, 5 ],
				[ 0, 0, 1, 4, 2, 0, 8, 0, 6 ]
			];
		break;
		case 10:
			returnGrid = [
				[ 0, 0, 0, 0, 0, 0, 3, 0, 6 ],
				[ 0, 0, 9, 0, 8, 0, 0, 5, 0 ],
				[ 6, 0, 0, 4, 2, 0, 9, 0, 0 ],
				[ 0, 4, 0, 2, 0, 0, 0, 0, 0 ],
				[ 3, 1, 0, 0, 0, 0, 0, 2, 5 ],
				[ 0, 0, 0, 0, 0, 1, 0, 8, 0 ],
				[ 0, 0, 1, 0, 6, 9, 0, 0, 2 ],
				[ 0, 8, 0, 0, 4, 0, 6, 0, 0 ],
				[ 9, 0, 3, 0, 0, 0, 0, 0, 0 ]
			];
		break;
		default: // This can also be used as a hack to return an empty board
			returnGrid = [
				[ 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
				[ 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
				[ 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
				[ 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
				[ 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
				[ 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
				[ 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
				[ 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
				[ 0, 0, 0, 0, 0, 0, 0, 0, 0 ]
			];

	}
	return returnGrid;
}

///////////////////////////////////////////////////////
// Functions Callable from the UI

function loadBoard(boardID){
	// This picks a board and loads it onto the UI
	var tempGrid = pickStandardBoard(boardID);
	updateBoardValues(tempGrid);
	updateBoardColors();
}

function solveBoard(){
	// The main solving function
	// It starts by reading the values from the UI board. The runs the recursive solve function
	sudokuGrid = readBoardValues();
	console.table(sudokuGrid);

	if(solveSudoku(sudokuGrid)){
		// Recursion successfully completed
		console.table(sudokuGrid);
		updateBoardValues(sudokuGrid);
		// Note we are not updating board colors here, because the calculation results are shown in grey
	} else {
		console.log("No Answer");
		alert("No Answer found");
	}

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
			tableText.appendChild(sNumber);
			tableCell.appendChild(tableText);
			tableRow.appendChild(tableCell);
		}
		// Add a last cell with the edit icon to edit the row directly in the UI
		var editCell = document.createElement("td");
		editCell.classList.add("align-middle");
		editCell.classList.add("table-active");
		editCell.classList.add("edit-row");
		editCell.innerHTML += "<i class='fas fa-edit fa-sm'></i>"
		editCell.setAttribute("rowID",i);
		editCell.setAttribute("id","edit-row-"+i);
		editCell.addEventListener('click',function(){editRowUI(this.getAttribute("rowID"))}); //send the ID of the row that needs to be edited
		tableRow.appendChild(editCell);
		tableRef.appendChild(tableRow);
	}
	// Initialize with an empty board
	updateBoardValues(pickStandardBoard(-1)); // gets a default grid (all zeros) and updates the board values
	updateBoardColors();
}

function editRowUI(rowRefID){
	//console.log(rowRefID);
	// First read all the numbers from the passed row id and create a string that can be edited
	rowString = "";
	for(var j=0; j < 9; j++){rowString += readCellValue(rowRefID, j)}
	
	// Then load the string. Except for when it is all zeros, make input easier by starting with an empty string
	var editRowTextbox = document.getElementById("edit-row-input");
	if(rowString == "000000000") {
		editRowTextbox.value = $('#edit-row-input').masked("");
	} else {
		editRowTextbox.value = $('#edit-row-input').masked(rowString);
	}
	
	// Save the row id in a hidden input
	var hiddenRowID = document.getElementById("current-row-id");
	hiddenRowID.value = rowRefID;
	//console.log(rowString);
	// jQuery to show the modal
	$("#editRowModal").modal("show");
}

function saveRowUI(){
	// The "Save Row" button clicked on the edit row modal
	var cleanValue = "";
	cleanValue = $('#edit-row-input').cleanVal();
	// Pad zeros at the end in case the input is not complete
	while(cleanValue.length < 9){cleanValue += "0"} 

	// Get the Row Number from the hidden field
	var hiddenRowID = document.getElementById("current-row-id");
	var rowRefID = hiddenRowID.value;
	// Hide the Moday
	$("#editRowModal").modal("hide");
	// Update the Sudoku UI
	for(var j = 0; j < 9; j++){
		updateCellValue(rowRefID, j, cleanValue.charAt(j));
	}
	updateBoardColors();
}

function updateBoardValues(currentGrid){
	// Update all the values on the board from the provide grid
	for(var i = 0; i < 9; i++){
		for(var j = 0; j < 9; j++){
			var cellID = document.getElementById("cell-" + i + "-" + j);
			cellID.innerText = currentGrid[i][j];
		}
	}
}

function updateCellValue(rowID, colID, cellValue){
	// Update just a single cell in the board
	var cellID = document.getElementById("cell-" + rowID + "-" + colID);
	cellID.innerText = cellValue;
}

function updateBoardColors(){
	// Set the colors of the badge based on the value in each cell
	for(var i = 0; i < 9; i++){
		for(var j = 0; j < 9; j++){
			var cellID = document.getElementById("cell-" + i + "-" + j);
			var cellValue = parseInt(cellID.innerText);
			cellID.className = ""; // Clear the classes
			// Decide on the color for non zero values
			// Pick the board values and knockoff the current value
			var currentBoard = readBoardValues();
			currentBoard[i][j] = 0; // If the current board did not have the value, would the current value be valid?
			if(cellValue != 0){
				if(isValid(currentBoard, i, j, cellValue)){
					// valid number, so mark it primary
					cellID.classList.add("badge");
					cellID.classList.add("badge-primary");
				} else {
					// invalid number, mark it as error
					cellID.classList.add("badge");
					cellID.classList.add("badge-danger");
				}
			}
			// Cell value is 0 so keep it light
			if (cellValue == 0){
				cellID.classList.add("badge");
				cellID.classList.add("badge-light");
			}
		}
	}
}

function readBoardValues(){
	// Read the values on the board and store it into a grid
	// return the grid
	var returnGrid = pickStandardBoard(-1); //using the hack to get an empty board
	for(var i = 0; i < 9; i++){
		for(var j = 0; j < 9; j++){
			var cellID = document.getElementById("cell-" + i + "-" + j);
			returnGrid[i][j] = parseInt(cellID.innerText);
		}
	}
	return returnGrid;
}

function readCellValue(rowID, colID){
	// Read the values on the board for a single cell and return it
	var returnValue = 0;
	var cellID = document.getElementById("cell-" + rowID + "-" + colID);
	returnValue = parseInt(cellID.innerText);
	return returnValue;
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