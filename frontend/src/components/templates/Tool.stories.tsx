import React from 'react';
import { storiesOf } from '@storybook/react';
import { select, boolean, number, date } from "@storybook/addon-knobs";

import { ThemeProvider } from "@material-ui/styles"
import Tool from "components/templates/Tool"


import theme from 'styles/theme'


storiesOf('Templates/Tool', module)
  .add('default', () =>
    <ThemeProvider theme={theme}>
      <Tool />
    </ThemeProvider>
  )

