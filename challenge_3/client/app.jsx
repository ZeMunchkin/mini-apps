import React from 'react';
import {render} from 'react-dom';
import Board from 'Board';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      turn: false,
      turnCount: 0,
    }
  this.updateTurns = this.updateTurns.bind(this);
  this.resetTurns = this.resetTurns.bind(this);
  }

  updateTurns () {
    this.setState({
      'turn': !this.state.turn, 
      'turnCount': this.state.turnCount++
    });
  }

  resetTurns () {
    this.setState({
      'turn': false,
      turnCount: 0
    });
  }

  render () {
    return (
      <div>
        <div>{this.state.turn === false ? 'Player One' : 'Player Two'}'s Turn</div>
        <br>
        <Board
          turnsFunc={this.updateTurns}
          resetTurns={this.resetTurns}
          turn={this.state.turn}
          turnCount={this.state.turnCount}
        />
      </div>
    );
  }
}

render(<App />, document.getElementById('app'));