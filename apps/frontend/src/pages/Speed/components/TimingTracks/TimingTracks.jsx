import React, { useState } from 'react';
import './TimingTracks.css';
import SRSS1x30sec from '../../../../audio/SRSS-1x30sec.mp3';
import SRDU2x30sec from '../../../../audio/SRDU-2x30sec.mp3';
import SRSE1x180sec from '../../../../audio/SRSE-1x180sec.mp3';
import SRSR4x30sec from '../../../../audio/SRSR-4x30sec.mp3';
import DDSS1x60sec from '../../../../audio/DDSS-1x60sec.mp3';
import DDSR4x30sec from '../../../../audio/DDSR-4x30sec.mp3';
import { InputLabel, MenuItem, FormControl, Select } from '@mui/material';

const options = [
  { value: 'SRSS-1x30sec', label: 'Single Rope Speed Sprints 1x30sec' },
  { value: 'SRDU-2x30sec', label: 'Single Rope Double Unders 2x30sec' },
  { value: 'SRSE-1x180sec', label: 'Single Rope Speed Endurance 1x180sec' },
  { value: 'SRSR-4x30sec', label: 'Single Rope Speed Relay 4x30sec' },
  { value: 'DDSR-4x30sec', label: 'Double Dutch Speed Relay 4x30sec' },
  { value: 'DDSS-1x60sec', label: 'Double Dutch Speed Sprints 1x60sec' },
];

export default function TimingTracks() {
  const [src, setSrc] = useState(SRSS1x30sec);

  const handleTrackChange = (event) => {
    if (event.target.value === 'SRSS-1x30sec') {
      setSrc(SRSS1x30sec);
    } else if (event.target.value === 'SRDU-2x30sec') {
      setSrc(SRDU2x30sec);
    } else if (event.target.value === 'SRSE-1x180sec') {
      setSrc(SRSE1x180sec);
    } else if (event.target.value === 'SRSR-4x30sec') {
      setSrc(SRSR4x30sec);
    } else if (event.target.value === 'DDSR-4x30sec') {
      setSrc(DDSR4x30sec);
    } else if (event.target.value === 'DDSS-1x60sec') {
      setSrc(DDSS1x60sec);
    }
  };

  return (
    <div className="timing-tracks-container">
      <h2 className="timingTrackTitle">Timing Tracks</h2>
      <div className="select-and-audio">
        <FormControl fullWidth>
          <InputLabel>Select timing track</InputLabel>
          <Select
            label="Select timing track"
            onChange={handleTrackChange}
          >
            {options.map(
                (option) => (
                  <MenuItem value={option.value} key={option.value}>
                    {option.label}
                  </MenuItem>
                ),
            )}
          </Select>
        </FormControl>
        {src !== '' ?
          <audio className="timing-track-audio" src={src} controls></audio>:
           null}
      </div>
    </div>
  );
}
