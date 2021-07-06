import React from 'react';
import './PersonalBests.css';
import { withFirebase } from '../../../Firebase/index';
import ReactLoading from 'react-loading';
import NewPersonalBest from './NewPersonalBest';
import Button from 'react-bootstrap/Button';

class PersonalBests extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      personalBests: [],
      isDataLoaded: false,
      openNewPersonalBest: false,
    }
    // this.readData = this.readData.bind(this);
    this.renderAllData = this.renderAllData.bind(this);
    this.renderTableHeader = this.renderTableHeader.bind(this);
    this.onPersonalBestsUpdate = this.onPersonalBestsUpdate.bind(this);
    this.toggleNewPersonalBest = this.toggleNewPersonalBest.bind(this);
    this.handleDelete = this.handleDelete.bind(this);

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

  renderAllData(records) {
    console.log(records)
    let eventsArr = Object.keys(records[0]);
    return eventsArr.map(event => {
      console.log(records)
      return (
          <tr className="tableData">
            <td>{event}</td>
            <td>{records[0][event].score}</td>
            <td>{records[0][event].time}</td>
            <td id='delete-cell'><button className="delete" onClick={() => this.handleDelete(event)}><i class="fa fa-trash-o" aria-hidden="true"></i></button></td>
          </tr>
      )
    });
  }

 renderTableHeader() {
   return (
   <tr>
     <th>Event</th>
     <th>Score</th>
     <th>Time</th>
     <th></th>
   </tr>);
   
}

  render() {
    if (this.state.isDataLoaded) {
      if (this.state.personalBests && this.state.personalBests.length !== 0 && this.state.personalBests[0]){
        let records = this.state.personalBests;
        
        return (
          <div>
             {this.state.openNewPersonalBest 
                ? <div>
                    <button className="closeNewPersonalBest" onClick={this.toggleNewPersonalBest}>x</button>
                    <NewPersonalBest />
                  </div> 
                : <button className="addNewPersonalBest" onClick={this.toggleNewPersonalBest}>+ Add new personal best</button> }
            <div className="title-refresh-div">
           
              <h2>My Personal Bests</h2>
              <Button variant="primary">Primary</Button>{''}
              <div className="buttons-div">
                {/* <button onClick={this.readData} className="button">
                  <i className="fa fa-refresh"></i>Refresh speed data
                  </button> */}
              </div>              
            </div>
            <div className="speedTable-div">
              <table className="speedData-table">
                <tbody>
                  {this.renderTableHeader()}
                  {this.renderAllData(records)}
                </tbody>
              </table>
            </div>
          </div>
        );
      } else {
        return (<div>
          {this.state.openNewPersonalBest 
            ? <div className="newSpeedRecord-div">
                <button className="closeNewPersonalBest" onClick={this.toggleNewPersonalBest}>x</button>
                <NewPersonalBest />
              </div> 
            : <button className="addNewPersonalBest" onClick={this.toggleNewPersonalBest}>+ Add new personal best</button> }
          
          <h2>My Personal Bests</h2>
            <p className="loading">Start by entering a new personal best record above.</p>
            {/* <button onClick={this.readData} className="button"><i className="fa fa-refresh"></i>Refresh speed data</button> */}
          </div>);
      }
    } else {
      return <ReactLoading type='spin' color='white' height={'5%'} width={'5%'} />;
    }
  }
}

export default withFirebase(PersonalBests);