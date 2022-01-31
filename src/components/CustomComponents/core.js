import React from 'react';
import styled from '@emotion/styled';
import Button from '@mui/material/Button';
import { CircularProgress } from '@mui/material';
import { styles } from './constants.js';

export const JumpalButton = styled(Button)({
  background: styles.bootstrapGreen,
  color: 'white',
  padding: '0.5rem 1rem',
  margin: '1rem',
  '&:hover': {
    background: styles.green500
  }
});

export function JumpalSpinner() {
  return (
    // Render spinner while loading
    <div className='componentContentDiv'>
      <div className='jumpalSpinnerDiv'>
        <CircularProgress color="success" />
      </div>
    </div>
  );
}