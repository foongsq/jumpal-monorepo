import React, { useEffect, useState } from 'react';
import useAuth from '../../Auth';
import SpeedData from './SpeedData/SpeedData';
import TimingTracks from './TimingTracks/TimingTracks';
import Counter from './Counter/Counter';
import PersonalBests from './PersonalBests/PersonalBests';

import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';

import './Speed.css';
import { JumpalSpinner } from '../CustomComponents/core';

const timingTrack = 'Timing Track';
const counter = 'Counter';
const speedData = 'Speed Data';
const personalBest = 'Personal Best';
const buttonNames = [timingTrack, counter, speedData, personalBest];

function Speed() {
  const [user, loading] = useAuth();
  const [buttons, setButtons] = useState([]);
  const [openTimingTracks, setOpenTimingTracks] = useState(false);
  const [openCounter, setOpenCounter] = useState(false);
  const [openSpeedData, setOpenSpeedData] = useState(false);
  const [openPersonalBests, setOpenPersonalBests] = useState(true);

  useEffect(() => {
    updateButtonGroup(personalBest);
  }, []);

  const toggleTimingTracks = () => {
    if (openTimingTracks) {
      setOpenTimingTracks(false);
    } else {
      setOpenTimingTracks(true);
      setOpenPersonalBests(false);
      setOpenSpeedData(false);
    }
    updateButtonGroup(timingTrack);
  };

  const toggleCounter = () => {
    if (openCounter) {
      setOpenCounter(false);
    } else {
      setOpenCounter(true);
      setOpenPersonalBests(false);
      setOpenSpeedData(false);
    }
    updateButtonGroup(counter);
  };

  const toggleSpeedData = () => {
    if (openSpeedData) {
      setOpenSpeedData(false);
    } else {
      setOpenSpeedData(true);
      setOpenTimingTracks(false);
      setOpenCounter(false);
      setOpenPersonalBests(false);
    }
    updateButtonGroup(speedData);
  };

  const togglePersonalBests = () => {
    if (openPersonalBests) {
      setOpenPersonalBests(false);
    } else {
      setOpenPersonalBests(true);
      setOpenSpeedData(false);
      setOpenTimingTracks(false);
      setOpenCounter(false);
    }
    updateButtonGroup(personalBest);
  };

  const updateButtonGroup = (newActive) => {
    const newButtons = [];
    for (let i = 0; i < buttonNames.length; i++) {
      let functionToCall = null;
      switch (buttonNames[i]) {
        case timingTrack:
          functionToCall = toggleTimingTracks;
          break;
        case counter:
          functionToCall = toggleCounter;
          break;
        case speedData:
          functionToCall = toggleSpeedData;
          break;
        case personalBest:
          functionToCall = togglePersonalBests;
          break;
        default:
          break;
      }
      newButtons.push(
          <Button
            variant={buttonNames[i] === newActive ?
            'contained' : 'outlined'}
            onClick={functionToCall}
            key={i}
          >
            {buttonNames[i]}
          </Button>,
      );
    }
    setButtons(newButtons);
  };

  if (loading) {
    return <JumpalSpinner />;
  } else {
    if (user) {
      return (
        <div className="componentContentDiv">
          <div className="speedPagesButtonsDiv">
            <ButtonGroup
              className="speedPagesButtons"
            >
              {buttons}
            </ButtonGroup>
          </div>
          {openTimingTracks ? <TimingTracks /> : null }
          {openCounter ? <Counter /> : null }
          {openSpeedData ? <SpeedData /> : null }
          {openPersonalBests ?<PersonalBests /> : null }
        </div>
      );
    } else {
      return (
        <div className="componentContentDiv">
          {openTimingTracks ? <TimingTracks /> : null }
          {openCounter ? <Counter /> : null }
          {openSpeedData ?
            <p style={{ color: 'red' }}>
              Please sign in to see your speed data.
            </p> : null }
          {openPersonalBests ?
            <p style={{ color: 'red' }}>
              Please sign in to see your personal bests.
            </p> : null }
        </div>
      );
    }
  }
}

export default Speed;
