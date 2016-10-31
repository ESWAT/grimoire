import React from 'react';
import {Router, Route, IndexRoute, hashHistory} from 'react-router';
import App from './views/App';
import Compose from './views/Compose';
import Home from './views/Home';
import Edit from './views/Edit';
import Journey from './views/Journey';

const routes = (
  <Router history={hashHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Home} />
      <Route path="/compose" component={Compose} />
      <Route path="/edit/:id"  component={Edit} />
      <Route path="/journey" component={Journey} />
    </Route>
  </Router>
);

export default routes;
