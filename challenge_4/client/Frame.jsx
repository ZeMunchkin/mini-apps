import React from 'react';

const Frame = (props) => {

  return (
    <td>
      <div>1st: {props.scores[0]}</div>
      <div>2nd: {props.scores[1]}</div>
      {props.scores[2] ? <div className="specials">{props.scores[2]}</div> : <div />}
    </td>
  );
}

export default Frame;
