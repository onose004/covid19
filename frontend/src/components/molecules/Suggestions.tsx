import React from 'react';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Button,
  List,
  ListItem,
  Typography,
} from '@material-ui/core';  
import { makeStyles } from '@material-ui/core/styles';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';

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
    margin: theme.spacing(1),
  },
  expandLess: {
  },

}))

const Suggestions: React.FC<{classes?: object}> = (props) => {
  const classes = useStyles(props)
  const [open, setOpen] = React.useState(false)
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
          <Typography>
            クラスターを検索する
          </Typography>
        </AccordionSummary>
        }
        <AccordionDetails
          classes={{root: classes.details}}
        >
          <List>
            <ListItem button>
              aaa
            </ListItem>
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
