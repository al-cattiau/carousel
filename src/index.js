import React from 'react';
import ReactDOM from 'react-dom';
import { Router, browserHistory, applyRouterMiddleware } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import routes from './routes';
import store from './store';
import { useScroll } from 'react-router-scroll';
import { Provider } from 'react-redux';

const history = syncHistoryWithStore(browserHistory, store)

ReactDOM.render(
  <Provider store={store}>
    <Router history={history} routes={routes} render={applyRouterMiddleware(useScroll())} />
  </Provider>,
  document.getElementById('root')
);
