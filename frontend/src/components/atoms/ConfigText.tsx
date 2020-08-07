import React from 'react';
import { GraphConfig } from 'components/molecules/GraphView'

type ConfigTextProps = {
  config: GraphConfig
}

const ConfigText: React.FC<ConfigTextProps> = (props) => {
  const formatDate = (timestamp: Date) => {
    var d = new Date(timestamp)
    var year = d.getFullYear()
    var month = d.getMonth() + 1
    var date = d.getDate()
    return(`${year}年${month}月${date}日`)
  }
  return(
    <React.Fragment>
      {formatDate(props.config.startDate)}
      &nbsp;-&nbsp;
      {formatDate(props.config.endDate)}
      の期間で
      <br />
      {
        (props.config.order === "asc")
          ? "古い"
          : (props.config.order === "desc")
            ? "新しい"
            : ""
      }
      順に最大
      {props.config.maxNodes}
      件を表示中
    </React.Fragment>
  )
}

export default ConfigText;