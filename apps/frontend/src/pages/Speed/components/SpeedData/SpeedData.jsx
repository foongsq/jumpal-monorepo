import React, { useState, useEffect } from 'react';
import {
  JumpalButton,
  JumpalSpinnerWrapper,
  JumpalPossiblyEmpty } from '../../../../components';
import {
  StyledHeaderTableCell,
  StyledTableCell,
  StyledTableRow,
  StyledTableContainer,
} from '../../../../components/table';
import { Table, TableRow } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import TagFacesIcon from '@mui/icons-material/TagFaces';
import NewSpeedRecordModal from './NewSpeedRecordModal';
import './SpeedData.css';
import { messages } from '../../../../constants';
import { isDataPopulated } from '../../../../utils';
import { useSdDb } from '../../../../hooks';

function SpeedData() {
  const [sd, loading, getSd, addSd, delSd] = useSdDb();
  const [showToday, setShowToday] = useState(false);

  useEffect(() => {
    getSd();
  }, []);

  const handleDelete = async (event, score, time) => {
    const result = window.confirm('Are you sure you want to delete?');
    if (result) {
      await delSd(event, score, time);
    }
  };

  const toggleToday = (shouldShowToday) => {
    setShowToday(shouldShowToday);
  };

  const renderTableHeader = () => {
    return (
      <TableRow>
        <StyledHeaderTableCell>Event</StyledHeaderTableCell>
        <StyledHeaderTableCell>Score</StyledHeaderTableCell>
        <StyledHeaderTableCell>Time</StyledHeaderTableCell>
        <StyledHeaderTableCell></StyledHeaderTableCell>
      </TableRow>
    );
  };

  const renderAllData = (records) => {
    if (isDataPopulated(records)) {
      return records.reverse().map((record) => {
        const { event, score, time } = record;
        return (
          <StyledTableRow key={time}>
            <StyledTableCell>{event}</StyledTableCell>
            <StyledTableCell>{score}</StyledTableCell>
            <StyledTableCell>{time}</StyledTableCell>
            <StyledTableCell>
              <button
                className="jumpalTableDeleteButton"
                onClick={() => handleDelete(event, score, time)}
              >
                <DeleteIcon />
              </button></StyledTableCell>
          </StyledTableRow>
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
        const splitTime = time.split(' ');
        if (splitTime[0] === today) {
          return (
            <StyledTableRow key={time}>
              <StyledTableCell>{event}</StyledTableCell>
              <StyledTableCell>{score}</StyledTableCell>
              <StyledTableCell>{time}</StyledTableCell>
              <StyledTableCell>
                <button
                  className="jumpalTableDeleteButton"
                  onClick={() => handleDelete(event, score, time)}
                >
                  <DeleteIcon />
                </button></StyledTableCell>
            </StyledTableRow>
          );
        } else {
          return null;
        }
      });
    }
  };

  const parseTime = (records) => {
    if (isDataPopulated(records)) {
      const consolidated = [];
      const years = Object.keys(records[0]);
      years.forEach((year) => {
        const months = Object.keys(records[0][year]);
        months.forEach((month) => {
          const days = Object.keys(records[0][year][month]);
          days.forEach((day) => {
            Object.values(records[0][year][month][day]).forEach((record) => {
              consolidated.push(record);
            });
          });
        });
      });
      // Sort records in ascending order according to time
      return consolidated.sort(
          (a, b) => (new Date(a.time) > new Date(b.time)) ? 1 : -1);
    }
  };

  return (
    <JumpalSpinnerWrapper loading={loading}>
      <div className="componentContentDiv">
        <NewSpeedRecordModal addSd={addSd} />
        <div className="titleAndButtonDiv">
          <h2>My Speed Records</h2>
          {showToday ?
              <JumpalButton onClick={() => toggleToday(false)}>
                <TagFacesIcon className='icon' />
                All data
              </JumpalButton> :
              <JumpalButton onClick={() => toggleToday(true)}>
                <TagFacesIcon className='icon' />
                Today
              </JumpalButton>}
        </div>
        <JumpalPossiblyEmpty
          msg={messages.SD_EMPTY}
          isPopulated={isDataPopulated(sd)}
        >
          <StyledTableContainer>
            <Table>
              <tbody>
                {renderTableHeader()}
                {showToday ?
                  renderTodayData(parseTime(sd)) :
                  renderAllData(parseTime(sd))}
              </tbody>
            </Table>
          </StyledTableContainer>

        </JumpalPossiblyEmpty>
      </div>
    </JumpalSpinnerWrapper>
  );
}

export default SpeedData;
