import React from 'react';

const Frame = (props) => {

  return (
    <td>
      <div>Bowl 1: {props.scores[0]}</div>
      <div>Bowl 2: {props.scores[1]}</div>
    </td>
  );
}

export default Frame;
