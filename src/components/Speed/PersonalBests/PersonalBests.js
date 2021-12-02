import React from 'react';
import { withFirebase } from '../../../Firebase/index';
import JumpalButton from '../../CustomComponents/core';
import { StyledHeaderTableCell, StyledTableCell, StyledTableRow } from '../../CustomComponents/table';
import ReactLoading from 'react-loading';
// import Table from 'react-bootstrap/Table';
import Button from '@material-ui/core/Button';
import Modal from "react-bootstrap/Modal";
import DateTime from 'react-datetime';
import Select from 'react-select';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];

const options = [
  { value: '1x30sec Running Step', label: '1x30sec Running Step' },
  { value: '1x60sec Running Step', label: '1x60sec Running Step' },
  { value: '1x30sec Double Unders', label: '1x30sec Double Unders' },
  { value: '1x60sec Double Unders', label: '1x60sec Double Unders' },
  { value: '1x180sec Running Step', label: '1x180sec Running Step' },
  { value: '1x240sec Running Step', label: '1x240sec Running Step' },
  { value: 'Consecutive Triple Unders', label: 'Consecutive Triple Unders' },
  { value: '2x30sec Double Unders', label: '2x30sec Double Unders' },
  { value: '4x30sec Speed Relay', label: '4x30sec Speed Relay' },
];

class PersonalBests extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // Personal best data
      personalBests: [],
      isDataLoaded: false,

      // For new personal best modal
      openNewPersonalBest: false,
      newPersonalBestEvent: null,
      newPersonalBestScore: null,
      newPersonalBestTime: null,
      newPersonalBestEventColor: 'gray',
    }
    // Personal best data methods
    // this.readData = this.readData.bind(this);
    this.renderAllData = this.renderAllData.bind(this);
    this.renderTableHeader = this.renderTableHeader.bind(this);
    this.onPersonalBestsUpdate = this.onPersonalBestsUpdate.bind(this);
    this.toggleNewPersonalBest = this.toggleNewPersonalBest.bind(this);
    this.handleDelete = this.handleDelete.bind(this);

    // New personal best modal methods
    this.saveNewPersonalBest = this.saveNewPersonalBest.bind(this);
    this.handleEventChange = this.handleEventChange.bind(this);
    this.handleScoreChange = this.handleScoreChange.bind(this);
    this.handleTimeChange = this.handleTimeChange.bind(this);
    this.timeStamp = this.timeStamp.bind(this);

    this.ref = this.props.firebase.db.ref('users')
      .child(this.props.firebase.auth.currentUser.uid)
      .child('personal-bests');
    this.ref.on("value", this.onPersonalBestsUpdate);
  }

  componentWillUnmount() {
    // detach all listeners to this reference when component unmounts (very important!)
    this.ref.off();
  }

  toggleNewPersonalBest() {
    this.setState({
      openNewPersonalBest: !this.state.openNewPersonalBest,
      newPersonalBestTime: new Date(),
    })
  }

  onPersonalBestsUpdate(snapshot) {
    let personalBests = [];
    personalBests.push(snapshot.val())
    this.setState({
      personalBests: personalBests,
      isDataLoaded: true,
    })
  }

  // async readData() {
  //   let speedRecords = [];
  //   if (this.props.firebase.auth.currentUser) {
  //     let ref = this.props.firebase.user(this.props.firebase.auth.currentUser.uid).child('speed-records');
  //     let snapshot = await ref.once('value');
  //     let value = snapshot.val();
  //     speedRecords.push(value);
  //     console.log('speedRecords', speedRecords)
  //     this.setState({
  //       speedRecords: speedRecords,
  //       isDataLoaded: true
  //     })
  //   }
  // }

  async componentDidMount() {
    let personalBests = [];
    if (this.props.firebase.auth.currentUser) {
      let ref = this.props.firebase.user(this.props.firebase.auth.currentUser.uid).child('personal-bests');
      let snapshot = await ref.once('value');
      let value = snapshot.val();
      personalBests.push(value);
      this.setState({
        personalBests: personalBests,
        isDataLoaded: true
      })
    }
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

  // New personal best modal methods
  handleEventChange(event) {
    this.setState({ 
      newPersonalBestEvent: event,
      newPersonalBestEventColor: '#383838',
     });

  }

  handleScoreChange(event) {
    this.setState({ newPersonalBestScore: event.target.value });
  }

  handleTimeChange(time) {
    this.setState({ newPersonalBestTime: time });
  } 

  timeStamp(time) {
    time = new Date(time)
    // Create an array with the current month, day and time
    let date = [ time.getMonth() + 1, time.getDate(), time.getFullYear() ];

    // Return the formatted string
    return date.join("/");
  }

  saveNewPersonalBest(event) {
    event.preventDefault();
    this.props.firebase.db.ref('users')
    .child(this.props.firebase.auth.currentUser.uid)
    .child('personal-bests')
    .child(this.state.newPersonalBestEvent.value)
    .set({
      score: this.state.newPersonalBestScore,
      time: this.timeStamp(this.state.newPersonalBestTime),
    });
    
    window.alert('New Personal Best saved successfully!');
    this.toggleNewPersonalBest();
  }

  renderNewPersonalBestModal() {
    return (
      <>
        <div className="jumpalCenteredButton">
          <JumpalButton onClick={this.toggleNewPersonalBest}>
            Add New Personal Best
          </JumpalButton>
        </div>
  
        <Modal 
          show={this.state.openNewPersonalBest} 
          onHide={this.toggleNewPersonalBest}
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title>New Personal Best</Modal.Title>
          </Modal.Header>
          <form className="jumpalForm" ref={(el) => this.PbFormRef = el}>
            <div>
              {/* Time Input */}
              <label>Time: 
                <br />
                <DateTime
                  onChange={this.handleTimeChange} 
                  value={this.state.newPersonalBestTime}
                  timeFormat={false}
                />
              </label>
              {/* Event Input */}
              <label>Event: 
                <Select  
                  value={this.state.newPersonalBestEvent} 
                  onChange={this.handleEventChange} 
                  options={options}
                />
              </label>

              {/* Score Input */}
              <label>
                Score:
                <input 
                  className="jumpalInput" 
                  type="number" 
                  min="0" 
                  placeholder="Enter your speed score" 
                  onChange={this.handleScoreChange}>
                  </input>
              </label>
            </div>
          </form>
          <Modal.Footer>
            {this.props.firebase.auth.currentUser 
                ? <Button variant="success" onClick={this.saveNewPersonalBest}>Save</Button>
                : <Button variant="success" onClick={this.saveNewPersonalBest} disabled>Save</Button>
            }
          </Modal.Footer>
        </Modal>
      </>
    );
  }

  renderAllData(records) {
    let eventsArr = Object.keys(records[0]);
    return eventsArr.map(event => {
      return (
        <tr>
          <td>{event}</td>
          <td>{records[0][event].score}</td>
          <td>{records[0][event].time}</td>
          <td className="jumpalTableDeleteButtonCell">
            <button 
              className="jumpalTableDeleteButton" 
              onClick={() => this.handleDelete(event)}
            >
              <i className="fa fa-trash-o" aria-hidden="true"></i>
            </button>
          </td>
        </tr>
      )
    });
  }

  renderTableHeader() {
    return (
      <tr>
        <td>Event</td>
        <td>Score</td>
        <td>Date</td>
        <td></td>
      </tr>
    );
  }

  render() {
    if (this.state.isDataLoaded) {
      if (this.state.personalBests && this.state.personalBests.length !== 0 && this.state.personalBests[0]){
        let records = this.state.personalBests;
        
        return (
          <div className="componentContentDiv">
            {this.renderNewPersonalBestModal()}
            <h2>My Personal Bests</h2>
            <TableContainer component={Paper}>
              <Table aria-label="customized table">
                <TableHead>
                  <TableRow>
                    <StyledHeaderTableCell>Dessert (100g serving)</StyledHeaderTableCell>
                    <StyledTableCell align="right">Calories</StyledTableCell>
                    <StyledTableCell align="right">Fat&nbsp;(g)</StyledTableCell>
                    <StyledTableCell align="right">Carbs&nbsp;(g)</StyledTableCell>
                    <StyledTableCell align="right">Protein&nbsp;(g)</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map((row) => (
                    <StyledTableRow key={row.name}>
                      <StyledTableCell component="th" scope="row">
                        {row.name}
                      </StyledTableCell>
                      <StyledTableCell align="right">{row.calories}</StyledTableCell>
                      <StyledTableCell align="right">{row.fat}</StyledTableCell>
                      <StyledTableCell align="right">{row.carbs}</StyledTableCell>
                      <StyledTableCell align="right">{row.protein}</StyledTableCell>
                    </StyledTableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>        
            <Table striped bordered className="jumpalTable">
              <tbody>
                {this.renderTableHeader()}
                {this.renderAllData(records)}
              </tbody>
            </Table>
          </div>
        );
      } else {
        return (
          <div>
            {this.renderNewPersonalBestModal()}
            <h2>My Personal Bests</h2>
              <p className="loading">Start by entering a new personal best record above.</p>
              {/* <button onClick={this.readData} className="button"><i className="fa fa-refresh"></i>Refresh speed data</button> */}
          </div>
        );
      }
    } else {
      return <ReactLoading type='spin' color='white' height={'5%'} width={'5%'} />;
    }
  }
}

export default withFirebase(PersonalBests);