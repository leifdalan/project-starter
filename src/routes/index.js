import React from 'react';
import { Match } from 'react-router';
import Home from './home';
import Lazy from '../Lazy';
import INeedData from './INeedData';
import IHaveARedirect from './IHaveARedirect';

export default () => (
  <div>
    <Match exactly pattern="/" component={Home} />
    <Match
      exactly
      pattern="/counter"
      render={(...props) =>
        <Lazy
          {...props}
          component="counter"
          path="counter"
        />
      }
    />
    <Match
      exactly
      pattern="/data"
      component={INeedData}
    />
    <Match
      exactly
      pattern="/i-have-a-redirect"
      component={IHaveARedirect}
    />
  </div>
);
