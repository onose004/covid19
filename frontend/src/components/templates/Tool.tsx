import React from 'react';
import {
  CssBaseline,
} from '@material-ui/core';  
import { makeStyles } from '@material-ui/core/styles';
import GraphView from 'components/molecules/GraphView'

import Toolbar from 'components/molecules/Toolbar'
import ConfigBar from 'components/molecules/ConfigBar'
import KnobDialog from 'components/organisms/KnobDialog'
import Suggestions from 'components/molecules/Suggestions'
import { GraphConfig } from 'components/molecules/GraphView'

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
    maxWidth: theme.spacing(64),
  },

}))

const Tool: React.FC = (props) => {
  const classes = useStyles()
  const [knobOpen, setKnobOpen] = React.useState(false)
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
      <main>
        <div className={classes.toolbarWrapper}>
          <Toolbar
            classes={{
              root: classes.toolbarWidth,
            }}
          />
        </div>
        {/*
        <div className={classes.suggestionsWrapper}>
          <Suggestions
            classes={{
              accordion: classes.suggestionsAccordion,
                root: classes.toolbarWidth,
            }}
          />
        </div>
          */}
        <GraphView
          neo4jUri="bolt://ik1-336-28372.vs.sakura.ne.jp:7687"
          neo4jUser="neo4j"
          neo4jPassword="pass"
          config={config}
        />
        <ConfigBar
          setConfigOpen={setKnobOpen}
          config={config}
        />
        <KnobDialog
          open={knobOpen}
          setOpen={setKnobOpen}
          config={config}
          setConfig={setConfig}
        />
      </main>
    </div>
  )
}

export default Tool;
