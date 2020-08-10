import React from 'react';
import {
  useHistory,
} from 'react-router-dom';

import {
  Button,
  Container,
  CssBaseline,
  Divider,
  Link,
  Toolbar,
  Typography,
} from '@material-ui/core';  
import ChevronRightIcon from '@material-ui/icons/ChevronRight';

import { makeStyles } from '@material-ui/core/styles';

import Hero from 'components/molecules/Hero'
import Feature from 'components/molecules/Feature'
import News from 'components/molecules/News'

const useStyles = makeStyles((theme) => ({
  toolbar: {
    display: "flex",
    justifyContent: "space-between",
  },
  feature: {
    marginBottom: theme.spacing(4),
  },
  news: {
    marginBottom: theme.spacing(4),
  },
  copyright: {
    marginTop: theme.spacing(2),
  }
}))

const Home: React.FC = (props) => {
  const classes = useStyles(props)
  const history = useHistory() 
  return(
    <div>
      <CssBaseline />
        <Toolbar className={classes.toolbar}>
          <Typography>
            ClusterViz 愛知県版
          </Typography>
          <Button
            variant="outlined"
            size="small"
            onClick={() => history.push('/tool')}
            endIcon={
              <ChevronRightIcon />
            }
          >
            ClusterViz へ移動
          </Button>
        </Toolbar>
      <Container>
        <main>
          <Hero />
          <Feature classes={{paper: classes.feature}} />
          <News classes={{root: classes.news}} />
        </main>
        <Divider />
        <Typography component="h2" variant="caption" className={classes.copyright}>
          <Link href="https://www.hashup.pro" target="_blank" color="inherit">
            &copy; Hashup Inc.
          </Link>
        </Typography>
      </Container>
    </div>
  )
}

export default Home
