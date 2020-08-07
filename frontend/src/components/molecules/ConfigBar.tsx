import React from 'react';

import {
  AppBar,
  Divider,
  IconButton,
  Typography,
  Toolbar,
} from '@material-ui/core';  
import { makeStyles } from '@material-ui/core/styles';
import SettingsIcon from '@material-ui/icons/Settings';
import { GraphConfig } from 'components/molecules/GraphView'
import ConfigText from 'components/atoms/ConfigText'

const useStyles = makeStyles((theme) => ({
  statusBar: {
    flexGrow: 2,
    textAlign: "center",
  },
  divider: {
    margin: theme.spacing(0, 2),
  },
  title: {
    flexGrow: 2,
    textAlign: "center",
  },
  menuButton: {
    padding: theme.spacing(1),
    margin: theme.spacing(-1),
    marginRight: theme.spacing(1),
  },
  settingButton: {
    padding: theme.spacing(1),
    margin: theme.spacing(-1),
  },
  appBar: {
    top: 'auto',
    bottom: 0,
  },
}))


type ConfigBarProps = {
  classes?: object,
  config: GraphConfig | undefined,
  setConfigOpen: Function,
}

const ConfigBar: React.FC<ConfigBarProps> = (props) => {
  const classes = useStyles(props)
  return(
    <AppBar position="fixed" className={classes.appBar} color="default">
      <Toolbar variant="dense">
        <Typography variant="caption" className={classes.statusBar}>
          {props.config && 
            <ConfigText config={props.config} />
          }
        </Typography>
        <Divider flexItem orientation='vertical' className={classes.divider}/>
        <IconButton
          onClick={() => props.setConfigOpen(true)}
          className={classes.settingButton} color="default"
        >
          <SettingsIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  )
}

export default ConfigBar;
