import React from 'react';
import {I18Link} from '../components/i18link';
import Head from 'next/head';
import Test from '../components/test'

export default class extends React.Component {
  static async getInitialProps({ req }) {
    const userAgent = req ? req.headers['user-agent'] : navigator.userAgent
    return { userAgent }
  }

  render() {
    return  <div>
    <Head>
      <title>My page title</title>
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>
    <I18Link route='index' {...this.props}><a>Hello <Test/>!</a></I18Link>
  </div>
}
}
