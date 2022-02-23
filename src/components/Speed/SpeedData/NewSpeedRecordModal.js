import React, { useEffect, useContext, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { child, off, push } from 'firebase/database';
import { FirebaseContext } from '../../../Firebase/index';
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
import
AlertFeedback,
{ alertSeverity }
  from '../../CustomComponents/AlertFeedback';
import './SpeedData.css';

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

function NewSpeedRecordModal(props) {
  const firebase = useContext(FirebaseContext);
  const [user, setUser] = useState(firebase.user);
  const [open, setOpen] = useState(false);
  const [eventJ, setEventJ] = useState(null);
  const [score, setScore] = useState(null);
  const [time, setTime] = useState(null);
  const [success, setSuccess] = useState(null);
  const srRef = firebase.speedRecords;
  let srFormRef = null;

  useEffect(() => {
    // Get current user from firebase and save to state as user
    const unsubscribe = onAuthStateChanged(firebase.auth, async (user) => {
      if (user) {
        setUser(user);
      } else {
        alert('Please sign in to continue');
      }
    });
    return () => {
      off(srRef);
      unsubscribe();
    };
  }, []);

  const toggleNewSpeedRecord = () => {
    setOpen(!open);
    setEventJ(null);
    setScore(null);
    setTime(new Date());
  };

  const handleEventChange = (event) => {
    setEventJ(event.target.value);
  };

  const handleScoreChange = (event) => {
    setScore(event.target.value);
  };

  const handleTimeChange = (time) => {
    setTime(time);
  };

  const timeStamp = (time) => {
    // Create an array with the current month, day and time
    const date = [time.getMonth() + 1, time.getDate(), time.getFullYear()];
    // Create an array with the current hour, minute and second
    const time2 = [time.getHours(), time.getMinutes(), time.getSeconds()];
    // Determine AM or PM suffix based on the hour
    const suffix = ( time2[0] < 12 ) ? 'AM' : 'PM';
    // Convert hour from military time
    time2[0] = ( time2[0] < 12 ) ? time2[0] : time2[0] - 12;
    // If hour is 0, set it to 12
    time2[0] = time2[0] || 12;
    // If minutes are less than 10, add a zero
    for ( let i = 1; i < 2; i++ ) {
      if ( time2[i] < 10 ) {
        time2[i] = '0' + time2[i];
      }
    }
    // Return the formatted string
    return date.join('/') + ' ' + time2.join(':') + ' ' + suffix;
  };

  const saveSpeedRecord = (event) => {
    let today = time;
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0'); // January is 0!
    const yyyy = today.getFullYear();
    today = `${yyyy}/${mm}/${dd}`;

    push(
        child(srRef, `${today}`),
        {
          event: eventJ,
          score: score,
          time: timeStamp(time),
        },
    );
    srFormRef.reset();
    event.preventDefault();
    setSuccess('New speed record successfully saved!');
    toggleNewSpeedRecord();
  };

  return (
    <>
      <AlertFeedback
        msg={success}
        severity={alertSeverity.SUCCESS}
        onClose={() => setSuccess(null)}
        global
      />
      <div className='jumpalCenteredButton'>
        <JumpalButton onClick={toggleNewSpeedRecord}>
          Add New Speed Record
        </JumpalButton>
      </div>
      <Modal
        open={open}
        onClose={toggleNewSpeedRecord}
      >
        <Box sx={styles.modalStyle}>
          <Typography variant="h6" component="h2">
            New Speed Record
          </Typography>
          <form ref={(el) => srFormRef = el}>
            <div className='modalInput'>
              <FormControl fullWidth>
                {/* Time Input */}
                <DateTimePicker
                  renderInput={(props) => <TextField {...props} />}
                  label="Time"
                  value={time}
                  onChange={handleTimeChange}
                />
              </FormControl>
            </div>
            <div className='modalInput'>
              <FormControl fullWidth>
                {/* Event Input */}
                <InputLabel id="event-label">Event</InputLabel>
                <Select
                  labelId='event-label'
                  label="Event"
                  value={eventJ}
                  onChange={handleEventChange}
                >
                  {options.map(
                      (event) =>
                        <MenuItem value={event.value} key={event.value}>
                          {event.label}
                        </MenuItem>,
                  )}
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
                  value={score}
                  onChange={handleScoreChange}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </FormControl>
            </div>
          </form>
          {user ?
              <JumpalButton onClick={saveSpeedRecord}>Save</JumpalButton> :
              <JumpalButton onClick={saveSpeedRecord} disabled>
                Save
              </JumpalButton>
          }
        </Box>
      </Modal>
    </>
  );
}

export default NewSpeedRecordModal;
