import React, { useEffect, useContext, useState, useRef } from 'react';
import { FirebaseContext } from '../../../Firebase/index';
import { onValue, ref, get, child } from "firebase/database";
import NewPersonalBestModal from './NewPersonalBestModal';
import { JumpalSpinner } from '../../CustomComponents/core'

import { StyledHeaderTableCell, StyledTableCell, StyledTableRow, StyledTableContainer } from '../../CustomComponents/table';
import Table from '@mui/material/Table';
import TableRow from '@mui/material/TableRow';

function PersonalBests() {
  const firebase = useContext(FirebaseContext);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  // Personal best data
  const [personalBests, setPersonalBests] = useState([]);
  console.log(firebase);
  // Attach event listener to personal best data of current user
  const pbRef = useRef(firebase.personalBests).current;

  // Runs once upon component mount
  useEffect(() => {
    onValue(pbRef, onPersonalBestsUpdate); // on value change, call onPersonalBestsUpdate function
    setLoading(true);
     // Get current user from firebase and save to state as user
     firebase.auth.onAuthStateChanged(async user => {
      if (user) {
        // Fetch personal best data associated to current user's uid and set as state
        let personalBests = [];
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
        // Prompts user to sign in
        alert("Please sign in to continue");
        setLoading(false);
      }
    });
    return () => {
      // detach listeners to personal best of current user when component unmounts
      pbRef.off()
    }
  }, []);

  // This method updates the state with new personalBests data when data in database is updated.
  const onPersonalBestsUpdate = (snapshot) => {
    setLoading(true);
    let newPersonalBests = [];
    newPersonalBests.push(snapshot.val());
    setPersonalBests(newPersonalBests);
    setLoading(false);
  }

  const handleDelete = (event) => {
    // TODO: Change this to modal/toast
    let result = window.confirm("Are you sure you want to delete?");
    if (user && result) {
      child(pbRef, event).remove()
    }
  }

  const renderTableHeader = () => {
    return (
      <TableRow>
        <StyledHeaderTableCell>Event</StyledHeaderTableCell>
        <StyledHeaderTableCell>Score</StyledHeaderTableCell>
        <StyledHeaderTableCell>Date</StyledHeaderTableCell>
        <StyledHeaderTableCell></StyledHeaderTableCell>
      </TableRow>
    );
  }

  const renderAllData = (records) => {
    let eventsArr = Object.keys(records[0]);
    return eventsArr.map(event => {
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
      )
    });
  }

  if (loading) {
    return <JumpalSpinner />;
  } else {
    if (personalBests && personalBests.length !== 0 && personalBests[0]){
      let records = personalBests;
      
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
            <p className="loading">Start by entering a new personal best record above.</p>
        </div>
      );
    }
  }
}

export default PersonalBests;