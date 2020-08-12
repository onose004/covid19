import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Container,
  Paper,
  Link,
  Typography,
} from '@material-ui/core';  
import Navbar from 'components/molecules/Navbar'

const useStyles = makeStyles((theme) => ({
  navbar: {
  },
  main: {
    padding: theme.spacing(4, 0),
    backgroundColor: theme.palette.grey[100],
  },
  section: {
    margin: theme.spacing(2, 0),
    padding: theme.spacing(2),
  },
  subheader: {
    marginBottom: theme.spacing(2),
  },
  p: {
    marginBottom: theme.spacing(1),
  },

}))

const Subheader: React.FC = (props) => {
  const classes = useStyles(props)
  return(
    <Typography variant="h6" component="h3"
      className={classes.subheader}
    >
      {props.children}
    </Typography>
  )
}

const Section: React.FC = (props) => {
  const classes = useStyles(props)
  return(
    <Paper className={classes.section}>
      {props.children}
    </Paper>
  )
}

const P: React.FC = (props) => {
  const classes = useStyles(props)
  return(
    <Typography variant="body2" className={classes.p}>
      {props.children}
    </Typography>
  )
}

const Misc: React.FC = (props) => {
  const classes = useStyles(props)
  return(
    <div>
      <Navbar classes={{root: classes.navbar}} />
      <main className={classes.main}>
      <Container>
          <Typography variant="h5" component="h3"
          >
            当サイトについて
          </Typography>
          <Section>
            <P>
              当サイトは自治体発表の新型コロナウイルス感染症 (COVID-19) の発症事例データを基に、
              ネットワーク構造を観察することができるようにするため、
              株式会社 Hashup が開設したものです。
            </P>
            <P>
              自治体による公式情報をネットワーク構造で可視化することで、
              愛知県にお住まいの方や、
              愛知県内に拠点を持つ企業の方、
              愛知県を訪れる方が、
              現状を把握して適切な対策を取れるようにすることを目的としています。
            </P>
          </Section>
          <Section>
            <Subheader>
              Google Analytics の利用について
            </Subheader>
            <P>
当サイトでは、サービス向上やサイトの改善のためにGoogle LLCの提供するアクセス分析のツールであるGoogle Analyticsを利用した計測を行っております。
            </P>
            <P>
              Google Analyticsでは、当サイトが発行するクッキー (Cookie) 等を利用して、
              Webサイトの利用データ（アクセス状況、トラフィック、閲覧環境、IPアドレスなど）を収集しております。クッキーの利用に関してはGoogleのプライバシーポリシーと規約に基づいております。
            </P>
            <P>
              取得したデータはWebサイト利用状況を分析しサービスの改善につなげるため、またはサイト運営者へのレポートを作成するため、その他のサービスの提供に関わる目的に限り、これを使用します。
              （サイト運営者へのレポートでは、クッキーはブラウザ単位で本サイトのユーザー数をカウントするため、IPアドレスはGoogle Analyticsの分析機能を通じてアクセス元の地域分布（国、州・都道府県、都市）やユーザ属性（性別、年齢）を把握するために利用されています。）
            </P>
            <P>
              Google Analyticsの利用規約及びプライバシーポリシーに関する説明については、
              Google Analyticsのサイトをご覧ください。
            </P>
              <P>
                <Link href="https://marketingplatform.google.com/about/analytics/terms/jp://marketingplatform.google.com/about/analytics/terms/jp/" target="_blank">
                  Google アナリティクス利用規約
                </Link>
              </P>
          </Section>
          <Section>
            <Subheader>
              免責事項
            </Subheader>
            <P>
              当サイトに掲載されている情報の正確性については万全を期していますが、
              株式会社 Hashup は利用者が当サイトの情報を用いて行う一切の行為について責任を負うものではありません。
            </P>
            <P>
              また、利用者が当サイトを利用したことにより発生した利用者の損害及び利用者が第三者に与えた損害に対して、責任を負うものではありません。
            </P>
            <P>
              当サイトに掲載されている情報は、予告なしに変更又は削除することがあります。
            </P>
          </Section>
          <Section>
            <Subheader>
              データについて
            </Subheader>
            <P>
              本サイトで公表しているデータは、
              愛知県が発表したデータを基に作成され、
              <Link href="http://linkdata.org/work/rdf1s8260i">
                Link Data
              </Link>
              に公開されたデータを利用しています。
              データの最終更新日時は、こちらを参照してください。
            </P>
          </Section>
      </Container>
        </main>
    </div>
  )
}

export default Misc
