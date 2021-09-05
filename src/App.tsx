import './App.scss';

import { ThemeProvider } from '@material-ui/core';
import green from '@material-ui/core/colors/green';
import purple from '@material-ui/core/colors/purple';
import { createTheme } from '@material-ui/core/styles';
import React from 'react';
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';

import About from './modules/about/About';
import AlarmPage from './modules/alarm';
import Home from './modules/home/Home';

const theme = createTheme({
  palette: {
    primary: {
      main: purple[500],
    },
    secondary: {
      main: green[500],
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <div>
          <nav>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/alarm">Alarm</Link>
              </li>
              <li>
                <Link to="/about">About</Link>
              </li>
            </ul>
          </nav>

          {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
          <Switch>
            <Route path="/alarm">
              <AlarmPage />
            </Route>
            <Route path="/about">
              <About title={'Sandbox'} version={'1.0.0'} />
            </Route>
            <Route path="/">
              <Home />
            </Route>
          </Switch>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
