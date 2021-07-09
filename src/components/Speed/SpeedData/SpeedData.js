import React from 'react';
import './SpeedData.css';
import { withFirebase } from '../../../Firebase/index';
import ReactLoading from 'react-loading';
// import NewSpeedRecord from '../NewSpeedRecord/NewSpeedRecord';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Modal from "react-bootstrap/Modal";
import DateTime from 'react-datetime';
import Select from 'react-select';

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

class SpeedData extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      speedRecords: [],
      isDataLoaded: false,
      showToday: false,
      event: null,
      score: null,
      time: new Date(),
      color: 'gray',
      openNewSpeedRecord: false,
    }
    // this.readData = this.readData.bind(this);
    this.toggleNewSpeedRecord = this.toggleNewSpeedRecord.bind(this);
    this.renderAllData = this.renderAllData.bind(this);
    this.renderTodayData = this.renderTodayData.bind(this);
    this.renderTableHeader = this.renderTableHeader.bind(this);
    this.showAll = this.showAll.bind(this);
    this.showToday = this.showToday.bind(this);
    this.onSpeedDataUpdate = this.onSpeedDataUpdate.bind(this);
    this.handleDelete.bind(this);

    // New Speed Record methods
    this.saveSpeedRecord = this.saveSpeedRecord.bind(this);
    this.handleEventChange = this.handleEventChange.bind(this);
    this.handleScoreChange = this.handleScoreChange.bind(this);
    this.handleTimeChange = this.handleTimeChange.bind(this);
    this.timeStamp = this.timeStamp.bind(this);

    this.ref = this.props.firebase.db.ref('users')
      .child(this.props.firebase.auth.currentUser.uid)
      .child('speed-records');
    this.ref.on("value", this.onSpeedDataUpdate);
  }

  componentWillUnmount() {
    // detach all listeners to this reference when component unmounts (very important!)
    this.ref.off();
  }

  onSpeedDataUpdate(snapshot) {
    let speedRecords = [];
    speedRecords.push(snapshot.val())
    this.setState({
      speedRecords: speedRecords,
      isDataLoaded: true
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

  handleEventChange(event) {
    this.setState({ 
      event: event.value,
      color: '#383838',
     });

  }

  handleScoreChange(event) {
    this.setState({ score: event.target.value });
  }

  handleTimeChange(time) {
    this.setState({ time: time });
  } 

  timeStamp(time) {
    // Create an array with the current month, day and time
    let date = [ time.getMonth() + 1, time.getDate(), time.getFullYear() ];
    // Create an array with the current hour, minute and second
    let time2 = [ time.getHours(), time.getMinutes(), time.getSeconds() ];
    // Determine AM or PM suffix based on the hour
    let suffix = ( time2[0] < 12 ) ? "AM" : "PM";
    // Convert hour from military time
    time2[0] = ( time2[0] < 12 ) ? time2[0] : time2[0] - 12;
    // If hour is 0, set it to 12
    time2[0] = time2[0] || 12;
    // If minutes are less than 10, add a zero
    for ( let i = 1; i < 2; i++ ) {
      if ( time2[i] < 10 ) {
        time2[i] = "0" + time2[i];
      }
    }
    // Return the formatted string
    return date.join("/") + " " + time2.join(":") + " " + suffix;
  }

  saveSpeedRecord(event) {
    let today = this.state.time;
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    let yyyy = today.getFullYear();
    today = `${yyyy}/${mm}/${dd}`;

    this.props.firebase.user(this.props.firebase.auth.currentUser.uid)
    .child('speed-records')
    .child(`${today}`)
    .push({
      event: this.state.event, 
      score: this.state.score,
      time: this.timeStamp(this.state.time),
    });
    this.myFormRef.reset();
    event.preventDefault();
  }

  async componentDidMount() {
    let speedRecords = [];
    if (this.props.firebase.auth.currentUser) {
      let ref = this.props.firebase.user(this.props.firebase.auth.currentUser.uid).child('speed-records');
      let snapshot = await ref.once('value');
      let value = snapshot.val();
      speedRecords.push(value);
      this.setState({
        speedRecords: speedRecords,
        isDataLoaded: true
      })
    }
  }

  toggleNewSpeedRecord() {
    this.setState({openNewSpeedRecord: !this.state.openNewSpeedRecord});
  }

  handleDelete(event, score, time) {
    console.log(time);
    let dd = String(new Date(time).getDate()).padStart(2, '0');
    let mm = String(new Date(time).getMonth() + 1).padStart(2, '0'); //January is 0!
    let yyyy = new Date(time).getFullYear();
    let date = `${yyyy}/${mm}/${dd}`;
    let result = window.confirm("Are you sure you want to delete?");
    if (this.props.firebase.auth.currentUser && result) {
      this.props.firebase.db.ref('users')
      .child(this.props.firebase.auth.currentUser.uid)
      .child('speed-records')
      .child(date)
      .once('value', snapshot => {
        snapshot.forEach(child => {
          console.log(child.val())
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

  renderNewSpeedRecordModal() {
    return (
      <>
        <div className="jumpalCenteredButton">
          <Button variant="success" onClick={this.toggleNewSpeedRecord}>
            Add New Speed Record
          </Button>
        </div>
  
        <Modal 
          show={this.state.openNewSpeedRecord} 
          onHide={this.toggleNewSpeedRecord}
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title>New Speed Record</Modal.Title>
          </Modal.Header>
          <form className="jumpalForm" ref={(el) => this.myFormRef = el}>
            <div>
              {/* Time Input */}
              <label>Time: 
                <br />
                <DateTime
                  onChange={this.handleTimeChange} 
                  value={this.state.time}
                  timeFormat={false}
                />
              </label>
              {/* Event Input */}
              <label>Event: 
                <Select  
                  value={this.state.event} 
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
                ? <Button variant="success" onClick={this.saveSpeedRecord}>Save</Button>
                : <Button variant="success" onClick={this.saveSpeedRecord} disabled>Save</Button>
            }
          </Modal.Footer>
        </Modal>
      </>
    );
  }

  renderAllData(records) {
    console.log(records)
      return records.reverse().map(record => {
        const { event, score, time } = record //destructuring
        return (
            <tr>
              <td>{event}</td>
              <td>{score}</td>
              <td>{time}</td>
              <td className="jumpalTableDeleteButtonCell">
                <button 
                  className="jumpalTableDeleteButton" 
                  onClick={() => this.handleDelete(event, score, time)}
                >
                  <i className="fa fa-trash-o" aria-hidden="true"></i>
                </button>
              </td>
            </tr>
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
      console.log(splitTime[0])
      console.log(today)
      if (splitTime[0] === today) {
        return (
          <tr>
            <td>{event}</td>
            <td>{score}</td>
            <td>{time}</td>
          </tr>
        )
      } else { return null; } 
    });
  }

  renderTableHeader() {
   return (
   <tr>
     <td>Event</td>
     <td>Score</td>
     <td>Time</td>
     <td></td>
   </tr>);
  }

  render() {
    if (this.state.isDataLoaded) {
      if (this.state.speedRecords && this.state.speedRecords.length !== 0 && this.state.speedRecords[0]){
        let records = this.state.speedRecords;
        let years = Object.keys(records[0]);
        let consolidated = []
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
        
        return (
          <div>
           {this.renderNewSpeedRecordModal()}
            <div className="titleAndButtonDiv">
              <h2>My Speed Records</h2>
              {this.state.showToday ? 
                <Button variant="success" onClick={this.showAll} className="button">
                  <i class="fa fa-smile-o" aria-hidden="true"></i>
                  All data
                </Button> 
                :
                <Button variant="success" onClick={this.showToday} className="button">
                  <i class="fa fa-smile-o" aria-hidden="true"></i>
                  Today
                </Button> }             
            </div>
            <Table striped bordered className="jumpalTable">
              <tbody>
                {this.renderTableHeader()}
                {this.state.showToday ? this.renderTodayData(consolidated) : this.renderAllData(consolidated)}
              </tbody>
              </Table>
          </div>
        );
      } else {
        return (<div>
            <p className="loading">Start by entering a new speed record above.</p>
            {/* <button onClick={this.readData} className="button"><i className="fa fa-refresh"></i>Refresh speed data</button> */}
          </div>);
      }
    } else {
      return <ReactLoading type='spin' color='white' height={'5%'} width={'5%'} />;
    }
  }
}

export default withFirebase(SpeedData);