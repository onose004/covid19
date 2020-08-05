import React from 'react';
import { storiesOf } from '@storybook/react';

import { ThemeProvider } from "@material-ui/styles"
import {
  withKnobs, select, boolean, number, date
} from "@storybook/addon-knobs";

import theme from 'styles/theme'
import GraphKnob from 'components/molecules/GraphKnob'

const Example: React.FC = (props) => {
  const [config, setConfig] = React.useState({
    hierarchical: false,
    caption: 'date_label',
    community: '_enum_sex',
    startDate: new Date('July 1 2020'),
    endDate: new Date('July 30 2020'),
    order: "desc",
    maxNodes: 64,
  })
  return(
    <>
    <GraphKnob 
      config={config}
      setHierarchical={(h: bool) => setConfig({...config, hierarchical: h})}
      setCaption={(value: string) => setConfig({...config, caption: value})}
      setCommunity={(label: string) => setConfig({...config, community: label})}
      setStartDate={(date) => setConfig({...config, startDate: date})}
      setEndDate={(date) => setConfig({...config, endDate: date})}
      setOrder={(order: string) => setConfig({...config, order: order})}
      setMaxNodes={(n: number) => setConfig({...config, maxNodes: n})}
    />
      </>
  )
}

storiesOf('Molecules/GraphKnob', module)
  .addDecorator(withKnobs)
  .add('default', () =>
    <ThemeProvider theme={theme}>
      <Example />
    </ThemeProvider>
  )

