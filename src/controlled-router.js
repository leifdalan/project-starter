import React, { Component } from 'react';
import BrowserHistory from 'react-history/BrowserHistory';
import { Push } from 'react-history';
import { StaticRouter } from 'react-router';

class RouterWrapper extends Component {

  static propTypes = {
    children: React.Proptypes.node,
  }

  componentWillReceiveProps(nextProps) {
    const { setLocation, historyLocation, update } = nextProps;

    if (update) {
      setLocation(historyLocation);
    }
  }

  render() {
    return this.props.children;
  }
}


export default class ControlledRouter extends Component {
  constructor(props) {
    super(props);

    this.prevPathname = '';
  }

  shouldComponentUpdate(nextProps) {
    return nextProps.location.pathname !== this.props.location.pathname;
  }

  componentDidUpdate() {
    // Scroll to the top left on page changes
    if (window && window.scrollY) {
      window.scroll(0, 0);
    }
  }

  render() {
    const { location, setLocation, children } = this.props;

    return (
      <BrowserHistory>
        {({ history, action, location: historyLocation }) => {
          const historyPathname = historyLocation.pathname;
          const controlledPathname = location.pathname;
          const pathChanged = historyPathname !== controlledPathname;
          const shouldUpdateState = pathChanged && historyPathname !== this.prevPathname;
          const shouldUpdateHistory = pathChanged && !shouldUpdateState;

          // Keep track of previous pathname
          this.prevPathname = historyLocation.pathname;

          return (
            <RouterWrapper
              setLocation={setLocation}
              historyLocation={historyLocation}
              update={shouldUpdateState}
            >
              <StaticRouter
                action={action}
                location={historyLocation}
                onPush={history.push}
                onReplace={history.replace}
                blockTransitions={history.block}
              >
                { shouldUpdateHistory ? <Push path={location.pathname} /> : children }
              </StaticRouter>
            </RouterWrapper>
          );
        }}
      </BrowserHistory>
    )
  }
}
