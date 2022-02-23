import React, { useState, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  off,
  remove,
  child,
} from 'firebase/database';
import { FirebaseContext } from '../../../Firebase';
import { Collapse, Paper } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import './InstaCollapsible.css';

InstaCollapsible.propTypes = {
  id: PropTypes.string,
  url: PropTypes.string,
  content: PropTypes.string,
  onAction: PropTypes.func,
};

function InstaCollapsible(props) {
  const firebase = useContext(FirebaseContext);
  const { id, url, content, onAction } = props;
  const [open, setOpen] = useState(false);
  const igRef = child(firebase.igs, id);

  useEffect(() => {
    return () => off(igRef);
  }, []);

  const handleClick = () => {
    setOpen(!open);
  };

  const handleDelete = () => {
    remove(igRef);
    onAction('Instagram post deleted successfully!');
  };

  return (
    <div className="insta-collapsible-container">
      <div className="note-and-trash-div">
        <button onClick={handleClick}
          className={open ? 'noteActive' : 'note-button'}>
          {content}
        </button>
        <button onClick={handleDelete} className="fs-trash-button">
          <DeleteIcon color="action"/>
        </button>
      </div>
      <Collapse in={open}>
        <Paper className='skillItem' elevation={5}>
          <a
            target="_blank"
            rel="noopener noreferrer" // added for security: https://mathiasbynens.github.io/rel-noopener/
            href={url}
            className="insta-link"
          >
            <p>{url}</p>
          </a>
        </Paper>
      </Collapse>
    </div>
  );
}

export default InstaCollapsible;
