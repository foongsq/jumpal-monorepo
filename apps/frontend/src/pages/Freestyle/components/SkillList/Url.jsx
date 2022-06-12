import React from 'react';
import PropTypes from 'prop-types';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { Collapse } from '@mui/material';
import EditableText from './EditableText';
import {
  ActiveCollapsibleHeaderStyle,
  CollapsibleHeaderStyle,
  InputStyle,
  LabelStyle } from '../../../../styles/styles';
import styled from '@emotion/styled';
import useUrlController from './useUrlController';
import {
  JumpalHorizontalSpacing,
} from '../../../../components/JumpalCommon.tsx';

Url.propTypes = {
  url: PropTypes.string,
  skillId: PropTypes.string,
};

export default function Url(props) {
  const { url, skillId } = props;
  const [editText, editing, handleUrlChange,
    handleKeyDown, handleCollapsibleHeaderClick] =
    useUrlController(skillId, url);
  const isUrlEmpty = (url) => url === '-' || url === '';

  if (isUrlEmpty(url)) {
    return (
      <UrlContainer1>
        <UrlCollapsibleHeader onClick={handleCollapsibleHeaderClick}>
          <label>URLs:</label>
          <AddCircleOutlineIcon color="action" />
        </UrlCollapsibleHeader>
        <Collapse in={editing}>
          <UrlLabel>New URL:</UrlLabel>
          <UrlInput
            value={editText}
            onChange={handleUrlChange}
            onKeyDown={handleKeyDown}
          />
        </Collapse>
      </UrlContainer1>
    );
  }
  return (
    <UrlContainer2>
      <p>URL:</p>
      <JumpalHorizontalSpacing />
      <EditableText id={skillId} type="url" content={url} />
    </UrlContainer2>
  );
}

const UrlContainer1 = styled.div`
  padding-right: 0.5rem;
`;

const UrlContainer2 = styled.div`
  padding: 0.5rem;
  display: flex;
  width: 100%;
`;

const UrlCollapsibleHeader = styled.button`
  ${(props) => props.isEditing ?
    ActiveCollapsibleHeaderStyle : CollapsibleHeaderStyle }
`;

const UrlLabel = styled.p`
  ${LabelStyle}
`;

const UrlInput = styled.input`
  ${InputStyle}
`;
