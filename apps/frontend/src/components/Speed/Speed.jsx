import React, { useState } from 'react';
import useAuth from '../../auth';
import SpeedData from './SpeedData/SpeedData';
import TimingTracks from './TimingTracks/TimingTracks';
import Counter from './Counter/Counter';
import PersonalBests from './PersonalBests/PersonalBests';
import JumpalSpinner from '../Custom/JumpalSpinner';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import './Speed.css';

const component = {
  TIMING: 'Timing Track',
  COUNTER: 'Counter',
  SPEEDDATA: 'Speed Data',
  PERSONALBEST: 'Personal Best',
};

const toggleButtonNames = [component.PERSONALBEST, component.SPEEDDATA,
  component.TIMING, component.COUNTER];

function SpeedToggleButtons(props) {
  const { value, toggle } = props;
  return (
    <ToggleButtonGroup
      exclusive
      value={value}
      onChange={toggle}
      color='primary'
      className='speedPagesButtonsDiv'
    >
      {toggleButtonNames.map((buttonValue) => (
        <ToggleButton key={buttonValue} value={buttonValue}>
          {buttonValue}
        </ToggleButton>
      ))}
    </ToggleButtonGroup>
  );
};

function Speed() {
  const [user, loading] = useAuth();
  const [componentRendered, setComponentRendered] =
    useState(component.PERSONALBEST);

  const toggleComponent = (event, newComponent) => {
    if (newComponent) {
      setComponentRendered(newComponent);
    }
  };

  if (loading) {
    return <JumpalSpinner />;
  } else {
    if (user) {
      return (
        <div className="componentContentDiv">
          <SpeedToggleButtons
            value={componentRendered}
            toggle={toggleComponent}
          />
          {componentRendered === component.PERSONALBEST ? <PersonalBests /> :
            componentRendered === component.SPEEDDATA ? <SpeedData /> :
            componentRendered === component.TIMING ? <TimingTracks /> :
            componentRendered === component.COUNTER ? <Counter /> : null }
        </div>
      );
    } else {
      return (
        <div className="componentContentDiv">
          <SpeedToggleButtons
            value={componentRendered}
            toggle={toggleComponent}
          />
          {componentRendered === component.PERSONALBEST ?
            <p className="centeredText" style={{ color: 'red' }}>
              Please sign in to see your personal bests.
            </p> :
            componentRendered === component.SPEEDDATA ?
            <p className="centeredText" style={{ color: 'red' }}>
              Please sign in to see your speed data.
            </p> :
            componentRendered === component.TIMING ? <TimingTracks /> :
            componentRendered === component.COUNTER ? <Counter /> : null }
        </div>
      );
    }
  }
}

export default Speed;
