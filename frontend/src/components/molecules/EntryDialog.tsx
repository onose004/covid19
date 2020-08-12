import React from 'react';
import {
  Button,
  Dialog,
  DialogContent,
  DialogActions,
  Link,
  FormControlLabel,
  Typography,
  Switch,
} from '@material-ui/core';  
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1, 0, 0, -1),
  },
  switchRoot: {
  }
}))

type EntryDialogProps = {
  classes?: object,
  open: boolean,
  setOpen: Function,
}

const EntryDialog: React.FC<EntryDialogProps> = (props) => {
  const classes = useStyles(props.classes)
  const [agreeUsageTrack, setAgreeUsageTrack] = React.useState(true)

  const handleEntry = async () => {
    await localStorage.setItem("agreeUsageTrack", agreeUsageTrack? "agree" : "disagree")
    props.setOpen(false)
  }

  React.useEffect(() => {
    const f = async () => {
      const agreeUsageTrack = localStorage.getItem("agreeUsageTrack")
      if(agreeUsageTrack){
        props.setOpen(false)
      }
    }
    f()
  }, [props])

  return(
    <React.Fragment>
      <Dialog open={props.open}>
        <React.Fragment>
          <DialogContent>
            <Typography variant="body2">
              自治体で発表された新型コロナウイルス感染症の発生事例データの接触情報を基に接触のネットワークグラフ構造を可視化します。
            </Typography>
            <Typography variant="body2">
              一次情報は必ず自治体の発表をあたってください。
            </Typography>
            <Typography variant="body2">
              利用にあたり、
              <Link href="/about" target="_blank">
                プライバシーポリシー
              </Link>
              の内容に同意したものとします。
            </Typography>
            <FormControlLabel
              className={classes.formControl}
              label="サービス改善のために利用状況の共有に協力する"
              control={
                <Switch
                  classes={{root: classes.switchRoot}}
                  color="primary"
                  checked={agreeUsageTrack}
                  onChange={e => setAgreeUsageTrack(e.target.checked)}
                />
              }
            />
          </DialogContent>
          <DialogActions>
            <Button
              endIcon={
                <ChevronRightIcon />
              }
              onClick={() => handleEntry()} variant="contained" color="primary">
              続ける
            </Button>
          </DialogActions>
        </React.Fragment>
      </Dialog>
    </React.Fragment>
  )
}

export default EntryDialog

