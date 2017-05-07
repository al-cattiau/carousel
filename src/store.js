import { compose, createStore, combineReducers, applyMiddleware } from 'redux';
import { routerReducer } from 'react-router-redux';
import TaskReducer from './reducers/TaskReducer';
import TagReducer from './reducers/TagReducer';
import SignReducer from './reducers/SignReducer';
import thunk from 'redux-thunk';
import { reducer as formReducer } from 'redux-form';
import { autoRehydrate } from 'redux-persist';


const enhancer = compose(
  /* [middlewares] */applyMiddleware(thunk),
  autoRehydrate(),
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
