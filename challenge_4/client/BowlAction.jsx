import React from 'react';

const BowlAction = (props) => (
  <div>
    You knocked down
    <br />
    <form>
      <select id="numPins">
        {props.availablePins.map( numPins => (
          <option key={numPins}>{numPins}</option>
        ))}
      </select>
      <button type='button' onClick={props.setScoreForRound}>pins!</button>
    </form>
  </div>
);

export default BowlAction;