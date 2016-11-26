import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import appReducer from './reducer';
import App from './app';

const store = createStore(appReducer, window.__data);

const rootEl = document.getElementById('root');
const renderApp = () => {
  ReactDOM.render(
    <AppContainer>
      <Provider store={store}>
        <App />
      </Provider>
    </AppContainer>,
    rootEl
  );
};

if (module.hot) {
  module.hot.accept('./reducer', () => {
    store.replaceReducer(appReducer);
  });

  module.hot.accept('./app', renderApp);
}

renderApp();
