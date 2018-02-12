
var Board = function () {
	this.board = {
		r0: [null, null, null],
		r1: [null, null, null],
		r2: [null, null, null],
	}
	this.turn = false;
	this.gameOver = null;
}

var currentGame = new Board();

//functions to check for winners 
Board.prototype.winByRow = function () {
	var curGame = this.board
	for (var key in curGame) {
		//if all values of array are equal and not null
		if (curGame[key][0] !== null && curGame[key][0] === curGame[key][1] && curGame[key][0] === curGame[key][2]){
			//return that value
			return curGame[key][0];
		}
	}
	return null;
}

Board.prototype.winByColumn = function () {
	var curGame = this.board;
	//loop through column indices
	for (var i = 0; i < 3; i++) {
		//if value in each row at column are the same and they don't equal null
		if (curGame.r0[i] !== null && curGame.r0[i] === curGame.r1[i] && curGame.r0[i] === curGame.r2[i]) {
			//return that value
			return curGame.r0[i];
		}
	}
	// return null;
	return null;
}

Board.prototype.winByDiagonal = function () {
	var curGame = this.board;
	//check if values of 0-0, 1-1, and 2-2 are equal & not null
	if (curGame.r0[0] !== null && curGame.r0[0] === curGame.r1[1] && curGame.r0[0] === curGame.r2[2]) {
		//if both true return that value
		return curGame.r0[0];

	//else check if 0-2, 1-1, 2-0 are all equal & not null
	} else if (curGame.r0[2] !== null && curGame.r0[2] === curGame.r1[1] && curGame.r0[2] === curGame.r2[0]) {
		//if yes return that value
		return curGame.r0[2];
		
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
	for (var key in this.board) {
		for (var i = 0; i < 3; i++) {
			if (this.board[key][i] === null) {
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

//write a function to handle board clicks, takes a div id argument
Board.prototype.place = function (divId) {
	var curRow = divId.slice(0, 2);
	var curCol = divId.slice(3);
	var curGame = this.board;

	//is the boardplace of that div null?
	//if yes
	if (!curGame[curRow][curCol]) {
		// check whose turn it is
		//if turn is false
		if (!this.turn) {
			//value of boardplace is now X
			curGame[curRow][curCol] = 'X';

		// if turn is true
		} else {
			//value of boardplace is now O
			curGame[curRow][curCol] = 'O';
		}
		this.turn = !this.turn;
	}
	
	return curGame[curRow][curCol];
}

	


//view

//function that takes a div id and changes the value of the div

//function to render when game is over
var handleGameOver = function (winner) {
	console.log('invoked');
	console.log(document.getElementById('gameOver'));
	if (winner === 'X') {
		//change div to show that x won
		document.getElementById('gameOver').innerText = 'Player X has won!';
		//display div
	} else if (winner === 'O') {
		//change div to show that o won
		document.getElementById('gameOver').innerText = 'Player O has won!';
		//display div
	} else {
		//change div to stalemate
		document.getElementById('gameOver').innerText = 'Stalemate!';
		//display div
	}
}


//controller
var handleBoardClick = function (event) {
	console.log('click!');
	if (!currentGame.gameOver) {
		var divId = event.target.id;
		var divValue = currentGame.place(divId);
		event.target.innerText = divValue;

		currentGame.gameOver = currentGame.checkForGameOver();

		if (currentGame.gameOver) {
			handleGameOver(currentGame.gameOver);
		}
 	}
}

var handleNewGame = function () {
	currentGame = new Board();
	var curBoard = currentGame.board;
	for (var key in curBoard) {
		for (i = 0; i < 3; i++) {
			console.log('key:', key);
			console.log('i:', i);
			var divId = `${key}c${i}`;
			console.log(divId);
			document.getElementById(divId).innerText = '';
		}
	}
	document.getElementById('gameOver').innerText = '';

}


//DOM
