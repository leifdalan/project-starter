import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';

const Home = state => (
  <div>
    <h1>Home {state.user.name}</h1>

    <p>Link to a route using the &lt;Link&gt; component:</p>
    <div>
      <Link to="/counter">
        Go to Counterd
      </Link>
    </div>
    <div>
      <Link to="/data">
        I need data
      </Link>
    </div>
  </div>
);

export default connect(state => state)(Home);
