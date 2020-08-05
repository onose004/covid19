import React, { useEffect } from 'react';

type GraphViewProps = {
  neo4jUri: string,
  neo4jUser: string,
  neo4jPassword: string,
  config: GraphConfig
}

export type GraphConfig = {
  hierarchical: bool,
  caption: "tag" | "date_label" | "sex" | "address" | "age" | "nationality" | "none",
  community: "_enum_address" | "_enum_sex" | "_enum_age" | "_enum_nationality",
  maxNodes: int,
  startDate: Date,
  endDate: Date,
  order: "asc" | "desc",
}

export const optionCaption = {
  "番号": "tag",
  "日付": "date_label",
  "性別": "sex",
  "居住地": "address",
  "年代": "age",
  "国籍": "nationality",
}

export const optionCommunity = {
  "性別": "_enum_sex",
  "居住地": "_enum_address",
  "年代": "_enum_age",
  "国籍": "_enum_nationality",
}

export const optionOrder = {"古い順": "asc", "新しい順": "desc"}

const GraphView: React.FC = (props: GraphViewProps) => {
  const visRef = React.createRef()
  const formatDate = (date) => {
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
  const startDate = formatDate(props.config.startDate)
  const endDate = formatDate(props.config.endDate)

  var q = `MATCH (c:Case) MATCH (c)-[e:CONTACTED]->(r:Case)`
  q += `WHERE c.date > date('${startDate}') and c.date < date('${endDate}')`
  q += `RETURN * ORDER BY c.date ${props.config.order} LIMIT ${props.config.maxNodes}`

  useEffect(() => {
    console.log(visRef.current.id)
    const config = {
      container_id: visRef.current.id,
      server_url: props.neo4jUri,
      server_user: props.neo4jUser,
      server_password: props.neo4jPassword,
      hierarchical: props.config.hierarchical,
      hierarchical_sort_method: "directed",
      arrows: true,
      labels: {
        "Case": {
          "caption": props.config.caption,
          "community": props.config.community,
          "size": "infected_to",

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
    const vis = new window.NeoVis.default(config)
    vis.render()
  });

  return(
    <div style={{width: "100%", height: "100vh", margin: "0"}}>
      <div id="viz" ref={visRef}
        style={{
          width: "100%",
          height:"100%",
          margin: "0",
        }}
      >
        読み込み中
      </div>
    </div>
  )
}

export default GraphView;
