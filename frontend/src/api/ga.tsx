import * as gc from 'api/config'

export const trackGraphConfig = (conf: gc.GraphConfig): Promise<any> => {
  return new Promise((resolve, reject) => {
    try{
      resolve()
    }catch(e){
      reject()
    }
  })
}

