import React, { useState } from 'react';
import useAuth from '../../Auth';

import SpeedData from './SpeedData/SpeedData';
import TimingTracks from './TimingTracks/TimingTracks';
import Counter from './Counter/Counter';
import PersonalBests from './PersonalBests/PersonalBests';
import { JumpalSpinner } from '../CustomComponents/core';

import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

import './Speed.css';


const component = {
  TIMING: 'Timing Track',
  COUNTER: 'Counter',
  SPEEDDATA: 'Speed Data',
  PERSONALBEST: 'Personal Best',
};

function Speed() {
  const [user, loading] = useAuth();
  const [componentRendered, setComponentRendered] =
    useState(component.PERSONALBEST);

  const toggleComponent = (event, newComponent) => {
    setComponentRendered(newComponent);
  };

  if (loading) {
    return <JumpalSpinner />;
  } else {
    if (user) {
      return (
        <div className="componentContentDiv">
          <ToggleButtonGroup
            exclusive
            value={componentRendered}
            onChange={toggleComponent}
            color='primary'
            className='speedPagesButtonsDiv'
          >
            <ToggleButton value={component.PERSONALBEST}>
              {component.PERSONALBEST}
            </ToggleButton>
            <ToggleButton value={component.SPEEDDATA}>
              {component.SPEEDDATA}
            </ToggleButton>
            <ToggleButton value={component.TIMING}>
              {component.TIMING}
            </ToggleButton>
            <ToggleButton value={component.COUNTER}>
              {component.COUNTER}
            </ToggleButton>
          </ToggleButtonGroup>
          {componentRendered === component.PERSONALBEST ? <PersonalBests /> :
            componentRendered === component.SPEEDDATA ? <SpeedData /> :
            componentRendered === component.TIMING ? <TimingTracks /> :
            componentRendered === component.COUNTER ? <Counter /> : null }
        </div>
      );
    } else {
      return (
        <div className="componentContentDiv">
          {componentRendered === component.PERSONALBEST ?
            <p style={{ color: 'red' }}>
              Please sign in to see your personal bests.
            </p> :
            componentRendered === component.SPEEDDATA ?
            <p style={{ color: 'red' }}>
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
