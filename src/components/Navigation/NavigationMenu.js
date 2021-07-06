import React from 'react';
import './NavigationMenu.css';
import { withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';
import logo from "../../images/jumpal-logo.gif";

class NavMenu extends React.Component {
  constructor() {
    super();
    
    this.state = {
      showMenu: false,
      current: window.location.pathname,
      color: '#ffe270'
    };
    
    this.showMenu = this.showMenu.bind(this);
    this.closeMenu = this.closeMenu.bind(this);
  }
  
  showMenu(event) {
    event.preventDefault();
    
    this.setState({ 
      showMenu: true,
      path: window.location.pathname,
     }, () => {
      document.addEventListener('click', this.closeMenu);
    });
  }
  
  closeMenu(event) {
    this.setState({ showMenu: false }, () => {
      document.removeEventListener('click', this.closeMenu);
    });  
  }

  render() {
    return (
      <div className="navMenu">
        <div className="button-and-logo">
          <button onClick={this.showMenu}>
            <i className="fa fa-bars" style={{fontSize: '40px', color: '#38c4ff'}}></i>
          </button>
          <img className="smallLogo" alt='Logo' src={logo}/>
        </div>
        {
          this.state.showMenu
            ? (
              <div
                className="menu"
                ref={(element) => {
                  this.dropdownMenu = element;
                }}
              >
                <Link to='/Home'  style={this.state.current === '/Home' 
                  ? { color: this.state.color} : {color:'white'}} 
                  onClick={() => {this.setState({ current: '/Home'})}}><i class="fa fa-home" aria-hidden="true"></i>Home</Link>
                {/* <Link to='/Calendar'><i class="fa fa-calendar" aria-hidden="true"></i>Calendar</Link> */}
                
                <Link to='/Speed' style={this.state.current === '/Speed' 
                  ? { color: this.state.color} : {color:'white'}} 
                  onClick={() => {this.setState({ current: '/Speed'})}}><i class="fa fa-bolt" aria-hidden="true"></i>Speed</Link>
                
                <Link to='/Freestyle' style={this.state.current === '/Freestyle' 
                  ? { color: this.state.color} : {color:'white'}} 
                  onClick={() => {this.setState({ current: '/Freestyle'})}}><i class="fa fa-heartbeat" aria-hidden="true"></i>Freestyle</Link>
                
                <Link to='/Profile' style={this.state.current === '/Profile' 
                  ? { color: this.state.color} : {color:'white'}} 
                  onClick={() => {this.setState({ current: '/Profile'})}}><i class="fa fa-user" aria-hidden="true"></i>Profile</Link>
              </div>
            )
            : (
              null
            )
        }
      </div>
    );
  }
}

export default withRouter(NavMenu);