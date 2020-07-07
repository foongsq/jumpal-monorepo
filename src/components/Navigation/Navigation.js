import React from 'react';
import { Link } from 'react-router-dom';
import { AuthUserContext } from '../Session';
import './Navigation.css';
 
const Navigation = () => (
  <div>
    <AuthUserContext.Consumer>
      {authUser =>
        authUser ? <NavigationAuth /> : <NavigationNonAuth />
      }
    </AuthUserContext.Consumer>
  </div>
);

const NavigationAuth = () => (
  <div className="navA">
    <ul>
      <li>
        <Link to='/Home'>Home</Link>
      </li>
      <li>
        <Link to='/Speed'>Speed</Link>
      </li>
      <li>
        <Link to='/Freestyle'>Freestyle</Link>
      </li>
      <li>
        <Link to='/Admin'>Admin</Link>
      </li>
      <li>
        <Link to='/Profile'>Profile</Link>
      </li>
      <li>
        <Link to='/SignOut'>Sign Out</Link>
      </li>
    </ul>
  </div>
);

const NavigationNonAuth = () => (
  <div className="navNA">
    <ul>
      <li>
        <Link to='/SignIn'>SignIn</Link>
      </li>
      <li>
        <Link to='/Home'>Home</Link>
      </li>
      <li>
        <Link to='/Speed'>Speed</Link>
      </li>
      <li>
        <Link to='/Freestyle'>Freestyle</Link>
      </li>
    </ul>
  </div>
);

export default Navigation;