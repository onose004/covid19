import React from 'react';
import {
  useHistory,
} from 'react-router-dom';

import {
  Grid,
  Paper,
  Typography,
} from '@material-ui/core';  
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(4),
  },
  title: {
    margin: theme.spacing(0, 0, 1, 0),
    fontSize: theme.typography.h4.fontSize,
    [theme.breakpoints.down('xs')]: {
      fontSize: theme.typography.h6.fontSize,
    },
  },
}))

const Feature: React.FC<{classes: object}> = (props) => {
  const classes = useStyles(props)
  const history = useHistory() 
  return(
    <Paper classes={{root: classes.paper}}>
      <Grid container spacing={4} classes={{}} >
        <Grid item sm={6}>
          <Typography variant="h6">
            感染症発生事例のネットワーク構造を見える化
          </Typography>
          <Typography>
            自治体による感染症事例の表形式の公開情報を使って、
            ネットワーク構造を可視化します。
            可視化により、
            実際に発生しているクラスターを観察することができます。
          </Typography>
        </Grid>
        <Grid item sm={6}>
          <Typography variant="h6">
            インタラクティブなグラフ表示
          </Typography>
          <Typography>
            ネットワーク構造を様々な切り口から観察できます。
            例えば、発生事例の「居住地」で色分けすることにより、
            クラスターが同じ都市内で発生しているのか、
            様々な都市間で広がっているのかを観察することができます。
          </Typography>
        </Grid>
      </Grid>
    </Paper>
  )
}

export default Feature
