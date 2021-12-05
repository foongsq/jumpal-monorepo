import React from 'react';
import { withFirebase } from '../../../Firebase/index';
import { JumpalButton } from '../../CustomComponents/core';
import NewPersonalBestModal from './NewPersonalBestModal';
import ReactLoading from 'react-loading';
import Modal from '@mui/material/Modal';

import { StyledHeaderTableCell, StyledTableCell, StyledTableRow, StyledTableContainer } from '../../CustomComponents/table';
import Table from '@mui/material/Table';
import TableRow from '@mui/material/TableRow';

class PersonalBests extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      loading: false,

      // Personal best data
      personalBests: [],

      // For new personal best modal
      openNewPersonalBest: false,
      newPersonalBestEvent: null,
      newPersonalBestScore: null,
      newPersonalBestTime: null,
      newPersonalBestEventColor: 'gray',
    }
    // Personal best data methods
    this.renderAllData = this.renderAllData.bind(this);
    this.renderTableHeader = this.renderTableHeader.bind(this);
    this.onPersonalBestsUpdate = this.onPersonalBestsUpdate.bind(this);
    this.handleDelete = this.handleDelete.bind(this);

    // Attach event listener to personal best data of current user
    this.ref = this.props.firebase.db.ref('users')
      .child(this.props.firebase.auth.currentUser.uid)
      .child('personal-bests');
    this.ref.on("value", this.onPersonalBestsUpdate);
  }

  async componentDidMount() {
    this.setState({ loading: true });
    // Get current user from firebase and save to state as user
    this.props.firebase.auth.onAuthStateChanged(async user => {
      if (user) {
        // Fetch personal best data associated to current user's uid and set as state
        let personalBests = [];
        let ref = this.props.firebase.user(user.uid).child('personal-bests');
        let snapshot = await ref.once('value');
        let value = snapshot.val();
        personalBests.push(value);
        this.setState({
          personalBests: personalBests,
          user: user,
          loading: false,
        })
      } else {
        // Prompts user to sign in
        alert("Please sign in to continue");
        this.setState({
          loading: false,
        })
      }
    });
  }

  componentWillUnmount() {
    // detach listeners personal best of current user when component unmounts
    this.ref.off();
  }

  onPersonalBestsUpdate(snapshot) {
    let personalBests = [];
    personalBests.push(snapshot.val())
    this.setState({
      personalBests: personalBests,
      isDataLoaded: true,
    })
  }

  handleDelete(event) {
    let result = window.confirm("Are you sure you want to delete?");
    if (this.props.firebase.auth.currentUser && result) {
      this.props.firebase.db.ref('users')
      .child(this.props.firebase.auth.currentUser.uid)
      .child('personal-bests')
      .child(event)
      .remove()
    }
  }

  renderTableHeader() {
    return (
      <TableRow>
        <StyledHeaderTableCell>Event</StyledHeaderTableCell>
        <StyledHeaderTableCell>Score</StyledHeaderTableCell>
        <StyledHeaderTableCell>Date</StyledHeaderTableCell>
        <StyledHeaderTableCell></StyledHeaderTableCell>
      </TableRow>
    );
  }

  renderAllData(records) {
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
              onClick={() => this.handleDelete(event)}
            >
              <i className="fa fa-trash-o" aria-hidden="true"></i>
            </button></StyledTableCell>
        </StyledTableRow>
      )
    });
  }

  render() {
    if (this.state.isDataLoaded) {
      if (this.state.personalBests && this.state.personalBests.length !== 0 && this.state.personalBests[0]){
        let records = this.state.personalBests;
        
        return (
          <div className="componentContentDiv">
            <NewPersonalBestModal />
            <h2>My Personal Bests</h2>
            <StyledTableContainer>
              <Table>
                  {this.renderTableHeader()}
                  {this.renderAllData(records)}
              </Table>
            </StyledTableContainer>
          </div>
        );
      } else {
        return (
          <div>
            <NewPersonalBestModal />
            <h2>My Personal Bests</h2>
              <p className="loading">Start by entering a new personal best record above.</p>
          </div>
        );
      }
    } else {
      return <ReactLoading type='spin' color='white' height={'5%'} width={'5%'} />;
    }
  }
}

export default withFirebase(PersonalBests);