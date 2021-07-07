import React from 'react';
import { withFirebase } from '../../Firebase/index';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import logo from "../../images/jumpal-logo.png";


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
      <Navbar bg="light" expand="lg">
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
    );
  }
}

export default withFirebase(Navigation);