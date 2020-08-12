import React from 'react';
import {
  useHistory,
} from 'react-router-dom';

import {
  Container,
  CssBaseline,
  Divider,
  Link,
  Typography,
} from '@material-ui/core';  

import { makeStyles } from '@material-ui/core/styles';
import Hero from 'components/molecules/Hero'
import Feature from 'components/molecules/Feature'
import News from 'components/molecules/News'
import Navbar from 'components/molecules/Navbar'

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
    margin: theme.spacing(2, 0),
    display: "flex",
    justifyContent: "space-between",
  }
}))

const Home: React.FC = (props) => {
  const classes = useStyles(props)
  const history = useHistory() 
  return(
    <div>
      <CssBaseline />
      <Navbar />
      <Container>
        <main>
          <Hero />
          <Feature classes={{paper: classes.feature}} />
          <News classes={{root: classes.news}} />
        </main>
        <Divider />
        <Typography variant="caption" className={classes.copyright}>
          <Link href="https://www.hashup.pro" target="_blank" color="inherit">
            &copy; Hashup Inc.
          </Link>
          <Link href="/about" color="inherit">
            当サイトについて
          </Link>
        </Typography>
      </Container>
    </div>
  )
}

export default Home
