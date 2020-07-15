import React from 'react';
import { Link } from 'react-router-dom';
import { AuthUserContext } from '../Session';
import './Navigation.css';
import NavMenu from './NavigationMenu';
 
const Navigation = () => (
  <div>
    <AuthUserContext.Consumer>
      {authUser => <NavBase user={authUser}/>}
    </AuthUserContext.Consumer>
  </div>
);

const NavBase = (props) => (
  <div className="navA">
    <ul>
      <li>
        <Link to='/Home'>Home</Link>
      </li>
      <li>
        <Link to='/Calendar'>Calendar</Link>
      </li>
      <li>
        <Link to='/Speed'>Speed</Link>
      </li>
      <li>
        <Link to='/Freestyle'>Freestyle</Link>
      </li>
      <li>
        <Link to='/Profile'>Profile</Link>
      </li>
    </ul>
    <NavMenu className="navMenuButton" user={props.authUser}/>
  </div>
);


export default Navigation;