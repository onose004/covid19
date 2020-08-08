import React from 'react';
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from '@material-ui/core';  
import { makeStyles } from '@material-ui/core/styles';
import * as neo4j from 'api/neo4j'
import * as userApi from 'api/user'
import * as ga from 'api/ga'

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1, 1, 0, 0),
  },
}))

type EntryDialogProps = {
  classes?: object,
  open: boolean,
  setOpen: Function,
}

const EntryDialog: React.FC<EntryDialogProps> = (props) => {
  const classes = useStyles(props.classes)
  const [step, setStep] = React.useState<"welcome" | "survey">("welcome")
  const [dataSource, setDataSource] = React.useState<neo4j.DataSource | undefined>(undefined)

  const [user, setUser] = React.useState<userApi.User>(
    userApi.defaultUser
  )

  const handleEntry = async () => {
    await userApi.setUser(user)
    props.setOpen(false)
  }


  React.useEffect(() => {
    const f = async () => {
      const res = await userApi.getUser()
      if(res){
        ga.trackUser(res)
        props.setOpen(false)
      }
    }
    f()

  }, [])
  return(
    <React.Fragment>
      <Dialog open={props.open}>
          {step === "welcome" &&
            <React.Fragment>
              <DialogContent>
                <Typography variant="body2">
                  自治体で発表された新型コロナウイルス感染症の発生事例データの接触情報を基に接触のネットワークグラフ構造を可視化します
                </Typography>
                <Typography variant="body2">
                  一次情報は必ず自治体の発表をあたってください
                </Typography>
                <Typography variant="body2">
                  利用にあたり、利用規約やプライバシーポリシーの内容に同意したものとします
                </Typography>
              </DialogContent>
              <DialogActions>
                <Button onClick={() => setStep("survey")} variant="contained" color="primary">
                  続ける
                </Button>
              </DialogActions>
            </React.Fragment>
        }
        {step === "survey" &&
          <React.Fragment>
            <React.Fragment>
              <DialogTitle>
                調査にご協力ください（任意）
              </DialogTitle>
              <DialogContent>
                <Typography variant="body2">
                  入力頂いた内容は匿名化した上で、
                  本サービスの改善などに利用されます。
                  詳しくはプライバシーポリシーをご確認ください。
                </Typography>
                <FormControl className={classes.formControl}>
                  <InputLabel id="labelAge">年齢</InputLabel>
                  <Select
                    labelId="labelAge"
                    value={user.age}
                    onChange={(e) => {
                      if(typeof(e.target.value) === "string"){
                        setUser({...user, age: e.target.value})
                      }
                    }}
                  >
                    {Object.keys(userApi.optionAge).map((v, k) => 
                    <MenuItem value={userApi.optionAge[v]}>
                      {v}
                    </MenuItem>
                    )}
                  </Select>
                </FormControl>
                <FormControl className={classes.formControl}>
                  <InputLabel id="labelSex">性別</InputLabel>
                  <Select
                    labelId="labelSex"
                    onChange={(e) => {
                      if(typeof(e.target.value) === "string"){
                        setUser({...user, sex: e.target.value})
                      }
                    }}
                    value={user.sex}
                  >
                    {Object.keys(userApi.optionSex).map((v, k) => 
                    <MenuItem value={userApi.optionSex[v]}>
                      {v}
                    </MenuItem>
                    )}
                  </Select>
                </FormControl>
              </DialogContent>
              <DialogActions>
                <Button onClick={() => setStep("welcome")} variant="contained" color="default">
                  戻る
                </Button>
                <Button onClick={handleEntry} variant="contained" color="primary">
                  利用開始
                </Button>
              </DialogActions>
            </React.Fragment>
          </React.Fragment>
        }
      </Dialog>
    </React.Fragment>
  )
}

export default EntryDialog

