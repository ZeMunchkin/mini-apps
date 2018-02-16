import React from 'react';

const Frame = (props) => {

  return (
    <td>
      {props.scores[0] !== '' ? <span className="score">{props.scores[0]}</span> : <span> | </span>}
      {props.scores[1] !== '' ? <span><span> | </span><span className="score">{props.scores[1]}</span></span> : <span />}
      {props.scores[2] !== undefined ? <span><span> | </span><span className="score">{props.scores[2]}</span></span> : <span />}
    </td>
  );
}

export default Frame;
