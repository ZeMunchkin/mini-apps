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
      fillBall: false,
      gameOver: false,

    }

    //function binding to this as necessary
    this.setScoreForRound = this.setScoreForRound.bind(this);
  }

  setScoreForRound (event) {
    if (this.state.gameOver === true) {
      return;
    }
    //capture the value of the score from the event target
    const newScore = Number(document.getElementById('numPins').value);

    //reference our frames array in a variable
    const frameScores = this.state.frames;
    //capture available scores array
    let availablePins = this.state.availablePins;
    //capture fillBall
    let fillBall = this.state.fillBall;
    //capture gameStatus
    let gameStatus = this.state.gameOver;

    //iterate through frames til you find an empty string
    for (let i = 0; i < frameScores.length; i++) {
      let frame = frameScores[i];

      if (i === 9 && frame[0] === 'X') {
        if (frame[1] === '') {
          if (newScore === 10) {
            frame[1] = 'X'
          } else {
            frame[1] = newScore;
            availablePins = availablePins.filter( scoreValue => scoreValue + newScore <= 10);
          }
      
        } else {
          if (frame[1] === 'X') {
            newScore === 10 ? frame[2] = 'X' : frame[2] = newScore;
            gameStatus = true;

          } else {
            frame[1] + newScore === 10 ? frame[2] = '/' : frame[2] = newScore;
            gameStatus = true;
          }
        }
        break;
      }

      if (i === 9 && frame[1] === '/') {
        newScore === 10 ? frame[2] = 'X' : frame[2] = newScore;
        gameStatus = true;
      }

      //if the first value of the tuple is an empty string
      if (frame[0] === '') {
        //if newScore is ten (a strike)
        if (newScore === 10) {
          //set frame[0] to 'X'
          frame[0] = 'X';
          //delete second score of frame
          if (i === 9) {
            frame[2] = '';
            fillBall = true;
          } else{
            frame.pop();
          }

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
          if (i === 9) {
            this.fillBall = true;
            frame[2] = '';
          }
        //otherwise
        } else {
          //set second bowl to new score
          frame[1] = newScore;
          if (i === 9) {
            gameStatus = true;
          }
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
      gameOver: gameStatus,
      fillBall: fillBall,
    });

  }

  evaluateScoreByRound (scoresArray) {
    //variable to store previous frame score total
    let prevFramesTotal = 0;
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

      //if bowl 1 !== 'X' or if either bowl is falsy
      if ( currFrame[0] === '' || (currFrame[0] !== 'X' && currFrame[1] === '') ) {
        //break out of loop
        break;
      }

      if (currFrame[0] === 'X') {
        let frameScore = this.calculateStrikeScore(scoresArray, i);
        if (frameScore) {
          updateScores(frameScore);
        }

      } else if (currFrame[1] === '/') {
        let frameScore = this.calculateSpareScore(scoresArray, i);
        if (frameScore) {
          updateScores(frameScore);
        }

      } else if ((typeof currFrame[0] === 'number') && (typeof currFrame[1] === 'number')) {
        updateScores(currFrame[0] + currFrame[1]);
      }
    }
    //return scores array
    return scoresTotals
  }


  calculateSpareScore (scoresArray, frameIndex) {
    const currFrame = scoresArray[frameIndex];
    let workingFrameScore = 10;

    //address if it's the last frame
    if (frameIndex === 9) {
      if (currFrame[2] === 'X') {
        workingFrameScore += 10;
        return workingFrameScore
      }
      if (typeof currFrame[2] === 'number') {
        workingFrameScore += currFrame[2];
        return workingFrameScore;
      }
      return null;
    }

    //address all others
    const nextFrame = scoresArray[frameIndex + 1];

    if (nextFrame[0] === 'X') {
      workingFrameScore += 10;
      return workingFrameScore;
    }
    if (typeof nextFrame[0] === 'number') {
      workingFrameScore += nextFrame[0];
      return workingFrameScore;
    }
    return null;
  }

  calculateStrikeScore (scoresArray, frameIndex) {
    const currFrame = scoresArray[frameIndex];
    let workingFrameScore = 10;

    //address if it's the last (10th) frame
    if ( frameIndex === 9 ) {
      if (currFrame[1] === 'X') {
        workingFrameScore += 10
      }
      if (currFrame[2] === 'X') {
        workingFrameScore += 10;
        return workingFrameScore;
      }
      if (currFrame[2] === '/') {
        workingFrameScore += 10;
        return workingFrameScore;
      }
      if (typeof currFrame[1] === 'number') {
        workingFrameScore += currFrame[1];
      }
      if (typeof currFrame[2] === 'number') {
        workingFrameScore += currFrame[2];
        return workingFrameScore;
      }
      return null;
    }

    const nextFrame = scoresArray[frameIndex + 1]

    //address if ninth frame and tenth has a strike
    if (frameIndex === 8 && nextFrame[0] === 'X') {
      workingFrameScore += 10;

      if (nextFrame[1] === 'X') {
        workingFrameScore += 10;
        return workingFrameScore;
      }

      if (typeof nextFrame[1] === 'number') {
        workingFrameScore += nextFrame[1];
        return workingFrameScore;
      }
    }

    //address all other frames, spares first
    if (nextFrame[1] === '/') {
      workingFrameScore += 10;
      return workingFrameScore;
    }

    if (frameIndex + 1 === 9) {
      return null;
    }

    //if next frame is a strike
    if (nextFrame[0] === 'X') {
      //add 10 to working score
      workingFrameScore += 10;

      const sndNextFrame = scoresArray[frameIndex + 2];

      if (sndNextFrame[0] === 'X') {
        workingFrameScore += 10;
        return workingFrameScore;
      }

      if (typeof sndNextFrame[0] === 'number') {
        workingFrameScore += sndNextFrame[0];
        return workingFrameScore;
      } 
    }

    if (typeof nextFrame[0] === 'number' && typeof nextFrame[1] === 'number') {
      workingFrameScore += nextFrame[0] + nextFrame[1];
      return workingFrameScore;
    }
    return null;
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


