import React from 'react';
import { storiesOf } from '@storybook/react';

import { ThemeProvider } from "@material-ui/styles"
import {
  withKnobs, select, boolean, number, date
} from "@storybook/addon-knobs";

import theme from 'styles/theme'
import Navbar from 'components/molecules/Navbar'

const Example: React.FC = (props) => {
  const [config, setConfig] = React.useState({
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
      <Navbar 
        config={config}
      />
    </>
  )
}

storiesOf('Molecules/Navbar', module)
  .addDecorator(withKnobs)
  .add('default', () =>
    <ThemeProvider theme={theme}>
      <Example />
    </ThemeProvider>
  )

