import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import { FirebaseContext } from '../../../Firebase';
import './EditableText.css';
import { off, child, update } from 'firebase/database';

const ESCAPE_KEY = 27;
const ENTER_KEY = 13;

EditableText.propTypes = {
  id: PropTypes.string,
  content: PropTypes.string,
  type: PropTypes.string,
};

function EditableText(props) {
  const { id, content, type } = props;
  const firebase = useContext(FirebaseContext);
  const [editText, setEditText] = useState(content);
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

  const handleSubmit = () => {
    const val = editText;
    if (props.type === 'skillName') {
      update(skillRef, {
        skillName: val,
      });
    } else if (props.type === 'description') {
      update(skillRef, {
        description: val,
      });
    } else if (type === 'url') {
      update(skillRef, {
        url: val,
      });
    } else {
      update(skillRef, {
        progress: val,
      });
    }
    if (val) {
      setEditing(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.which === ESCAPE_KEY) {
      setEditText(content); // TODO: test this behaviour
      setEditing(false);
    } else if (e.which === ENTER_KEY) {
      handleSubmit(e);
    }
  };

  return (
    <div className="editable-text-container">
      <div className="content-div">
        {type === 'url' ?
        <div className="insta-link">
          <a
            href={editText}
            target='_blank'
            rel="noopener noreferrer" // added for security: https://mathiasbynens.github.io/rel-noopener/
            className={editing ? 'hidden' : 'insta-link'}
          >
            {editText}
          </a>
        </div>:
          <p className={editing ? 'hidden' : 'show-p'}>
            {editText}
          </p>}
        <input
          className={editing ? 'show-input' : 'hidden'}
          value={editText}
          onChange={handleChange}
          onBlur={handleSubmit}
          onKeyDown={handleKeyDown}
        />
      </div>
      <button className="edit-button" onClick={handleEditButtonClick}>
        <i className="fa fa-pencil" aria-hidden="true"></i>
      </button>
    </div>
  );
}

export default EditableText;
