import React from 'react';
import { withFirebase } from '../../Firebase';
import './Speed.css';
import NewSpeedRecord from './NewSpeedRecord/NewSpeedRecord';
import SpeedData from './SpeedData/SpeedData';
import TimingTracks from './TimingTracks/TimingTracks';
import Counter from '../Counter/Counter';

class Speed extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      openTimingTracks: false,
      openCounter: false,
      openNewSpeedRecord: true,
      openSpeedData: true,
    }
    this.toggleTimingTracks = this.toggleTimingTracks.bind(this);
    this.toggleCounter = this.toggleCounter.bind(this);
    this.toggleNewSpeedRecord = this.toggleNewSpeedRecord.bind(this);
    this.toggleSpeedData = this.toggleSpeedData.bind(this);
  }

  toggleTimingTracks() {
    if (this.state.openTimingTracks) {
      this.setState({ openTimingTracks: false });
    } else {
      this.setState({ openTimingTracks: true });
    }
  }

  toggleCounter() {
    if (this.state.openCounter) {
      this.setState({ openCounter: false });
    } else {
      this.setState({ openCounter: true });
    }
  }

  toggleNewSpeedRecord() {
    if (this.state.openNewSpeedRecord) {
      this.setState({ openNewSpeedRecord: false });
    } else {
      this.setState({ openNewSpeedRecord: true });
    }
  }

  toggleSpeedData() {
    if (this.state.openSpeedData) {
      this.setState({ openSpeedData: false });
    } else {
      this.setState({ openSpeedData: true });
    }
  }

  render() {
    if(this.props.firebase.auth.currentUser) {
      return (
        <div className="speed">
          <button className="button" onClick={this.toggleTimingTracks}>Timing Tracks</button>
          <button className="button" onClick={this.toggleCounter}>Counter</button>
          <button className="button" onClick={this.toggleNewSpeedRecord}>New Speed Record</button>
          <button className="button" onClick={this.toggleSpeedData}>Speed Data</button>
          {this.state.openTimingTracks ? <TimingTracks /> : null }
          {this.state.openCounter ? <Counter /> : null }
          {this.state.openNewSpeedRecord ? <NewSpeedRecord /> : null }
          {this.state.openSpeedData ? <SpeedData /> : null }
        </div>
      );
    } else {
      return (
        <div className="speed">
          <button className="button" onClick={this.toggleTimingTracks}>Timing Tracks</button>
          <button className="button" onClick={this.toggleCounter}>Counter</button>
          <button className="button" onClick={this.toggleNewSpeedRecord}>New Speed Record</button>
          <button className="button" onClick={this.toggleSpeedData}>Speed Data</button>
          {this.state.openTimingTracks ? <TimingTracks /> : null }
          {this.state.openCounter ? <Counter /> : null }
          {this.state.openNewSpeedRecord ? <NewSpeedRecord /> : null }
          {this.state.openSpeedData ? <p style={{color: 'red'}}>Please sign in to save your speed data.</p> : null }
        </div>
      );
    }
  }
}

export default withFirebase(Speed);