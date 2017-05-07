import React from 'react';
import ReactDOM from 'react-dom';
import { Router, browserHistory, applyRouterMiddleware } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import routes from './routes';
import store from './store';
import { useScroll } from 'react-router-scroll';
import { Provider } from 'react-redux';
import persistor from './persistor';

const history = syncHistoryWithStore(browserHistory, store)
const token = localStorage.getItem('token');
import { signIn } from './actions/SignActions';
// persistor.pause();
if(token && token!=='out'){
  store.dispatch(signIn());
  // persistor.resume();

}


ReactDOM.render(
  <Provider store={store} persistor={persistor}>
    <Router history={history} routes={routes} render={applyRouterMiddleware(useScroll())} />
  </Provider>,
  document.getElementById('root')
);
