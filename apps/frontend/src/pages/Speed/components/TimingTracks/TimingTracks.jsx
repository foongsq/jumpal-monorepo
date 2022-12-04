import React from "react";

import { InputLabel, MenuItem, FormControl, Select } from "@mui/material";
import { timingTrackOptions } from "../../../../constants";
import styled from "@emotion/styled";
import useTimingTracksController from "./useTimingTracksController";
import PropTypes from "prop-types";
import { JumpalHideableComponent } from "../../../../components";

TimingTracks.propTypes = {
  hide: PropTypes.bool,
};

export default function TimingTracks(props) {
  const { hide } = props;
  const [src, handleTrackChange] = useTimingTracksController();

  return (
    <JumpalHideableComponent hide={hide}>
      <TimingTrackContainer>
        <TimingTrackTitle>Timing Tracks</TimingTrackTitle>
        <FormControl fullWidth>
          <InputLabel>Select timing track</InputLabel>
          <Select label="Select timing track" onChange={handleTrackChange}>
            {timingTrackOptions.map((option) => (
              <MenuItem value={option.value} key={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        {src !== "" ? (
          <TimingTrackAudio src={src} controls></TimingTrackAudio>
        ) : null}
      </TimingTrackContainer>
    </JumpalHideableComponent>
  );
}

const TimingTrackContainer = styled.div`
  margin-bottom: 1rem;
  display: flex;
  flex-direction: column;
`;

const TimingTrackTitle = styled.h2`
  padding: 1rem 0;
`;

const TimingTrackAudio = styled.audio`
  display: flex;
  flex-direction: column;
  margin: 1rem auto;
  width: 100%;
`;
