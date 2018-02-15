import React from 'react';
import Frames from './Frame.jsx';


const Frames = (props) => {


  return (
    <div id="framesContainer">
      <table>
        <tr>
          {props.scores.map( (score, index) => {
            return (
              <Frame 
                id={index}
                scores={score}
              />
            );
          })}
        </tr>
      </table>
    </div>
  );
}

export default Frames;
