import React from 'react';

import {
  useHistory,
} from 'react-router-dom';

import {
  Divider,
  IconButton,
  Paper,
  Typography,
} from '@material-ui/core';  
import { makeStyles } from '@material-ui/core/styles';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import HelpIcon from '@material-ui/icons/Help';

import HelpDialog from 'components/organisms/HelpDialog'

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
  const history = useHistory()
  const [helpOpen, setHelpOpen] = React.useState(false)
  return(
    <Paper className={classes.root}
      elevation={3}
    >
      <IconButton
        className={classes.menuButton}
        onClick={() => history.push('/')}
      >
        <ChevronLeftIcon />
      </IconButton>
      <Typography className={classes.title}>
        Cluster Viz β for 愛知県
      </Typography>
      <Divider flexItem orientation='vertical' className={classes.divider}/>
      <IconButton onClick={() => setHelpOpen(true)} className={classes.infoButton}>
        <HelpIcon />
      </IconButton>
        <HelpDialog
          open={helpOpen}
          setOpen={setHelpOpen}
        />
    </Paper>
  )
}

export default Toolbar;
