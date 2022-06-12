import { css } from '@emotion/react';

export const HiddenStyle = css`
  display: none;
`;

export const LinkDisplayStyle = css`
  display: flex;
  color: #383838;
  border-radius: 5px;
  box-sizing: border-box;
  background-color: inherit;
  text-align: left;
  word-break: break-all;
`;

export const ActiveCollapsibleHeaderStyle = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0.5rem 0.5rem 0 0;
  padding: 0.5rem;
  width: 100%;
  border: 1px solid gray;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  outline: none;
  font-size: 1rem;
  background-color: #ebebeb;
  border-bottom: none;
`;

export const CollapsibleHeaderStyle = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0.5rem 0.5rem 0 0;
  padding: 0.5rem;
  width: 100%;
  border: none;
  border-radius: 10px;
  outline: none;
  font-size: 1rem;
  background-color: inherit;
  &:hover {
    background-color: #ebebeb;
  }
`;

// show-p
export const LabelStyle = css`
  width: 100%;
  margin: 0;
`;

// show-input
export const InputStyle = css`
  outline: none;
  border: 1px solid grey;
  border-radius: 5px;
  width: 100%;
  padding: 0.5rem;
`;

export const NoteButtonStyle = css`
  border: none;
  outline: none;
  width: 100%;
  text-align: left;
  padding: 0.5rem;
  font-size: 1rem;
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
  &:hover {
    cursor: pointer;
    background-color: turquoise;
  }
`;

export const ActiveNoteButtonStyle = css`
  border: none;
  outline: none;
  width: 100%;
  text-align: left;
  padding: 0.5rem;
  font-size: 1rem;
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
  background-color: turquoise;
`;
