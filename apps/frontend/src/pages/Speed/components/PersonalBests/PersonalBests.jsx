import React, { useEffect, useContext, useState } from 'react';
import { FirebaseContext } from '../../../../Firebase/index';
import { onValue, get, child, off, remove } from 'firebase/database';
import { onAuthStateChanged } from 'firebase/auth';
import NewPersonalBestModal from './NewPersonalBestModal';
import {
  StyledHeaderTableCell,
  StyledTableCell,
  StyledTableRow,
  StyledTableContainer,
} from '../../../../components/table';
import { Table, TableRow } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import JumpalSpinnerWrapper from '../../../../components/JumpalSpinnerWrapper';

function PersonalBests() {
  const firebase = useContext(FirebaseContext);
  const [user, setUser] = useState(null);
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
              console.error(error);
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
              <DeleteIcon color="action" />
            </button></StyledTableCell>
        </StyledTableRow>
      );
    });
  };
  return (
    <JumpalSpinnerWrapper loading={loading}>
      {(personalBests && personalBests.length !== 0 && personalBests[0]) ?
        <div className="componentContentDiv">
          <NewPersonalBestModal />
          <h2>My Personal Bests</h2>
          <StyledTableContainer>
            <Table>
              <tbody>
                {renderTableHeader()}
                {renderAllData(personalBests)}
              </tbody>
            </Table>
          </StyledTableContainer>
        </div> :
        <div>
          <NewPersonalBestModal />
          <h2>My Personal Bests</h2>
          <p className="loading">
            Start by entering a new personal best record above.
          </p>
        </div>
      }
    </JumpalSpinnerWrapper>
  );
}

export default PersonalBests;
