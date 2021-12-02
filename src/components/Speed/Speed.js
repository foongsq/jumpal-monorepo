import React from 'react';
import { withFirebase } from '../../Firebase';
import SpeedData from './SpeedData/SpeedData';
import TimingTracks from './TimingTracks/TimingTracks';
import Counter from './Counter/Counter';
import PersonalBests from './PersonalBests/PersonalBests';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import './Speed.css';

const timingTrack = "Timing Track";
const counter = "Counter";
const speedData = "Speed Data";
const personalBest = "Personal Best";

class Speed extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      active: personalBest,
      buttonNames: [timingTrack, counter, speedData, personalBest],
      buttons: [],
      openTimingTracks: false,
      openCounter: false,
      openSpeedData: false,
      openPersonalBests: true,
    }
    this.updateButtonGroup = this.updateButtonGroup.bind(this);
    this.toggleTimingTracks = this.toggleTimingTracks.bind(this);
    this.toggleCounter = this.toggleCounter.bind(this);
    this.toggleSpeedData = this.toggleSpeedData.bind(this);
    this.togglePersonalBests = this.togglePersonalBests.bind(this);
  }

  componentDidMount() {
    this.updateButtonGroup(personalBest);
  }

  toggleTimingTracks() {
    if (this.state.openTimingTracks) {
      this.setState({ openTimingTracks: false });
    } else {
      this.setState({
        openTimingTracks: true,
        openPersonalBests: false,
        openSpeedData: false,
      });
    }
    this.updateButtonGroup(timingTrack);
  }

  toggleCounter() {
    if (this.state.openCounter) {
      this.setState({ openCounter: false });
    } else {
      this.setState({
        openCounter: true,
        openPersonalBests: false,
        openSpeedData: false,
      });
    }
    this.updateButtonGroup(counter);
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
    this.updateButtonGroup(speedData);
  }

  togglePersonalBests() {
    if (this.state.openPersonalBests) {
      this.setState({ openPersonalBests: false });
    } else {
      this.setState({
        openPersonalBests: true,
        openSpeedData: false,
        openTimingTracks: false,
        openCounter: false,
      });
    }
    this.updateButtonGroup(personalBest);
  }

  updateButtonGroup(newActive) {
    let newButtons = [];
    for (let i = 0; i < this.state.buttonNames.length; i++) {
      let functionToCall = null;
      switch (this.state.buttonNames[i]) {
        case timingTrack:
          functionToCall = this.toggleTimingTracks;
          break;
        case counter:
          functionToCall = this.toggleCounter;
          break;
        case speedData:
          functionToCall = this.toggleSpeedData;
          break;
        case personalBest:
          functionToCall = this.togglePersonalBests;
          break;
        default: 
          break;
      }
      newButtons.push(
        <Button 
          variant={this.state.buttonNames[i] === newActive 
            ? "success" : "outline-success"}
          onClick={functionToCall}
        >
          {this.state.buttonNames[i]}
        </Button>,
      );
    }
    this.setState({
      buttons: newButtons,
      active: newActive,
    })
  }
  
  render() {
    if(this.props.firebase.auth.currentUser) {
      return (
        <div className="componentContentDiv">
          <div className="speedPagesButtonsDiv">
            <ButtonGroup aria-label="Speed Pages" 
              className="speedPagesButtons"
            >
              {this.state.buttons}
            </ButtonGroup>
          </div>
          {this.state.openTimingTracks ? <TimingTracks /> : null }
          {this.state.openCounter ? <Counter /> : null }
          {this.state.openSpeedData ? <SpeedData /> : null }
          {this.state.openPersonalBests ?<PersonalBests /> : null }
        </div>
      );
    } else {
      return (
        <div className="componentContentDiv">
          {this.state.openTimingTracks ? <TimingTracks /> : null }
          {this.state.openCounter ? <Counter /> : null }
          {this.state.openSpeedData ? <p style={{color: 'red'}}>Please sign in to see your speed data.</p> : null }
          {this.state.openPersonalBests ? <p style={{color: 'red'}}>Please sign in to see your personal bests.</p> : null }
        </div>
      );
    }
  }
}

export default withFirebase(Speed);