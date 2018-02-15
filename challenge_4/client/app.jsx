import React from 'react';
import {render} from 'react-dom';

import Frames from './Frames.jsx';
import BowlAction from './BowlAction.jsx';

class App extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      scores: [],
    }

    //function binding to this as necessary
  }



  render () {
    return (
      <div>
        <h1>Let's Bowl!</h1>
        <BowlAction />
        <br />
        <Frames 
          scores={this.state.scores}

        />
      </div>
    )
  }
}

render(<App/>, document.getElementById('app'));