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
    };
    
    this.showMenu = this.showMenu.bind(this);
    this.closeMenu = this.closeMenu.bind(this);
  }
  
  showMenu(event) {
    event.preventDefault();
    
    this.setState({ showMenu: true }, () => {
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
          <img className="smallLogo" src={logo}/>
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
                <Link to='/Home'><i class="fa fa-home" aria-hidden="true"></i>Home</Link>
                <Link to='/Calendar'><i class="fa fa-calendar" aria-hidden="true"></i>Calendar</Link>
                <Link to='/Speed'><i class="fa fa-bolt" aria-hidden="true"></i>Speed</Link>
                <Link to='/Freestyle'><i class="fa fa-heartbeat" aria-hidden="true"></i>Freestyle</Link>
                <Link to='/Profile'><i class="fa fa-user" aria-hidden="true"></i>Profile</Link>
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