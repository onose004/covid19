import React from 'react';
import {
  useHistory,
} from 'react-router-dom';

import {
  Avatar,
  AppBar,
  Button,
  Container,
  CssBaseline,
  Divider,
  Link,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Grid,
  Paper,
  Toolbar,
  Typography,
} from '@material-ui/core';  
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  paper: {
    minHeight: theme.spacing(32),
    position: "relative",
    marginBottom: theme.spacing(4),
  },
  content: {
    position: "absolute",
    top: theme.spacing(3),
    left: theme.spacing(4),
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

const Home: React.FC = (props) => {
  const classes = useStyles(props)
  const history = useHistory() 
  return(
    <div>
      <CssBaseline />
      <Container>
        <Toolbar>
          <Typography>
            ClusterViz
          </Typography>
        </Toolbar>
        <main>
          <Paper elevation={0} className={classes.paper}>
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
              </Button>
            </div>
          </Paper>
          <div>
            <Typography component="h2" variant="h6">
              更新情報
            </Typography>
            <List>
              <ListItem>
                <ListItemAvatar>
                  <Avatar alt="Travis Howard" />
                </ListItemAvatar>
                <ListItemText
                  primary="リリースしました"
                  secondary=""
                />
              </ListItem>
            </List>
          </div>
        </main>
        <Divider />
        <Typography component="h2" variant="caption">
          <Link href="https://www.hashup.pro" target="_blank" color="inherit">
            &copy; Hashup Inc.
          </Link>
        </Typography>
      </Container>
    </div>
  )
}

export default Home
