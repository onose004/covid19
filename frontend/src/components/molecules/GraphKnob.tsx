import React from 'react';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Button,
  Divider,
  FormControl,
  FormControlLabel,
  InputLabel,
  Grid,
  MenuItem,
  Typography,
  TextField,
  Select,
  Switch,

} from '@material-ui/core';  
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
  DatePicker,
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import jaLocale from "date-fns/locale/ja";
import { makeStyles } from '@material-ui/core/styles';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import { GraphConfig } from 'components/molecules/GraphView'
import {
  optionCaption, optionCommunity, optionOrder
} from 'components/molecules/GraphView'

const useStyles = makeStyles((theme) => ({
  accordionDetails: {
    display: "block",
    flexGrow: 1,
    maxWidth: theme.spacing(64),
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 88,
  }
}))

type GraphKnobProps = {
  config: GraphConfig,
  setHierarchical: void,
  setCaption: void,
  setCommunity: void,
  setStartDate: void,
  setEndDate: void,
  setOrder: void,
  setMaxNodes: void,
}

const GraphKnob: React.FC = (props) => {
  const classes = useStyles()
  const formatDate = (timestamp) => {
    var d = new Date(timestamp)
    var year = d.getFullYear()
    var month = d.getMonth() + 1
    var date = d.getDate()
    return(`${year}年${month}月${date}日`)
  }
  return(
    <React.Fragment>
      <Accordion
        square={false}
        defaultExpanded
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
        >
          <Typography>
            {formatDate(props.config.startDate)}
            &nbsp;-&nbsp;
            {formatDate(props.config.endDate)}
            の期間で
            <br />
            {
              (props.config.order === "asc")
              ? "古い"
              : (props.config.order === "desc")
                ? "新しい"
                : ""
            }
            順に最大
            {props.config.maxNodes}
            件を表示中
          </Typography>
        </AccordionSummary>
        <AccordionDetails className={classes.accordionDetails}>
          <MuiPickersUtilsProvider
            utils={DateFnsUtils}
            local={jaLocale}
          >
            <Grid spacing={1} container fluid>
              <Grid item>
                <DatePicker
                  className={classes.formControl}
                  margin="normal"
                  id="startDatePicker"
                  label="開始日"
                  format="yyyy-MM-dd"
                  disableFuture
                  value={props.config.startDate}
                  maxDate={(props.config.endDate)}
                  onChange={(date) => props.setStartDate(date)}
                  KeyboardButtonProps={{
                    'aria-label': 'change date',
                  }}
                  variant="contained"
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>
              <Grid item>
                <DatePicker
                  className={classes.formControl}
                  margin="normal"
                  id="endDatePicker"
                  label="終了日"
                  format="yyyy-MM-dd"
                  disableFuture
                  value={props.config.endDate}
                  minDate={(props.config.startDate)}
                  onChange={(date) => props.setEndDate(date)}
                  KeyboardButtonProps={{
                    'aria-label': 'change date',
                  }}
                />
              </Grid>
            </Grid>
          </MuiPickersUtilsProvider>
          <FormControl className={classes.formControl}>
            <InputLabel id="labelCaption">ラベル</InputLabel>
            <Select
              labelId="labelCaption"
              value={props.config.caption}
              onChange={(e) => props.setCaption(e.target.value)}
            >
              {Object.keys(optionCaption).map((v, k) => 
                <MenuItem value={optionCaption[v]}>
                  {v}
                </MenuItem>
              )}
            </Select>
          </FormControl>
          <FormControl className={classes.formControl}>
            <InputLabel id="labelCommunity">色分け</InputLabel>
            <Select
              labelId="labelCommunity"
              value={props.config.community}
              onChange={(e) => props.setCommunity(e.target.value)}
            >
              {Object.keys(optionCommunity).map((v, k) => 
                <MenuItem value={optionCommunity[v]}>
                  {v}
                </MenuItem>
              )}
            </Select>
          </FormControl>
          <FormControl className={classes.formControl}>
            <InputLabel id="labelOrder">表示順</InputLabel>
            <Select
              labelId="labelOrder"
              value={props.config.order}
              onChange={(e) => props.setOrder(e.target.value)}
            >
              {Object.keys(optionOrder).map((v, k) => 
                <MenuItem value={optionOrder[v]}>
                  {v}
                </MenuItem>
              )}
            </Select>
          </FormControl>
          <FormControl className={classes.formControl}>
            <InputLabel id="labelMaxNodes">最大表示数</InputLabel>
            <Select
              labelId="labelMaxNodes"
              value={props.config.maxNodes}
              onChange={(e) => props.setMaxNodes(e.target.value)}
            >
              {[16, 64, 128, 256, 512, 1024].map((v, k) => 
                <MenuItem value={v}>
                  {v}
                </MenuItem>
              )}
            </Select>
          </FormControl>
          <FormControlLabel
            control={<Switch checked={props.config.hierarchical}
              onChange={(h) => props.setHierarchical(h.target.checked)}
            />}
            label="階層表示"
          />
    </AccordionDetails>
      </Accordion>
    </React.Fragment>
  )
}

export default GraphKnob
