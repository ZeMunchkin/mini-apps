import PlayerOne from 'PlayerOne';
import PlayerTwo from 'PlayerTwo';

class Board extends React.Component {
  constructor(props) {
    super(props);

    this.state = {

    }
  }

  render () {
    return (
      <div>
        <table>         
          <tr id='row5'>
            <td class='col0' id="r5c0"></td>
            <td class='col1' id="r5c1"></td>
            <td class='col2' id="r5c2"></td>
            <td class='col3' id="r5c3"></td>
            <td class='col4' id="r5c4"></td>
            <td class='col5' id="r5c5"></td>
            <td class='col6' id="r5c6"></td>
          </tr>
          <tr id='row4'>
            <td class='col0' id="r4c0"></td>
            <td class='col1' id="r4c1"></td>
            <td class='col2' id="r4c2"></td>
            <td class='col3' id="r4c3"></td>
            <td class='col4' id="r4c4"></td>
            <td class='col5' id="r4c5"></td>
            <td class='col6' id="r4c6"></td>
          </tr>
          <tr id='row3'>
            <td class='col0' id="r3c0"></td>
            <td class='col1' id="r3c1"></td>
            <td class='col2' id="r3c2"></td>
            <td class='col3' id="r3c3"></td>
            <td class='col4' id="r3c4"></td>
            <td class='col5' id="r3c5"></td>
            <td class='col6' id="r3c6"></td>
          </tr>
          <tr id='row2'>
            <td class='col0' id="r2c0"></td>
            <td class='col1' id="r2c1"></td>
            <td class='col2' id="r2c2"></td>
            <td class='col3' id="r2c3"></td>
            <td class='col4' id="r2c4"></td>
            <td class='col5' id="r2c5"></td>
            <td class='col6' id="r2c6"></td>
          </tr>
          <tr id='row1'>
            <td class='col0' id="r1c0"></td>
            <td class='col1' id="r1c1"></td>
            <td class='col2' id="r1c2"></td>
            <td class='col3' id="r1c3"></td>
            <td class='col4' id="r1c4"></td>
            <td class='col5' id="r1c5"></td>
            <td class='col6' id="r1c6"></td>
          </tr>
          <tr id='row0'>
            <td class='col0' id="r0c0"></td>
            <td class='col1' id="r0c1"></td>
            <td class='col2' id="r0c2"></td>
            <td class='col3' id="r0c3"></td>
            <td class='col4' id="r0c4"></td>
            <td class='col5' id="r0c5"></td>
            <td class='col6' id="r0c6"></td>
          </tr>
        </table>
      </div>
    );
  }
}

export default Board;