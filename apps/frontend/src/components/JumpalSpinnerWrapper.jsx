import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { CircularProgress } from '@mui/material';
import styled from '@emotion/styled';
import { JumpalPageContainer } from './JumpalCommon';

JumpalSpinnerWrapper.propTypes = {
  loading: PropTypes.bool,
  children: PropTypes.element,
};

export default function JumpalSpinnerWrapper(props) {
  const { loading, children } = props;
  const [loadingState, setLoadingState] = useState(loading);

  useEffect(() => {
    setLoadingState(loading);
  }, [loading]);

  if (loadingState) {
    return <JumpalSpinner />;
  } else {
    return <div>{children}</div>;
  }
};

function JumpalSpinner() {
  return (
    <JumpalPageContainer>
      <SpinnerContainer>
        <CircularProgress color="success" />
      </SpinnerContainer>
    </JumpalPageContainer>
  );
}

const SpinnerContainer = styled.div({
  paddingTop: '1rem',
  height: '50%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
});
