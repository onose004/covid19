import React from 'react';
import {
  useHistory,
} from 'react-router-dom';

import {
  Button,
  Typography,
} from '@material-ui/core';  
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "relative",
    marginBottom: theme.spacing(4),
    minHeight: theme.spacing(32),
    [theme.breakpoints.down('xs')]: {
      minHeight: theme.spacing(26),
    },
  },
  content: {
    position: "absolute",
    top: theme.spacing(6),
    left: theme.spacing(0),
    [theme.breakpoints.down('xs')]: {
      left: theme.spacing(2)
    },
  },
  title: {
    margin: theme.spacing(0, 0, 1, 0),
    fontSize: theme.typography.h4.fontSize,
    [theme.breakpoints.down('xs')]: {
      fontSize: theme.typography.h6.fontSize,
    },
  },
}))

const Hero: React.FC = (props) => {
  const classes = useStyles(props)
  const history = useHistory() 
  return(
    <div className={classes.paper}>
      <div className={classes.content}>
        <Typography component="h1"
          className={classes.title}
        >
          感染症発生事例の公開情報から
          <br />
          クラスターを見える化
        </Typography>
        <Button
          color="primary"
          variant="contained"
          onClick={() => history.push('/tool')}
          endIcon={
            <ChevronRightIcon />
          }
        >
          ClusterViz
          を使う
        </Button>
      </div>
    </div>
  )
}

export default Hero
