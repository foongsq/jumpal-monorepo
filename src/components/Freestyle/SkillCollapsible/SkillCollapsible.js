import React, { useEffect, useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { FirebaseContext } from '../../../Firebase';
import { off, child, update, remove } from 'firebase/database';
import EditableText from './EditableText';
import Progress from '../SkillCollapsible/Progress/Progress';
import './SkillCollapsible.css';
import { Collapse } from '@mui/material';

const ESCAPE_KEY = 27;
const ENTER_KEY = 13;

SkillCollapsible.propTypes = {
  id: PropTypes.string,
  skillName: PropTypes.string,
  learnt: PropTypes.bool,
  progress: PropTypes.array,
  url: PropTypes.string,
};

function SkillCollapsible(props) {
  const { id, skillName, learnt, progress, url } = props;
  const firebase = useContext(FirebaseContext);
  const [open, setOpen] = useState(false);
  const [openProgress, setOpenProgress] = useState(false);
  const [editText, setEditText] = useState(null);
  const [editing, setEditing] = useState(false);
  const skillRef = child(firebase.skillList, id);

  useEffect(() => {
    return () => off(skillRef);
  }, []);

  const handleClick = () => {
    setOpen(!open);
  };

  const handleProgressClick = () => {
    setOpenProgress(!openProgress);
  };

  const handleDelete = () => {
    remove(skillRef);
    window.alert('Skill deleted successfully!');
  };

  const handleLearnt = () => {
    update(skillRef, {
      learnt: true,
    });
    window.alert('Congratulations on learning a new skill!');
  };

  const handleUnlearn = () => {
    update(skillRef, {
      learnt: false,
    });
    window.alert('Oops gonna have to relearn that!');
  };

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

  const handleSubmit = async (e) => {
    const val = editText;
    if (val) {
      update(skillRef, {
        url: val,
      });
      setEditing(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.which === ESCAPE_KEY) {
      setEditText(skillName);
      setEditing(false);
    } else if (e.which === ENTER_KEY) {
      handleSubmit(e);
    }
  };

  return (
    <div>
      <div className="note-and-trash-div">
        <button onClick={handleClick} className="note-button">
          {skillName}
        </button>
        <button onClick={handleDelete} className="trash-button">
          <i className="fa fa-trash-o" aria-hidden="true"></i>
        </button>
        {learnt ?
          <button onClick={handleUnlearn} className="learnt-button">
            Unlearn
          </button> :
          <button onClick={handleLearnt} className="learnt-button">
            Learnt
          </button>}
      </div>

      <Collapse in={open}>
        <div className="skill-content">
          <label>Skill Name:
            <EditableText id={id} type="skillName" content={skillName} />
          </label>
          <button id="progress-button" onClick={handleProgressClick}>
            <label>Progress:</label>
          </button>
          {openProgress ? <Progress progress={progress} id={id} /> : null}
          {url === '-' ?
              <label>URL:
                <button onClick={handleEditButtonClick} id="add-square">
                  <i className="fa fa-plus-square" aria-hidden="true"></i>
                </button>
                <div className="content-div">
                  <div className={editing ? 'show' : 'hidden'}>
                    <p className={editing ? 'show-p' : 'hidden'}>New URL:</p>
                    <input
                      className={editing ? 'show-input' : 'hidden'}
                      value={editText}
                      onChange={handleChange}
                      onKeyDown={handleKeyDown}
                    />
                  </div>
                </div>
              </label> :
              <label>URL:
                <EditableText id={id} type="url" content={url} />
              </label> }
        </div>
      </Collapse>
    </div>
  );
}

export default SkillCollapsible;
