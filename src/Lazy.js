import React, { Component } from 'react';

export default class Lazy extends Component {
  state = {
    hasLoaded: false,
    module: null,
  }
  componentWillMount() {
    if (!__CLIENT__) {
      const module = require('./routes/' + this.props.path); // eslint-disable-line
      this.setState({
        module: module.default,
        hasLoaded: true,
      });
    } else {
      System.import('./routes/' + this.props.path).then(module => { // eslint-disable-line
        this.setState({
          module: module.default,
          hasLoaded: true,
        });
      }, console.error); // eslint-disable-line
    }
  }
  render() {
    return (
      this.state.hasLoaded
        ? <this.state.module {...this.props} />
        : <div>Loading</div>
    );
  }
}
