import React, { useEffect } from 'react';
import NewPersonalBestModal from './NewPersonalBestModal';
import {
  StyledHeaderTableCell,
  StyledTableCell,
  StyledTableRow,
  StyledTableContainer,
} from '../../../../components/table';
import { Table, TableRow } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import {
  JumpalSpinnerWrapper,
  JumpalPossiblyEmpty,
  useJumpalToast,
  useJumpalConfirm } from '../../../../components';
import { messages } from '../../../../constants';
import { isDataPopulated } from '../../../../utils';
import { usePbDb } from '../../../../hooks';

function PersonalBests() {
  const Toast = useJumpalToast();
  const { confirm } = useJumpalConfirm();
  const [pb, loading, getPb, addPb, delPb] = usePbDb();

  useEffect(() => {
    getPb();
  }, []);

  const handleDelete = async (event) => {
    confirm({
      title: 'Confirm deletion',
      msg: 'Are you sure you want to delete this personal best record?',
      onConfirm: async () => {
        const res = await delPb(event);
        Toast.apiFeedback({ res, successMsg: messages.PB_DEL_SUCCESS });
      },
    });
  };

  const renderTableHeader = () => {
    return (
      <TableRow>
        <StyledHeaderTableCell>Event</StyledHeaderTableCell>
        <StyledHeaderTableCell>Score</StyledHeaderTableCell>
        <StyledHeaderTableCell>Date</StyledHeaderTableCell>
        <StyledHeaderTableCell></StyledHeaderTableCell>
      </TableRow>
    );
  };

  const renderAllData = (records) => {
    if (isDataPopulated(records)) {
      const eventsArr = Object.keys(records[0]);
      return eventsArr.map((event) => {
        return (
          <StyledTableRow key={event}>
            <StyledTableCell>{event}</StyledTableCell>
            <StyledTableCell>{records[0][event].score}</StyledTableCell>
            <StyledTableCell>{records[0][event].time}</StyledTableCell>
            <StyledTableCell>
              <button
                className="jumpalTableDeleteButton"
                onClick={() => handleDelete(event)}
              >
                <DeleteIcon />
              </button></StyledTableCell>
          </StyledTableRow>
        );
      });
    }
  };

  return (
    <JumpalSpinnerWrapper loading={loading}>
      <div className="componentContentDiv">
        <NewPersonalBestModal addPb={addPb} />
        <h2>My Personal Bests</h2>
        <JumpalPossiblyEmpty
          msg={messages.PB_EMPTY}
          isPopulated={isDataPopulated(pb)}>
          <StyledTableContainer>
            <Table>
              <tbody>
                {renderTableHeader()}
                {renderAllData(pb)}
              </tbody>
            </Table>
          </StyledTableContainer>
        </JumpalPossiblyEmpty>
      </div>
    </JumpalSpinnerWrapper>
  );
}

export default PersonalBests;
