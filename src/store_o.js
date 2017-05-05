// @flow
import { compose, createStore, combineReducers, applyMiddleware } from 'redux';
import { routerReducer } from 'react-router-redux';
import TaskReducer from './reducers/TaskReducer';
import TagReducer from './reducers/TagReducer';
import SignReducer from './reducers/SignReducer';
import thunk from 'redux-thunk';
import persistState from 'redux-localstorage';
import { reducer as formReducer } from 'redux-form';

const enhancer = compose(
  /* [middlewares] */applyMiddleware(thunk),
  persistState(/*paths, config*/),
);

const store = createStore(
  combineReducers({
    TaskReducer,
    TagReducer,
    SignReducer,
    routing: routerReducer,
    form: formReducer
  }),
  
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  enhancer,
  

);

export default store;
