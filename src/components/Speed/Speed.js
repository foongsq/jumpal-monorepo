import React from 'react';
import { AuthUserContext } from '../Session';
import './Speed.css';
import NewSpeedRecord from './NewSpeedRecord/NewSpeedRecord';
import SpeedData from './SpeedData/SpeedData';

const Speed = () => (
  <AuthUserContext.Consumer>
    {authUser => {
    return <SpeedBase user={authUser}/>}}
  </AuthUserContext.Consumer>
);

class SpeedBase extends React.Component {
  render() {
    if(this.props.user) {
      return (
        <div className="speed">
          <NewSpeedRecord user={this.props.user} />
          <SpeedData user={this.props.user} />
        </div>
      );
    } else {
      return (
        <div className="speed">
          <NewSpeedRecord user={this.props.user} />
          <p style={{color: 'red'}}>Please sign in to save your speed data.</p>
        </div>
      );
    }
  }
}

export default Speed;