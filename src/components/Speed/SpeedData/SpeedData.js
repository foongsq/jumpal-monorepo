import React from 'react';
import './SpeedData.css';
import { withFirebase } from '../../../Firebase/index';
import { JumpalButton, JumpalSpinner } from '../../CustomComponents/core';

import { StyledHeaderTableCell, StyledTableCell, StyledTableRow, StyledTableContainer } from '../../CustomComponents/table';
import Table from '@mui/material/Table';
import TableRow from '@mui/material/TableRow';
import NewSpeedRecordModal from './NewSpeedRecordModal';

class SpeedData extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      loading: false,

      speedRecords: [],
      showToday: false,
    }

    // For rendering
    this.renderAllData = this.renderAllData.bind(this);
    this.renderTodayData = this.renderTodayData.bind(this);
    this.renderTableHeader = this.renderTableHeader.bind(this);
    this.showAll = this.showAll.bind(this);
    this.showToday = this.showToday.bind(this);

    // For data updates
    this.onSpeedDataUpdate = this.onSpeedDataUpdate.bind(this);
    this.handleDelete = this.handleDelete.bind(this);

    // Attach event listener to speed records of current user
    this.ref = this.props.firebase.db.ref('users')
      .child(this.props.firebase.auth.currentUser.uid)
      .child('speed-records');
    this.ref.on("value", this.onSpeedDataUpdate);
  }

  async componentDidMount() {
    this.setState({ loading: true });
    // Get current user from firebase and save to state as user
    this.props.firebase.auth.onAuthStateChanged(async user => {
      if (user) {
        // Fetch speed record data associated to current user's uid and set as state
        let speedRecords = [];
        let ref = this.props.firebase.user(this.props.firebase.auth.currentUser.uid).child('speed-records');
        let snapshot = await ref.once('value');
        let value = snapshot.val();
        speedRecords.push(value);
        this.setState({
          speedRecords: speedRecords,
          user: user,
          loading: false,
        });
      } else {
        // Prompts user to sign in
        alert("Please sign in to continue");
        this.setState({ loading: false });
      }
    });
  }

   // This method updates the state with new speed record data when data in database is updated.
  onSpeedDataUpdate(snapshot) {
    this.setState({ loading: true });
    let speedRecords = [];
    speedRecords.push(snapshot.val())
    this.setState({
      speedRecords: speedRecords,
      loading: false,
    })
  }

  componentWillUnmount() {
    // detach listeners to speed records of current user when component unmounts
    this.ref.off();
  }

  handleDelete(event, score, time) {
    let dd = String(new Date(time).getDate()).padStart(2, '0');
    let mm = String(new Date(time).getMonth() + 1).padStart(2, '0'); //January is 0!
    let yyyy = new Date(time).getFullYear();
    let date = `${yyyy}/${mm}/${dd}`;
    let result = window.confirm("Are you sure you want to delete?");
    if (this.state.user && result) {
      this.props.firebase.db.ref('users')
      .child(this.state.user.uid)
      .child('speed-records')
      .child(date)
      .once('value', snapshot => {
        snapshot.forEach(child => {
          if (child.val().event === event &&
            child.val().score === score &&
            child.val().time === time) {
            child.ref.remove();
          }
        })
      })
    }
  }

  showToday() {
    this.setState({ showToday: true })
  }

  showAll() {
    this.setState({ showToday: false })
  }

  renderTableHeader() {
    return (
      <TableRow>
        <StyledHeaderTableCell>Event</StyledHeaderTableCell>
        <StyledHeaderTableCell>Score</StyledHeaderTableCell>
        <StyledHeaderTableCell>Time</StyledHeaderTableCell>
        <StyledHeaderTableCell></StyledHeaderTableCell>
      </TableRow>
    );
  }

  renderAllData(records) {
      return records.reverse().map(record => {
        const { event, score, time } = record //destructuring
        return (
          <StyledTableRow key={time}>
            <StyledTableCell>{event}</StyledTableCell>
            <StyledTableCell>{score}</StyledTableCell>
            <StyledTableCell>{time}</StyledTableCell>
            <StyledTableCell>
              <button 
                className="jumpalTableDeleteButton" 
                onClick={() => this.handleDelete(event, score, time)}
              >
                <i className="fa fa-trash-o" aria-hidden="true"></i>
              </button></StyledTableCell>
          </StyledTableRow>
        )
      });
  }

  renderTodayData(records) {
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
              onClick={() => this.handleDelete(event, score, time)}
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
  parseTime(records) {
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

  render() {
    if (this.state.loading) {
      return <JumpalSpinner />;
    } else {
      if (this.state.speedRecords && this.state.speedRecords.length !== 0 && this.state.speedRecords[0]){
        let parsedRecords = this.parseTime(this.state.speedRecords);
        console.log("records", this.state.speedRecords);
        console.log("parsedRecords", parsedRecords);
        return (
          <div className="componentContentDiv">
            <NewSpeedRecordModal />
            <div className="titleAndButtonDiv">
              <h2>My Speed Records</h2>
              {this.state.showToday ? 
                <JumpalButton onClick={this.showAll} className="button">
                  <i class="fa fa-smile-o" aria-hidden="true"></i>
                  All data
                </JumpalButton> 
                :
                <JumpalButton variant="success" onClick={this.showToday} className="button">
                  <i class="fa fa-smile-o" aria-hidden="true"></i>
                  Today
                </JumpalButton> }             
            </div>
            <StyledTableContainer>
              <Table>
                  {this.renderTableHeader()}
                  {this.state.showToday ? this.renderTodayData(parsedRecords) : this.renderAllData(parsedRecords)}
              </Table>
            </StyledTableContainer>
          </div>
        );
      } else {
        return (<div>
            <p className="loading">Start by entering a new speed record above.</p>
          </div>);
      }
    }
  }
}

export default withFirebase(SpeedData);