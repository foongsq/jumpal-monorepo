import React, { useEffect, useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { FirebaseContext } from '../../../../Firebase';
import { off, child, update, get } from 'firebase/database';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

import './Progress.css';

const ESCAPE_KEY = 27;
const ENTER_KEY = 13;

Progress.propTypes = {
  id: PropTypes.string,
  progress: PropTypes.array,
};

function Progress(props) {
  const { id, progress } = props;
  const firebase = useContext(FirebaseContext);
  const [editText, setEditText] = useState('');
  const [editing, setEditing] = useState(false);
  const skillRef = child(firebase.skillList, id);

  useEffect(() => {
    return () => off(skillRef);
  }, []);

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
      get(skillRef).then((snapshot) => {
        const value = snapshot.val();
        let newProgress = null;
        if (value) {
          newProgress = value.progress;
          newProgress.push([val, new Date().toString()]);
        }
        update(skillRef, {
          progress: newProgress,
        });
        setEditText('');
        setEditing(false);
      });
    } else {
      setEditText('');
      setEditing(false);
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
            <p className='show-p'>{progressEntry[0]}</p>
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
