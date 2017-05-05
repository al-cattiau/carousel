import React from 'react';
import ReactDOM from 'react-dom';
import { Router, browserHistory, applyRouterMiddleware } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import routes from './routes';
import store from './store';
import { useScroll } from 'react-router-scroll';
import { Provider } from 'react-redux';
import { persistStore } from 'redux-persist';
const history = syncHistoryWithStore(browserHistory, store)


const persistor =  persistStore(store, {
  blacklist: ['SignReducer','routing','form']
});

ReactDOM.render(
  <Provider store={store} persistor={persistor}>
    <Router history={history} routes={routes} render={applyRouterMiddleware(useScroll())} />
  </Provider>,
  document.getElementById('root')
);
