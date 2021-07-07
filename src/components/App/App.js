import React from 'react';
import { BrowserRouter as Router, Route, Redirect} from 'react-router-dom';
import { withAuthentication } from '../Session';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import Navigation from '../Navigation/Navigation';
import SignInPage from '../SignIn/SignIn';
import Profile from '../Profile/Profile';
import SignOut from '../SignOut/SignOut';
import Speed from '../Speed/Speed';
import TimingTracks from '../Speed/TimingTracks/TimingTracks';
import Counter from '../Speed/Counter/Counter';
import SpeedData from '../Speed/SpeedData/SpeedData';
import PersonalBests from '../Speed/PersonalBests/PersonalBests';
import Freestyle from '../Freestyle/Freestyle';
import Home from '../Home/Home';

class App extends React.Component {
  render() {
    return (
        <div className="app">
          <Router>
            <div className="navAndcontent">
              <Navigation />
              <div className="content">
                <Route exact path="/"><Redirect to="/Home" /></Route>
                <Route path='/signin' component={SignInPage} />
                <Route path='/home' component={Home} />
                <Route path='/speed' component={Speed}/>
                <Route path='/freestyle' component={Freestyle} />
                <Route path='/profile' component={Profile} />
                <Route path='/signout' component={SignOut} />
                <Route path='/speed/TimingTracks' component={TimingTracks} />
                <Route path='/speed/Counter' component={Counter} />
                <Route path='/speed/speeddata' component={SpeedData} />
                <Route path='/speed/personalbests' component={PersonalBests} />
              </div>
            </div>
          </Router>
        </div>
    );
  }
}

export default withAuthentication(App);
