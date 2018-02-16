import React from 'react';

const Frame = (props) => {

  return (
    <td>
      {props.scores[0] ? <span>{props.scores[0]}</span> : <span> / </span>}
      {props.scores[1] ? <span> / {props.scores[1]}</span> : <span />}
      {props.scores[2]? <span> / {props.scores[2]}</span> : <span />}
    </td>
  );
}

export default Frame;
