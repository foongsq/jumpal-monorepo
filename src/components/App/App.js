import React from 'react';
import { BrowserRouter as Router, Route, Redirect} from 'react-router-dom';
import { withAuthentication } from '../Session';
import './App.css';

import Navigation from '../Navigation/Navigation';
import SignInPage from '../SignIn/SignIn';
import Profile from '../Profile/Profile';
import SignOut from '../SignOut/SignOut';
import Speed from '../Speed/Speed';
import Calendar from '../Calendar/Calendar';
import Freestyle from '../Freestyle/Freestyle';
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
                <Route exact path="/"><Redirect to="/Home" /></Route>
                <Route path='/SignIn' component={SignInPage} />
                <Route path='/Home'/>
                <Route path='/Calendar' component={Calendar}/>
                <Route path='/Speed' component={Speed}/>
                <Route path='/Freestyle' component={Freestyle} />
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
