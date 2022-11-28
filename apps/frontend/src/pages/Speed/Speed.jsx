import React, { useState } from "react";
import { useAuth } from "../../data";
import SpeedData from "./components/SpeedData/SpeedData";
import TimingTracks from "./components/TimingTracks/TimingTracks";
import Counter from "./components/Counter/Counter";
import PersonalBests from "./components/PersonalBests/PersonalBests";
import { messages } from "../../constants";
import {
  JumpalToggleButtons,
  JumpalErrorText,
  JumpalSpinnerWrapper,
} from "../../components";

const component = {
  TIMING: "Timing Track",
  COUNTER: "Counter",
  SPEEDDATA: "Speed Data",
  PERSONALBEST: "Personal Best",
};

const toggleButtonNames = [
  component.PERSONALBEST,
  component.SPEEDDATA,
  component.TIMING,
  component.COUNTER,
];

export default function Speed() {
  const [user, loading] = useAuth();
  const [componentRendered, setComponentRendered] = useState(
    component.PERSONALBEST
  );

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
        {componentRendered === component.PERSONALBEST ? (
          user ? (
            <PersonalBests />
          ) : (
            <JumpalErrorText msg={messages.PB_NOT_SIGNED_IN} />
          )
        ) : componentRendered === component.SPEEDDATA ? (
          user ? (
            <SpeedData />
          ) : (
            <JumpalErrorText msg={messages.SD_NOT_SIGNED_IN} />
          )
        ) : componentRendered === component.TIMING ? (
          <TimingTracks />
        ) : componentRendered === component.COUNTER ? (
          <Counter />
        ) : null}
      </div>
    </JumpalSpinnerWrapper>
  );
}
