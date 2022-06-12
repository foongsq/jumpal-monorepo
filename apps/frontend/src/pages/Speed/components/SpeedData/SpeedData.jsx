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
  const [sd, loading, addSd, showToday, handleDelete, toggleToday, parseTime] =
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

  const renderAllData = (records) => {
    if (isDataPopulated(records)) {
      return records.reverse().map((record) => {
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

  const renderTodayData = (records) => {
    if (isDataPopulated(records)) {
      let today = new Date();
      const dd = String(today.getDate());
      const mm = String(today.getMonth() + 1); // January is 0!
      const yyyy = today.getFullYear();
      today = `${mm}/${dd}/${yyyy}`;
      return records.reverse().map((record) => {
        const { event, score, time } = record; // destructuring
        const splitTime = time.split(" ");
        if (splitTime[0] === today) {
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
        } else {
          return null;
        }
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
                {showToday
                  ? renderTodayData(parseTime(sd))
                  : renderAllData(parseTime(sd))}
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
