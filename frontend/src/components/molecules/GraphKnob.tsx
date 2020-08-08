import React from 'react';
import {
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Select,
  Switch,

} from '@material-ui/core';  
import {
  MuiPickersUtilsProvider,
  DatePicker,
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { makeStyles } from '@material-ui/core/styles';
import * as config from 'api/config'

import {
  optionCaption, optionCommunity, optionOrder
} from 'components/molecules/GraphView'

const useStyles = makeStyles((theme) => ({
  root: {
    display: "block",
  },
  formControl: {
    display: "inline-block",
    margin: theme.spacing(0, 2, 2, 0),
    minWidth: theme.spacing(10),
  }
}))

type GraphKnobProps = {
  config: config.GraphConfig | undefined,
  setConfig: Function,
}

const GraphKnob: React.FC<GraphKnobProps> = (props) => {
  const classes = useStyles()
  if(!props.config){
    return(
      null
      )
  }
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
          onChange={(date) => props.setConfig({...props.config, startDate: date})}
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
          onChange={(date) => props.setConfig({...props.config, endDate: date})}
        />
      </MuiPickersUtilsProvider>
      <FormControl className={classes.formControl}>
        <InputLabel id="labelCaption">ラベル</InputLabel>
        <Select
          labelId="labelCaption"
          value={props.config.caption}
          onChange={(e) => props.setConfig({...props.config, caption: e.target.value})}
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
          onChange={(e) => props.setConfig({...props.config, community: e.target.value})}
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
          onChange={(e) => props.setConfig({...props.config, order: e.target.value})}
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
          onChange={(e) => props.setConfig({...props.config, maxNodes: e.target.value})}
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
          onChange={(e) => props.setConfig({...props.config, minDescendant: e.target.value})}
        >
          {[2, 4, 8, 16, 32, 64].map((v, k) => 
            <MenuItem value={v}>
              {v}人以上
            </MenuItem>
          )}
        </Select>
      </FormControl>
      <FormControlLabel
        control={
          <Switch color="primary" checked={props.config.hierarchical}
            onChange={(e) => props.setConfig({...props.config, hierarchical: e.target.checked})}
          />
        }
        label="階層表示"
      />
      </div>
  )
}

export default GraphKnob
