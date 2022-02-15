import React from 'react';
import { withFirebase } from '../../../Firebase/index';
import { JumpalButton } from '../../CustomComponents/core';

import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import DateTimePicker from '@mui/lab/DateTimePicker';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import { styles } from '../../CustomComponents/constants';
import './NewPersonalBestModal.css';

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

class NewPersonalBestModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      loading: false,

      // For new personal best modal
      openNewPersonalBest: false,
      newPersonalBestEvent: null,
      newPersonalBestScore: null,
      newPersonalBestTime: null,
    }

    // New personal best modal methods
    this.toggleNewPersonalBest = this.toggleNewPersonalBest.bind(this);
    this.saveNewPersonalBest = this.saveNewPersonalBest.bind(this);
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

  toggleNewPersonalBest() {
    this.setState({
      openNewPersonalBest: !this.state.openNewPersonalBest,
      newPersonalBestEvent: null,
      newPersonalBestScore: null,
      newPersonalBestTime: new Date(),
    })
  }

  // New personal best modal methods
  handleEventChange(event) {
    this.setState({ 
      newPersonalBestEvent: event.target.value,
      newPersonalBestEventColor: '#383838',
     });

  }

  handleScoreChange(event) {
    this.setState({ newPersonalBestScore: event.target.value });
  }

  handleTimeChange(time) {
    this.setState({ newPersonalBestTime: time });
  } 

  timeStamp(time) {
    time = new Date(time)
    // Create an array with the current month, day and time
    let date = [ time.getMonth() + 1, time.getDate(), time.getFullYear() ];

    // Return the formatted string
    return date.join("/");
  }

  saveNewPersonalBest(event) {
    event.preventDefault();

    // Add new personal best entry into database
    this.props.firebase.db.ref('users')
    .child(this.props.firebase.auth.currentUser.uid)
    .child('personal-bests')
    .child(this.state.newPersonalBestEvent)
    .set({
      score: this.state.newPersonalBestScore,
      time: this.timeStamp(this.state.newPersonalBestTime),
    });
    
    // TODO: Change this into a toast
    window.alert('New Personal Best saved successfully!');
    this.toggleNewPersonalBest();
  }

  render() {
    return (
      <>
        <div className='jumpalCenteredButton'>
          <JumpalButton onClick={this.toggleNewPersonalBest}>
            Add New Personal Best
          </JumpalButton>
        </div>
        <Modal
          open={this.state.openNewPersonalBest}
          onClose={this.toggleNewPersonalBest}
        >
          <Box sx={styles.modalStyle}>
            <Typography variant="h6" component="h2">
              New Personal Best
            </Typography>
            <form className='jumpalForm' ref={(el) => this.PbFormRef = el}>
              <div className='modalInput'>
                <FormControl fullWidth>
                  {/* Time Input */}
                  <DateTimePicker
                    renderInput={(props) => <TextField {...props} />}
                    label="Time"
                    value={this.state.newPersonalBestTime}
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
                    value={this.state.newPersonalBestEvent}
                    onChange={this.handleEventChange}
                  >
                    {options.map(event => <MenuItem value={event.value} key={event.value}>{event.label}</MenuItem>)}
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
                ? <JumpalButton onClick={this.saveNewPersonalBest}>Save</JumpalButton>
                : <JumpalButton onClick={this.saveNewPersonalBest} disabled>Save</JumpalButton>
            }
          </Box>
        </Modal>
      </>
    );
  }
}

export default withFirebase(NewPersonalBestModal);