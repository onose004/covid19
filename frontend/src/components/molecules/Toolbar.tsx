import React from 'react';

import {
  Divider,
  IconButton,
  Paper,
  Typography,
} from '@material-ui/core';  
import { makeStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import HelpIcon from '@material-ui/icons/Help';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(1.5),
    margin: theme.spacing(1),
    display: "flex",
    alignItems: "center",
  },
  divider: {
    margin: theme.spacing(0, 1),
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
  infoButton: {
    padding: theme.spacing(1),
    margin: theme.spacing(-1),
  },
}))


const Toolbar: React.FC<{classes?: object}> = (props) => {
  const classes = useStyles(props)
  return(
    <Paper className={classes.root}
      elevation={3}
    >
      <IconButton className={classes.menuButton}>
        <MenuIcon />
      </IconButton>
      <Typography className={classes.title}>
        Cluster Viz for 愛知県
      </Typography>
      <Divider flexItem orientation='vertical' className={classes.divider}/>
      <IconButton className={classes.infoButton}>
        <HelpIcon />
      </IconButton>
    </Paper>
  )
}

export default Toolbar;
