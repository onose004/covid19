import React from 'react';
import { storiesOf } from '@storybook/react';

import { ThemeProvider } from "@material-ui/styles"
import {
  Button,
  CssBaseline,
  Typography,
} from '@material-ui/core';  

import theme from 'styles/theme'
import KnobDialog from 'components/organisms/KnobDialog'
import ConfigText from 'components/atoms/ConfigText'
import * as config from 'api/config'

const Example: React.FC = (props) => {
  const [open, setOpen] = React.useState(false)
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
      <Button onClick={() => setOpen(true)}>
        Open
      </Button>
      {config &&
      <React.Fragment>
        <Typography>
          <ConfigText config={config} />
        </Typography>
        <KnobDialog 
          open={open}
          setOpen={setOpen}
          config={config}
          setConfig={setConfig}
        />
      </React.Fragment>
      }
      </>
  )
}

storiesOf('Organisms/KnobDialog', module)
  .add('default', () =>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Example />
    </ThemeProvider>
  )

