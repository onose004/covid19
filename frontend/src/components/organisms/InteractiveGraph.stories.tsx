import React from 'react';
import { storiesOf } from '@storybook/react';
import { select, boolean, number, date } from "@storybook/addon-knobs";

import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Button,
  CssBaseline,
  Paper,
  Typography,
} from '@material-ui/core';  
import { makeStyles } from '@material-ui/core/styles';
import { ThemeProvider } from "@material-ui/styles"
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import theme from 'styles/theme'
import GraphView, {
  optionCaption, optionCommunity, optionOrder
} from 'components/molecules/GraphView'
import GraphKnob from 'components/molecules/GraphKnob'
import { GraphConfig } from 'components/molecules/GraphView'


const useStyles = makeStyles((theme) => ({
  root: {
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  layout: {
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
  },
  drawer: {
    width: "240px",
    flexShrink: 0,
  },
  drawerPaper: {
    width: "240px",
  },
  drawerContainer: {
    width: "240px",
    overflow: 'auto',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(0),
    position: "relative",
  },
  paper: {
    bottom: theme.spacing(0),
    right: theme.spacing(0),
    margin: theme.spacing(1),
    position: "absolute",
    zIndex: 1,
  },
}))

const Example: React.FC = (props) => {
  const classes = useStyles()
  const [config, setConfig] = React.useState<GraphConfig>({
    hierarchical: false,
    caption: 'sex',
    community: '_enum_sex',
    startDate: new Date('July 1 2020'),
    endDate: new Date(),
    order: "desc",
    maxNodes: 64,
    minDescendant: 4,
  })
  return(
    <div className={classes.root}>
      <CssBaseline />
      <main className={classes.content}>
        <Paper
          className={classes.paper}
          elevation={3}
        >
          {/*
          <GraphKnob
            config={config: GraphConfig}
            setHierarchical={(h: bool) => setConfig({...config, hierarchical: h})}
            setCaption={(value: string) => setConfig({...config, caption: value})}
            setCommunity={(label: string) => setConfig({...config, community: label})}
            setStartDate={(date) => setConfig({...config, startDate: date})}
            setEndDate={(date) => setConfig({...config, endDate: date})}
            setOrder={(order: string) => setConfig({...config, order: order})}
            setMaxNodes={(n: number) => setConfig({...config, maxNodes: n})}
            setMinDescendant={(n: number) => setConfig({...config, minDescendant: n})}
          />
            */}
        </Paper>
        <div>
      <GraphView
        neo4jUri="bolt://localhost:7687"
        neo4jUser="neo4j"
        neo4jPassword="pass"
        config={config}
      />
        </div>
      </main>
    </div>
  )
}

storiesOf('Organisms/InteractiveGraph', module)
  .add('default', () =>
    <ThemeProvider theme={theme}>
      <Example />
    </ThemeProvider>
  )

