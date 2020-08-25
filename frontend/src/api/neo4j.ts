export const ENABLE_SSL = true
const PORT = ENABLE_SSL ? "443" : "80"
const NEO4J_HOST = 'bolt://ik1-336-28372.vs.sakura.ne.jp'
const NEO4J_LOCATION = ''
export const NEO4J_URI = `${NEO4J_HOST}:${PORT}/${NEO4J_LOCATION}`
export const NEO4J_USER = 'neo4j'
export const NEO4J_PASS = 'pass'
 
export type DataSource = {
  title: string,
  uri: string,
  lastUpdate: Date,
}

export const fetchDataSource = (): Promise<DataSource | undefined> => {
  var neo4j = require('neo4j-driver')
  var driver = neo4j.driver(NEO4J_URI, neo4j.auth.basic(NEO4J_USER, NEO4J_PASS))
  var session = driver.session()
  return new Promise((resolve, reject) => {
    session
      .run('MATCH (d:DataSource) WHERE d.pref_id="aichi" return d')
      .then((result: any) => {
        try{
          const props = result.records[0]._fields[0].properties
          const dataSource: DataSource = {
            title: props.title,
            uri: props.uri,
            lastUpdate: props.last_update,
          }
          resolve(dataSource)
        } catch (e) {
          reject(undefined)
        }
      })
      .catch((e: any) => {
        console.log(e)
        reject(undefined)
      })
      .then(() => {
        session.close()
        driver.close()
      })
  })
}

