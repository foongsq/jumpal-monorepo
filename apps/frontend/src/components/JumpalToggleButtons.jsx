import React from 'react';
import PropTypes from 'prop-types';
import { ToggleButton, ToggleButtonGroup } from '@mui/material';

JumpalToggleButtons.propTypes = {
  buttons: PropTypes.array,
  value: PropTypes.string,
  toggle: PropTypes.func,
};

export default function JumpalToggleButtons(props) {
  const { buttons, value, toggle } = props;
  return (
    <ToggleButtonGroup
      exclusive
      value={value}
      onChange={toggle}
      color='primary'
      style={{
        paddingTop: '1rem',
        display: 'flex',
        justifyContent: 'center',
        width: '100%',
      }}
    >
      {buttons.map((buttonValue) => (
        <ToggleButton key={buttonValue} value={buttonValue}>
          {buttonValue}
        </ToggleButton>
      ))}
    </ToggleButtonGroup>
  );
}
