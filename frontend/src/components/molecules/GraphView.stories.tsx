import React from 'react';
import { storiesOf } from '@storybook/react';
import {
  withKnobs, select, boolean, number, date
} from "@storybook/addon-knobs";

import GraphView from './GraphView'

storiesOf('Molecules/GraphView', module)
  .addDecorator(withKnobs)
  .add('default', () =>
    <div>
      <GraphView
        neo4jUri="bolt://localhost:7687"
        neo4jUser="neo4j"
        neo4jPassword="pass"
        config={{
          hierarchical: boolean("Hierarchical", false),
          caption: select("caption", {
            "番号": "tag",
            "日付": "date_label",
            "性別": "sex",
            "居住地": "address",
            "年代": "age",
            "国籍": "nationality",
          }, 'date_label'),
          community: select("community", {
            "性別": "_enum_sex",
            "居住地": "_enum_address",
            "年代": "_enum_age",
            "国籍": "_enum_nationality",
          }, '_enum_sex'),
          startDate: new Date(date('startDate', new Date('July 1 2020'))),
          endDate: new Date(date('endDate', new Date('July 30 2020'))),
          order: select("order", {"古い順": "asc", "新しい順": "desc"}, "asc"),
          maxNodes: number('maxNodes', 16),
          minDescendant: number('minDescendant', 16),
        }}
      />
    </div>
  )
