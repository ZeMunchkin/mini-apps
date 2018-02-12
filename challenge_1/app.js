var turn = false;

var Board = function () {
	this.row0 = [null, null, null];
	this.row1 = [null, null, null];
	this.row2 = [null, null, null];
}

//functions to check for winners 
Board.prototype.winByRow = function () {
	for (var key in this) {
		//if all values of array are equal and not null
		if (key[0] !== null && key[0] === key[1] && key[0] === key[2]){
			//return that value
			return key[0];
		}
	}
	return null;
}

Board.prototype.winByColumn = function () {
	//loop through column indices
	for (var i = 0; i < 3; i++) {
		//if value in each row at column are the same and they don't equal null
		if (this.row0[i] !== null && this.row0[i] === this.row1[i] && this.row0[i] === this.row2[i]) {
			//return that value
			return this.row0[i];
		}
	}
	// return null;
	return null;
}

Board.prototype.winByDiagonal = function () {
	//check if values of 0-0, 1-1, and 2-2 are equal & not null
	if (this.row0[0] !== null && this.row0[0] === this.row1[1] && this.row0[0] === this.row2[2]) {
		//if both true return that value
		return this.row0[0];

	//else check if 0-2, 1-1, 2-0 are all equal & not null
	} else if (this.row0[2] !== null && this.row0[2] === this.row1[1] && this.row0[2] === this.row2[0]) {
		//if yes return that value
		return this.row0[2];
		
	}
	//return null
	return null;
}

Board.prototype.checkForWin = function () {
	if (this.winByRow()) {
		return this.winByRow();
	}
	if (this.winByColumn()) {
		return this.winByColumn();
	}
	if (this.winByDiagonal()) {
		return this.winByDiagonal();
	}
	return null;
}

Board.prototype.checkForStalemate = function () {
	for (var key in this) {
		for (var i = 0; i < 3; i++) {
			if (this[key][i] === null) {
				return false;
			}
		}
	}
	return true;
}

//function to check for completed games
Board.prototype.checkForGameOver = function () {
	if (this.checkForWin()) {
		return this.checkForWin()
	}
	if (this.checkForStalemate()) {
		return 'stalemate';
	}
	return null;
}

	


//model
//write a function to handle board clicks, takes a div argument
	//is the boardplace of that div null?
	//if yes
		// check whose turn it is
			//if turn is false
				//value of boardplace is now X
			// if turn is true
				//value of boardplace is now O
		//check for winners
		//check for stalemates


//view
//write a function that correlates each boardplace to a div
	
// if value of board changes
	//update actual div to value at the boardPlace


//controller



//DOM
