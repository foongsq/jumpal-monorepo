import React from 'react';
import './TimingTracks.css';
import SRSS1x30sec from '../../../audio/SRSS-1x30sec.mp3';
import SRDU2x30sec from '../../../audio/SRDU-2x30sec.mp3';
import SRSE1x180sec from '../../../audio/SRSE-1x180sec.mp3';
import SRSR4x30sec from '../../../audio/SRSR-4x30sec.mp3';
import DDSS1x60sec from '../../../audio/DDSS-1x60sec.mp3';
import DDSR4x30sec from '../../../audio/DDSR-4x30sec.mp3';

export default class TimingTracks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      track: null
    }
    this.handleTrackChange = this.handleTrackChange.bind(this);
  }

  handleTrackChange(event) {
    console.log(event.target.value)
    this.setState({ track: event.target.value });
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
        <h2>Timing Tracks</h2>
        <div className="select-and-audio">
          <select name="event" onChange={this.handleTrackChange} className="timing-track-select">
                <option value="" selected>Select your event</option>
                <option value="SRSS-1x30sec">Single Rope Speed Sprints 1x30sec</option>
                <option value="SRDU-2x30sec">Single Rope Double Unders 2x30sec</option>
                <option value="SRSE-1x180sec">Single Rope Speed Endurance 1x180sec</option>
                <option value="SRSR-4x30sec">Single Rope Speed Relay 4x30sec</option>
                <option value="DDSR-4x30sec">Double Dutch Speed Relay 4x30sec</option>
                <option value="DDSS-1x60sec">Double Dutch Speed Sprints 1x60sec</option>
              </select>
          <audio className="timing-track-audio" src={src} controls></audio>
        </div>
      </div>
    );
  }
}