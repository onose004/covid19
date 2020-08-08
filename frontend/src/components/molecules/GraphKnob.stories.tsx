import React from 'react';
import { storiesOf } from '@storybook/react';

import { ThemeProvider } from "@material-ui/styles"
import {
  CssBaseline,
} from '@material-ui/core';  

import theme from 'styles/theme'
import GraphKnob from 'components/molecules/GraphKnob'
import * as config from 'api/config'

const Example: React.FC = (props) => {
  const [config, setConfig] = React.useState<config.GraphConfig | undefined>({
    hierarchical: false,
    caption: 'date_label',
    community: '_enum_sex',
    startDate: new Date('July 1 2020'),
    endDate: new Date('July 30 2020'),
    order: "desc",
    maxNodes: 64,
    minDescendant: 4,
  })
  return(
    <>
      { config &&
        <GraphKnob 
          config={config}
          setConfig={setConfig}
        />
      }
    </>
  )
}

storiesOf('Molecules/GraphKnob', module)
  .add('default', () =>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Example />
    </ThemeProvider>
  )

