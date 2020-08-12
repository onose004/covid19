import React from 'react';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Button,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
  Typography,
} from '@material-ui/core';  
import { makeStyles } from '@material-ui/core/styles';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import EmojiObjectsIcon from '@material-ui/icons/EmojiObjects';
import FlashOnIcon from '@material-ui/icons/FlashOn';
import * as gc from 'api/config'

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(1),
  },
  accordion: {
    padding: theme.spacing(0),
    // paddingTop: theme.spacing(4),
  },
  summary: {
    margin: theme.spacing(0),
    padding: theme.spacing(1),
  },
  summaryRoot: {
    minHeight: theme.spacing(4),
  },
  summaryContent: {
    margin: theme.spacing(0),
    display: "flex",
    alignItems: "center",
  },
  summaryIcon: {
    margin: theme.spacing(0),
    padding: theme.spacing(0)
  },
  details: {
    display: "block",
    padding: theme.spacing(0),
  },
  expandLessWrapper: {
    display: "block",
    width: "100%",
    textAlign: "center",
    padding: theme.spacing(1),
  },
  expandLess: {
  },
}))

type SuggestionItem = {
  label: string,
  configDiff: object,
}

const suggestionList: SuggestionItem[] = [
  {
    label: "都市間の発生事例伝播を可視化",
    configDiff: {
      caption: "address",
      community: "_enum_address",
    }
  },
  {
    label: "発生事例を性別で色分けし、年齢をラベル表示",
    configDiff: {
      caption: "age",
      community: "_enum_sex",
    }
  },
  {
    label: "大規模なクラスターのみを表示",
    configDiff: {
      minDescendant: 32,
    }
  },
  {
    label: "小規模なクラスターを含めて表示",
    configDiff: {
      minDescendant: 4,
    }
  },
  {
    label: "過去2週間の発生事例に絞り、日付をラベル表示",
    configDiff: {
      caption: "date_label",
      order: "desc",
      startDate: new Date(Number(new Date()) - 1000 * 60 * 60 * 24 * 14),
      endDate: new Date(),
    }
  },
  {
    label: "2020年初めから今日までの発生事例を最大1024件表示",
    configDiff: {
      order: "desc",
      maxNodes: 1024,
      startDate: new Date("1 Janualy 2020"),
      endDate: new Date(),
    }
  },
]

const Suggestions: React.FC<{
  classes?: object,
  config: gc.GraphConfig,
  setConfig: Function
}> = (props) => {
  const classes = useStyles(props)
  const localOpen = localStorage.getItem("suggestionOpen")
  const [open, _setOpen] = React.useState(
    localOpen ? localOpen === "true" : true
  )
  const setOpen = (_open: boolean) => {
    localStorage.setItem("suggestionOpen", String(_open))
    _setOpen(_open)
  }
  const handleSetConfig = (configDiff: object) => {
    const config: gc.GraphConfig = { ...props.config }
    Object.keys(configDiff).forEach(key => {
      // @ts-ignore
      config[key] = configDiff[key]
    })
    props.setConfig(config)
    setOpen(false)
  }
  return(
    <div
      className={classes.root}
    >
      <Accordion 
        expanded={open}
        className={classes.accordion}
        elevation={3}
      >
        { (!open) &&
        <AccordionSummary
          onClick={() => setOpen(!open)}
          expandIcon={<ExpandMoreIcon />}
          className={classes.summary}
          classes={{
            root: classes.summaryRoot,
            content: classes.summaryContent,
            expandIcon: classes.summaryIcon,
          }}
        >
          <IconButton className={classes.summaryIcon}>
            <FlashOnIcon />
          </IconButton>
          <Typography>
            ヒント
          </Typography>
        </AccordionSummary>
        }
        <AccordionDetails
          classes={{root: classes.details}}
        >
          <List dense={true}>
            { suggestionList.map((item: SuggestionItem, key) => (
              <ListItem
                button
                onClick={() => handleSetConfig(item.configDiff)}
              >
                <ListItemIcon>
                  <EmojiObjectsIcon />
                </ListItemIcon>
                <ListItemText>
                  {item.label}
                </ListItemText>
              </ListItem>
            ))
            }
          </List>
          <div className={classes.expandLessWrapper}>
            <Button
              classes={{root: classes.expandLess}}
              variant="outlined"
              color="default"
              size="small"
              onClick={() => setOpen(false)}
              startIcon={<ExpandLessIcon />}
            >
              しまう
            </Button>
          </div>
        </AccordionDetails>
      </Accordion>
    </div>
  )
}

export default Suggestions;
