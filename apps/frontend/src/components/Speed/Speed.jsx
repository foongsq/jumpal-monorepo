import React, { useState } from 'react';
import useAuth from '../../auth';
import SpeedData from './SpeedData/SpeedData';
import TimingTracks from './TimingTracks/TimingTracks';
import Counter from './Counter/Counter';
import PersonalBests from './PersonalBests/PersonalBests';
import JumpalToggleButtons from '../Custom/JumpalToggleButtons';
import JumpalErrorText from '../Custom/JumpalErrorText';
import { messages } from '../Custom/constants';
import JumpalSpinnerWrapper from '../Custom/JumpalSpinnerWrapper';

const component = {
  TIMING: 'Timing Track',
  COUNTER: 'Counter',
  SPEEDDATA: 'Speed Data',
  PERSONALBEST: 'Personal Best',
};

const toggleButtonNames = [component.PERSONALBEST, component.SPEEDDATA,
  component.TIMING, component.COUNTER];

function Speed() {
  const [user, loading] = useAuth();
  const [componentRendered, setComponentRendered] =
    useState(component.PERSONALBEST);

  const toggleComponent = (event, newComponent) => {
    if (newComponent) {
      setComponentRendered(newComponent);
    }
  };

  return (
    <JumpalSpinnerWrapper loading={loading}>
      <div className="componentContentDiv">
        <JumpalToggleButtons
          buttons={toggleButtonNames}
          value={componentRendered}
          toggle={toggleComponent}
        />
        {componentRendered === component.PERSONALBEST ?
          (user ?
            <PersonalBests /> :
            <JumpalErrorText msg={messages.PB_NOT_SIGNED_IN} />) :
          componentRendered === component.SPEEDDATA ?
            (user ?
              <SpeedData /> :
              <JumpalErrorText msg={messages.SD_NOT_SIGNED_IN} />) :
          componentRendered === component.TIMING ? <TimingTracks /> :
          componentRendered === component.COUNTER ? <Counter /> : null }
      </div>
    </JumpalSpinnerWrapper>
  );
}

export default Speed;
