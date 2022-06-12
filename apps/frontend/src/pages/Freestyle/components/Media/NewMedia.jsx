import React from 'react';
import { TextField } from '@mui/material';
import PropTypes from 'prop-types';
import {
  JumpalFormControl,
} from '../../../../components/JumpalCommon.tsx';
import JumpalModal from '../../../../components/JumpalModal';
import useNewMediaController from './useNewMediaController';

NewMedia.propTypes = {
  addIg: PropTypes.func.isRequired,
};

export default function NewMedia(props) {
  const { addIg } = props;
  const [open, toggleNewIg, handleNoteChange,
    handleUrlChange, submitEntry] = useNewMediaController(addIg);

  return (
    <JumpalModal
      isOpen={open}
      openButtonText="Add New Media Reference"
      onToggle={toggleNewIg}
      title="New Media Reference"
      onSubmit={submitEntry}
    >
      <JumpalFormControl>
        <TextField
          label="Note"
          placeholder="Describe Media reference"
          onChange={handleNoteChange}
          InputLabelProps={{
            shrink: true,
          }}
          required
        />
      </JumpalFormControl>
      <JumpalFormControl>
        <TextField
          label="URL"
          placeholder="Enter Media url"
          onChange={handleUrlChange}
          InputLabelProps={{
            shrink: true,
          }}
          required
        />
      </JumpalFormControl>
    </JumpalModal>
  );
}
