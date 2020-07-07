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
    return (
      <div className="speed">
        <NewSpeedRecord user={this.props.user} />
        <SpeedData user={this.props.user} />
      </div>
    );
  }
}

export default Speed;