import React from 'react';
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,

} from '@material-ui/core';  
import { makeStyles } from '@material-ui/core/styles';

import GraphKnob from 'components/molecules/GraphKnob'
import * as gc from 'api/config'

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

type KnobDialogProps = {
  open: boolean,
  setOpen: Function,
  config: gc.GraphConfig | undefined,
  setConfig: Function,
}

const KnobDialog: React.FC<KnobDialogProps> = (props) => {
  const classes = useStyles()
  const [config, setConfig] = React.useState<gc.GraphConfig | undefined>(undefined)
  React.useEffect(() => {
    setConfig(props.config)
  }, [props.config])
  const handleSetConfig = () => {
    props.setConfig(config)
    props.setOpen(false)
  }
  return(
    <div className={classes.root}>
      <Dialog open={props.open}>
        <DialogTitle>
          表示設定
        </DialogTitle>
        <DialogContent>
          <GraphKnob
            config={config}
            setConfig={setConfig}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => props.setOpen(false)} color="primary">
            キャンセル
          </Button>
          <Button onClick={() => handleSetConfig()} color="primary">
            適用
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default KnobDialog
