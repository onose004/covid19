import React from 'react';
import { storiesOf } from '@storybook/react';

import {
  CssBaseline,
} from '@material-ui/core';  
import { ThemeProvider } from "@material-ui/styles"


import theme from 'styles/theme'
import ConfigBar from 'components/molecules/ConfigBar'

storiesOf('Molecules/ConfigBar', module)
  .add('default', () =>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      not available
    </ThemeProvider>
  )

