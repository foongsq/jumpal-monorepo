import React from 'react';
import { withFirebase } from '../../Firebase/index';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import logo from "../../images/jumpal-logo.png";
import './Navigation.css';

// Uses NavBar component from React Bootstrap library because
// Material UI library doesn't have the kind of navigation bar we want
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
      <div>
        <Navbar bg="light" expand="sm">
          <Navbar.Brand href="/Home"><img className="logo" src={logo} alt='Logo'/></Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link href="/Home">Home</Nav.Link>
              <Nav.Link href="/Speed">Speed</Nav.Link>
              <Nav.Link href="/Freestyle">Freestyle</Nav.Link>
              <Nav.Link href="/Profile">Profile</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </div>
    );
  }
}

export default withFirebase(Navigation);