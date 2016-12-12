import React from 'react';
import isEmpty from 'lodash/isEmpty';
import { renderToString } from 'react-dom/server';
import { ServerRouter, createServerRenderContext } from 'react-router';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import appReducer from './src/reducer';
import App from './src/routes';
import Html from './src/Html';
import createServerDataContext from './src/createServerDataContext';
import ServerDataProvider from './src/ServerDataProvider';

const express = require('express');
const devMiddleware = require('webpack-dev-middleware'); // eslint-disable-line
const hotMiddleware = require('webpack-hot-middleware'); // eslint-disable-line
const webpack = require('webpack');

const config = require('./webpack.config.dev');

const store = createStore(appReducer);
const app = express();
const compiler = webpack(config);

// Stubbing some kind of auth step.
store.dispatch({
  type: 'SET_USER',
  payload: {
    id: 1,
    name: 'Leif Dalan',
    permissions: ['read'],
  },
});

app.use(express.static('static'));
app.use(hotMiddleware(compiler));
app.use(devMiddleware(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath,
}));

app.use('/', (req, res) => {
  store.dispatch({
    type: 'LOCATION_CHANGE',
    router: {
      pathname: req.url,
      search: '',
      hash: '',
    },
  });

  // first create a context for <ServerRouter>, it's where we keep the
  // results of rendering for the second pass if necessary
  const context = createServerRenderContext();
  const dataContext = createServerDataContext();
  // render the first time
  let markup = renderToString(
    <Html store={store}>
      <ServerDataProvider
        context={dataContext}
      >
        <ServerRouter
          location={req.url}
          context={context}
        >
          <Provider store={store}>
            <App />
          </Provider>
        </ServerRouter>
      </ServerDataProvider>
    </Html>,
  );

  // get the result
  const result = context.getResult();
  const { actions } = dataContext.getActions();
  // the result will tell you if it redirected, if so, we ignore
  // the markup and send a proper redirect.
  if (result.redirect) {
    res.writeHead(result.code, {
      Location: result.redirect.pathname,
    });
    res.end();
  } else {
    // the result will tell you if there were any misses, if so
    // we can send a 404 and then do a second render pass with
    // the context to clue the <Miss> components into rendering
    // this time (on the client they know from componentDidMount)
    if (result.missed) {
      res.writeHead(404);
      markup = renderToString(
        <Html store={store}>
          <ServerRouter
            location={req.url}
            context={context}
          >
            <Provider store={store}>
              <App />
            </Provider>
          </ServerRouter>
        </Html>,
      );
    }
    if (!isEmpty(actions)) {
      const promises = Object.keys(actions)
        .map(key => dataContext.executeAction(key, actions[key]));
      Promise.all(promises).then(() => {
        markup = renderToString(
          <Html store={store}>
            <ServerDataProvider
              context={dataContext}
            >
              <ServerRouter
                location={req.url}
                context={context}
              >
                <Provider store={store}>
                  <App />
                </Provider>
              </ServerRouter>
            </ServerDataProvider>
          </Html>,
        );
        res.write(markup);
        res.end();
      });
    } else {
      res.write(markup);
      res.end();
    }
  }
});

app.listen(8080);
