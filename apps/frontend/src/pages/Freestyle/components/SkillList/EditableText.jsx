import React from 'react';
import PropTypes from 'prop-types';
import EditIcon from '@mui/icons-material/Edit';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import {
  EditableInputStyle,
  HiddenStyle,
  LinkDisplayStyle,
} from '../../../../styles/styles';
import useEditableTextController from './useEditableTextController';
import { FullWidthContainer } from '../../../../components/JumpalCommon';

EditableText.propTypes = {
  id: PropTypes.string,
  content: PropTypes.string,
  type: PropTypes.string,
};

export default function EditableText(props) {
  const { id, content, type } = props;
  const [editText, isEditing, handleEditButtonClick,
    handleChange, handleSubmit, handleKeyDown] =
     useEditableTextController(id, content, type);

  return (
    <EditableTextContainer>
      <FullWidthContainer>
        {type === 'url' ?
          <EditButton
            isEditing={isEditing}
            onClick={handleEditButtonClick}
          >
            <LinkDisplay
              href={editText}
              target='_blank'
              rel="noopener noreferrer" // added for security: https://mathiasbynens.github.io/rel-noopener/
              isEditing={isEditing}
            >
              {editText}
            </LinkDisplay>
            <EditIcon color="action" />
          </EditButton> :
          <EditButton
            isEditing={isEditing}
            onClick={handleEditButtonClick}
          >
            {editText}
            <EditIcon color="action" />
          </EditButton>}
        <EditableInput
          ref={(input) => input && input.focus()}
          isEditing={isEditing}
          value={editText}
          onChange={handleChange}
          onBlur={handleSubmit}
          onKeyDown={handleKeyDown}
          autoFocus
        />
      </FullWidthContainer>
    </EditableTextContainer>
  );
}

const EditableTextContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

const EditButton = styled.button`
  ${(props) => props.isEditing ? HiddenStyle : EditButtonStyle};
`;

const EditableInput = styled.input`
  ${(props) => props.isEditing ? EditableInputStyle : HiddenStyle};
`;

const LinkDisplay = styled.a`
  ${(props) => props.isEditing ? HiddenStyle : LinkDisplayStyle }
`;

const EditButtonStyle = css`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 0.5rem;
  border: none;
  outline: none;
  border-radius: 5px;
  background-color: inherit;
  border-bottom: 1px solid gray;
  white-space: normal;
  word-break: break-word;
  text-align: left;
  &:hover {
    cursor: pointer;
    background-color: #ebebeb;
  }
`;
