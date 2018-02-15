import React from 'react';
import {render} from 'react-dom';

import Frames from './Frames.jsx';
import BowlAction from './BowlAction.jsx';

class App extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      frames: [['', ''], ['', ''], ['', ''], ['', ''], ['', ''], ['', ''], ['', ''], ['', ''], ['', ''], ['', '']],
      totalScoresByFrame: [],
      availablePins: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      gameOver: false,

    }

    //function binding to this as necessary
    this.setScoreForRound = this.setScoreForRound.bind(this);
  }

  setScoreForRound (event) {
    //capture the value of the score from the event target
    const newScore = Number(document.getElementById('numPins').value);

    //reference our frames array in a variable
    const frameScores = this.state.frames;
    //capture available scores array
    let availablePins = this.state.availablePins;

    //iterate through frames til you find an empty string
    for (let i = 0; i < frameScores.length; i++) {
      let frame = frameScores[i];

      //if the first value of the tuple is an empty string
      if (frame[0] === '') {
        //if newScore is ten (a strike)
        if (newScore === 10) {
          //set frame[0] to 'X'
          frame[0] = 'X';
          //delete second score of frame
          frame.pop();
          
        //else if newScore is less than ten
        } else {
          //set score on 1st bowl to score
          frame[0] = newScore;
          //create new available scores array
          availablePins = availablePins.filter( scoreValue => scoreValue + newScore <= 10);
          //availablePins = newAvailablePins;
        }
        //break out of loop
        break;

      //if the second value of the tuple is an empty string
      } else if (frame[1] === '') {    
        //reset available pins array variable to include 0-10
        availablePins = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
        //capture the value of the tuple at 1
        //check if the tuple at 1 plus new score  = 10 (a spare)
        if (frame[0] + newScore === 10){
          //if yes, add a third value to the tuple that says '/'
          frame[1] = '/';
        //otherwise
        } else {
          //set second bowl to new score
          frame[1] = newScore;
        }
        //break out of loop
        break;
        
      }
    }
    //run the evaluate score function with new frames and capture return array
    let scoresByFrame = this.evaluateScoreByRound(frameScores);
    console.log(scoresByFrame);
    //set the state of the frames, totalScorebyFrame, and availablePins
    this.setState({
      availablePins: availablePins,
      frames: frameScores,
      totalScoresByFrame: scoresByFrame,
    });

  }

  evaluateScoreByRound (scoresArray) {
    //variable to store previous frame score total
    let prevFramesTotal = 0;
    //working score variable
    let workingFrameScore;
    //variable scores array
    const scoresTotals = [];

    const updateScores = (roundScore) => {
      prevFramesTotal += roundScore;
      scoresTotals.push(prevFramesTotal);
    }

    //iterate through scoresArray
    for (let i = 0; i < scoresArray.length; i++) {
      //capture current frame
      let currFrame = scoresArray[i];
      //capture nextFrame
      let nextFrame = scoresArray[i + 1];
      //capture frame after that
      let sndNextFrame = scoresArray[i + 2];

      //if bowl 1 !== 'X' or if either bowl is falsy
      if ( !currFrame[0] || (currFrame[0] !== 'X' && !currFrame[1]) ) {
        //break out of loop
        break;
      }

      //address spares
      //if includes '/'
      if (currFrame.includes('/')) {
        //working score is 10
        workingFrameScore = 10;
        //go to next frame and check 1st value
        //if truthy 
          //and if not 'X'
        if (nextFrame[0] !== 'X' && nextFrame[0]){
          //add value to working score and update scores
          updateScores(workingFrameScore + nextFrame[0]);

        //else if X
        } else if (nextFrame[0] === 'X') {
          //add 10 to working score and update scores
          updateScores(workingFrameScore + 10);
        }
        
      //address strikes
      //if includes 'X'
      } else if (currFrame.includes('X')) {
        //working score is 10
        workingFrameScore = 10;

        //go to next frame
        //does it include 'X'?
        if (nextFrame.includes('X')) {
          //add 10 to working score
          workingFrameScore += 10;

          //go to 2ndNextFrame
          //does it include 'X'?
          if (sndNextFrame.includes('X')) {
            //add 10 to working score and update scores
            updateScores(workingFrameScore + 10);
      
          //is bowl 1 truthy?
          } else if (sndNextFrame[0]) {
            //add value to working score
            updateScores(workingFrameScore + sndNextFrame[0])
            
          }
          
          //does it include '/'?
        } else if (nextFrame.includes('/')) {
          //add 10 to working and update scores
          updateScores(workingFrameScore + 10);

          
        //are bowls 1 and 2 both truthy?
        } else if (nextFrame[0] && nextFrame[1]) {
          //add both values to working and update scores
          updateScores(workingFrameScore + nextFrame[0] + nextFrame[1]);       
        }

      //address no specials
      } else if (currFrame[0] && currFrame[1]) {
        //updates scores w/ sum of bowls 1 and 2
        updateScores(currFrame[0] + currFrame[1]);
      }
    }
    //return scores array
    return scoresTotals
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
        <Frames 
          frames={this.state.frames}
          scores={this.state.totalScoresByFrame}
        />
      </div>
    );
  }
}

render(<App/>, document.getElementById('app'));


