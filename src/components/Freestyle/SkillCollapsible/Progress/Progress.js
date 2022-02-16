import React, { useEffect, useContext, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { FirebaseContext } from '../../../../Firebase';
import { off, child, update, get } from 'firebase/database';
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
  const skillRef = useRef(child(firebase.skillList, id)).current;

  console.log('progress', progress);

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

  return (
    <div className="progress-container">
      <button onClick={handleEditButtonClick} id="add-square">
        <i className="fa fa-plus-square" aria-hidden="true"></i>
      </button>
      <div className="content-div">
        <div className={editing ? 'show' : 'hidden'}>
          <p className={editing ? 'show-p' : 'hidden'}>New Entry:</p>
          <input
            className={editing ? 'show-input' : 'hidden'}
            value={editText}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            autoFocus // TODO: make this autofocus
          />
        </div>

      </div>
      {progress.reverse().map((progressEntry) => {
        return (
          <div className="progress-entry-div" key={progressEntry}>
            <p className='show-p'>{progressEntry[0]}</p>
            <div className="datetime-div">
              <p className='show-p'>
                {new Date(progressEntry[1]).toLocaleDateString()}
              </p>
              <p className='show-p'>
                {new Date(progressEntry[1]).toLocaleTimeString()}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Progress;
