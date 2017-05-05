import {
  SIGN_IN,
  SIGN_OUT,
  OPEN_SIGN,
  CLOSE_SIGN,
  SYNC_SUCCESS,
  SYNC_FAIL

} from '../actions/SignActions';



const initialState = {
  isSignIn: false,
  openSign: false,
  syncSuccessful: false
}


const SignReducer = (state=initialState, action) =>{
  const { type } = action;
  switch (type) {
    case SYNC_FAIL:
      return {
        ...state,
        syncSuccessful: false
      }
    case SYNC_SUCCESS:
      return {
        ...state,
        syncSuccessful: true
      }      
    case OPEN_SIGN:
      return {
        ...state,
        openSign: true
      }
    case CLOSE_SIGN:
      return {
        ...state,
        openSign: false
      }      
    case SIGN_IN:
      return {
        ...state,
        isSignIn: true
      };
    case SIGN_OUT:
      return {
        ...state,
        isSignIn: false
      };
    default:
      return state
  }
}


export default SignReducer;