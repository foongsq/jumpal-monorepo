import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Collapse, Paper } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import './InstaCollapsible.css';
import { useJumpalConfirm, useJumpalToast } from '../../../../components';

InstaCollapsible.propTypes = {
  id: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  delIg: PropTypes.func.isRequired,
};

function InstaCollapsible(props) {
  const Toast = useJumpalToast();
  const { confirm } = useJumpalConfirm();
  const { id, url, content, delIg } = props;
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  const handleDelete = async () => {
    confirm({
      title: 'Confirm deletion',
      msg: 'Are you sure you want to delete this inspiration post?',
      onConfirm: async () => {
        const res = await delIg(id);
        Toast.apiFeedback({ res, successMsg: messages.IG_DEL_SUCCESS });
      },
    });
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
