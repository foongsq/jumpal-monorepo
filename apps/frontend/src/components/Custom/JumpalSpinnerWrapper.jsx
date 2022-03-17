import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import JumpalSpinner from './JumpalSpinner';

JumpalSpinnerWrapper.propTypes = {
  loading: PropTypes.bool,
  children: PropTypes.element,
};

function JumpalSpinnerWrapper(props) {
  const { loading, children } = props;
  const [loadingState, setLoadingState] = useState(loading);

  useEffect(() => {
    setLoadingState(loading);
  }, [loading]);

  if (loadingState) {
    return <JumpalSpinner />;
  } else {
    return children;
  }
};

export default JumpalSpinnerWrapper;
