import React from 'react';
import { withFirebase } from '../../../Firebase/index';
import './NewSpeedRecord.css';

class NewSpeedRecord extends React.Component {
  constructor(props) {
    super(props);
    this.saveSpeedRecord = this.saveSpeedRecord.bind(this);
  }

  saveSpeedRecord(event) {
    window.alert(event.target.value)
    // this.props.firebase.user(this.props.user.uid)
    // .post({
    //   speedRecord: event.target
    // });
  }

  render() {
    return (
      <div className="newSpeedRecord">
        <form className="form" onSubmit={this.saveSpeedRecord}>
          <h2>New Speed Record</h2>
          <p>Store your speed scores here :)</p>
          <label>Event: 
            <select name="event">
              <option value="" disabled selected>Select your event</option>
              <option value="1x30sec Running Step">1x30sec Running Step</option>
              <option value="30 seconds DU">30 seconds Double Unders</option>
            </select>
          </label>
          <label>
            Score:
            <input type="number" name="score" placeholder="Enter your speed score"></input>
          </label>
          <input id="submitButton" type="submit"></input>
        </form>
      </div>
    );
  }
}

export default withFirebase(NewSpeedRecord);