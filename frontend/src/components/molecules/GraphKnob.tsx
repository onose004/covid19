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
import ExpandMoreIcon from '@material-ui/icons/ExpandLess';

import { GraphConfig } from 'components/molecules/GraphView'
import {
  optionCaption, optionCommunity, optionOrder
} from 'components/molecules/GraphView'

const useStyles = makeStyles((theme) => ({
  root: {
    display: "block",
  },
  formControl: {
    display: "block",
    margin: theme.spacing(0, 0, 2, 0),
    minWidth: 120,
  }
}))

type GraphKnobProps = {
  config: GraphConfig,
  setHierarchical: Function,
  setCaption: Function,
  setCommunity: Function,
  setStartDate: Function,
  setEndDate: Function,
  setOrder: Function,
  setMaxNodes: Function,
  setMinDescendant: Function,
}

const GraphKnob: React.FC<GraphKnobProps> = (props) => {
  const classes = useStyles()
  return(
    <div className={classes.root}>
      <MuiPickersUtilsProvider
        utils={DateFnsUtils}
      >
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
              InputLabelProps={{
                shrink: true,
              }}
            />
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
            />
      </MuiPickersUtilsProvider>
      <FormControl className={classes.formControl}>
        <InputLabel id="labelCaption">ラベル</InputLabel>
        <Select
          labelId="labelCaption"
          value={props.config.caption}
          onChange={(e) => props.setCaption(e.target.value)}
        >
          {Object.keys(optionCaption).map((v, k) => 
            <MenuItem value={(optionCaption[v])}>
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
      <FormControl className={classes.formControl}>
        <InputLabel id="labelMinDescendant">クラスター規模</InputLabel>
        <Select
          labelId="labelMinDescendant"
          value={props.config.minDescendant}
          onChange={(e) => props.setMinDescendant(e.target.value)}
        >
          {[2, 4, 8, 16, 32, 64].map((v, k) => 
            <MenuItem value={v}>
              {v}人以上
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
      </div>
  )
}

export default GraphKnob
