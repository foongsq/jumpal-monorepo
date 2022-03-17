import React from 'react';
import PropTypes from 'prop-types';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

JumpalToggleButtons.propTypes = {
  buttons: PropTypes.array,
  value: PropTypes.string,
  toggle: PropTypes.func,
};

function JumpalToggleButtons(props) {
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
};

export default JumpalToggleButtons;
