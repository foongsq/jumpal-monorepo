import React from 'react';
import PropTypes from 'prop-types';
import { Alert } from '@mui/material';
import { styled } from '@mui/system';

JumpalErrorText.propTypes = {
  msg: PropTypes.string,
};

export default function JumpalErrorText(props) {
  const { msg } = props;
  return (
    <StyledWarningAlert severity="warning">{msg}</StyledWarningAlert>
  );
};

const StyledWarningAlert = styled(Alert)({
  marginTop: '1rem',
});
