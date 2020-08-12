import React from 'react';
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,

} from '@material-ui/core';  
import { makeStyles } from '@material-ui/core/styles';

import Help from 'components/molecules/Help'

const useStyles = makeStyles((theme) => ({
}))

type HelpDialogProps = {
  open: boolean,
  setOpen: Function,
}

const HelpDialog: React.FC<HelpDialogProps> = (props) => {
  const classes = useStyles()
  return(
    <Dialog open={props.open} scroll={"body"}>
      <DialogTitle>
        ヘルプ
      </DialogTitle>
      <DialogContent>
        <Help />
      </DialogContent>
      <DialogActions>
        <Button onClick={() => props.setOpen(false)} color="primary">
          閉じる
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default HelpDialog
