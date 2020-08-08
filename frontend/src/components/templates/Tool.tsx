import React from 'react';
import {
  AppBar,
  Divider,
  CssBaseline,
} from '@material-ui/core';  
import { makeStyles } from '@material-ui/core/styles';
import GraphView from 'components/molecules/GraphView'

import Toolbar from 'components/molecules/Toolbar'
import ConfigBar from 'components/molecules/ConfigBar'
import FooterBar from 'components/molecules/FooterBar'
import KnobDialog from 'components/organisms/KnobDialog'
import Suggestions from 'components/molecules/Suggestions'
import EntryDialog from 'components/molecules/EntryDialog'
import * as api from 'api/neo4j'
import * as config from 'api/config'

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
  appBar: {
    top: 'auto',
    bottom: 0,
  },

}))

const Tool: React.FC = (props) => {
  const classes = useStyles()
  const [knobOpen, setKnobOpen] = React.useState(false)
  const [entryOpen, setEntryOpen] = React.useState(true)
  const [graphConfig, setGraphConfig] = React.useState<config.GraphConfig>(
    config.defaultGraphConfig
  )
  const handleSetGraphConfig = async (graphConfig: config.GraphConfig) => {
    await config.setGraphConfig(graphConfig)
    setGraphConfig(graphConfig)
  }
  React.useEffect(() => {
    const f = async () => {
      const conf = await config.getGraphConfig()
      setGraphConfig(conf)
    }
    f()
  }, [])
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
        <GraphView
          config={graphConfig}
        />
        <AppBar position="fixed" className={classes.appBar} color="default">
          <ConfigBar
            setConfigOpen={setKnobOpen}
            config={graphConfig}
          />
          <Divider />
          <FooterBar />
        </AppBar>
        <KnobDialog
          open={knobOpen}
          setOpen={setKnobOpen}
          config={graphConfig}
          setConfig={handleSetGraphConfig}
        />
      </main>
      <EntryDialog
        open={entryOpen}
        setOpen={setEntryOpen}
      />
    </div>
  )
}

export default Tool;
