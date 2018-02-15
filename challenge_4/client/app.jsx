import React from 'react';
import {render} from 'react-dom';

import Frames from './Frames.jsx';
import BowlAction from './BowlAction.jsx';

class App extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      rounds: [['', ''], ['', ''], ['', ''], ['', ''], ['', ''], ['', ''], ['', ''], ['', ''], ['', ''], ['', '']],
      scoresByRound: [],
      totalScore: 0,
      availablePins: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

    }

    //function binding to this as necessary
    this.setScoreForRound = this.setScoreForRound.bind(this);
  }

  setScoreForRound (event) {
    //capture the value of the score from the event target
    var newScore = event.target.value;
    //reference our rounds array in a variable
    var scoresByRound = this.state.rounds;
    //capture available scores array
    var availablePins = this.state.availablePins;

    //iterate through rounds til you find an empty string
    for (var i = 0; i < scoresByRound.length; i++) {
      var frame = scoresByRound[i];

      //if the first value of the tuple is an empty string
      if (frame[0] === '') {
        //set first score of tuple to newscore
        frame[0] = newScore;
        //if newScore is ten (a strike)
        if (newScore === 10) {
          // set second spot of tuple to 'n/a'
          frame[1] = 'n/a';
          //add a third part to the tuple that says 'X'
          frame[2] = 'X';
          
        //else if newScore is less than ten
        } else {
          //create new available scores array
          availablePins = availablePins.filter ( scoreValue => {
            newScore + scoreValue <= 10
          });
        }
        //break out of loop

      //if the second value of the tuple is an empty string
      } else if (frame[1] === '') {
        //set the second value of tuple to new score
        //capture the value of the tuple at 1
        //reset available scores array variable to include 0-10
        //check if the tuple at 1 plus new score  = 10 (a spare)
          //if yes, add a third value to the tuple that says '/'
        //break out of loop
        
      }

      
    }


    //run the evaluate score function with new rounds and capture return array

    //set the state of the rounds, scoresByRound, totalScore, and availablePins

  }

  evaluateScoreByRound (scoresArray) {

  }

  calculateTotalScore () {

  }

  render () {
    return (
      <div>
        <h1>Let's Bowl!</h1>
        <BowlAction 
          setScoreForRound={this.setScoreForRound}
          availablePins={this.state.availablePins}
        />
        <br />
        <Frames rounds={this.state.rounds} />
      </div>
    );
  }
}

render(<App/>, document.getElementById('app'));