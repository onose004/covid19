import React from 'react'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from '@material-ui/core';  
import SettingsIcon from '@material-ui/icons/Settings';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  subtitle: {
    marginBottom: theme.spacing(0),
  },
  icon: {
    fontSize: theme.typography.caption.fontSize,
  },
  caption: {
    marginBottom: theme.spacing(1),
  },
  table: {
    marginBottom: theme.spacing(4),
  },
}))

const Help: React.FC = (props) => {
  const classes = useStyles(props)
  return(
    <React.Fragment>
      <Typography className={classes.subtitle} variant="h6">
        画面操作
      </Typography>
      <Typography variant="caption" className={classes.caption}>
        ClusterViz 画面上の操作方法です
      </Typography>
      <Table size="small" className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell></TableCell>
            <TableCell>マウス操作</TableCell>
            <TableCell>タッチ操作</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell>画面移動</TableCell>
            <TableCell>ドラッグ</TableCell>
            <TableCell>スワイプ</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>ズーム</TableCell>
            <TableCell>スクロール</TableCell>
            <TableCell>ピンチ</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>発生事例詳細をみる</TableCell>
            <TableCell>ノードをマウスオーバー</TableCell>
            <TableCell>ノードをタップ</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>ノードを移動</TableCell>
            <TableCell>ノードをドラッグ</TableCell>
            <TableCell>ノードをドラッグ</TableCell>
          </TableRow>
        </TableBody>
      </Table>
      <Typography className={classes.subtitle} variant="h6">
        表示設定
      </Typography>
      <Typography variant="caption" className={classes.caption}>
        設定アイコン(
        <SettingsIcon className={classes.icon} />
        )
        から画面に表示するノードやラベルを変更できます。
      </Typography>
      <Table size="small" className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell>項目</TableCell>
            <TableCell>説明</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell>開始日</TableCell>
            <TableCell>
              表示する発生事例の開始日を設定します
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>終了日</TableCell>
            <TableCell>
              表示する発生事例の終了日を設定します
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>ラベル</TableCell>
            <TableCell>
              ノードに表示するラベルを設定します
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>色分け</TableCell>
            <TableCell>
              ノードの色分けに利用するラベルを設定します
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>表示順</TableCell>
            <TableCell>
              発生事例の報告日に基づいた表示順を設定します
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>最大表示数</TableCell>
            <TableCell>
              ノードの最大数を設定します
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>クラスター規模</TableCell>
            <TableCell>
              表示するクラスターの人数規模を設定します
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>階層表示</TableCell>
            <TableCell>
              階層型表示に切り替えます
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>

    </React.Fragment>
  )
}

export default Help
