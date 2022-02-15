import { useState, useEffect, useRef, useContext } from 'react';

import { onValue, get, child, off, remove } from "firebase/database";
import { onAuthStateChanged } from "firebase/auth";
import { FirebaseContext } from '../../../Firebase/index';
import { JumpalButton, JumpalSpinner } from '../../CustomComponents/core';

import { StyledHeaderTableCell, StyledTableCell, StyledTableRow, StyledTableContainer } from '../../CustomComponents/table';
import Table from '@mui/material/Table';
import TableRow from '@mui/material/TableRow';
import NewSpeedRecordModal from './NewSpeedRecordModal';
import './SpeedData.css';

function SpeedData() {
  const firebase = useContext(FirebaseContext);
  const [user, setUser] = useState(firebase.user);
  const [loading, setLoading] = useState(false);
  const [speedRecords, setSpeedRecords] = useState([]);
  const [showToday, setShowToday] = useState(false);
  const srRef = useRef(firebase.speedRecords).current;

  useEffect(() => {
    onValue(srRef, onSpeedDataUpdate);
    setLoading(true);
      // Get current user from firebase and save to state as user
      const unsubscribe = onAuthStateChanged(firebase.auth, async user => {
      if (user) {
        let speedRecords = [];
        get(srRef).then((snapshot) => {
          const value = snapshot.val();
          speedRecords.push(value);
          setSpeedRecords(speedRecords);
          setUser(user);
          setLoading(false);
        })
        .catch((error) => {
          console.log(error);
        });
      } else {
        alert("Please sign in to continue");
        setLoading(false);
      }
    });
    return () => {
      off(srRef);
      unsubscribe();
    }
  }, []);

  // This method updates the state with new speed record data when data in database is updated.
  const onSpeedDataUpdate = (snapshot) => {
    setLoading(true);
    let speedRecords = [];
    speedRecords.push(snapshot.val());
    setSpeedRecords(speedRecords);
    setLoading(false);
  }

  const handleDelete = (event, score, time) => {
    let dd = String(new Date(time).getDate()).padStart(2, '0');
    let mm = String(new Date(time).getMonth() + 1).padStart(2, '0'); //January is 0!
    let yyyy = new Date(time).getFullYear();
    let date = `${yyyy}/${mm}/${dd}`;
    let result = window.confirm("Are you sure you want to delete?");
    if (user && result) {
      get(child(srRef, date))
        .then((snapshot) => {
          snapshot.forEach(child => {
            if (child.val().event === event &&
              child.val().score === score &&
              child.val().time === time) {
              remove(child.ref);
            }
          })
        });
    }
  }

  const handleToday = () => {
    setShowToday(true);
  }

  const handleAll = () => {
    setShowToday(false);
  }

  const renderTableHeader = () => {
    return (
      <TableRow>
        <StyledHeaderTableCell>Event</StyledHeaderTableCell>
        <StyledHeaderTableCell>Score</StyledHeaderTableCell>
        <StyledHeaderTableCell>Time</StyledHeaderTableCell>
        <StyledHeaderTableCell></StyledHeaderTableCell>
      </TableRow>
    );
  }

  const renderAllData = (records) => {
      return records.reverse().map(record => {
        const { event, score, time } = record
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
                <i className="fa fa-trash-o" aria-hidden="true"></i>
              </button></StyledTableCell>
          </StyledTableRow>
        )
      });
  }

  const renderTodayData = (records) => {
    let today = new Date();
    let dd = String(today.getDate());
    let mm = String(today.getMonth() + 1); //January is 0!
    let yyyy = today.getFullYear();
    today = `${mm}/${dd}/${yyyy}`;
    return records.reverse().map(record => {
      const { event, score, time } = record //destructuring
      let splitTime = time.split(" ");
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
              <i className="fa fa-trash-o" aria-hidden="true"></i>
            </button></StyledTableCell>
        </StyledTableRow>
        )
      } else { return null; } 
    });
  }

  // Year, month, day was used as keys in records. This method flattens those keys
  // into 1 time attribute.
  const parseTime = (records) => {
    let consolidated = []
    let years = Object.keys(records[0]);
    years.forEach(year => {
      let months = Object.keys(records[0][year]);
      months.forEach(month => {
        let days = Object.keys(records[0][year][month]);
        days.forEach(day => {
          Object.values(records[0][year][month][day]).forEach(record => {
            consolidated.push(record);
          })
        })
      })
    });
    // Sort records in ascending order according to time
    return consolidated.sort((a, b) => (new Date(a.time) > new Date(b.time)) ? 1 : -1);
  }

  if (loading) {
    return <JumpalSpinner />;
  } else {
    if (speedRecords && speedRecords.length !== 0 && speedRecords[0]){
      let parsedRecords = parseTime(speedRecords);
      return (
        <div className="componentContentDiv">
          <NewSpeedRecordModal />
          <div className="titleAndButtonDiv">
            <h2>My Speed Records</h2>
            {showToday ? 
              <JumpalButton onClick={handleAll} className="button">
                <i class="fa fa-smile-o" aria-hidden="true"></i>
                All data
              </JumpalButton> 
              :
              <JumpalButton variant="success" onClick={handleToday} className="button">
                <i class="fa fa-smile-o" aria-hidden="true"></i>
                Today
              </JumpalButton> }             
          </div>
          <StyledTableContainer>
            <Table>
                {renderTableHeader()}
                {showToday ? renderTodayData(parsedRecords) : renderAllData(parsedRecords)}
            </Table>
          </StyledTableContainer>
        </div>
      );
    } else {
      return (
        <div>
          <p className="loading">Start by entering a new speed record above.</p>
        </div>
      );
    }
  }
}

export default SpeedData;