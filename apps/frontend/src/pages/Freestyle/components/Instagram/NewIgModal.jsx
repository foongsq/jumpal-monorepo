import React, { useEffect, useContext, useState } from 'react';
import { FirebaseContext } from '../../../../Firebase/index';
import { onAuthStateChanged } from 'firebase/auth';
import { off, push } from 'firebase/database';
import JumpalButton from '../../../../components/JumpalButton';
import
JumpalAlertFeedback,
{ alertSeverity }
  from '../../../../components/JumpalAlertFeedback';
import { Modal, Box, Typography, TextField, FormControl } from '@mui/material';
import { styles } from '../../../../components/constants';

function NewIgModal() {
  const firebase = useContext(FirebaseContext);
  const [user, setUser] = useState(null);
  const [open, setOpen] = useState(false);
  const [note, setNote] = useState('');
  const [url, setUrl] = useState('');
  const [success, setSuccess] = useState(null);
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
    setSuccess('Instagram post saved successfully!');
    toggleNewIg();
  };

  return (
    <div>
      <JumpalAlertFeedback
        msg={success}
        severity={alertSeverity.SUCCESS}
        onClose={() => setSuccess(null)}
        global
      />
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
