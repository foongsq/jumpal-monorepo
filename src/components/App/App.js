import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
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

function App() {
  return (
    <div className="app">
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <ThemeProvider theme={theme}>
          <Router>
            <div className="navAndcontent">
              <Navigation />
              <div className="content">
                <Routes>
                  <Route exact path={routes.LANDING} element={<Navigate to={routes.HOME} />}></Route>
                  <Route path={routes.HOME} element={<Home />} />
                  <Route path={routes.SPEED} element={<Speed />}/>
                  <Route path={routes.TIMINGTRACKS} element={<TimingTracks />} />
                  <Route path={routes.COUNTER} element={<Counter />} />
                  <Route path={routes.SPEEDDATA} element={<SpeedData />} />
                  <Route path={routes.PERSONALBESTS} element={<PersonalBests />} />
                  <Route path={routes.FREESTYLE} element={<Freestyle />} />
                  <Route path={routes.PROFILE} element={<Profile />} />
                  <Route path={routes.SIGNIN} element={<SignInPage />} />
                  <Route path={routes.SIGNOUT} element={<SignOut />} />
                </Routes>
              </div>
            </div>
          </Router>
        </ThemeProvider>
      </LocalizationProvider>
    </div>
  );
}

export default withAuthentication(App);
