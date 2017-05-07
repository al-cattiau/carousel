import { persistStore } from 'redux-persist';
import storage from './storage';
import store from './store';

const persistor =  persistStore(store, { 
  whitelist: ['TagReducer','TaskReducer'],
  storage,
  serialize: false

 }, ()=>{
   console.log('------------------------------------');
   console.log('complete');
   console.log('------------------------------------');
 });



 export default persistor;