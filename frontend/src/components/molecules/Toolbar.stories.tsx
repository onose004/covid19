import React from 'react';
import { storiesOf } from '@storybook/react';

import {
  CssBaseline,
} from '@material-ui/core';  
import { ThemeProvider } from "@material-ui/styles"


import theme from 'styles/theme'
import Toolbar from 'components/molecules/Toolbar'

storiesOf('Molecules/Toolbar', module)
  .add('default', () =>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Toolbar />
    </ThemeProvider>
  )

