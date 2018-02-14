import React from 'react';
import PlayerOne from './PlayerOne.jsx';
import PlayerTwo from './PlayerTwo.jsx';
import update from 'immutability-helper';

class Board extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      winner: null,
      rows: ['r0', 'r1', 'r2', 'r3', 'r4', 'r5'],
      board: {
        'r5': ['', '', '', '', '', '', ''],
        'r4': ['', '', '', '', '', '', ''],
        'r3': ['', '', '', '', '', '', ''],
        'r2': ['', '', '', '', '', '', ''],
        'r1': ['', '', '', '', '', '', ''],
        'r0': ['', '', '', '', '', '', ''],
      }
    }
  }

  placePiece (event) {
    var columnIndex = event.target.className;
    //check to see if winner
    if (this.state.winner) {
      //if winner exists, return out of function
      return;
    }

    var turn = this.props.turn;
    var rows = this.state.rows;
    var board = this.state.board;
    //iterate through this.rows to find first row that's empty at col index
    for (var i = 0; i < rows.length; i++) {
      var currentRow = rows[i]
      //if the row at that column is an empty string
      if (board[currentRow][columnIndex] === '') {
        //check whose turn it is
        //if player one
        if (!this.props.turn) {
          //set state of the row/col to instantiation of P1
          board[currentRow][columnIndex] = 'PlayerOne';
          this.setState({'board': board});
        //else 
        } else {
          //set state of the row/col to instance of P2
          board[currentRow][columnIndex] = 'PlayerTwo';
          this.setState({'board': board});
        }
        //invoke function to update turns on App
        this.props.turnsFunc();

        //check if winner
        var winner = this.checkForWins();
        if (winner) {
          //change div to announce winner
          //set state to declare winner
        }

        //check for stalemate
        if (this.props.turnCount === 42) {
          //change div to announce stalemate
          //set state of winenr to stalemate
        }
        //break out of loop
        break;
      }
    }

  }

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

  winByRow () {
    var board = this.state.board;
    //variable to store piece with streak
    var streakPiece = null;
    //counter set to zero
    var counter = 0;
    //iterate through each row in board
    for (var key in board) {
      //iterate through each row
      for (var i = 0; i < board[key]; i++) {
        //if piece !== streakpiece && piece !== ''
        if (board[key][i] !== streakpiece && board[key][i] !== '') {
          //set streakpiece equal to current piece
          streakpiece = board[key][i]
          //set counter to 1
          
        }
        // else if piece is the same as streak piece & piece !== ''
          //increase counter by 1
          //if counter === 4
            //return streakpiece
        
      }
      
    }
    //return null
  }

  winByCol () {
    //iterate through column indices (0-6)
      //variable to store streak piece
      //counter set to zero
        //iterate through rows at column index
          //if piece !== string && piece !== streak piece
            // set streakpiece to current piece
            //reset counter to 1
          //else if piece !== '' and streakpiece and piece are the same
            //increase counter 
            //if counter === 4
              //return streakpiece
    //return null
  }


  //for both diagonals we can skip checking the corners where it's not possible to get four in a row diagonally
  // so only need to check total of 6 diagonal lines where a connect-four is possible (6 each diagonal, 12 total)
  // can be acheived by splitting the rows and starting on the higher or lower column numbers depending on which
  //row we start with

  winByMinorDiag () {

    //iterate through rows
      //if row index  is less than 3
        //start from column 0 and increase column
        //set column var  = 0
        //streak piece var
        //counter var
        //row var = index
        //while column var < 7
          //if row/col index piece !== streakpiece  && !== ''
            //set current piece to streak piece
            //reset counter to 1
            //increase row & col vars
          // else if row/col index piece === streak piece && !== ''
            //increase counter
            //if counter === 4
              //return streakpiece
            //increment row & col vars


      //else if row index is greater than 2
        //start from column 6 and decrease column
        //set col var to 6
        //streak piece var
        //counter var
        //while col var >= 0
          //if row/col piece  !== streakpiece && !== ''
            //set current piece to streak piece
            //set counter to 1
            //increase row var
            //decrease col var
          //else if row/col piece === streakpiece && !== ''
            //increment counter
            //if counter  === 4
              // return streakpiece
            //decrement row & col vars

    //return null
  }

  winByMajorDiag () {
    //iterate through rows
      //if row index is less than three
        //start from column 6 and decrease column
        //set col var to 6
        //set row var to row index
        //set streak var
        //set counter var
          //while col >=0
            //if row/col piece !== streakpiece && !== ''
              //set streak piece to current piece
              //reset counter to 1
              //increase row var
              //decrease col var
            //else if row/col piece ===streakpiece && !== ''
              //increment counter
              //if counter === 4
                //return streakpiece
              //decrease col var
              //increase row var

      //else if row index is greater than 2
        //start from col 0 and increase column
        //set col var to 0
        //set row var to row index
        //set streakpiece
        //set counter to 1 
          //while col < 7
            //if row/col piece !== streakpiece && !== ''
              //set streakpiece to piece
              //reset counter to 1
              //increase col var
              //decrease row var
            //else if row/piece === streakpiece && !== ''
              //increment counter
              //if counter equals 4
                //return streakpiece
              //increment col
              //decrement row

    //return null
  }

  resetBoard () {
    //set the state of board to a blank board
    //set state of winner to null
    //reset turns on app
  }

  render () {
    return (
      <div>
        <table> 
          <tbody>        
            <tr id='row5'>
              <td className='0' onClick={this.placePiece}>{this.state.board['r5'][0]}</td>
              <td className='col1'>{this.state.board['r5'][1]}</td>
              <td className='col2'>{this.state.board['r5'][2]}</td>
              <td className='col3'>{this.state.board['r5'][3]}</td>
              <td className='col4'>{this.state.board['r5'][4]}</td>
              <td className='col5'>{this.state.board['r5'][5]}</td>
              <td className='col6'>{this.state.board['r5'][6]}</td>
            </tr>
            <tr id='row4'>
              <td className='0'>{this.state.board['r4'][0]}</td>
              <td className='col1'>{this.state.board['r4'][1]}</td>
              <td className='col2'>{this.state.board['r4'][2]}</td>
              <td className='col3'>{this.state.board['r4'][3]}</td>
              <td className='col4'>{this.state.board['r4'][4]}</td>
              <td className='col5'>{this.state.board['r4'][5]}</td>
              <td className='col6'>{this.state.board['r4'][6]}</td>
            </tr>
            <tr id='row3'>
              <td className='0'>{this.state.board['r3'][0]}</td>
              <td className='col1'>{this.state.board['r3'][1]}</td>
              <td className='col2'>{this.state.board['r3'][2]}</td>
              <td className='col3'>{this.state.board['r3'][3]}</td>
              <td className='col4'>{this.state.board['r3'][4]}</td>
              <td className='col5'>{this.state.board['r3'][5]}</td>
              <td className='col6'>{this.state.board['r3'][6]}</td>
            </tr>
            <tr id='row2'>
              <td className='0'>{this.state.board['r2'][0]}</td>
              <td className='col1'>{this.state.board['r2'][1]}</td>
              <td className='col2'>{this.state.board['r2'][2]}</td>
              <td className='col3'>{this.state.board['r2'][3]}</td>
              <td className='col4'>{this.state.board['r2'][4]}</td>
              <td className='col5'>{this.state.board['r2'][5]}</td>
              <td className='col6'>{this.state.board['r2'][6]}</td>
            </tr>
            <tr id='row1'>
              <td className='0'>{this.state.board['r1'][0]}</td>
              <td className='col1'>{this.state.board['r1'][1]}</td>
              <td className='col2'>{this.state.board['r1'][2]}</td>
              <td className='col3'>{this.state.board['r1'][3]}</td>
              <td className='col4'>{this.state.board['r1'][4]}</td>
              <td className='col5'>{this.state.board['r1'][5]}</td>
              <td className='col6'>{this.state.board['r1'][6]}</td>
            </tr>
            <tr id='row0'>
              <td className='0'>{this.state.board['r0'][0]}</td>
              <td className='col1'>{this.state.board['r0'][1]}</td>
              <td className='col2'>{this.state.board['r0'][2]}</td>
              <td className='col3'>{this.state.board['r0'][3]}</td>
              <td className='col4'>{this.state.board['r0'][4]}</td>
              <td className='col5'>{this.state.board['r0'][5]}</td>
              <td className='col6'>{this.state.board['r0'][6]}</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

export default Board;



