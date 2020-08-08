import React from 'react';

import {
  Router,
  Switch,
  Route,
  Redirect,
  useLocation,
} from "react-router-dom";
import createBrowserHistory from 'history/createBrowserHistory';
import * as H from 'history'

import { ThemeProvider } from "@material-ui/styles"
import theme from 'styles/theme'
import Home from "components/templates/Home"
import Tool from "components/templates/Tool"
import * as ga from "api/ga"

const history: H.History = createBrowserHistory();
ga.bindHistoryListen(history)

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <Router history={history}>
        <Switch>
          <Route path={"/"} component={Home} exact />
          <Route path={"/tool"} component={Tool} exact />
        </Switch>
      </Router>
    </ThemeProvider>
  );
}

export default App;
