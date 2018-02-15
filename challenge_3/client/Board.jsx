import React from 'react';
import PlayerOne from './PlayerOne.jsx';
import PlayerTwo from './PlayerTwo.jsx';
import update from 'immutability-helper';

class Board extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      winner: null,
      turn: false,
      turnCount: 0,
      rows: [0, 1, 2, 3, 4, 5],
      board: {
        '5': ['', '', '', '', '', '', ''],
        '4': ['', '', '', '', '', '', ''],
        '3': ['', '', '', '', '', '', ''],
        '2': ['', '', '', '', '', '', ''],
        '1': ['', '', '', '', '', '', ''],
        '0': ['', '', '', '', '', '', ''],
      }
    }

    //bind all functions with 'this' to this Board instance
    this.placePiece = this.placePiece.bind(this);
    this.resetBoard = this.resetBoard.bind(this);
    this.setAppAnnouncements = this.setAppAnnouncements.bind(this);
    this.winByRow = this.winByRow.bind(this);
    this.winByCol = this.winByCol.bind(this);
    this.winOnMajorDiag = this.winOnMajorDiag.bind(this);
    this.winByMajorDiag = this.winByMajorDiag.bind(this);
    this.winOnMinorDiag = this.winOnMinorDiag.bind(this);
    this.winByMinorDiag = this.winByMinorDiag.bind(this);
  }


  placePiece (event) {
    var columnIndex = event.target.className;
    //check to see if winner
    if (this.state.winner) {
      //if winner exists, return out of function
      return;
    }

    var turn = this.state.turn;
    var rows = this.state.rows;
    var board = this.state.board;
    //iterate through this.rows to find first row that's empty at col index
    for (var i = 0; i < rows.length; i++) {
      var currentRow = rows[i]
      //if the row at that column is an empty string
      if (board[currentRow][columnIndex] === '') {
        //check whose turn it is
        //if player one
        if (!this.state.turn) {
          //set state of the row/col to instantiation of P1
          board[currentRow][columnIndex] = PlayerOne();
          this.setState({'board': board});
        //else 
        } else {
          //set state of the row/col to instance of P2
          board[currentRow][columnIndex] = PlayerTwo();
          this.setState({'board': board});
        }
        //invoke function to update turns on App
        this.setState({
          'turn': !this.state.turn,
          'turnCount': ++this.state.turnCount
        });

        //check if winner
        var winner = this.checkForWins();
        if (winner) {
          //set state to declare winner
          this.setState({'winner': winner})
        }

        //check for stalemate
        if (this.state.turnCount === 42) {
          //set state of winenr to stalemate
          this.setState({'winner': 'stalemate'});
        }

        //set the message on app
        this.setAppAnnouncements();

        //break out of loop
        break;
      }
    }

  }

  resetBoard () {
    //set variable to an empty board
    var board = {
      '5': ['', '', '', '', '', '', ''],
      '4': ['', '', '', '', '', '', ''],
      '3': ['', '', '', '', '', '', ''],
      '2': ['', '', '', '', '', '', ''],
      '1': ['', '', '', '', '', '', ''],
      '0': ['', '', '', '', '', '', ''],
    };

    //set the state of board to a blank board
    //set state of winner to null
    //reset turns
    this.setState({
      'board': board,
      'winner': null,
      'turn': false,
      'turnCount': 0
    });

    this.setAppAnnouncements();
  }

  setAppAnnouncements () {
    if (this.state.winner === 'stalemate'){
      this.props.setAnnouncement('This game is a stalemate!');

    } else if (this.state.winner) {
      this.props.setAnnouncement(`${this.state.winner} is the winner!`);

    } else if (this.state.turn) {
      this.props.setAnnouncement("Player 2's turn!");

    } else {
      this.props.setAnnouncement("Player 1's turn!");
    }
  }
  
  //functions to check for wins
  checkForWins () {
    var rowWinner = this.winByRow();
    if (rowWinner) {
      return rowWinner;
    }

    var colWinner = this.winByCol();
    if (colWinner) {
      return colWinner;
    }

    var majorDWinner = this.winByMajorDiag();
    if(majorDWinner) {
      return majorDWinner;
    }

    var minorDWinner = this.winByMinorDiag();
    if (minorDWinner) {
      return minorDWinner;
    }

    return null;
  }

  //by row
  winByRow () {
    var board = this.state.board;
    //variable to store player with streak
    var streakPlayer;
    //counter set to zero
    var counter = 0;

    //iterate through each row in board
    for (var key in board) {
      //iterate through each row
      for (var i = 0; i < board[key].length; i++) {
        var player = board[key][i];
        //if player !== streakPlayer && player !== ''
        if (player && streakPlayer !== player.key) {
          //set streakPlayer equal to current player
          streakPlayer = player.key;
          //set counter to 1
          counter = 1;

        // else if player is the same as streak player & player !== ''
        } else if (player && streakPlayer === player.key) {
          //increase counter by 1
          counter++;
          //if counter === 4
          if (counter === 4) {
            //return streakPlayer
            return streakPlayer;
          }
        }
      }
    }
    //return null
    return null;
  }

  //by column
  winByCol () {
    var colIndex = [0, 1, 2, 3, 4, 5, 6];
    var rows = this.state.rows;
    var board = this.state.board;
    //iterate through column indices (0-6)
    for (var i = 0; i < colIndex.length; i++) {
      //variable to store streak player
      var streakPlayer;
      //counter set to zero
      var counter = 0;
      var curCol = colIndex[i]
      //iterate through rows at column index
      for (var j = 0; j < rows.length; j++) {
        var player = board[rows[j]][curCol];
        //if player !== string && player !== streak player
        if (player && player.key !== streakPlayer) {
          // set streakPlayer to current player
          streakPlayer = player.key;
          //reset counter to 1
          counter = 1;

        //else if player !== '' and streakPlayer and player are the same
        } else if (player && player.key === streakPlayer) {
          //increase counter 
          counter++;
          //if counter === 4
          if (counter === 4) {
            //return streakPlayer
            return streakPlayer;
          }
        }
      }
    }
    //return null
    return null;
  }

  //on a single major diagonal
  winOnMajorDiag (colIndexAtRw0) {
    //set streak player
    var streakPlayer;
    //set counter
    var counter = 0;
    //capture board
    var board = this.state.board;

    //iterate through row indices (0-5)
    for (var i = 0; i < 6; i++) {
      //if col index is greater than 6
      if (colIndexAtRw0 > 6) {
        //decrease col index
        colIndexAtRw0--;

      //else set player variable to value at board/row/col
      } else {
        var player = board[i][colIndexAtRw0];
        //if player is truthy and does not equal streakplayer
        if (player && player.key !== streakPlayer) {
          //set streakplayer equal to player
          streakPlayer = player.key;
          //reset counter to 1
          counter = 1;
          //decrease colindex
          colIndexAtRw0--;

        //else if player is truthy and equals streakplayer
        } else if (player && player.key === streakPlayer) {
          //increment counter
          counter++
          //if counter equals 4
          if (counter === 4) {
            //return streakplayer (winner)
            return streakPlayer;
          }
          //decrement colindex
          colIndexAtRw0--;
        }
      }
    }
    //if no winner is found, return null
    return null;
  }

  //on all major diagonals
  winByMajorDiag () {
    //create array of all row0 indicies it's possible to get a diagonal win on
    //note: this is not all diagonals on the board, since some have less than four spots
    var psbleColIndex = [3, 4, 5, 6, 7, 8];

    //iterate through possible col indices
    for (var i = 0; i < psbleColIndex.length; i++) {
      //set variable equal to win on major diagonal with colindex passed in
      var win = this.winOnMajorDiag(psbleColIndex[i]);
      //if variable is truthy
      if (win) {
        //return the winner
        return win;
      }
    }
    //if no winners found, return null
    return null;
  }

  //on a single minor diagonal
  winOnMinorDiag (colIndexAtRw0) {
  //function to see if win on diagonal, given a col index at row 0
    //set streakPlayer var
    var streakPlayer;
    //set counter variable
    var counter;

    //capture board
    var board = this.state.board;
    
    //iterate through row indexes (0-5)
    for (var i = 0; i < 6; i++) {
      //if col index is negative
      if(colIndexAtRw0 < 0) {
        //increase col
        colIndexAtRw0++

      } else {
        //set player variable to the value at board/row/col indexes
        var player = board[i][colIndexAtRw0];
        //if player is truthy and doesn't equal the streakPlayer
        if (player && player.key !== streakPlayer) {
          //set the streakplayer to player
          streakPlayer = player.key;
          //reset counter to 1
          counter = 1;
          //increase col index
          colIndexAtRw0++;

        //else if player is truthy and the same as streakPlayer
        } else if (player && player.key === streakPlayer) {
          //increment counter
          counter++;
          //check if counter is 4
          if (counter === 4) {
            //if it is, return the streak player (winner)
            return streakPlayer;
          }
          //increse col index
          colIndexAtRw0++
        }
      }
    }
    //if no wins, return null
    return null;
    
  }

  //on all minor diagonal
  winByMinorDiag () {
    //create array of all row0 indicies it's possible to get a diagonal win on
    //note: this is not all diagonals on the board, since some have less than four spots
    var psbleColIndex = [-2, -1, 0, 1, 2, 3];

    //iterate through possible column indices
    for (var i = 0; i < psbleColIndex.length; i++) {
      //call the win on major diagonal function to see if there's a win on that diagonal
      var win = this.winOnMinorDiag(psbleColIndex[i]);
      //if the value comes back truthy
      if (win) {
        //return the value
        return win;
      }
    }
    //otherwise, there's no win, so return null
    return null;
  }



  render () {

    return (
      <div>
        <table> 
          <tbody>        
            <tr id='row5'>
              {this.state.board['5'].map( (col, i) => {
                return (<td className={i} onClick={this.placePiece}>{col}</td>)
              })}
            </tr>
            <tr id='row4'>
              {this.state.board['4'].map( (col, i) => {
                return (<td className={i} onClick={this.placePiece}>{col}</td>)
              })}
            </tr>
            <tr id='row3'>
              {this.state.board['3'].map( (col, i) => {
                return (<td className={i} onClick={this.placePiece}>{col}</td>)
              })}
            </tr>
            <tr id='row2'>
              {this.state.board['2'].map( (col, i) => {
                return (<td className={i} onClick={this.placePiece}>{col}</td>)
              })}
            </tr>
            <tr id='row1'>
              {this.state.board['1'].map( (col, i) => {
                return (<td className={i} onClick={this.placePiece}>{col}</td>)
              })}
            </tr>
            <tr id='row0'>
              {this.state.board['0'].map( (col, i) => {
                return (<td className={i} onClick={this.placePiece}>{col}</td>)
              })}
            </tr>
          </tbody>
        </table>
        <br />
        <button id="newGame" onClick={this.resetBoard}>New Game!</button>
      </div>
    );
  }
}

export default Board;



