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
var prevWinner = null;
var xTally = 0;
var oTally = 0;

//functions to check for winners 
Board.prototype.winByRow = function () {
	var curGame = this.board
	for (var key in curGame) {
		if (curGame[key][0] !== null && curGame[key][0] === curGame[key][1] && curGame[key][0] === curGame[key][2]){
			document.getElementById(`${key}c0`).style['background-color'] = 'red';
			document.getElementById(`${key}c1`).style['background-color'] = 'red';
			document.getElementById(`${key}c2`).style['background-color'] = 'red';
			return curGame[key][0];
		}
	}
	return null;
}

Board.prototype.winByColumn = function () {
	var curGame = this.board;
	for (var i = 0; i < 3; i++) {
		if (curGame.r0[i] !== null && curGame.r0[i] === curGame.r1[i] && curGame.r0[i] === curGame.r2[i]) {
			document.getElementById(`r0c${i}`).style['background-color'] = 'red';
			document.getElementById(`r1c${i}`).style['background-color'] = 'red';
			document.getElementById(`r2c${i}`).style['background-color'] = 'red';
			return curGame.r0[i];
		}
	}
	return null;
}

Board.prototype.winByDiagonal = function () {
	var curGame = this.board;
	if (curGame.r0[0] !== null && curGame.r0[0] === curGame.r1[1] && curGame.r0[0] === curGame.r2[2]) {
		document.getElementById('r0c0').style['background-color'] = 'red';
		document.getElementById('r1c1').style['background-color'] = 'red';
		document.getElementById('r2c2').style['background-color'] = 'red';
		return curGame.r0[0];

	} else if (curGame.r0[2] !== null && curGame.r0[2] === curGame.r1[1] && curGame.r0[2] === curGame.r2[0]) {
		document.getElementById('r2c0').style['background-color'] = 'red';
		document.getElementById('r1c1').style['background-color'] = 'red';
		document.getElementById('r0c2').style['background-color'] = 'red';
		return curGame.r0[2];
	}
	return null;
}

//functions to check for completed games
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

Board.prototype.checkForGameOver = function () {
	if (this.checkForWin()) {
		return this.checkForWin()
	}
	if (this.checkForStalemate()) {
		return 'stalemate';
	}
	return null;
}


// function to handle model changes
Board.prototype.place = function (divId) {
	var curRow = divId.slice(0, 2);
	var curCol = divId.slice(3);
	var curGame = this.board;

	if (!curGame[curRow][curCol]) {
		if (!this.turn) {
			curGame[curRow][curCol] = 'X';

		} else {
			curGame[curRow][curCol] = 'O';
		}
		this.turn = !this.turn;
	}
	
	return curGame[curRow][curCol];
}

	

//Controllers and Views
var handleBoardClick = function (event) {
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

var handleGameOver = function (winner) {
	console.log(document.getElementById('gameOver'));
	if (winner === 'X') {
		var playerX = document.getElementById('xName').value || 'X';
		document.getElementById('gameOver').innerText = `${playerX} has won!`;
		xTally++;
		document.getElementById('xWins').innerText = xTally;
		prevWinner = 'X';

	} else if (winner === 'O') {
		var playerO = document.getElementById('oName').value || 'O';
		document.getElementById('gameOver').innerText = `${playerO} has won!`;
		oTally++;
		document.getElementById('oWins').innerText = oTally;
		prevWinner = 'O';

	} else {
		document.getElementById('gameOver').innerText = 'A Stalemate!';
	}
}

var handleNewGame = function () {
	currentGame = new Board();
	var curBoard = currentGame.board;
	if (prevWinner === 'O'){
		currentGame.turn = true;
	}

	for (var key in curBoard) {
		for (i = 0; i < 3; i++) {
			var divId = `${key}c${i}`;
			document.getElementById(divId).innerText = '';
			document.getElementById(divId).style['background-color'] = 'white';
		}
	}
	document.getElementById('gameOver').innerText = '';
}

