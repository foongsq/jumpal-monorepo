import React from 'react';
import { Link } from 'react-router-dom';
import { withFirebase } from '../../Firebase/index';
import './Navigation.css';
import NavMenu from './NavigationMenu';
 


class Navigation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      current: '/Home',
      color: '#ffe270',
    }
  }
  render() {
    return (
      <div className="navA">
        <ul>
          <li>
            <Link to='/Home' style={this.state.current === '/Home' ? { color: this.state.color} : {color:'white'}} onClick={() => {this.setState({ current: '/Home'})}} ><i class="fa fa-home" aria-hidden="true"></i>Home</Link>
          </li>
          {/* <li>
            <Link to='/Calendar'>Calendar</Link>
          </li> */}
          <li>
            <Link to='/Speed' style={this.state.current === '/Speed' ? { color: this.state.color} : {color:'white'}} onClick={() => {this.setState({ current: '/Speed'})}}><i class="fa fa-bolt" aria-hidden="true"></i>Speed</Link>
          </li>
          <li>
            <Link to='/Freestyle' style={this.state.current === '/Freestyle' ? { color: this.state.color} : {color:'white'}} onClick={() => {this.setState({ current: '/Freestyle'})}}><i class="fa fa-heartbeat" aria-hidden="true"></i>Freestyle</Link>
          </li>
          <li>
            <Link to='/Profile' style={this.state.current === '/Profile' ? { color: this.state.color} : {color:'white'}} onClick={() => {this.setState({ current: '/Profile'})}}><i class="fa fa-user" aria-hidden="true"></i>Profile</Link>
          </li>
        </ul>
        <NavMenu className="navMenuButton" user={this.props.firebase.auth.currentUser}/>
      </div>
    );
  }
}

export default withFirebase(Navigation);