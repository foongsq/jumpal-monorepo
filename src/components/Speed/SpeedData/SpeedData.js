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
  }

  componentDidMount() {
    console.log(this.props)
    let speedRecords = [];
    if (this.props.user) {
      let ref = this.props.firebase.user(this.props.user.uid).child('speed-records');
      ref.orderByChild('time').on('child_added', function(snapshot) {
        console.log('snapshot', snapshot.val())
        speedRecords.push(snapshot.val());
      });
    
      console.log(speedRecords)
      this.setState({
        speedRecords: speedRecords,
        isDataLoaded: true
      })
    }
  }

  render() {
    if (this.state.isDataLoaded && this.state.speedRecords) {
      console.log(this.state.speedRecords)
      return (
        <div>
          <h2>My Speed Records</h2>
          {this.state.speedRecords.map(record => {
            return <p>{record.event} | {record.score} | {record.time.toString()}</p>
          })}
        </div>
      );
    } else {
      return <p>Waiting for data</p>
    }
  }
}

export default withFirebase(SpeedDataBase);
export {SpeedData};