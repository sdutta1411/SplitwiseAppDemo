import React from 'react';
import { AppBar, Tabs, Tab, createMuiTheme, ThemeProvider, IconButton, Menu, MenuItem, Drawer, List, ListItem, Divider, Button } from '@material-ui/core';
import { AccountCircle, Menu as MenuIcon } from '@material-ui/icons';
import { Switch, Route, Link } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';

import Navbar from './components/navbar';
import Auth from './components/login';
import SignUp from './components/signUp';
import Logout from './components/logout';
import Profile from './components/userProfile';
import Home from './components/home';

const theme = createMuiTheme({
  palette: {
    primary: {
      light: "#6fbf73",
      main: "#4caf50",
      dark: "#357a38",
      contrastText: "#fff"
    },
    secondary: {
      light: "#fafafa",
      main: "#f5f5f5",
      dark: "#e0e0e0",
      contrastText: "#9e9e9e"
    }
  }
})

function App() {
  return (
    <div>
      <ThemeProvider theme={theme}>
        <Navbar />
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/login">
            <Auth />
          </Route>
          <Route exact path="/logout">
            <Logout />
          </Route>
          <Route path="/signup">
            <SignUp />
          </Route>
          <Route path="/userProfile">
            <Profile />
          </Route>
        </Switch>
      </ThemeProvider>
    </div>
  );
}

export default App;
