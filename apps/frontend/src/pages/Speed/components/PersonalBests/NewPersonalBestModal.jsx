import React, { useEffect, useContext, useState } from 'react';
import { FirebaseContext } from '../../../../Firebase/index';
import { onAuthStateChanged } from 'firebase/auth';
import { set, child, off } from 'firebase/database';
import JumpalButton from '../../../../components/JumpalButton';
import {
  Modal,
  Box,
  Typography,
  TextField,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
} from '@mui/material';
import DateTimePicker from '@mui/lab/DateTimePicker';
import
JumpalAlertFeedback,
{ alertSeverity }
  from '../../../../components/JumpalAlertFeedback';
import { styles } from '../../../../components/constants';

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

function NewPersonalBestModal() {
  const firebase = useContext(FirebaseContext);
  const [user, setUser] = useState(null);
  const [open, setOpen] = useState(false);
  const [eventJ, setEventJ] = useState(null);
  const [score, setScore] = useState(null);
  const [time, setTime] = useState(null);
  const [success, setSuccess] = useState(null);
  const pbRef = firebase.personalBests;

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
      off(pbRef);
      unsubscribe();
    };
  }, []);

  const toggleNewPersonalBest = () => {
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
    time = new Date(time);
    // Create an array with the current month, day and time
    const date = [time.getMonth() + 1, time.getDate(), time.getFullYear()];

    // Return the formatted string
    return date.join('/');
  };

  const saveNewPersonalBest = (event) => {
    event.preventDefault();

    // Add new personal best entry into database
    const currEventPbRef = child(pbRef, eventJ);
    set(currEventPbRef, {
      score: score,
      time: timeStamp(time),
    });

    setSuccess('New Personal Best saved successfully!');
    toggleNewPersonalBest();
  };

  return (
    <div>
      <JumpalAlertFeedback
        msg={success}
        severity={alertSeverity.SUCCESS}
        onClose={() => setSuccess(null)}
        global
      />
      <div className='jumpalCenteredButton'>
        <JumpalButton onClick={toggleNewPersonalBest}>
          Add New Personal Best
        </JumpalButton>
      </div>
      <Modal
        open={open}
        onClose={toggleNewPersonalBest}
      >
        <Box sx={styles.modalStyle}>
          <Typography variant="h6" component="h2">
            New Personal Best
          </Typography>
          <form>
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
                <InputLabel>Event</InputLabel>
                <Select
                  label="Event"
                  value={eventJ}
                  onChange={handleEventChange}
                >
                  {options.map((event) => (
                    <MenuItem value={event.value} key={event.value}>
                      {event.label}
                    </MenuItem>
                  ))}
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
                  onChange={handleScoreChange}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </FormControl>
            </div>
          </form>
          {user ?
            <JumpalButton onClick={saveNewPersonalBest}>
              Save
            </JumpalButton> :
            <JumpalButton onClick={saveNewPersonalBest} disabled>
              Save
            </JumpalButton>
          }
        </Box>
      </Modal>
    </div>
  );
}

export default NewPersonalBestModal;
