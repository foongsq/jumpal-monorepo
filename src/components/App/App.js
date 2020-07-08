import React from 'react';
import { BrowserRouter as Router, Route} from 'react-router-dom';
import { withAuthentication } from '../Session';
import './App.css';

import Navigation from '../Navigation/Navigation';
import SignInPage from '../SignIn/SignIn';
import Profile from '../Profile/Profile';
import SignOut from '../SignOut/SignOut';
import Speed from '../Speed/Speed';
import Home from '../Calendar/Calendar';
import logo from "../../images/jumpal-logo.gif";

class App extends React.Component {
  render() {
    return (
        <div className="App">
          <div className="logoContainer">
            <img className="logo" src={logo}/>
          </div>
          <Router>
            <div className="navAndcontent">
              <Navigation />
              <div className="content">
                <Route path='/SignIn' component={SignInPage} />
                <Route path='/Home' component={Home}/>
                <Route path='/Speed' component={Speed}/>
                <Route path='/Freestyle' />
                <Route path='/Profile' component={Profile} />
                <Route path='/SignOut' component={SignOut} />
              </div>
            </div>
          </Router>
        </div>
    );
  }
}

export default withAuthentication(App);
