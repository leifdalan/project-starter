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
    serverData: PropTypes.object,
  }

  state = {
    hasLoaded: false,
    isLoading: false,
    data: null,
  }

  getChildContext() {
    return {
      serverData: this.props.context,
    };
  }

  render() {
    return this.props.children;
  }
}
