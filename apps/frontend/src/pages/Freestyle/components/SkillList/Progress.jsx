import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import './Progress.css';
import { SkillsApi } from './context';
import { useJumpalToast } from '../../../../components';

const ESCAPE_KEY = 27;
const ENTER_KEY = 13;

Progress.propTypes = {
  id: PropTypes.string,
  progress: PropTypes.array,
};

function Progress(props) {
  const api = useContext(SkillsApi);
  const Toast = useJumpalToast();
  const { id, progress } = props;
  const [editText, setEditText] = useState('');
  const [editing, setEditing] = useState(false);

  const handleEditButtonClick = () => {
    if (editing) {
      handleSubmit();
    } else {
      setEditing(true);
    }
  };

  const handleChange = (e) => {
    setEditText(e.target.value);
  };

  const handleSubmit = async () => {
    const val = editText;
    if (val) {
      const skill = await api.getSkill(id);
      const currProgress = skill.progress;
      const newProgress = [...currProgress, [val, new Date().toString()]];
      const res = await api.updateSkill(id, {
        progress: newProgress,
      });
      if (res) {
        setEditText('');
        setEditing(false);
        Toast.success('Progress updated successfully!');
      } else {
        Toast.error('An error occured :(');
      }
    } else {
      setEditText('');
      setEditing(false);
      Toast.error('An error occured :(');
    }
  };

  const handleKeyDown = (e) => {
    if (e.which === ESCAPE_KEY) {
      setEditText('');
      setEditing(false);
    } else if (e.which === ENTER_KEY) {
      handleSubmit(e);
    }
  };

  // Needed because javascript .reverse() can't reverse 2d arrays
  const reverseArray = () => {
    const displayProgress = [];
    for (let i = progress.length - 1; i >= 0; i--) {
      displayProgress.push(progress[i]);
    }
    return displayProgress;
  };

  const displayProgress = reverseArray();
  return (
    <div className='progress-container'>
      <button onClick={handleEditButtonClick}
        className={editing ? 'hidden': 'addNewProgress'}>
        <AddCircleOutlineIcon color="action" />
        <p>Add New Progress</p>
      </button>
      <div className="content-div">
        <div className={editing ? 'newProgressEntry' : 'hidden'}>
          <p className={editing ? 'show-p' : 'hidden'}>New Entry:</p>
          <input
            ref={(input) => input && input.focus()}
            className={editing ? 'show-input' : 'hidden'}
            value={editText}
            onChange={handleChange}
            onBlur={handleSubmit}
            onKeyDown={handleKeyDown}
          />
        </div>

      </div>
      {displayProgress.map((progressEntry) => {
        return (
          <div className='progress-entry-div' key={progressEntry[1]}>
            <p className='progressEntryText'>{progressEntry[0]}</p>
            <div className="datetime-div">
              <p className='show-p'>
                {new Date(progressEntry[1]).toLocaleDateString()}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Progress;
