import React, { useEffect, useContext, useState } from 'react';
import { FirebaseContext } from '../../../Firebase/index';
import { onAuthStateChanged } from 'firebase/auth';
import { off, push } from 'firebase/database';
import { JumpalButton } from '../../CustomComponents/core';

import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';

import { styles } from '../../CustomComponents/constants';


function NewIgModal() {
  const firebase = useContext(FirebaseContext);
  const [user, setUser] = useState(null);
  const [open, setOpen] = useState(false);
  const [note, setNote] = useState('');
  const [url, setUrl] = useState('');
  const igsRef = firebase.igs;

  useEffect(() => {
    // Get current user from firebase and save to state as user
    const unsubscribe = onAuthStateChanged(firebase.auth, async (user) => {
      if (user) {
        setUser(user);
      } else {
        alert('Please sign in to continue');
      }
    });
    return () => {
      off(igsRef);
      unsubscribe();
    };
  }, []);

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

  const submitEntry = (event) => {
    event.preventDefault();
    push(igsRef, {
      note: note,
      url: url,
    });
    window.alert('Instagram post saved successfully!');
    toggleNewIg();
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
