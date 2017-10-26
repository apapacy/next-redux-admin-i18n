import React from 'react';
import { I18Link } from '../components/i18link'
import { translate } from 'react-i18next';
import i18n from '../app/i18n';


export default class TranslatedPage extends React.Component {
   static getInitialProps = async ({ req }) => {
    if (req && !process.browser) return i18n.getInitialProps(req, ['page2', 'common']);
    return {};
  };
}
