import React, { useState, useContext } from 'react';
import {
  JumpalButton,
  useJumpalToast } from '../../../../components';
import { Modal, Box, Typography, TextField, FormControl } from '@mui/material';
import { styles } from '../../../../constants';
import { useAuth } from '../../../../hooks';
import { SkillsApi } from './context';

function NewSkillModal() {
  const api = useContext(SkillsApi);
  const Toast = useJumpalToast();
  const [user] = useAuth();
  const [open, setOpen] = useState(false);
  const [skillName, setSkillName] = useState('-');
  const [progress, setProgress] = useState([['-', new Date().toString()]]);
  const [url, setUrl] = useState('-');

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

  const isValidSkillName = (name) => {
    return name !== '-' && name.length > 0;
  };

  const submitEntry = async (event) => {
    event.preventDefault();
    if (!isValidSkillName(skillName)) {
      Toast.warn('Invalid skill name, please try again.');
      return;
    }
    const res = await api.addSkill(skillName, progress, url, false);
    if (res) {
      Toast.success('New skill saved successfully!');
      toggleNewSkill();
    } else {
      Toast.error('An error occured :(');
    }
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
