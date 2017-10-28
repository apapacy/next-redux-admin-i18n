import React from 'react';
import { I18Link } from '../components/i18link'
import TranslatedPage  from '../components/translatedpage'
import { translate } from 'react-i18next';
import i18n from '../app/i18n';
import {reduxPage} from '../app/redux';

import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {namespaceConfig} from 'fast-redux'

import { initStore, startClock, addCount, serverRenderClock } from '../app/redux/store'
import withRedux from 'next-redux-wrapper'



/*const DEFAULT_STATE = {build: 21}

const {actionCreator, getState: getHomepageState} = namespaceConfig('homepage', DEFAULT_STATE)

const bumpBuild = actionCreator(function bumpBuild (state, increment) {
  return {...state, build: state.build + increment}
})

function mapStateToProps (state) {
  return getHomepageState(state)
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({ bumpBuild }, dispatch)
}*/

function mapDispatchToProps(dispatch) {
  return {
    bumpBuild: bindActionCreators(addCount, dispatch),
    startClock: bindActionCreators(startClock, dispatch)
  }
}

// @reduxPage
@withRedux(initStore, null, mapDispatchToProps)
@connect(state => state, mapDispatchToProps)
@translate(['page2', 'common'], { i18n, wait: process.browser })
export default class Page extends TranslatedPage {
  render() {
  const props = this.props;
  console.log('++++++++++++++++++',props)

    return <div>Welcome to next.js!++{props.t('test')}
 Click{' '}
<I18Link route='about' {...props}>
      <a>here</a>
    </I18Link>{ props.userAgent }
    <p>scoped!</p>
    <h3>Current build: {props.count}</h3>
    <p><button onClick={(e) => props.bumpBuild(1)}>Bump build!</button></p>
  <style jsx>{`
    p {
      color: #fff;
    }
    div {
      background: #bbbccc;
    }
    @media (max-width: 600px) {
      div {
        background: #bbbbcc;
      }
    }
  `}</style>
  <style jsx global>{`
    body {
      background: #bbcccc;
    }
    div {
      background: red;
    }
  `}</style></div>
}
}
