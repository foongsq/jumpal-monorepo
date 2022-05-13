import React, { useState } from 'react';
import {
  JumpalButton,
  useJumpalToast } from '../../../../components';
import { Modal, Box, Typography, TextField, FormControl } from '@mui/material';
import { styles } from '../../../../constants';
import PropTypes from 'prop-types';
import { useAuth } from '../../../../hooks';

NewIgModal.propTypes = {
  addIg: PropTypes.func.isRequired,
};

function NewIgModal(props) {
  const { addIg } = props;
  const Toast = useJumpalToast();
  const [user] = useAuth();
  const [open, setOpen] = useState(false);
  const [note, setNote] = useState('');
  const [url, setUrl] = useState('');

  const toggleNewIg = () => {
    setOpen(!open);
    setNote('');
    setUrl('');
  };

  const handleNoteChange = (event) => {
    setNote(event.target.value);
  };

  const handleUrlChange = (event) => {
    setUrl(event.target.value);
  };

  const submitEntry = async (event) => {
    event.preventDefault();
    const res = await addIg(note, url);
    if (res) {
      Toast.success('Instagram post saved successfully!');
      toggleNewIg();
    } else {
      Toast.error('An error occured :(');
    }
  };

  return (
    <div>
      <div className='jumpalCenteredButton'>
        <JumpalButton onClick={toggleNewIg}>
          Add New Instagram Reference
        </JumpalButton>
      </div>
      <Modal
        open={open}
        onClose={toggleNewIg}
      >
        <Box sx={styles.modalStyle}>
          <Typography variant="h6" component="h2">
            New Instagram Reference
          </Typography>
          <form>
            <div className='modalInput'>
              <FormControl fullWidth>
                <TextField
                  label="Note"
                  placeholder="Describe instagram reference"
                  onChange={handleNoteChange}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  required
                />
              </FormControl>
            </div>
            <div className='modalInput'>
              <FormControl fullWidth>
                <TextField
                  label="URL"
                  placeholder="Enter Instagram url"
                  onChange={handleUrlChange}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  required
                />
              </FormControl>
            </div>
          </form>
          {user ?
            <JumpalButton onClick={submitEntry}>
              Save
            </JumpalButton> :
            <JumpalButton onClick={submitEntry} disabled>
              Save
            </JumpalButton>
          }
        </Box>
      </Modal>
    </div>
  );
}

export default NewIgModal;
