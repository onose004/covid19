import React from 'react';
import { storiesOf } from '@storybook/react';

import { ThemeProvider } from "@material-ui/styles"

import theme from 'styles/theme'
import GraphKnob from 'components/molecules/GraphKnob'
import { GraphConfig } from 'components/molecules/GraphView'

const Example: React.FC = (props) => {
  const [config, setConfig] = React.useState<GraphConfig | undefined>({
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
          setHierarchical={(h: boolean) => setConfig({...config, hierarchical: h})}
          setCaption={(value: GraphConfig["caption"]) => setConfig({...config, caption: value})}
          setCommunity={(label: GraphConfig["community"]) => setConfig({...config, community: label})}
          setStartDate={(date: Date) => setConfig({...config, startDate: date})}
          setEndDate={(date: Date) => setConfig({...config, endDate: date})}
          setOrder={(order: GraphConfig["order"]) => setConfig({...config, order: order})}
          setMaxNodes={(n: number) => setConfig({...config, maxNodes: n})}
          setMinDescendant={(n: number) => setConfig({...config, minDescendant: n})}
        />
      }
    </>
  )
}

storiesOf('Molecules/GraphKnob', module)
  .add('default', () =>
    <ThemeProvider theme={theme}>
      <Example />
    </ThemeProvider>
  )

