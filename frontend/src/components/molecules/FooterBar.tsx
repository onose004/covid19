import React from 'react';
import {
  AppBar,
  Divider,
  Link,
  Typography,
  Toolbar as MuiToolbar,
  CssBaseline,
} from '@material-ui/core';  
import { makeStyles } from '@material-ui/core/styles';
import * as api from 'api/neo4j'

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: "auto",
    padding: theme.spacing(0.5, 1),
    display: "flex",
    justifyContent: "space-between",
  },
  text: {
    fontSize: theme.spacing(1),
  },
}))

const FooterBar: React.FC = (props) => {
  const classes = useStyles()
  const [dataSource, setDataSource] = React.useState<api.DataSource | undefined>(undefined)

  React.useEffect(() => {
    const f = async () => {
      const dataSource: api.DataSource | undefined = await api.fetchDataSource()
      setDataSource(dataSource)
    }
    f()
  }, [])
  const formatDate = (timestamp: Date) => {
    var d = new Date(timestamp)
    var year = d.getFullYear()
    var month = d.getMonth() + 1
    var date = d.getDate()
    return(`${year}年${month}月${date}日`)
  }
  return(
    <MuiToolbar variant="dense"
      classes={{root: classes.root}}
    >
      <Typography classes={{root: classes.text}}>
        <Link href="https://www.hashup.pro" target="_blank" color="inherit">
          &copy; Hashup Inc.
        </Link>
      </Typography>
      { dataSource &&
      <Typography classes={{root: classes.text}}>
        データ出典:&nbsp;
        <Link href={dataSource.uri} target="_blank" color="inherit">
          {dataSource.title}
        </Link>
        （最終更新: {formatDate(dataSource.lastUpdate)}）
      </Typography>
      }
    </MuiToolbar>
  )
}

export default FooterBar
