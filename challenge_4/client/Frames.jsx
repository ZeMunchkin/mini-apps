import React from 'react';
import Frame from './Frame.jsx';


const Frames = (props) => {


  return (
    <div id="framesContainer">
      <table>
        <tbody>
          <tr>
            {props.rounds.map( (scoreTuple, index) => {
              return (
                <th>Frame {index + 1}</th>
              );
            })}
          </tr>
          <tr>
            {props.rounds.map( (scoreTuple, index) => {
              return (
                <Frame 
                  id={index}
                  scores={scoreTuple}
                />
              );
            })}
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default Frames;
