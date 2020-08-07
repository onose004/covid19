import React from 'react';
import clsx from 'clsx';

import {
  AppBar,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Button,
  Divider,
  Drawer,
  FormControl,
  FormControlLabel,
  InputLabel,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Grid,
  MenuItem,
  Paper,
  Typography,
  TextField,
  Toolbar,
  Select,
  Switch,

} from '@material-ui/core';  
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import MailIcon from '@material-ui/icons/Mail';

import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
  DatePicker,
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import jaLocale from "date-fns/locale/ja";
import { makeStyles } from '@material-ui/core/styles';
import ExpandMoreIcon from '@material-ui/icons/ExpandLess';

import { GraphConfig } from 'components/molecules/GraphView'
import GraphKnob from 'components/molecules/GraphKnob'
import {
  optionCaption, optionCommunity, optionOrder
} from 'components/molecules/GraphView'

const drawerWidth = 320

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: "relative",
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },

  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },
    drawerOpen: {
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    drawerClose: {
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      overflowX: 'hidden',
      width: theme.spacing(7) + 1,
      [theme.breakpoints.up('sm')]: {
        width: theme.spacing(7) + 1,
      },
    },

}))

type NavbarProps = {
  config: GraphConfig,
  setHierarchical: void,
  setCaption: void,
  setCommunity: void,
  setStartDate: void,
  setEndDate: void,
  setOrder: void,
  setMaxNodes: void,
}

const Navbar: React.FC = (props) => {
  const classes = useStyles()
  const [open, setOpen] = React.useState(true);
  return(
    <React.Fragment>
      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
        }),
        }}
      >
        <div className={classes.toolbar}>
          {open &&
            <IconButton onClick={() => setOpen(false)}>
              <ChevronLeftIcon />
            </IconButton>
          }
          {!open &&
            <IconButton onClick={() => setOpen(true)}>
              <ChevronRightIcon />
            </IconButton>
          }
        </div>
        <List>
          <ListItem button onClick={() => setOpen(true)}>
            <ListItemIcon>
              <MailIcon />
            </ListItemIcon>
            <ListItemText
              primary="ヒント"
            />
          </ListItem>
          {open &&
            <React.Fragment>
              <ListItem>
                <ListItemIcon />
                <ListItemText
                  secondary={
                    "設定"
                  }
                />
              </ListItem>
            </React.Fragment>
          }
          <ListItem button onClick={() => setOpen(true)}>
            <ListItemIcon>
              <MailIcon />
            </ListItemIcon>
            <ListItemText
              primary="表示設定"
            />
          </ListItem>
          {open &&
            <React.Fragment>
              <ListItem>
                <ListItemIcon />
                <ListItemText
                  secondary={
                    <React.Fragment>
                      <GraphKnob config={props.config} />
                    </React.Fragment>
                  }
                />
              </ListItem>
            </React.Fragment>
          }
        </List>
      </Drawer>
    </React.Fragment>
  )
}

export default Navbar
