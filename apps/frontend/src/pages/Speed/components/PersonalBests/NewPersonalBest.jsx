import React from "react";
import { TextField, InputLabel, MenuItem, Select } from "@mui/material";
import DateTimePicker from "@mui/lab/DateTimePicker";
import { speedEvents } from "../../../../constants";
import PropTypes from "prop-types";
import useNewPersonalBestController from "./useNewPersonalBestController";
import { JumpalFormControl } from "../../../../components/JumpalCommon.tsx";
import JumpalModal from "../../../../components/JumpalModal";

NewPersonalBest.propTypes = {
  addPb: PropTypes.func.isRequired,
};

export default function NewPersonalBest(props) {
  const [
    toggleNewPersonalBest,
    handleEventChange,
    handleScoreChange,
    handleTimeChange,
    saveNewPersonalBest,
    open,
    eventJ,
    time,
  ] = useNewPersonalBestController(props.addPb);

  return (
    <JumpalModal
      isOpen={open}
      openButtonText="Add New Personal Best"
      onToggle={toggleNewPersonalBest}
      title="New Personal Best"
      onSubmit={saveNewPersonalBest}
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
        <InputLabel>Event</InputLabel>
        <Select label="Event" value={eventJ} onChange={handleEventChange}>
          {speedEvents.map((event) => (
            <MenuItem value={event.value} key={event.value}>
              {event.label}
            </MenuItem>
          ))}
        </Select>
      </JumpalFormControl>
      <JumpalFormControl>
        <TextField
          label="Score"
          type="number"
          placeholder="Score"
          onChange={handleScoreChange}
          InputLabelProps={{
            shrink: true,
          }}
        />
      </JumpalFormControl>
    </JumpalModal>
  );
}
