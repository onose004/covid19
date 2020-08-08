export type GraphConfig = {
  hierarchical: boolean,
  caption: "tag" | "date_label" | "sex" | "address" | "age" | "nationality" | "none",
  community: "_enum_address" | "_enum_sex" | "_enum_age" | "_enum_nationality",
  maxNodes: number,
  startDate: Date,
  endDate: Date,
  order: "asc" | "desc",
  minDescendant: number,
}

export const defaultGraphConfig: GraphConfig = {
  hierarchical: false,
  caption: 'sex',
  community: '_enum_sex',
  startDate: new Date('July 1 2020'),
  endDate: new Date(),
  order: "desc",
  maxNodes: 256,
  minDescendant: 4,
}

export const setGraphConfig = (conf: GraphConfig): Promise<any> => {
  return new Promise((resolve, reject) => {
    try{
      const json: string = JSON.stringify(conf)
      localStorage.setItem("graphConfig", json)
      resolve()
    }catch(e){
      reject()
    }
  })
}

export const getGraphConfig= (): Promise<GraphConfig> => {
  return new Promise((resolve, reject) => {
    try{
      const json = localStorage.getItem("graphConfig")
      if(json){
        const conf: GraphConfig = JSON.parse(json)
        resolve(conf)
      }
      resolve(defaultGraphConfig)
    }catch(e){
      reject(defaultGraphConfig)
    }
  })
}

export default GraphConfig
