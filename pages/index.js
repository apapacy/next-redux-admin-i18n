import React from 'react';
import { I18Link } from '../components/i18link'
import { translate } from 'react-i18next';
import i18n from '../app/i18n';


@translate(['page2', 'common'], { i18n, wait: process.browser })
export default class Page extends React.Component {
   static getInitialProps = async ({ req }) => {
    if (req && !process.browser) return i18n.getInitialProps(req, ['page2', 'common']);
    return {};
  };
  render() {
  const props = this.props;
  console.log('++++++++++++++++++',props)

    return <div>Welcome to next.js!++{props.t('test')}
 Click{' '}
<I18Link route='about' {...props}>
      <a>here</a>
    </I18Link>{ props.userAgent }
    <p>scoped!</p>
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
