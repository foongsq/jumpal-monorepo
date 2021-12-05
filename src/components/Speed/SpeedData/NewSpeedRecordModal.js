import React from 'react';
import './SpeedData.css';
import { withFirebase } from '../../../Firebase/index';
import { JumpalButton } from '../../CustomComponents/core';
import { styles } from '../../CustomComponents/constants';

import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import DateTimePicker from '@mui/lab/DateTimePicker';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const options = [
  { value: '1x30sec Running Step', label: '1x30sec Running Step' },
  { value: '1x60sec Running Step', label: '1x60sec Running Step' },
  { value: '1x30sec Double Unders', label: '1x30sec Double Unders' },
  { value: '1x60sec Double Unders', label: '1x60sec Double Unders' },
  { value: '1x180sec Running Step', label: '1x180sec Running Step' },
  { value: '1x240sec Running Step', label: '1x240sec Running Step' },
  { value: 'Consecutive Triple Unders', label: 'Consecutive Triple Unders' },
  { value: '2x30sec Double Unders', label: '2x30sec Double Unders' },
  { value: '4x30sec Speed Relay', label: '4x30sec Speed Relay' },
];

class NewSpeedRecordModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      loading: false,

      openNewSpeedRecord: false,
      newSpeedRecordEvent: null,
      newSpeedRecordScore: null,
      time: new Date(),
    }
    this.toggleNewSpeedRecord = this.toggleNewSpeedRecord.bind(this);
    this.saveSpeedRecord = this.saveSpeedRecord.bind(this);
    this.handleEventChange = this.handleEventChange.bind(this);
    this.handleScoreChange = this.handleScoreChange.bind(this);
    this.handleTimeChange = this.handleTimeChange.bind(this);
    this.timeStamp = this.timeStamp.bind(this);
  }

  async componentDidMount() {
    this.setState({ loading: true });
    // Get current user from firebase and save to state as user
    this.props.firebase.auth.onAuthStateChanged(async user => {
      if (user) {
        this.setState({
          user: user,
          loading: false,
        })
      } else {
        // Prompts user to sign in
        alert("Please sign in to continue");
        this.setState({
          loading: false,
        })
      }
    });
  }

  toggleNewSpeedRecord() {
    this.setState({ 
      openNewSpeedRecord: !this.state.openNewSpeedRecord,
      newSpeedRecordEvent: null,
      newSpeedRecordScore: null,
      time: new Date(),
    });
  }

  handleEventChange(event) {
    this.setState({ newSpeedRecordEvent: event.target.value });
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
    // If minutes are less than 10, add a zero
    for ( let i = 1; i < 2; i++ ) {
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

    this.props.firebase.user(this.props.firebase.auth.currentUser.uid)
    .child('speed-records')
    .child(`${today}`)
    .push({
      event: this.state.newSpeedRecordEvent, 
      score: this.state.score,
      time: this.timeStamp(this.state.time),
    });
    this.myFormRef.reset();
    event.preventDefault();
    this.toggleNewSpeedRecord();
    window.alert("Congratulations! You have successfully saved a new speed record. Keep going!!");
  }

  render() {
    return (
      <>
        <div className='jumpalCenteredButton'>
          <JumpalButton onClick={this.toggleNewSpeedRecord}>
            Add New Speed Record
          </JumpalButton>
        </div>
        <Modal
          open={this.state.openNewSpeedRecord}
          onClose={this.toggleNewSpeedRecord}
        >
          <Box sx={styles.modalStyle}>
            <Typography variant="h6" component="h2">
              New Speed Record
            </Typography>
            <form className='jumpalForm' ref={(el) => this.myFormRef = el}>
              <div className='modalInput'>
                <FormControl fullWidth>
                  {/* Time Input */}
                  <DateTimePicker
                    renderInput={(props) => <TextField {...props} />}
                    label="Time"
                    value={this.state.time}
                    onChange={this.handleTimeChange}
                  />
                </FormControl>
              </div>
              <div className='modalInput'>
                <FormControl fullWidth>
                  {/* Event Input */}
                  <InputLabel>Event</InputLabel>
                  <Select
                    label="Event"
                    value={this.state.newSpeedRecordEvent}
                    onChange={this.handleEventChange}
                  >
                    {options.map(event => <MenuItem value={event.value}>{event.label}</MenuItem>)}
                  </Select>
                </FormControl>
              </div>
              <div className='modalInput'>
                <FormControl fullWidth>
                  {/* Score Input */}
                  <TextField
                    label="Score"
                    type="number"
                    placeholder="Score"
                    onChange={this.handleScoreChange}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </FormControl>
              </div>
            </form>
            {this.state.user 
                ? <JumpalButton onClick={this.saveSpeedRecord}>Save</JumpalButton>
                : <JumpalButton onClick={this.saveSpeedRecord} disabled>Save</JumpalButton>
            }
          </Box>
        </Modal>
      </>
    );
  }
}

export default withFirebase(NewSpeedRecordModal);