
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

export type User = {
  userId: string,
  sex: string,
  age: string,
}
const generateUuid = () => {  
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'  
    .replace(/x/g, () => Math.floor(Math.random() * 16).toString(16))  
    .replace(/y/g, () => (Math.floor(Math.random() * 4) + 8).toString(16))  
  ;  
};  

export const defaultUser: User = {
  userId: generateUuid(),
  sex: "na",
  age: "na",
}

export const setUser = (res: User): Promise<any> => {
  return new Promise((resolve, reject) => {
    try{
      const val: string = JSON.stringify(res)
      localStorage.setItem("user", val)
      resolve()
    }catch(e){
      reject()
    }
  })
}

export const getUser = (): Promise<User | undefined> => {
  return new Promise((resolve, reject) => {
    try{
      const value = localStorage.getItem("user")
      if(value){
        const user: User = JSON.parse(value)
        if(user){
          resolve(user)
        }
      }else{
        resolve(undefined)
      }
    }catch(e){
      reject(undefined)
    }
  })
}

export default User
