import React from 'react';
import {
  AppBar,
  Button,
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Link,
  Typography,
  Toolbar as MuiToolbar,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Select,
  Switch,
  CssBaseline,
} from '@material-ui/core';  
import { makeStyles } from '@material-ui/core/styles';
import * as api from 'api/neo4j'
import * as survey from 'api/survey'



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
  const [dataSource, setDataSource] = React.useState<api.DataSource | undefined>(undefined)

  const [surveyResponse, setSurveyResponse] = React.useState<survey.SurveyResponse>(
    {sex: "na", age: "na"}
  )

  const handleEntry = async () => {
    await survey.setSurveyResponse(surveyResponse)
    props.setOpen(false)
  }


  React.useEffect(() => {
    const f = async () => {
      const res = await survey.getSurveyResponse()
      if(res){
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
                    value={surveyResponse.age}
                    onChange={(e) => {
                      if(typeof(e.target.value) === "string"){
                        setSurveyResponse({...surveyResponse, age: e.target.value})
                      }
                    }}
                  >
                    {Object.keys(survey.optionAge).map((v, k) => 
                    <MenuItem value={survey.optionAge[v]}>
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
                        setSurveyResponse({...surveyResponse, sex: e.target.value})
                      }
                    }}
                    value={surveyResponse.sex}
                  >
                    {Object.keys(survey.optionSex).map((v, k) => 
                    <MenuItem value={survey.optionSex[v]}>
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

