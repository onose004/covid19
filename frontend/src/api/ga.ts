import ReactGA from 'react-ga';
import * as H from 'history'

const GA_TRACKING_ID = 'UA-000000-01'

export const bindHistoryListen = async (history: H.History) => {
  await ReactGA.initialize(GA_TRACKING_ID, {
    debug: true
  })
  await ReactGA.set({ page: history.location.pathname })
  await ReactGA.pageview("send")

  history.listen(async (location: any) => {
    await ReactGA.set({ page: location.pathname + location.search })
    await ReactGA.pageview("send")
  });
}

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
        Object.keys(graphConfigDiff).forEach(async (key) => {
          const label = `${key}:${graphConfigDiff[key]}`
          await ReactGA.event({
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
