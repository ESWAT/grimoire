import React from 'react';
import {render, unmountComponentAtNode} from 'react-dom';
import {Router, hashHistory} from 'react-router';
import {AppContainer} from 'react-hot-loader';
import {useStrict} from 'mobx';
import {Provider} from 'mobx-react';
import * as stores from './stores';
import styles from './index.css';

useStrict(true);

const root = document.getElementById('root');

const renderApp = () => {
  const routes = require('./routes').default;

  render(
    <AppContainer>
      <Provider {...stores} children={routes} />
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

import {install} from 'offline-plugin/runtime';
install();
