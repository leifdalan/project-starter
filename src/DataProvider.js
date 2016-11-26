import {
  Component,
  PropTypes,
} from 'react';

const {
  func,
  node,
  object,
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
      this.setState({
        isLoading: true,
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
        }, (err) => {
          this.setState({
            isLoading: false,
            hasLoaded: true,
            hadError: true,
            error: err,
          });
          console.error(err); // eslint-disable-line
        });
      }
    } else {
      if (this.context.serverData.actionResolutions[0]) {
        this.setState({
          isLoading: false,
          hasLoaded: true,
          data: this.context.serverData.actionResolutions[0],
          hadError: false,
        });
      } else {
        this.context.serverData.addAction(this.props.action);
      }
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
};

DataProvider.contextTypes = {
  serverData: object,
};
