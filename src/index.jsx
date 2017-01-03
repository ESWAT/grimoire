import React from 'react';
import {render, unmountComponentAtNode} from 'react-dom';
import {Router, hashHistory} from 'react-router';
import {AppContainer} from 'react-hot-loader';
import {useStrict} from 'mobx';
import {Provider} from 'mobx-react';
import * as stores from './stores';
import styles from './index.css';

// MobX setting that enforces state modification only through actions
useStrict(true);

const root = document.getElementById('root');

const renderApp = () => {
  const routes = require('./routes').default;

  render(
    <AppContainer>
      <Provider {...stores}>
        <Router history={hashHistory}>
          {routes}
        </Router>
      </Provider>
    </AppContainer>,
    root
  );
};

renderApp();

if (module.hot) {
  module.hot.accept('./routes', () => {
    unmountComponentAtNode(root);
    renderApp();
  });
}

require('offline-plugin/runtime').install();
