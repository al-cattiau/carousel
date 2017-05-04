import {
  SIGN_IN,
  SIGN_OUT

} from '../actions/SignActions';



const initialState = {
  isSignIn: false
}


const SignReducer = (state=initialState, action) =>{
  const { type } = action;
  switch (type) {
    case SIGN_IN:
      return {
        isSignIn: true
      };
    case SIGN_OUT:
      return {
        isSignIn: false
      };
    default:
      return state
  }
}


export default SignReducer;