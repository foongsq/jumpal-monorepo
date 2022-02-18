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


function NewSkillModal() {
  const firebase = useContext(FirebaseContext);
  const [user, setUser] = useState(null);
  const [open, setOpen] = useState(false);
  const [skillName, setSkillName] = useState('-');
  const [progress, setProgress] = useState([['-', new Date().toString()]]);
  const [url, setUrl] = useState('-');
  const slRef = firebase.skillList;

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
      off(slRef);
      unsubscribe();
    };
  }, []);

  const toggleNewSkill = () => {
    setOpen(!open);
    setSkillName('-');
    setProgress([['-', new Date().toString()]]);
    setUrl('-');
  };

  const handleSkillNameChange = (event) => {
    setSkillName(event.target.value);
  };

  const handleProgressChange = (event) => {
    setProgress([[event.target.value, new Date().toString()]]);
  };

  const handleUrlChange = (event) => {
    setUrl(event.target.value);
  };

  const submitEntry = (event) => {
    event.preventDefault();
    push(slRef, {
      skillName: skillName,
      progress: progress,
      url: url,
      learnt: false,
    });
    window.alert('New skill saved successfully!');
    toggleNewSkill();
  };

  return (
    <div>
      <div className='jumpalCenteredButton'>
        <JumpalButton onClick={toggleNewSkill}>
          Add New Skill
        </JumpalButton>
      </div>
      <Modal
        open={open}
        onClose={toggleNewSkill}
      >
        <Box sx={styles.modalStyle}>
          <Typography variant="h6" component="h2">
            New Freestyle Skill
          </Typography>
          <form>
            <div className='modalInput'>
              <FormControl fullWidth>
                <TextField
                  label="Skill Name"
                  placeholder="Enter Skill Name"
                  onChange={handleSkillNameChange}
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
                  label="Progress"
                  placeholder="Describe your progress"
                  onChange={handleProgressChange}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </FormControl>
            </div>
            <div className='modalInput'>
              <FormControl fullWidth>
                <TextField
                  label="URL"
                  placeholder="Enter url to video of skill"
                  onChange={handleUrlChange}
                  InputLabelProps={{
                    shrink: true,
                  }}
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

export default NewSkillModal;
