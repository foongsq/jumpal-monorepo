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
import { useAuth } from './hooks';
import { useNavigate } from 'react-router-dom';
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  MenuItem,
  Container,
  Button,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { ToastProvider } from './components/JumpalToast';
import { ConfirmProvider } from './components/JumpalConfirm';

function App() {
  const [user, loading] = useAuth();

  return (
    <div className="app">
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <ThemeProvider theme={theme}>
          <ToastProvider>
            <ConfirmProvider>
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
            </ConfirmProvider>
          </ToastProvider>
        </ThemeProvider>
      </LocalizationProvider>
    </div>
  );
}

export default App;

const pages = [routes.HOME, routes.SPEED, routes.FREESTYLE, routes.PROFILE];

const mapPageName = (page) => {
  switch (page) {
    case routes.HOME:
      return 'Home';
    case routes.SPEED:
      return 'Speed';
    case routes.FREESTYLE:
      return 'Freestyle';
    case routes.PROFILE:
      return 'Profile';
  }
};

const Navigation = () => {
  const navigate = useNavigate();
  const [anchorElNav, setAnchorElNav] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleNavigate = (page) => {
    navigate(page);
    handleCloseNavMenu();
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={() => handleNavigate(page)}>
                  <Typography textAlign="center">
                    {mapPageName(page)}
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={() => handleNavigate(page)}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {mapPageName(page)}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
