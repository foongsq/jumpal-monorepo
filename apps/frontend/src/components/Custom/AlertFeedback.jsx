import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { styled } from '@mui/system';
import { Alert, Collapse } from '@mui/material';

AlertFeedback.propTypes = {
  msg: PropTypes.string,
  onClose: PropTypes.func,
  severity: PropTypes.string,
  global: PropTypes.bool,
};

function AlertFeedback(props) {
  const { msg, onClose, severity, global } = props;

  useEffect(() => {
    setTimeout(() => onClose(), 5000); // close alert after 5 seconds
  }, [msg]);

  if (global) {
    return (
      <GlobalCollapse in={!!msg}>
        <StyledAlert severity={severity} onClose={onClose}>{msg}</StyledAlert>
      </GlobalCollapse>
    );
  } else {
    return (
      <Collapse in={!!msg}>
        <StyledAlert severity={severity} onClose={onClose}>{msg}</StyledAlert>
      </Collapse>
    );
  }
}

export const alertSeverity = {
  'SUCCESS': 'success',
  'WARN': 'warning',
  'ERROR': 'error',
};

const GlobalCollapse = styled(Collapse)({
  position: 'fixed',
  top: '0',
  zIndex: '10',
});

const StyledAlert = styled(Alert)({
  marginTop: '1rem',
});

export default AlertFeedback;
