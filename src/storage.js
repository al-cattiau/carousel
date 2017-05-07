import axios from 'axios';
import store from './store';
const ROOT_URL = 'http://162.243.152.84';
import { syncFail, syncSuccess } from './actions/SignActions';
const storage = {
  
  getAllKeys : (cb)=> (new Promise((resolve, reject)=>{
    return resolve(cb(null, [
      "reduxPersist:SignReducer", 
      "reduxPersist:TagReducer", 
      "reduxPersist:TaskReducer", 
      "reduxPersist:form", 
      "reduxPersist:routing", 
      "token"
      
    ]));

  })),

  setItem: (key, object, cb)=> (new Promise((resolve, reject)=>{  
    const itemKey = key.split(':')[1];
    const token = localStorage.getItem('token');
    if(!token || token ==='out'){
      // localStorage.setItem(itemKey, global.JSON.stringify(object));
      // cb && cb(null);
      // resolve();
      reject('no login, can not save');
    }else{ 
      axios({
        method: 'post',
        url: `${ROOT_URL}/${itemKey}`,
        data: object,
        headers: {
          authorization: token
        }
      })
        .then((res)=>{
          cb && cb(null, res.data)
          resolve(res.data);
          store.dispatch(syncSuccess());
        })
        .catch((res)=>{
          // cb(res , {});
          reject('can not set to server');
          store.dispatch(syncFail());
        })
    }    
  })),
  getItem: (key, cb)=> (new Promise((resolve, reject)=>{
    const itemKey = key.split(':')[1];
    
    const token = localStorage.getItem('token');
    
    if(!token || token ==='out'){
      reject('no login, can not get');
      // const item = global.JSON.parse(localStorage.getItem(itemKey));
      // if(item){
        // cb && cb(null, item);
        // resolve(item);
      // }else{
        // cb && cb('err in localstorage', null);
      // }
      
    }else{    
      axios.get(`${ROOT_URL}/${itemKey}`, {
        headers: {
          authorization: token
        },
        transformResponse: []
      })
        .then((res)=>{
          cb && cb(null, res.data)
          resolve(res.data);
          store.dispatch(syncSuccess());
        })
        .catch((res)=>{
          reject('can not get ');
          store.dispatch(syncFail());
          // cb(res , {});
        })
    }    

  })),

};

export default storage;