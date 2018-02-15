import React from 'react';

const Frame = (props) => {

  return (
    <td>
      <div>Bowl 1: {props.scores[0]}</div>
      <div>Bowl 2: {props.scores[1]}</div>
      {props.scores[2] ? <div class="specials">{props.scores[2]}</div> : <div />}
    </td>
  );
}

export default Frame;
