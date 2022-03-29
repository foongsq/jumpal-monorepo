import React, { useEffect, useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { FirebaseContext } from '../../../../Firebase';
import { off, child, update, remove } from 'firebase/database';
import EditableText from '../EditableText';
import Progress from './Progress';
import './SkillCollapsible.css';
import { Collapse, Paper } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

const ESCAPE_KEY = 27;
const ENTER_KEY = 13;

SkillCollapsible.propTypes = {
  id: PropTypes.string,
  skillName: PropTypes.string,
  learnt: PropTypes.bool,
  progress: PropTypes.array,
  url: PropTypes.string,
  onAction: PropTypes.func,
};

function SkillCollapsible(props) {
  const { id, skillName, learnt, progress, url, onAction } = props;
  const firebase = useContext(FirebaseContext);
  const [open, setOpen] = useState(false);
  const [openProgress, setOpenProgress] = useState(false);
  const [editText, setEditText] = useState('');
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
    onAction('Skill deleted successfully!');
  };

  const handleLearnt = () => {
    update(skillRef, {
      learnt: true,
    });
    onAction('Congratulations on learning a new skill!');
  };

  const handleUnlearn = () => {
    update(skillRef, {
      learnt: false,
    });
    onAction('Oops gonna have to relearn that!');
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
    }
    setEditing(false);
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
        <button onClick={handleClick}
          className={open ? 'noteActive' : 'note-button'}>
          {skillName}
        </button>
        <button onClick={handleDelete} className="s-trash-button">
          <DeleteIcon color="action" />
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
        <Paper className='skillItem' elevation={5}>
          <div className='skillItemInnerCompDiv'>
            <p>Skill Name:</p>
            <EditableText id={id} type="skillName" content={skillName} />
          </div>
          {url === '-' ?
              <div className='skillItemProgress'>
                <button id={editing ?
                  'progressActive' : 'progress-button'}
                onClick={handleEditButtonClick}
                >
                  <label>URLs:</label>
                  <AddCircleOutlineIcon color="action" />
                </button>
                <Collapse in={editing}>
                  <div className='url-container'>
                    <div className='show'>
                      <p className='show-p'>New URL:</p>
                      <input
                        className='show-input'
                        value={editText}
                        onChange={handleChange}
                        onKeyDown={handleKeyDown}
                      />
                    </div>
                  </div>
                </Collapse>
              </div> :
              <div className='skillItemInnerCompDiv'>
                <p>URL:</p>
                <EditableText id={id} type="url" content={url} />
              </div>}
          <div className='skillItemProgress'>
            <button id={openProgress ? 'progressActive' : 'progress-button'}
              onClick={handleProgressClick}>
              <label>Progress:</label>
              {openProgress ? <ArrowDropUpIcon color="action" /> :
                <ArrowDropDownIcon color="action" />}
            </button>
          </div>
          <Collapse in={openProgress}>
            <Progress progress={progress} id={id} />
          </Collapse>
        </Paper>
      </Collapse>
    </div>
  );
}

export default SkillCollapsible;
