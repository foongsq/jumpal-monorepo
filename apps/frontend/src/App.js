import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from 'react-router-dom';
import routes from './routes/routes';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import { ThemeProvider } from '@mui/material/styles';
import theme from './styles/theme';

import Navigation from './components/Navigation/Navigation';
import SignInPage from './pages/Profile/components/SignIn/SignIn';
import Profile from './pages/Profile/Profile';
import SignOut from './pages/Profile/components/SignOut/SignOut';
import Speed from './pages/Speed/Speed';
import TimingTracks from './pages/Speed/components/TimingTracks/TimingTracks';
import Counter from './pages/Speed/components/Counter/Counter';
import SpeedData from './pages/Speed/components/SpeedData/SpeedData';
import PersonalBests from
  './pages/Speed/components/PersonalBests/PersonalBests';
import Freestyle from './pages/Freestyle/Freestyle';
import Home from './pages/Home/Home';
import useAuth from './auth';

function App() {
  const [user, loading] = useAuth();

  return (
    <div className="app">
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <ThemeProvider theme={theme}>
          <Router>
            <div className="navAndcontent">
              <Navigation />
              <div className="content">
                <Routes>
                  <Route
                    exact path={routes.LANDING}
                    element={<Navigate to={
                      !loading && !user ? routes.PROFILE : routes.HOME}
                    />}
                  />
                  <Route path={routes.HOME} element={<Home />} />
                  <Route path={routes.SPEED} element={<Speed />}/>
                  <Route
                    path={routes.TIMINGTRACKS}
                    element={<TimingTracks />}
                  />
                  <Route path={routes.COUNTER} element={<Counter />} />
                  <Route path={routes.SPEEDDATA} element={<SpeedData />} />
                  <Route
                    path={routes.PERSONALBESTS}
                    element={<PersonalBests />}
                  />
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

export default App;