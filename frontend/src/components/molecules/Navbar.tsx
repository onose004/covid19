import React from 'react';
import {
  useHistory,
} from 'react-router-dom';

import {
  Button,
  Divider,
  Link,
  Toolbar,
  Typography,
} from '@material-ui/core';  
import ChevronRightIcon from '@material-ui/icons/ChevronRight';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {},
  toolbar: {
    display: "flex",
    justifyContent: "space-between",
  },
}))

const Navbar: React.FC<{classes?: object}> = (props) => {
  const classes = useStyles(props)
  const history = useHistory() 
  return(
    <div className={classes.root}>
        <Toolbar className={classes.toolbar}>
          <Typography>
            <Link onClick={() => history.push('/')} color="inherit">
              ClusterViz 愛知県版
            </Link>
          </Typography>
          <div>
            <Button
              variant="contained"
              size="small"
              onClick={() => history.push('/tool')}
              endIcon={
                <ChevronRightIcon />
              }
            >
              使う
            </Button>
          </div>
        </Toolbar>
      <Divider />
    </div>
  )
}

export default Navbar

