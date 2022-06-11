import React from 'react';
import {
  TextField,
  InputLabel,
  MenuItem,
  Select,
} from '@mui/material';
import DateTimePicker from '@mui/lab/DateTimePicker';
import PropTypes from 'prop-types';
import {
  JumpalFormControl } from '../../../../components/JumpalCommon';
import JumpalModal from '../../../../components/JumpalModal';
import { speedEvents } from '../../../../constants';
import useNewSpeedRecordController from './useNewSpeedRecordController';

NewSpeedRecord.propTypes = {
  addSd: PropTypes.func.isRequired,
};

export default function NewSpeedRecord(props) {
  const { addSd } = props;
  const [open, eventJ, score, time, toggleNewSpeedRecord, handleEventChange,
    handleScoreChange, handleTimeChange, saveSpeedRecord] =
    useNewSpeedRecordController(addSd);

  return (
    <JumpalModal
      isOpen={open}
      openButtonText="Add New Speed Record"
      onToggle={toggleNewSpeedRecord}
      title="New Speed Record"
      onSubmit={saveSpeedRecord}
    >
      <JumpalFormControl>
        <DateTimePicker
          renderInput={(props) => <TextField {...props} />}
          label="Time"
          value={time}
          onChange={handleTimeChange}
        />
      </JumpalFormControl>
      <JumpalFormControl>
        <InputLabel id="event-label">Event</InputLabel>
        <Select
          labelId='event-label'
          label="Event"
          value={eventJ}
          onChange={handleEventChange}
        >
          {speedEvents.map(
              (event) =>
                <MenuItem value={event.value} key={event.value}>
                  {event.label}
                </MenuItem>,
          )}
        </Select>
      </JumpalFormControl>
      <JumpalFormControl>
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
      </JumpalFormControl>
    </JumpalModal>
  );
}
