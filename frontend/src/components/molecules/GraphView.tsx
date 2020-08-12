import React from 'react';
import {
  CircularProgress,
} from '@material-ui/core';  
import * as api from 'api/neo4j'
import * as gc from 'api/config'

type GraphViewProps = {
  config: gc.GraphConfig | undefined
}

interface StringKeyObject {
  [key: string]: string;
}

export const optionCaption: StringKeyObject = {
  "番号": "tag",
  "日付": "date_label",
  "性別": "sex",
  "居住地": "address",
  "年代": "age",
  "国籍": "nationality",
}

export const optionCommunity: StringKeyObject = {
  "性別": "_enum_sex",
  "居住地": "_enum_address",
  "年代": "_enum_age",
  "国籍": "_enum_nationality",
}

export const optionOrder: StringKeyObject = {
  "古い順": "asc", "新しい順": "desc"
}

const GraphView: React.FC<GraphViewProps> = (props) => {
  const formatDate = (date: Date) => {
    var d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) 
      month = '0' + month;
    if (day.length < 2) 
      day = '0' + day;

    return [year, month, day].join('-');
  }

  const renderGraph = () => {
    if(props.config){
      const startDate = formatDate(props.config.startDate)
      const endDate = formatDate(props.config.endDate)
      var q = `MATCH (c:Case) MATCH (c)-[e:CONTACTED*1..]->(r:Case) `
      q += `WHERE c.date > date('${startDate}') AND c.date < date('${endDate}') `
      q += `AND c.n_descendant > ${props.config.minDescendant} `
      q += `RETURN * ORDER BY c.date ${props.config.order} LIMIT ${props.config.maxNodes} `
      const config = {
        encrypted: api.ENABLE_SSL ? "ENCRYPTION_ON" : "ENCRYPTION_OFF",
        container_id: "viz",
        server_url: api.NEO4J_URI,
        server_user: api.NEO4J_USER,
        server_password: api.NEO4J_PASS,
        hierarchical: props.config.hierarchical,
        hierarchical_sort_method: "directed",
        arrows: true,
        labels: {
          "Case": {
            "caption": props.config.caption,
            "community": props.config.community,
            "size": "n_child",

            "title_properties": [
              "tag",
              "date",
              "sex",
              "address",
              "pref",
              "age",
              "note",
              "nationality",
            ]
          }
        },
        relationships: {
          "CONTACTED": {
            "thickness": "weight",
            "caption": false 
          }
        },
        initial_cypher: q,
        console_debug: false,
      };
      // @ts-ignore
      const vis = new window.NeoVis.default(config)
      vis.render()
    }
  }

  React.useEffect(() => {
    renderGraph()

  }, [props.config]);

  return(
    <React.Fragment>
      <div style={{width: "100%", height: "100vh", margin: "0"}}>
        <div id="viz"
          style={{
            width: "100%",
              height:"100%",
              margin: "0",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
          }}
        >
          <CircularProgress />
        </div>
      </div>
    </React.Fragment>
  )
}

export default GraphView;
