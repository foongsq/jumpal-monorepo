import React, { useEffect, useContext, useState } from 'react';
import { FirebaseContext } from '../../../Firebase/index';
import { onValue, get, child, off, remove } from 'firebase/database';
import { onAuthStateChanged } from 'firebase/auth';
import NewPersonalBestModal from './NewPersonalBestModal';
import { JumpalSpinner } from '../../CustomComponents/core';

import {
  StyledHeaderTableCell,
  StyledTableCell,
  StyledTableRow,
  StyledTableContainer,
} from '../../CustomComponents/table';
import Table from '@mui/material/Table';
import TableRow from '@mui/material/TableRow';

function PersonalBests() {
  const firebase = useContext(FirebaseContext);
  const [user, setUser] = useState(firebase.user);
  const [loading, setLoading] = useState(false);
  const [personalBests, setPersonalBests] = useState([]);
  const pbRef = firebase.personalBests;

  useEffect(() => {
    onValue(pbRef, onPersonalBestsUpdate);
    setLoading(true);
    // Get current user from firebase and save to state as user
    const unsubscribe = onAuthStateChanged(firebase.auth, async (user) => {
      if (user) {
        const personalBests = [];
        get(pbRef).then((snapshot) => {
          const value = snapshot.val();
          personalBests.push(value);
          setPersonalBests(personalBests);
          setUser(user);
          setLoading(false);
        })
            .catch((error) => {
              console.log(error);
            });
      } else {
        alert('Please sign in to continue');
        setLoading(false);
      }
    });
    return () => {
      off(pbRef);
      unsubscribe();
    };
  }, []);

  const onPersonalBestsUpdate = (snapshot) => {
    setLoading(true);
    const newPersonalBests = [];
    newPersonalBests.push(snapshot.val());
    setPersonalBests(newPersonalBests);
    setLoading(false);
  };

  const handleDelete = (event) => {
    // TODO: Change this to modal/toast
    const result = window.confirm('Are you sure you want to delete?');
    if (user && result) {
      remove(child(pbRef, event));
    }
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
              <i className="fa fa-trash-o" aria-hidden="true"></i>
            </button></StyledTableCell>
        </StyledTableRow>
      );
    });
  };

  if (loading) {
    return <JumpalSpinner />;
  } else {
    if (personalBests && personalBests.length !== 0 && personalBests[0]) {
      const records = personalBests;

      return (
        <div className="componentContentDiv">
          <NewPersonalBestModal />
          <h2>My Personal Bests</h2>
          <StyledTableContainer>
            <Table>
              <tbody>
                {renderTableHeader()}
                {renderAllData(records)}
              </tbody>
            </Table>
          </StyledTableContainer>
        </div>
      );
    } else {
      // User doesn't have any personal best records yet
      return (
        <div>
          <NewPersonalBestModal />
          <h2>My Personal Bests</h2>
          <p className="loading">
            Start by entering a new personal best record above.
          </p>
        </div>
      );
    }
  }
}

export default PersonalBests;
