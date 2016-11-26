import { connect } from 'react-redux';
import React, { PropTypes } from 'react';
import actions from '../actions';

const {
  func,
  object,
} = PropTypes;

const Counter = ({ counter, dispatch }) => (
  <div>
    <h1>Counter</h1>
    {counter}
    <hr />

    <button onClick={() => dispatch(actions.nextStep())}>next</button>
    <button onClick={() => dispatch(actions.prevStep())}>prev</button>
    <hr />

    <a href="javascript:;" onClick={() => dispatch(actions.setLocation({ // eslint-disable-line
      pathname: '/',
    }))}
    >
      Link back home using a Redux action
    </a>
  </div>
);

const stateToProps = ({ counter }) => ({ counter });

Counter.propTypes = {
  counter: object, // eslint-disable-line
  dispatch: func,
};

export default connect(stateToProps)(Counter);
