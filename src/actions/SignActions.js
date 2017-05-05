export const SIGN_IN = 'SIGN_IN';
export const SIGN_OUT = 'SIGN_OUT';
export const OPEN_SIGN = 'OPEN_SIGN';
export const CLOSE_SIGN = 'CLOSE_SIGN';
export const SYNC_SUCCESS = 'SYNC_SUCCESS';
export const SYNC_FAIL = 'SYNC_FAIL';

export const syncFail = ()=>({
  type: SYNC_FAIL,
});

export const syncSuccess = ()=>({
  type: SYNC_SUCCESS,
});

export const signIn = ()=>({
  type: SIGN_IN,
});

export const openSignDialog = ()=>({
  type: OPEN_SIGN,
});

export const closeSignDialog = ()=>({
  type: CLOSE_SIGN,
});


export const signOut = ()=>({
  type: SIGN_OUT,
});

export const signInAndCloseDialog = ()=>(dispatch)=>{
  dispatch(signIn());
  dispatch(closeSignDialog());
}

export const signOutAndCloseDialog = ()=>(dispatch)=>{
  dispatch(signOut());
  dispatch(closeSignDialog());
}