import App from './views/App';
import Compose from './views/Compose';
import Home from './views/Home';
import Edit from './views/Edit';
import Journey from './views/Journey';

const routes = {
  path: '/',
  component: App,
  indexRoute: {
    component: Home,
  },
  childRoutes: [
    {
      path: '/compose',
      component: Compose,
    },
    {
      path: '/edit/:id',
      component: Edit,
    },
    {
      path: '/journey',
      component: Journey,
    },
  ],
};

export default routes;
