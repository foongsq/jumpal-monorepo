import React from "react";
import PropTypes from "prop-types";
import { Collapse, Paper } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { CollapsibleButtonsContainer } from "../../../../components/JumpalCommon.tsx";
import styled from "@emotion/styled";
import { LinkDisplayStyle } from "../../../../styles/styles";
import {
  ActiveNoteButtonStyle,
  NoteButtonStyle,
} from "../../../../styles/styles";
import useMediaCollapsibleController from "./useMediaCollapsibleController";

MediaCollapsible.propTypes = {
  id: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  delIg: PropTypes.func.isRequired,
};

export default function MediaCollapsible(props) {
  const { id, url, content, delIg } = props;
  const [open, handleClick, handleDelete] = useMediaCollapsibleController(
    id,
    delIg
  );

  return (
    <MediaContainer>
      <CollapsibleButtonsContainer>
        <NoteButton isOpen={open} onClick={handleClick}>
          {content}
        </NoteButton>
        <TrashButton onClick={handleDelete}>
          <DeleteIcon color="action" />
        </TrashButton>
      </CollapsibleButtonsContainer>
      <Collapse in={open}>
        <Paper className="skillItem" elevation={5}>
          <LinkDisplay
            target="_blank"
            rel="noopener noreferrer" // added for security: https://mathiasbynens.github.io/rel-noopener/
            href={url}
          >
            <p>{url}</p>
          </LinkDisplay>
        </Paper>
      </Collapse>
    </MediaContainer>
  );
}

const LinkDisplay = styled.a`
  ${LinkDisplayStyle}
`;

const MediaContainer = styled.div`
  width: 100%;
  box-sizing: border-box;
`;

const NoteButton = styled.button`
  ${(props) => (props.isOpen ? ActiveNoteButtonStyle : NoteButtonStyle)}
`;

const TrashButton = styled.button`
  border: none;
  outline: none;
  float: right;
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
  &:hover {
    cursor: pointer;
    background-color: red;
  }
`;
