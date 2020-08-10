import React from 'react';

import {
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from '@material-ui/core';  
import ChatBubbleIcon from '@material-ui/icons/ChatBubble';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
  },
  title: {
    margin: theme.spacing(0, 0, 1, 0),
    fontSize: theme.typography.h4.fontSize,
    [theme.breakpoints.down('xs')]: {
      fontSize: theme.typography.h6.fontSize,
    },
  },
  listItem: {
    padding: theme.spacing(0),
  },
}))

type NewsItem = {
  title: string,
  content: string,
  date: Date,
}

const NewsList: NewsItem[] = [
  {
    title: "ClusterViz をリリース",
    content: "「感染症発生事例の公開情報からクラスターを見える化」する ClusterViz をリリースしました。",
    date: new Date('2020-08-12'),
  },
]

const News: React.FC<{classes?: object}> = (props) => {
  const classes = useStyles(props)
  const formatDate = (timestamp: Date) => {
    var d = new Date(timestamp)
    var year = d.getFullYear()
    var month = d.getMonth() + 1
    var date = d.getDate()
    return(`${year}年${month}月${date}日`)
  }
  return(
    <div className={classes.root}>
      <Typography component="h2" variant="h6">
        更新情報
      </Typography>
      <List>
        {NewsList.map((item: NewsItem, key) => (
          <ListItem key={key} alignItems="flex-start"
            classes={{root: classes.listItem}}
          >
            <ListItemAvatar>
              <Avatar>
                <ChatBubbleIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={`${item.title} - ${formatDate(item.date)}`}
              secondary={item.content}
            />
          </ListItem>
        ))}
      </List>
    </div>
  )
}

export default News 