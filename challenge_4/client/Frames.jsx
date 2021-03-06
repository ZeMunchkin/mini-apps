import React from 'react';
import Frame from './Frame.jsx';


const Frames = (props) => {


  return (
    <div id="framesContainer">
      <table>
        <tbody>
          <tr>
            {props.frames.map( (scoreTuple, index) => (
              <th key={'header' + index}>Frame {index + 1}</th>
            ))}
          </tr>
          <tr>
            {props.frames.map( (scoreTuple, index) => (
                <Frame 
                  key={'frame' + index}
                  scores={scoreTuple}
                  frame={index + 1}
                />
            ))}
          </tr>
          <tr>
            {props.scores.map( (frameScore, index )=> (
              <td 
                key={'score' + index}
                className="frameScores">{frameScore}
              </td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default Frames;
