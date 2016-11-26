import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import actions from './actions';

import ControlledRouter from './controlled-router';
import Routes from './routes';

const App = ({ router, setLocation }) => (
  <ControlledRouter location={router} setLocation={setLocation}>
    <Routes />
  </ControlledRouter>
);

const stateToProps = ({ router }) => ({ router });

const dispatchToProps = dispatch => ({
  setLocation: routerState => dispatch(actions.setLocation(routerState)),
});

App.propTypes = {
  router: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  setLocation: PropTypes.func,
};

export default connect(stateToProps, dispatchToProps)(App);
