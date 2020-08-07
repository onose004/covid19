import React from 'react';
import logo from './logo.svg';
import './App.css';

import { ThemeProvider } from "@material-ui/styles"
import theme from 'styles/theme'
import Tool from "components/templates/Tool"

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Tool />
    </ThemeProvider>
  );
}

export default App;
