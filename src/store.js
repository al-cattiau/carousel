// @flow
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { routerReducer } from 'react-router-redux';
import TaskReducer from './reducers/TaskReducer';
import TagReducer from './reducers/TagReducer';
import thunk from 'redux-thunk';



const store = createStore(
  combineReducers({
    TaskReducer,
    TagReducer,
    routing: routerReducer,
  }),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  applyMiddleware(thunk),

);

export default store;
