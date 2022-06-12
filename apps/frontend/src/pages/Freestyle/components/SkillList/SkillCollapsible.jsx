import React from 'react';
import PropTypes from 'prop-types';
import EditableText from './EditableText';
import Progress from './Progress';
import { Collapse, Paper } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import { CollapsibleButtonsContainer }
  from '../../../../components/JumpalCommon.tsx';
import {
  ActiveNoteButtonStyle,
  NoteButtonStyle,
} from '../../../../styles/styles';
import styled from '@emotion/styled';
import Url from './Url';
import {
  ActiveCollapsibleHeaderStyle,
  CollapsibleHeaderStyle } from '../../../../styles/styles';
import useSkillCollapsibleController from './useSkillCollapsibleController';

SkillCollapsible.propTypes = {
  id: PropTypes.string,
  skillName: PropTypes.string,
  learnt: PropTypes.bool,
  progress: PropTypes.array,
  url: PropTypes.string,
};

export default function SkillCollapsible(props) {
  const { id, skillName, learnt, progress, url } = props;
  const [open, openProgress, handleClick, handleProgressClick,
    handleDelete, handleLearnt, handleUnlearn] =
    useSkillCollapsibleController(id);

  return (
    <div>
      <CollapsibleButtonsContainer>
        <NoteButton isOpen={open} onClick={handleClick}>
          {skillName}
        </NoteButton>
        <TrashButton onClick={handleDelete}>
          <DeleteIcon color="action" />
        </TrashButton>
        {learnt ?
          <LearnUnlearnButton onClick={handleUnlearn}>
            Unlearn
          </LearnUnlearnButton> :
          <LearnUnlearnButton onClick={handleLearnt}>
            Learnt
          </LearnUnlearnButton>}
      </CollapsibleButtonsContainer>

      <Collapse in={open}>
        <SkillDetailsContainer elevation={5}>
          <SkillNameDisplay>
            <p>Skill Name:</p>
            <EditableText id={id} type="skillName" content={skillName} />
          </SkillNameDisplay>
          <Url skillId={id} url={url} />
          <ProgressCollapsibleHeaderButton
            isOpen={openProgress}
            onClick={handleProgressClick}>
            <label>Progress:</label>
            {openProgress ?
              <ArrowDropUpIcon color="action" /> :
              <ArrowDropDownIcon color="action" />}
          </ProgressCollapsibleHeaderButton>
          <Collapse in={openProgress}>
            <Progress progress={progress} id={id} />
          </Collapse>
        </SkillDetailsContainer>
      </Collapse>
    </div>
  );
}

const NoteButton = styled.button`
  ${(props) => props.isOpen ? ActiveNoteButtonStyle : NoteButtonStyle}
`;

const TrashButton = styled.button`
  border: none;
  outline: none;
  float: right;
  &:hover {
    cursor: pointer;
    background-color: red;
  }
`;

const LearnUnlearnButton = styled.button`
  border: none;
  outline: none;
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
  &:hover {
    background-color: #8adcff;
    cursor: pointer;
  }
`;

const SkillDetailsContainer = styled(Paper)`
  padding: 0.5rem;
  padding-bottom: 1rem;
  margin-bottom: 1rem;
`;

const SkillNameDisplay = styled.div`
  display: flex;
  align-items: center;
  padding: 0.5rem;
  p {
    white-space: nowrap;
    margin-right: 1rem;
    margin-bottom: 0;
    text-align: left;
  }
`;

const ProgressCollapsibleHeaderButton = styled.button`
  ${(props) => props.isOpen ?
    ActiveCollapsibleHeaderStyle : CollapsibleHeaderStyle }
`;
