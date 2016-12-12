import {
  Component,
  PropTypes,
} from 'react';

const {
  func,
  node,
  object,
  string,
  bool,
} = PropTypes;

export default class DataProvider extends Component {

  constructor(...args) {
    super(...args);
    this.state = {
      hasLoaded: false,
      isLoading: false,
      data: null,
      hadError: false,
    };
  }

  componentWillMount() {
    if (!this.context.serverData) {
      const { dispatch } = this.context.store;
      this.setState({
        isLoading: true,
      });
      dispatch({
        type: `LOAD_START_${this.props.actionKey}`,
      });
      const action = this.props.action();

      if (typeof action.then === 'function') {
        action.then((result) => {
          this.setState({
            isLoading: false,
            hasLoaded: true,
            data: result,
            hadError: false,
          });
          dispatch({
            type: `LOAD_SUCCESS_${this.props.actionKey}`,
            payload: result,
          });
        }, (err) => {
          this.setState({
            isLoading: false,
            hasLoaded: true,
            hadError: true,
            error: err,
          });
          dispatch({
            type: `LOAD_FAILURE_${this.props.actionKey}`,
            payload: err,
            error: err,
          });
        });
      }
    } else if (this.context.serverData.actionResolutions[this.props.actionKey]) {
      this.setState({
        isLoading: false,
        hasLoaded: true,
        data: this.context.serverData.actionResolutions[this.props.actionKey],
        hadError: false,
      });
    } else if (!this.props.deferred) {
      this.context.serverData.addAction(this.props.actionKey, this.props.action);
    }
  }
  render() {
    const {
      isLoading,
      hasLoaded,
      data,
      hadError,
    } = this.state;
    return this.props.children({
      isLoading,
      hasLoaded,
      data,
      hadError,
    });
  }
}

DataProvider.propTypes = {
  children: PropTypes.oneOfType([
    node,
    func,
  ]),
  action: func,
  actionKey: string,
  deferred: bool,
};

DataProvider.contextTypes = {
  serverData: object,
  store: object,
};
