import React, { useState, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  off,
  remove,
  child,
} from 'firebase/database';
import { FirebaseContext } from '../../../Firebase';
import { Collapse } from '@mui/material';
import './InstaCollapsible.css';

InstaCollapsible.propTypes = {
  id: PropTypes.string,
  url: PropTypes.string,
  content: PropTypes.string,
};

function InstaCollapsible(props) {
  const firebase = useContext(FirebaseContext);
  const { id, url, content } = props;
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
    window.alert(
        `Instagram post deleted successfully!
        (Please refresh to see your updated list)`,
    );
  };

  return (
    <div className="insta-collapsible-container">
      <div className="note-and-trash-div">
        <button onClick={handleClick} className="note-button">
          {content}
        </button>
        <button onClick={handleDelete} className="trash-button">
          <i className="fa fa-trash-o" aria-hidden="true"></i>
        </button>
      </div>
      <Collapse in={open}>
        <a
          target="_blank"
          rel="noopener noreferrer" // added for security: https://mathiasbynens.github.io/rel-noopener/
          href={url}
          className="insta-link"
        >
          <p>{url}</p>
        </a>
      </Collapse>
    </div>
  );
}

export default InstaCollapsible;
