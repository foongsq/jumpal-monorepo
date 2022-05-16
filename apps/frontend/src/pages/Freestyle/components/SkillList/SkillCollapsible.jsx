import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import EditableText from '../EditableText';
import Progress from './Progress';
import './SkillCollapsible.css';
import { Collapse, Paper } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { SkillsApi } from './context';
import { useJumpalConfirm, useJumpalToast } from '../../../../components';

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
  const Toast = useJumpalToast();
  const { confirm } = useJumpalConfirm();
  const { id, skillName, learnt, progress, url } = props;
  const api = useContext(SkillsApi);
  const [open, setOpen] = useState(false);
  const [openProgress, setOpenProgress] = useState(false);
  const [editText, setEditText] = useState('');
  const [editing, setEditing] = useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  const handleProgressClick = () => {
    setOpenProgress(!openProgress);
  };

  const handleDelete = async () => {
    confirm({
      title: 'Confirm deletion',
      msg: 'Are you sure you want to delete this skill?',
      onConfirm: async () => {
        const res = await api.delSkill(id);
        Toast.apiFeedback({ res, successMsg: messages.SKILL_DEL_SUCCESS });
      },
    });
  };

  const handleLearnt = async () => {
    const res = await api.updateSkill(id, {
      learnt: true,
    });
    Toast.apiFeedback({ res, successMsg: messages.LEARN_SUCCESS });
  };

  const handleUnlearn = async () => {
    const res = await api.updateSkill(id, {
      learnt: false,
    });
    Toast.apiFeedback({ res, successMsg: messages.UNLEARN_SUCCESS });
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
      const res = await api.updateSkill(id, {
        url: val,
      });
      Toast.apiFeedback({ res, successMsg: messages.SKILL_UPDATE_SUCCESS });
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
