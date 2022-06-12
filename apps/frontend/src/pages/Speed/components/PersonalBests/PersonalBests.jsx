import React from "react";
import NewPersonalBest from "./NewPersonalBest";
import { Table, TableRow } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  JumpalSpinnerWrapper,
  JumpalPossiblyEmpty,
  JumpalHeaderTableCell,
  JumpalTableCell,
  JumpalTableRow,
  JumpalTableContainer,
  JumpalTableDeleteButton,
} from "../../../../components";
import { messages } from "../../../../constants";
import { isDataPopulated } from "../../../../utils";
import usePersonalBestsController from "./usePersonalBestsController";

export default function PersonalBests() {
  const [pb, loading, addPb, handleDelete] = usePersonalBestsController();

  const renderTableHeader = () => {
    return (
      <TableRow>
        <JumpalHeaderTableCell>Event</JumpalHeaderTableCell>
        <JumpalHeaderTableCell>Score</JumpalHeaderTableCell>
        <JumpalHeaderTableCell>Date</JumpalHeaderTableCell>
        <JumpalHeaderTableCell></JumpalHeaderTableCell>
      </TableRow>
    );
  };

  const renderAllData = (records) => {
    if (isDataPopulated(records)) {
      const eventsArr = Object.keys(records[0]);
      return eventsArr.map((event) => {
        return (
          <JumpalTableRow key={event}>
            <JumpalTableCell>{event}</JumpalTableCell>
            <JumpalTableCell>{records[0][event].score}</JumpalTableCell>
            <JumpalTableCell>{records[0][event].time}</JumpalTableCell>
            <JumpalTableCell>
              <JumpalTableDeleteButton onClick={() => handleDelete(event)}>
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
        <NewPersonalBest addPb={addPb} />
        <h2>My Personal Bests</h2>
        <JumpalPossiblyEmpty
          msg={messages.PB_EMPTY}
          isPopulated={isDataPopulated(pb)}
        >
          <JumpalTableContainer>
            <Table>
              <tbody>
                {renderTableHeader()}
                {renderAllData(pb)}
              </tbody>
            </Table>
          </JumpalTableContainer>
        </JumpalPossiblyEmpty>
      </div>
    </JumpalSpinnerWrapper>
  );
}
