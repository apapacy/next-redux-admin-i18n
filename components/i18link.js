import React from 'react';
import { routes } from '../app/routes';
const { Link } = routes;

export class I18Link extends React.Component {
  render() {
    let props;
    if (typeof this.props.params === 'object') {
      props = { params: { ...this.props.params } };
    } else {
      props = { params: { } };
    }
    const lang = this.props.url.query.lang;
    if (lang) {
        props.params.lang = lang;
    }
    props.route = this.props.route
    return <Link {...props}>
      { this.props.children }
    </Link>
  }
}
