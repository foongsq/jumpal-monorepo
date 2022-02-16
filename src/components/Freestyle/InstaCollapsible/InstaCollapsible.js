import React, { useState, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  off,
  remove,
  child,
} from 'firebase/database';
import { FirebaseContext } from '../../../Firebase';
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

  useEffect(() => {
    setOpen(false);
  }, [id]);

  const handleClick = () => {
    setOpen(!open);
  };

  const handleDelete = async () => {
    remove(igRef);
    window.alert(
        `Instagram post deleted successfully!
        (Please refresh to see your updated list)`,
    );
    setOpen(false);
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
      {open ?
      <a
        target="_blank"
        rel="noopener noreferrer" // added for security: https://mathiasbynens.github.io/rel-noopener/
        href={url}
        className="insta-link"
      >
        <p>{url}</p>
      </a> :
      null}
    </div>
  );
}

export default InstaCollapsible;
