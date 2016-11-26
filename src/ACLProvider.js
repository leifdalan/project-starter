import { Component, PropTypes } from 'react';

const {
  node,
  obj,
} = PropTypes;

export default class ServerDataProvider extends Component {

  static propTypes = {
    context: obj,
    children: node,
  }

  static childContextTypes = {
    accessControl: PropTypes.object,
  }

  getChildContext() {
    return {
      accessControl: this.props.context,
    };
  }

  render() {
    return this.props.children;
  }
}
