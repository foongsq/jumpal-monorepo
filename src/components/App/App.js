import React from 'react';
import { BrowserRouter as Router, Route, Redirect} from 'react-router-dom';
import routes from '../../routes/routes';
import { withAuthentication } from '../Session';
import './App.css';
import './JumpalTableStyles.css';
import './JumpalFormStyles.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import { ThemeProvider } from '@mui/material/styles';
import theme from '../../styles/theme';

import Navigation from '../Navigation/Navigation';
import SignInPage from '../Profile/SignIn/SignIn';
import Profile from '../Profile/Profile';
import SignOut from '../Profile/SignOut/SignOut';
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
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <ThemeProvider theme={theme}>
              <Router>
                <div className="navAndcontent">
                  <Navigation />
                  <div className="content">
                    <Route exact path={routes.LANDING}><Redirect to={routes.HOME} /></Route>
                    <Route path={routes.HOME} component={Home} />
                    <Route path={routes.SPEED} component={Speed}/>
                    <Route path={routes.TIMINGTRACKS} component={TimingTracks} />
                    <Route path={routes.COUNTER} component={Counter} />
                    <Route path={routes.SPEEDDATA} component={SpeedData} />
                    <Route path={routes.PERSONALBESTS} component={PersonalBests} />
                    <Route path={routes.FREESTYLE} component={Freestyle} />
                    <Route path={routes.PROFILE} component={Profile} />
                    <Route path={routes.SIGNIN} component={SignInPage} />
                    <Route path={routes.SIGNOUT} component={SignOut} />
                  </div>
                </div>
              </Router>
            </ThemeProvider>
          </LocalizationProvider>
        </div>
    );
  }
}

export default withAuthentication(App);
