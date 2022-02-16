import React from 'react';
import './TimingTracks.css';
import SRSS1x30sec from '../../../audio/SRSS-1x30sec.mp3';
import SRDU2x30sec from '../../../audio/SRDU-2x30sec.mp3';
import SRSE1x180sec from '../../../audio/SRSE-1x180sec.mp3';
import SRSR4x30sec from '../../../audio/SRSR-4x30sec.mp3';
import DDSS1x60sec from '../../../audio/DDSS-1x60sec.mp3';
import DDSR4x30sec from '../../../audio/DDSR-4x30sec.mp3';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const options = [
  { value: 'SRSS-1x30sec', label: 'Single Rope Speed Sprints 1x30sec' },
  { value: 'SRDU-2x30sec', label: 'Single Rope Double Unders 2x30sec' },
  { value: 'SRSE-1x180sec', label: 'Single Rope Speed Endurance 1x180sec' },
  { value: 'SRSR-4x30sec', label: 'Single Rope Speed Relay 4x30sec' },
  { value: 'DDSR-4x30sec', label: 'Double Dutch Speed Relay 4x30sec' },
  { value: 'DDSS-1x60sec', label: 'Double Dutch Speed Sprints 1x60sec' },
];

export default class TimingTracks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      track: null,
      selectColor: 'gray',
    };
    this.handleTrackChange = this.handleTrackChange.bind(this);
  }

  handleTrackChange(event) {
    console.log(event);
    this.setState({
      track: event.value,
      selectColor: '#383838',
    });
  }

  render() {
    let src = null;
    if (this.state.track === 'SRSS-1x30sec') {
      src = SRSS1x30sec;
    } else if (this.state.track === 'SRDU-2x30sec') {
      src = SRDU2x30sec;
    } else if (this.state.track === 'SRSE-1x180sec') {
      src = SRSE1x180sec;
    } else if (this.state.track === 'SRSR-4x30sec') {
      src = SRSR4x30sec;
    } else if (this.state.track === 'DDSR-4x30sec') {
      src = DDSR4x30sec;
    } else if (this.state.track === 'DDSS-1x60sec') {
      src = DDSS1x60sec;
    }

    return (
      <div className="timing-tracks-container">
        <h2 className="timingTrackTitle">Timing Tracks</h2>
        <div className="select-and-audio">
          <FormControl fullWidth>
            <InputLabel>Select timing track</InputLabel>
            <Select
              value={this.state.newPersonalBestEvent}
              label="Select timing track"
              onChange={this.state.handleTrackChange}
            >
              {options.map(
                  (option) => (
                    <MenuItem value={option} key={option}>option</MenuItem>
                  ),
              )}
            </Select>
          </FormControl>
          <audio className="timing-track-audio" src={src} controls></audio>
        </div>
      </div>
    );
  }
}
