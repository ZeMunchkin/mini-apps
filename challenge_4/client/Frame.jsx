import React from 'react';

const Frame = (props) => {

  return (
    <td>
      {props.scores[0] === 'X' ? <div className="specials">{props.scores[0]}</div> : <span>{props.scores[0]} / </span>}
      {props.scores[1] === '/' ? <span className="specials">{props.scores[1]}</span> : <span>{props.scores[1]}</span>}
    </td>
  );
}

export default Frame;
