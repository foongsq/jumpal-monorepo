import React from 'react';
import { CircularProgress } from '@mui/material';

function JumpalSpinner() {
  return (
    <div className='componentContentDiv'>
      <div style={{
        paddingTop: '1rem',
        height: '50%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
        <CircularProgress color="success" />
      </div>
    </div>
  );
}

export default JumpalSpinner;
