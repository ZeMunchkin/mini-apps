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
      finalScore: null,
    }

    //function binding to this as necessary
    this.setScoreForRound = this.setScoreForRound.bind(this);
    this.reset = this.reset.bind(this);
  }

  reset () {
    this.setState ({
      frames: [['', ''], ['', ''], ['', ''], ['', ''], ['', ''], ['', ''], ['', ''], ['', ''], ['', ''], ['', '']],
      totalScoresByFrame: [],
      availablePins: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      fillBall: false,
      gameOver: false,
      finalScore: null,
    });
  }

  setScoreForRound (event) {
    if (this.state.gameOver === true) {
      return;
    }

    const newScore = Number(document.getElementById('numPins').value);


    const frameScores = this.state.frames;
    let availablePins = this.state.availablePins;
    let fillBall = this.state.fillBall;
    let gameStatus = this.state.gameOver;
    let finalScore = null;

    //iterate through frames til you find an empty string
    for (let i = 0; i < frameScores.length; i++) {
      let frame = frameScores[i];

      //address the nuances of the last frame
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

      //otherwise find next available open spot
      if (frame[0] === '') {
        if (newScore === 10) {
          frame[0] = 'X';

          if (i === 9) {
            frame[2] = '';
            fillBall = true;
          }

        } else {
          frame[0] = newScore;
          availablePins = availablePins.filter( scoreValue => scoreValue + newScore <= 10);
        }
        break;

      } else if (frame[1] === '' && frame[0] !== 'X') {    
        availablePins = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
        if (frame[0] + newScore === 10){
          frame[1] = '/';
          if (i === 9) {
            this.fillBall = true;
            frame[2] = '';
          }

        } else {
          frame[1] = newScore;
          if (i === 9) {
            gameStatus = true;
          }
        }
        break;
      }
    }

    let scoresByFrame = this.evaluateScoreByRound(frameScores);

    if (gameStatus) {
      finalScore = scoresByFrame[scoresByFrame.length - 1];
    }

    this.setState({
      availablePins: availablePins,
      frames: frameScores,
      totalScoresByFrame: scoresByFrame,
      gameOver: gameStatus,
      fillBall: fillBall,
      finalScore: finalScore,
    });

  }

  evaluateScoreByRound (scoresArray) {
    let prevFramesTotal = 0;
    const scoresTotals = [];

    const updateScores = (roundScore) => {
      prevFramesTotal += roundScore;
      scoresTotals.push(prevFramesTotal);
    }

    for (let i = 0; i < scoresArray.length; i++) {
      let currFrame = scoresArray[i];

      if ( currFrame[0] === '' || (currFrame[0] !== 'X' && currFrame[1] === '') ) {
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
        <div>
          {this.state.gameOver ? (<button onClick={this.reset}>New Game!</button>) : (<BowlAction 
          setScoreForRound={this.setScoreForRound}
          availablePins={this.state.availablePins}
        />)}
        </div>
        <br />
        <Frames 
          frames={this.state.frames}
          scores={this.state.totalScoresByFrame}
        />
        <br />
        { this.state.gameOver ? <div id="final">Final Score: {this.state.finalScore}</div> : <div />}
      </div>
    );
  }
}

render(<App />, document.getElementById('app'));


