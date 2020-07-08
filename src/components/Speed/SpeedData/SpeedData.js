import React from 'react';
import './SpeedData.css';
import { AuthUserContext } from '../../Session';
import { withFirebase } from '../../../Firebase/index';

const SpeedData = () => (
  <AuthUserContext.Consumer>
    {authUser => {
    return <SpeedDataBase user={authUser}/>}}
  </AuthUserContext.Consumer>
);

class SpeedDataBase extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      speedRecords: [],
      isDataLoaded: false
    }
    this.readData = this.readData.bind(this);
    this.renderTableData = this.renderTableData.bind(this);
    this.renderTableHeader = this.renderTableHeader.bind(this);
  }

  readData() {
    let speedRecords = [];
    if (this.props.user) {
      let ref = this.props.firebase.user(this.props.user.uid).child('speed-records');
      console.log('ref', ref)
      ref.on('value', function(snapshot) {
        console.log('snapshot', snapshot)
        speedRecords.push(snapshot.val());
      });
    
      this.setState({
        speedRecords: speedRecords,
        isDataLoaded: true
      })
    }
  }

  renderTableData(records) {
    let descRecords = records.reverse();
    console.log('descRecords', descRecords);
    return descRecords.map((record, key) => {
       const { event, score, time } = record //destructuring
       return (
          <tr id={key}>
             <td>{event}</td>
             <td>{score}</td>
             <td>{time}</td>
          </tr>
       )
    })
 }

 renderTableHeader(records) {
  let header = Object.keys(records[0])
  return header.map((key, index) => {
     return <th key={index}>{key.toUpperCase()}</th>
  })
}

  render() {
    if (this.state.isDataLoaded && this.state.speedRecords) {
      console.log('this.state.speedRecords', this.state.speedRecords)
      if(this.state.speedRecords[0]){
        let records = Object.values(this.state.speedRecords[0]);
        return (
          <div>
            <div className="title-refresh-div">
              <h2>My Speed Records</h2>
              <button onClick={this.readData} className="refresh-button"><i className="fa fa-refresh"></i>Refresh speed data</button>
            </div>
            <table className="speedData-table">
              <tbody>
                <tr>{this.renderTableHeader(records)}</tr>
                {this.renderTableData(records)}
              </tbody>
            </table>
          </div>
        );
      } else {
        return (<div>
            <p className="loading">this.state.speedRecords[0] not loaded yet</p>
            <button onClick={this.readData} className="refresh-button"><i className="fa fa-refresh"></i>Refresh speed data</button>
          </div>);
      }
    } else {
      return (<div>
          <p className="loading">Data not loaded or speed records empty</p>
          <button onClick={this.readData} className="refresh-button"><i className="fa fa-refresh"></i>Refresh speed data</button>
        </div>);
    }
  }
}

export default withFirebase(SpeedDataBase);
export {SpeedData};