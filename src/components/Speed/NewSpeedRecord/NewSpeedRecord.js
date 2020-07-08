import React from 'react';
import { withFirebase } from '../../../Firebase/index';
import './NewSpeedRecord.css';

class NewSpeedRecord extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      event: null,
      score: null,
    }
    this.saveSpeedRecord = this.saveSpeedRecord.bind(this);
    this.handleEventChange = this.handleEventChange.bind(this);
    this.handleScoreChange = this.handleScoreChange.bind(this);
    this.timeStamp = this.timeStamp.bind(this);
  }

  handleEventChange(event) {
    this.setState({ event: event.target.value });
  }

  handleScoreChange(event) {
    this.setState({ score: event.target.value });
  }

  timeStamp() {
    // Create a date object with the current time
    var now = new Date();
    // Create an array with the current month, day and time
    var date = [ now.getMonth() + 1, now.getDate(), now.getFullYear() ];
    // Create an array with the current hour, minute and second
    var time = [ now.getHours(), now.getMinutes(), now.getSeconds() ];
    // Determine AM or PM suffix based on the hour
    var suffix = ( time[0] < 12 ) ? "AM" : "PM";
    // Convert hour from military time
    time[0] = ( time[0] < 12 ) ? time[0] : time[0] - 12;
    // If hour is 0, set it to 12
    time[0] = time[0] || 12;
    // If seconds and minutes are less than 10, add a zero
    for ( var i = 1; i < 3; i++ ) {
      if ( time[i] < 10 ) {
        time[i] = "0" + time[i];
      }
    }
    // Return the formatted string
    return date.join("/") + " " + time.join(":") + " " + suffix;
  }

  saveSpeedRecord(event) {
    this.props.firebase.user(this.props.user.uid)
    .child('speed-records').push()
    .set({
      event: this.state.event, 
      score: this.state.score,
      time: this.timeStamp()
    });
    this.myFormRef.reset();
    event.preventDefault();
  }

  render() {
    return (
      <div className="newSpeedRecord">
        <form className="form" ref={(el) => this.myFormRef = el}>
          <h2>New Speed Record</h2>
          <p>Store your speed scores here :)</p>
          <label>Event: 
            <select name="event" onChange={this.handleEventChange}>
              <option value="" selected>Select your event</option>
              <option value="1x30sec Running Step">1x30sec Running Step</option>
              <option value="1x30sec Double Unders">1x30sec Double Unders</option>
              <option value="1x180sec Running Step">1x180sec Running Step</option>
              <option value="2x30sec Double Unders">2x30sec Double Unders</option>
              <option value="4x30sec Speed Relay">4x30sec Speed Relay</option>
            </select>
          </label>
          <label>
            Score:
            <input type="number" name="score" placeholder="Enter your speed score" onChange={this.handleScoreChange}></input>
          </label>
          {this.props.user ? <input id="submitButton" type="submit" onClick={this.saveSpeedRecord}></input>
            : <input id="submitButton" type="submit" onClick={this.saveSpeedRecord} disabled></input> }
          
        </form>
      </div>
    );
  }
}

export default withFirebase(NewSpeedRecord);