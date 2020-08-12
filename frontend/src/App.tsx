import React from 'react';

import {
  MuiThemeProvider,
} from '@material-ui/core';  
import {
  Router,
  Switch,
  Route,
} from "react-router-dom";
import createBrowserHistory from 'history/createBrowserHistory';
import * as H from 'history'

// import { ThemeProvider } from "@material-ui/styles"
import Home from "components/templates/Home"
import Tool from "components/templates/Tool"
import Misc from "components/templates/Misc"
import * as ga from "api/ga"

import theme from 'styles/theme'

const history: H.History = createBrowserHistory();
ga.bindHistoryListen(history)

const App: React.FC = () => {
  return (
    <MuiThemeProvider theme={theme}>
      <Router history={history}>
        <Switch>
          <Route path={"/"} component={Home} exact />
          <Route path={"/tool"} component={Tool} exact />
          <Route path={"/about"} component={Misc} exact />
        </Switch>
      </Router>
    </MuiThemeProvider>
  );
}

export default App;
