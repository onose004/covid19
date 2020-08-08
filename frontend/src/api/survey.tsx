interface StringKeyObject { [key: string]: string}

export const optionAge: StringKeyObject = {
  "無回答": "na",
  "10歳未満": "0",
  "10代": "10",
  "20代": "20",
  "30代": "30",
  "40代": "40",
  "50代": "50",
  "60代": "60",
  "その他": "other",
}


export const optionSex: StringKeyObject = {
  "無回答": "na",
  "男性": "male",
  "女性": "female",
  "その他": "other",
}

export type SurveyResponse = {
  sex: string,
  age: string,
}

export const setSurveyResponse = (res: SurveyResponse): Promise<any> => {
  return new Promise((resolve, reject) => {
    try{
      const val: string = `${res.sex},${res.age}`
      localStorage.setItem("surveyResponse", val)
      resolve()
    }catch(e){
      reject()
    }
  })
}

export const getSurveyResponse = (): Promise<SurveyResponse | undefined> => {
  return new Promise((resolve, reject) => {
    try{
      const value = localStorage.getItem("surveyResponse")
      if(value){
        const vals = value.split(",")
        resolve({sex: vals[0], age: vals[1]})
      }else{
        resolve(undefined)
      }
    }catch(e){
      reject(undefined)
    }
  })
}

export default SurveyResponse
