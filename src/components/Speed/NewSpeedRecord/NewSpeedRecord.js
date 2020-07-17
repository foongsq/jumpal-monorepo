import React from 'react';
import DateTimePicker from 'react-datetime-picker';
import { withFirebase } from '../../../Firebase/index';
import './NewSpeedRecord.css';

class NewSpeedRecord extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      event: null,
      score: null,
      time: new Date()
    }
    this.saveSpeedRecord = this.saveSpeedRecord.bind(this);
    this.handleEventChange = this.handleEventChange.bind(this);
    this.handleScoreChange = this.handleScoreChange.bind(this);
    this.handleTimeChange = this.handleTimeChange.bind(this);
    this.timeStamp = this.timeStamp.bind(this);
  }

  handleEventChange(event) {
    this.setState({ event: event.target.value });
  }

  handleScoreChange(event) {
    this.setState({ score: event.target.value });
  }

  handleTimeChange(time) {
    this.setState({ time: time });
  } 

  timeStamp(time) {
    // Create an array with the current month, day and time
    let date = [ time.getMonth() + 1, time.getDate(), time.getFullYear() ];
    // Create an array with the current hour, minute and second
    let time2 = [ time.getHours(), time.getMinutes(), time.getSeconds() ];
    // Determine AM or PM suffix based on the hour
    let suffix = ( time2[0] < 12 ) ? "AM" : "PM";
    // Convert hour from military time
    time2[0] = ( time2[0] < 12 ) ? time2[0] : time2[0] - 12;
    // If hour is 0, set it to 12
    time2[0] = time2[0] || 12;
    // If seconds and minutes are less than 10, add a zero
    for ( let i = 1; i < 3; i++ ) {
      if ( time2[i] < 10 ) {
        time2[i] = "0" + time2[i];
      }
    }
    // Return the formatted string
    return date.join("/") + " " + time2.join(":") + " " + suffix;
  }

  saveSpeedRecord(event) {
    let today = this.state.time;
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    let yyyy = today.getFullYear();
    today = `${yyyy}/${mm}/${dd}`;

    console.log('today', today)
    console.log('this.state.time', this.state.time)
    console.log('timestamp()', this.timeStamp(this.state.time))
    this.props.firebase.user(this.props.firebase.auth.currentUser.uid)
    .child('speed-records')
    .child(`${today}`)
    .push({
      event: this.state.event, 
      score: this.state.score,
      time: this.timeStamp(this.state.time),
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
          <label>Time: 
            <br />
            <DateTimePicker 
              id="time-input"
              className="input" 
              onChange={this.handleTimeChange} 
              value={this.state.time}
              calendarIcon={null}
              clearIcon={null}
              disableClock
              maxDate={new Date()}/>
          </label>
          <label>Event: 
            <select name="event" onChange={this.handleEventChange} className="input">
              <option value="" selected>Select your event</option>
              <option value="1x30sec Running Step">1x30sec Running Step</option>
              <option value="1x60sec Running Step">1x60sec Running Step</option>
              <option value="1x30sec Double Unders">1x30sec Double Unders</option>
              <option value="1x180sec Running Step">1x180sec Running Step</option>
              <option value="2x30sec Double Unders">2x30sec Double Unders</option>
              <option value="4x30sec Speed Relay">4x30sec Speed Relay</option>
            </select>
          </label>
          <label>
            Score:
            <input className="input" type="number" name="score" placeholder="Enter your speed score" onChange={this.handleScoreChange}></input>
          </label>
          {this.props.firebase.auth.currentUser ? <input className="input" id="submitButton" type="submit" onClick={this.saveSpeedRecord}></input>
            : <input className="input" id="submitButton" type="submit" onClick={this.saveSpeedRecord} disabled></input> }
          
        </form>
      </div>
    );
  }
}

export default withFirebase(NewSpeedRecord);