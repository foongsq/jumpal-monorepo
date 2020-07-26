import React from 'react';
import './SpeedData.css';
import { withFirebase } from '../../../Firebase/index';
import ReactLoading from 'react-loading';

class SpeedData extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      speedRecords: [],
      isDataLoaded: false,
      showToday: false
    }
    // this.readData = this.readData.bind(this);
    this.renderAllData = this.renderAllData.bind(this);
    this.renderTodayData = this.renderTodayData.bind(this);
    this.renderTableHeader = this.renderTableHeader.bind(this);
    this.showAll = this.showAll.bind(this);
    this.showToday = this.showToday.bind(this);
    this.onSpeedDataUpdate = this.onSpeedDataUpdate.bind(this);

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

  showToday() {
    this.setState({ showToday: true })
  }

  showAll() {
    this.setState({ showToday: false })
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
     <th>Event</th>
     <th>Score</th>
     <th>Time</th>
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
            <div className="title-refresh-div">
              <h2>My Speed Records</h2>
              <div className="buttons-div">
                {/* <button onClick={this.readData} className="button">
                  <i className="fa fa-refresh"></i>Refresh speed data
                  </button> */}
                {this.state.showToday ? <button onClick={this.showAll} className="button"><i class="fa fa-smile-o" aria-hidden="true"></i>All data</button> :
                  <button onClick={this.showToday} className="button"><i class="fa fa-smile-o" aria-hidden="true"></i>Today</button> }
              </div>              
            </div>
            <table className="speedData-table">
              <tbody>
                {this.renderTableHeader()}
                {this.state.showToday ? this.renderTodayData(consolidated) : this.renderAllData(consolidated)}
              </tbody>
            </table>
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