import * as gc from 'api/config'
import * as userApi from 'api/user'
import ReactGA from 'react-ga';

const GA_TRACKING_ID = 'UA-000000-01'

ReactGA.initialize(GA_TRACKING_ID, {
  debug: true
})

export const trackUser = (user: userApi.User) => {
  if(user){
    ReactGA.set({userId: user.userId})
  }
}

export const trackGraphConfig = (conf: gc.GraphConfig): Promise<any> => {
  return new Promise(async (resolve, reject) => {
    try{
      const user = await userApi.getUser()
      const conf = await gc.getGraphConfig() 
      ReactGA.event({
        category: 'GraphConfig',
        action: 'set',
      })
    }catch(e){
      reject()
    }
  })
}

export default trackGraphConfig
