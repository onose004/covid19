import * as gc from 'api/config'
import ReactGA from 'react-ga';

const GA_TRACKING_ID = 'UA-000000-01'

ReactGA.initialize(GA_TRACKING_ID, {
  debug: true
})

interface StringKeyObject {
  [key: string]: string;
}

export const trackGraphConfigDiff = (graphConfigDiff: StringKeyObject): Promise<any> => {
  return new Promise(async (resolve, reject) => {
    try{
      const agreeUsageTrack = localStorage.getItem("agreeUsageTrack")
      if(!agreeUsageTrack){
        reject()
      }
      if(agreeUsageTrack === "agree"){
        Object.keys(graphConfigDiff).forEach(key => {
          const label = `${key}:${graphConfigDiff[key]}`
          ReactGA.event({
            category: 'GraphConfig',
            action: 'set',
            label: label,
          })
        })
      }
      resolve()
    }catch(e){
      reject()
    }
  })
}

export default trackGraphConfigDiff 
