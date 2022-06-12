import React from 'react';
import PropTypes from 'prop-types';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import useProgressController from './useProgressController';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import {
  LabelStyle,
  HiddenStyle,
} from '../../../../styles/styles';
import {
  FlexContainer,
  FullWidthContainer,
  JumpalSmallVerticalSpacing,
  EditableInput,
} from '../../../../components/JumpalCommon';

Progress.propTypes = {
  id: PropTypes.string,
  progress: PropTypes.array,
};

export default function Progress(props) {
  const { id, progress } = props;
  const [editText, editing, handleEditButtonClick, handleChange,
    handleSubmit, handleKeyDown, reverseArray] =
    useProgressController(id, progress);

  const displayProgress = reverseArray();
  return (
    <ProgressContainer>
      <AddNewProgressButton
        isEditing={editing}
        onClick={handleEditButtonClick}
      >
        <AddCircleOutlineIcon color="action" />
        <p>Add New Progress</p>
      </AddNewProgressButton>
      <FullWidthContainer>
        <JumpalSmallVerticalSpacing />
        <ProgressEntryLabel isEditing={editing}>New Entry:</ProgressEntryLabel>
        <EditableInput
          isEditing={editing}
          ref={(input) => input && input.focus()}
          value={editText}
          onChange={handleChange}
          onBlur={handleSubmit}
          onKeyDown={handleKeyDown}
        />
        <JumpalSmallVerticalSpacing />
      </FullWidthContainer>
      {displayProgress.map((progressEntry) => {
        return (
          <ProgressEntryContainer key={progressEntry[1]}>
            <ProgressEntryText>{progressEntry[0]}</ProgressEntryText>
            <FlexContainer>
              <TimestampDisplay>
                {new Date(progressEntry[1]).toLocaleDateString()}
              </TimestampDisplay>
            </FlexContainer>
          </ProgressEntryContainer>
        );
      })}
    </ProgressContainer>
  );
}

const ProgressContainer = styled.div`
  border: 1px solid grey;
  border-top: none;
  margin: 0;
  margin-right: 0.5rem;
  padding: 0.5rem;
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
`;

const AddNewProgressButton = styled.button`
  ${(props) => props.isEditing ? HiddenStyle : AddNewProgressButtonStyle }
`;

const AddNewProgressButtonStyle = css`
  display: flex;
  align-items: center;
  padding: 0.5rem;
  background-color: inherit;
  outline: none;
  border: none;
  border-radius: 5px;
  float: right;
  p {
    margin: 0;
    margin-left: 0.5rem;
  }
  &:hover {
    background-color: #ebebeb;
  }
`;

const ProgressEntryContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

const ProgressEntryLabel = styled.p`
  ${(props) => props.isEditing ? LabelStyle : HiddenStyle}
`;

const ProgressEntryText = styled.p`
  ${LabelStyle}
  word-break: break-word;
`;

const TimestampDisplay = styled.p`
  ${LabelStyle}
`;
