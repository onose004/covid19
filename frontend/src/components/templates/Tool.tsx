import React from 'react';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Button,
  CssBaseline,
  Divider,
  IconButton,
  Paper,
  Typography,
} from '@material-ui/core';  
import { makeStyles } from '@material-ui/core/styles';
import GraphView, {
  optionCaption, optionCommunity, optionOrder
} from 'components/molecules/GraphView'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MenuIcon from '@material-ui/icons/Menu';
import InfoIcon from '@material-ui/icons/Info';

import GraphKnob from 'components/molecules/GraphKnob'
import Toolbar from 'components/molecules/Toolbar'
import Suggestions from 'components/molecules/Suggestions'

const useStyles = makeStyles((theme) => ({
  root: {
  },
  graphView: {
    zIndex: theme.zIndex.mobileStepper - 1,
  },
  toolbarWrapper: {
    position: "absolute",
    width: "100%",
    zIndex: theme.zIndex.appBar + 1,
  },
  suggestionsWrapper: {
    position: "absolute",
    width: "100%",
    zIndex: theme.zIndex.appBar,
  },
  suggestionsAccordion: {
    paddingTop: theme.spacing(6),
  },
  toolbarWidth: {
    maxWidth: theme.breakpoints.values.sm,
  },

}))
const Tool: React.FC = (props) => {
  const classes = useStyles()
  const [config, setConfig] = React.useState({
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
        <div className={classes.toolbarWrapper}>
          <Toolbar
            classes={{
              root: classes.toolbarWidth,
            }}
          />
        </div>
        <div className={classes.suggestionsWrapper}>
          <Suggestions
            classes={{
              accordion: classes.suggestionsAccordion,
                root: classes.toolbarWidth,
            }}
          />
        </div>
        <GraphView
          className={classes.graphView}
          neo4jUri="bolt://localhost:7687"
          neo4jUser="neo4j"
          neo4jPassword="pass"
          config={config}
        />
      </main>
    </div>
  )
}

export default Tool;
