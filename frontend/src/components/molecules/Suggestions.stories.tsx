import React from 'react';
import { storiesOf } from '@storybook/react';

import { ThemeProvider } from "@material-ui/styles"
import theme from 'styles/theme'

import Suggestions from 'components/molecules/Suggestions'
import * as gc from 'api/config'

storiesOf('Molecules/Suggestions', module)
  .add('default', () =>
    <ThemeProvider theme={theme}>
      <Suggestions setConfig={()=>{}} config={gc.defaultGraphConfig} />
    </ThemeProvider>
  )

