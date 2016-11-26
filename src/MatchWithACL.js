import React, { PropTypes, Component } from 'react';
import {
  Match,
  Redirect,
} from 'react-router';

export default class MatchWithACL extends Component {
  static contextTypes = {
    accessControl: PropTypes.object,
  }

  static propTypes = {
    permission: React.PropTypes.arrayOf(React.PropTypes.string),
    to: React.PropTypes.string,
  }

  componentWillMount() {
    if (this.context.accessControl) {
      const store = this.context.store.getState();
      const permissions = store.user.permissions;
      const hasPermission = permissions.indexOf(this.props.permission);
      if (!hasPermission) {
        this.context.accessControl.addStatus(401);
      }
      this.setState({ hasPermission });
    }
  }

  render() {
    const {
      to,
      ...matchProps
    } = this.props;
    return (
      <div>
        {this.state.hasPermission ?
          <Match
            {...matchProps}
          />
          : <Redirect to={to} />
        }

      </div>
    );
  }
}
