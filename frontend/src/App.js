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

function App() {
  return (
    <div>
      <Navbar />
      <Switch>
        <Route exact path="/login">
          <Auth />
        </Route>
        <Route exact path="/logout">
          <Logout />
        </Route>
        <Route path="/signup">
              <SignUp />
        </Route>
      </Switch>
    </div>
  );
}



export default App;
