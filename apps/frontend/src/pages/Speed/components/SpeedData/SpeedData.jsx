import React from "react";
import {
  JumpalButton,
  JumpalSpinnerWrapper,
  JumpalPossiblyEmpty,
  JumpalHeaderTableCell,
  JumpalTableCell,
  JumpalTableRow,
  JumpalTableContainer,
  JumpalTableDeleteButton,
} from "../../../../components";
import { Table, TableRow } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import TagFacesIcon from "@mui/icons-material/TagFaces";
import NewSpeedRecord from "./NewSpeedRecord";
import { messages } from "../../../../constants";
import { isDataPopulated } from "../../../../utils";
import styled from "@emotion/styled";
import useSpeedDataController from "./useSpeedDataController";

export default function SpeedData() {
  const [sd, today, loading, addSd, showToday, handleDelete, toggleToday] =
    useSpeedDataController();

  const renderTableHeader = () => {
    return (
      <TableRow>
        <JumpalHeaderTableCell>Event</JumpalHeaderTableCell>
        <JumpalHeaderTableCell>Score</JumpalHeaderTableCell>
        <JumpalHeaderTableCell>Time</JumpalHeaderTableCell>
        <JumpalHeaderTableCell></JumpalHeaderTableCell>
      </TableRow>
    );
  };

  const renderData = (records) => {
    if (isDataPopulated(records)) {
      return records.map((record) => {
        const { event, score, time } = record;
        return (
          <JumpalTableRow key={time}>
            <JumpalTableCell>{event}</JumpalTableCell>
            <JumpalTableCell>{score}</JumpalTableCell>
            <JumpalTableCell>{time}</JumpalTableCell>
            <JumpalTableCell>
              <JumpalTableDeleteButton
                onClick={() => handleDelete(event, score, time)}
              >
                <DeleteIcon />
              </JumpalTableDeleteButton>
            </JumpalTableCell>
          </JumpalTableRow>
        );
      });
    }
  };

  return (
    <JumpalSpinnerWrapper loading={loading}>
      <div className="componentContentDiv">
        <NewSpeedRecord addSd={addSd} />
        <TitleButtonContainer>
          <h2>My Speed Records</h2>
          {showToday ? (
            <JumpalButton onClick={() => toggleToday(false)}>
              <TagFacesIcon className="icon" />
              All data
            </JumpalButton>
          ) : (
            <JumpalButton onClick={() => toggleToday(true)}>
              <TagFacesIcon className="icon" />
              Today
            </JumpalButton>
          )}
        </TitleButtonContainer>
        <JumpalPossiblyEmpty
          msg={messages.SD_EMPTY}
          isPopulated={isDataPopulated(sd)}
        >
          <JumpalTableContainer>
            <Table>
              <tbody>
                {renderTableHeader()}
                {showToday ? renderData(today) : renderData(sd)}
              </tbody>
            </Table>
          </JumpalTableContainer>
        </JumpalPossiblyEmpty>
      </div>
    </JumpalSpinnerWrapper>
  );
}

const TitleButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
