import React from "react";
import { useAuth } from "../../../../data";
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
  JumpalErrorText,
  JumpalHideableComponent,
} from "../../../../components";
import { messages } from "../../../../constants";
import { isDataPopulated } from "../../../../utils";
import usePersonalBestsController from "./usePersonalBestsController";
import PropTypes from "prop-types";

PersonalBests.propTypes = {
  hide: PropTypes.bool,
};

export default function PersonalBests(props) {
  const { hide } = props;
  const [pb, loading, addPb, handleDelete] = usePersonalBestsController();
  const [user] = useAuth();

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

  const renderAllData = (fePbData) => {
    if (isDataPopulated(fePbData)) {
      return fePbData.map((pbRecord) => {
        return (
          <JumpalTableRow key={pbRecord.event}>
            <JumpalTableCell>{pbRecord.event}</JumpalTableCell>
            <JumpalTableCell>{pbRecord.score}</JumpalTableCell>
            <JumpalTableCell>{pbRecord.time}</JumpalTableCell>
            <JumpalTableCell>
              <JumpalTableDeleteButton
                onClick={() => handleDelete(pbRecord.event)}
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
    <JumpalHideableComponent hide={hide}>
      {!user ? (
        <JumpalErrorText msg={messages.PB_NOT_SIGNED_IN} />
      ) : (
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
      )}
    </JumpalHideableComponent>
  );
}
