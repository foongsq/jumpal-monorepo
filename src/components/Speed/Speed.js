import React from 'react';
import { withFirebase } from '../../Firebase';
import SpeedData from './SpeedData/SpeedData';
import TimingTracks from './TimingTracks/TimingTracks';
import Counter from './Counter/Counter';
import PersonalBests from './PersonalBests/PersonalBests';

class Speed extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      openTimingTracks: false,
      openCounter: false,
      openSpeedData: false,
      openPersonalBests: true,
    }
    this.toggleTimingTracks = this.toggleTimingTracks.bind(this);
    this.toggleCounter = this.toggleCounter.bind(this);
    this.toggleSpeedData = this.toggleSpeedData.bind(this);
    this.togglePersonalBests = this.togglePersonalBests.bind(this);
  }

  toggleTimingTracks() {
    if (this.state.openTimingTracks) {
      this.setState({ openTimingTracks: false });
    } else {
      this.setState({
        openTimingTracks: true,
        openPersonalBests: false,
        openSpeedData: false,
        openNewSpeedRecord: false,
      });
    }
  }

  toggleCounter() {
    if (this.state.openCounter) {
      this.setState({ openCounter: false });
    } else {
      this.setState({
        openCounter: true,
        openPersonalBests: false,
        openSpeedData: false,
        openNewSpeedRecord: false,
      });
    }
  }

  toggleSpeedData() {
    if (this.state.openSpeedData) {
      this.setState({ openSpeedData: false });
    } else {
      this.setState({
        openSpeedData: true,
        openTimingTracks: false,
        openCounter: false,
        openPersonalBests: false,
      });
    }
  }

  togglePersonalBests() {
    if (this.state.openPersonalBests) {
      this.setState({ openPersonalBests: false });
    } else {
      this.setState({
        openPersonalBests: true,
        openSpeedData: false,
        openNewSpeedRecord: false,
        openTimingTracks: false,
        openCounter: false,
      });
    }
  }

  render() {
    if(this.props.firebase.auth.currentUser) {
      return (
        <div className="speed">
          <button className="button" onClick={this.toggleTimingTracks}>Timing Tracks</button>
          <button className="button" onClick={this.toggleCounter}>Counter</button>
          <button className="button" onClick={this.toggleSpeedData}>Speed Data</button>
          <button className="button" onClick={this.togglePersonalBests}>Personal Bests</button>
          {this.state.openTimingTracks ? <TimingTracks /> : null }
          {this.state.openCounter ? <Counter /> : null }
          {this.state.openSpeedData ? <SpeedData /> : null }
          {this.state.openPersonalBests ?<PersonalBests /> : null }
        </div>
      );
    } else {
      return (
        <div className="speed">
          <button className="button" onClick={this.toggleTimingTracks}>Timing Tracks</button>
          <button className="button" onClick={this.toggleCounter}>Counter</button>
          <button className="button" onClick={this.toggleSpeedData}>Speed Data</button>
          <button className="button" onClick={this.togglePersonalBests}>Personal Bests</button>
          {this.state.openTimingTracks ? <TimingTracks /> : null }
          {this.state.openCounter ? <Counter /> : null }
          {this.state.openSpeedData ? <p style={{color: 'red'}}>Please sign in to see your speed data.</p> : null }
          {this.state.openPersonalBests ?<p style={{color: 'red'}}>Please sign in to see your personal bests.</p> : null }
        </div>
      );
    }
  }
}

export default withFirebase(Speed);