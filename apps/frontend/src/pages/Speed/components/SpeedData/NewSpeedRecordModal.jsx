import React, { useState } from 'react';
import {
  JumpalButton,
  useJumpalToast } from '../../../../components';
import { styles } from '../../../../constants';
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
import './SpeedData.css';
import PropTypes from 'prop-types';
import { useAuth } from '../../../../hooks';

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

NewSpeedRecordModal.propTypes = {
  addSd: PropTypes.func.isRequired,
};

function NewSpeedRecordModal(props) {
  const { addSd } = props;
  const [user] = useAuth();
  const Toast = useJumpalToast();
  const [open, setOpen] = useState(false);
  const [eventJ, setEventJ] = useState(null);
  const [score, setScore] = useState(null);
  const [time, setTime] = useState(null);

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

  const saveSpeedRecord = async (event) => {
    const res = await addSd(eventJ, score, time);
    if (res) {
      Toast.success('New speed record successfully saved!');
      toggleNewSpeedRecord();
    } else {
      Toast.error('An error occured :(');
    }
    event.preventDefault();
  };

  return (
    <>
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
