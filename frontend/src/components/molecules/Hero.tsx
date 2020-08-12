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
import MockWireframeFig from 'components/atoms/MockWireframeFig'

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "relative",
    marginBottom: theme.spacing(4),
    minHeight: theme.spacing(48),
    [theme.breakpoints.down('xs')]: {
      minHeight: theme.spacing(48),
    },
  },
  content: {
    position: "absolute",
    top: theme.spacing(12),
    left: theme.spacing(2),
    [theme.breakpoints.down('xs')]: {
      left: theme.spacing(0),
      top: theme.spacing(2),
    },
    [theme.breakpoints.up('lg')]: {
      left: theme.spacing(24),
    },
  },
  title: {
    margin: theme.spacing(0, 0, 1, 0),
    fontSize: theme.typography.h4.fontSize,
    [theme.breakpoints.down('xs')]: {
      fontSize: theme.typography.h6.fontSize,
    },
  },
  demo: {
    transform: "perspective(500px) rotate3d(0.5, -0.5, 0.5, 45deg)",
    position: "absolute",
    top: theme.spacing(2),
    right: theme.spacing(12),
    width: theme.spacing(22),
    [theme.breakpoints.down('xs')]: {
      top: theme.spacing(6),
      right: theme.spacing(8),
    },
    [theme.breakpoints.up('lg')]: {
      right: theme.spacing(32),
    },
  },
  demoImage: {
    width: theme.spacing(19.25),
    margin: theme.spacing(0, "auto"),
    position: "absolute",
    left: theme.spacing(1.25),
    top: theme.spacing(4),
  },
}))

const Hero: React.FC = (props) => {
  const classes = useStyles(props)
  const history = useHistory() 
  return(
    <div className={classes.paper}>
      <div className={classes.demo}>
        <img src="/demo.gif" className={classes.demoImage} alt="" />
        <MockWireframeFig />
      </div>
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
