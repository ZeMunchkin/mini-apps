import React from 'react';
import {render} from 'react-dom';
import Board from './Board.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      announcement: '',
    }
    this.setAnnouncement = this.setAnnouncement.bind(this);
  }

  setAnnouncement (string) {
    this.setState({'announcement': string});
  }

  render () {
    return (
      <div>
        <div id="announcements">{this.state.announcement}</div>
        <br />
        <br />
        <Board id="board" setAnnouncement={this.setAnnouncement}/>
      </div>
    );
  }
}

render(<App />, document.getElementById('app'));


