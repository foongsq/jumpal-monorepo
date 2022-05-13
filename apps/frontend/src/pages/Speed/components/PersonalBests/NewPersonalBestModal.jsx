import React, { useState } from 'react';
import {
  JumpalButton,
  JumpalAlertFeedback,
  alertSeverity } from '../../../../components';
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
import { styles } from '../../../../constants';
import { useAuth } from '../../../../hooks';
import PropTypes from 'prop-types';

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

NewPersonalBestModal.propTypes = {
  addPb: PropTypes.func.isRequired,
};

function NewPersonalBestModal(props) {
  const { addPb } = props;
  const [user] = useAuth();
  const [open, setOpen] = useState(false);
  const [eventJ, setEventJ] = useState(null);
  const [score, setScore] = useState(null);
  const [time, setTime] = useState(null);
  const [success, setSuccess] = useState(null);

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

  const saveNewPersonalBest = async (event) => {
    event.preventDefault();
    const res = await addPb(eventJ, score, time);
    if (res) {
      setSuccess('New Personal Best saved successfully!');
      toggleNewPersonalBest();
    }
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
