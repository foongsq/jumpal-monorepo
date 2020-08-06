import React from 'react';
import DateTime from 'react-datetime';
import { withFirebase } from '../../../Firebase/index';
import '../NewSpeedRecord/NewSpeedRecord.css';
import './NewPersonalBest.css';

class NewPersonalBest extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      event: null,
      score: null,
      time: new Date(),
      color: 'gray'
    }
    this.saveNewPersonalBest = this.saveNewPersonalBest.bind(this);
    this.handleEventChange = this.handleEventChange.bind(this);
    this.handleScoreChange = this.handleScoreChange.bind(this);
    this.handleTimeChange = this.handleTimeChange.bind(this);
    this.timeStamp = this.timeStamp.bind(this);
  }

  handleEventChange(event) {
    this.setState({ 
      event: event.target.value,
      color: '#383838',
     });

  }

  handleScoreChange(event) {
    this.setState({ score: event.target.value });
  }

  handleTimeChange(time) {
    this.setState({ time: time });
  } 

  timeStamp(time) {
    time = new Date(time)
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

  saveNewPersonalBest(event) {
    // let today = this.state.time;
    // let dd = String(today.getDate()).padStart(2, '0');
    // let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    // let yyyy = today.getFullYear();
    // today = `${yyyy}/${mm}/${dd}`;
    event.preventDefault();
    console.log('called save new pb')
    this.props.firebase.db.ref('users')
    .child(this.props.firebase.auth.currentUser.uid)
    .child('personal-bests')
    .child(this.state.event)
    .set({
      score: this.state.score,
      time: this.timeStamp(this.state.time),
    });
    // this.PbFormRef.reset();
    
    window.alert('New Personal Best saved successfully!');
  }

  render() {
    return (
      <div className="newSpeedRecord">
        <form className="form" ref={(el) => this.PbFormRef = el}>
          <h2>New Personal Best Record</h2>
          <p>Store your Personal Bests here :)</p>
          <div className="input-div">
          <label className="time-label">Time: 
            <br />
            <DateTime
              id="time"
              className="time-input" 
              onChange={this.handleTimeChange} 
              value={this.state.time}
            />
          </label>
          <label>Event: 
            <select defaultValue="" style={{color: this.state.color}} name="event" onChange={this.handleEventChange} className="select-input">
              <option value="" disabled>Select your event</option>
              <option className="event-option" value="1x30sec Running Step">1x30sec Running Step</option>
              <option className="event-option" value="1x60sec Running Step">1x60sec Running Step</option>
              <option className="event-option" value="1x30sec Double Unders">1x30sec Double Unders</option>
              <option className="event-option" value="1x60sec Double Unders">1x60sec Double Unders</option>
              <option className="event-option" value="1x180sec Running Step">1x180sec Running Step</option>
              <option className="event-option" value="1x240sec Running Step">1x240sec Running Step</option>
              <option className="event-option" value="Consecutive Triple Unders">Consecutive Triple Unders</option>
              <option className="event-option" value="2x30sec Double Unders">2x30sec Double Unders</option>
              <option className="event-option" value="4x30sec Speed Relay">4x30sec Speed Relay</option>
            </select>
          </label>
          <label>
            Score:
            <input className="input" type="number" min="0" placeholder="Enter your speed score" onChange={this.handleScoreChange}></input>
          </label>
          </div>
          <div className="submit-div">
          {this.props.firebase.auth.currentUser 
            ? <input id="submitButton" type="submit" onClick={this.saveNewPersonalBest}></input>
            : <input className="button" id="submitButton" type="submit" onClick={this.saveNewPersonalBest} disabled></input> }
          </div>
        </form>
      </div>
    );
  }
}

export default withFirebase(NewPersonalBest);