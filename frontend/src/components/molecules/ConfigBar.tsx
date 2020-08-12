import React from 'react';

import {
  Divider,
  IconButton,
  Typography,
  Toolbar,
} from '@material-ui/core';  
import { makeStyles } from '@material-ui/core/styles';
import SettingsIcon from '@material-ui/icons/Settings';
import ConfigText from 'components/atoms/ConfigText'
import * as config from 'api/config'

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
}))


type ConfigBarProps = {
  classes?: object,
  config: config.GraphConfig | undefined,
  setConfigOpen: Function,
}

const ConfigBar: React.FC<ConfigBarProps> = (props) => {
  const classes = useStyles(props)
  return(
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
  )
}

export default ConfigBar;
