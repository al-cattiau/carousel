import React, { Component } from 'react';
import Divider from 'material-ui/Divider';
import RaisedButton from 'material-ui/RaisedButton';
import { Field, reduxForm } from 'redux-form';
import {
  TextField,
} from 'redux-form-material-ui';

const inputStyle = {
  margin: '0px 20px',
}


const validate = ({email, password, confirm})=>{
  let error = {};
  if(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)){
    error.email = 'Invalid email';
  }
  if(!password){
    error.password = 'required';
  }
  return error;
  
}    

class Signin extends Component{ 
  handleFormSubmit({email, password}){

  }
  render(){
    const { handleSubmit, invalid } = this.props;

    return (
      <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
        <Field  name='email' hintText='email address' component={TextField} underlineShow={false} style={inputStyle}/>
        <Divider />
        <Field type={'password'}  name='password' hintText='password' component={TextField} underlineShow={false} style={inputStyle}/>
        <RaisedButton disabled={invalid} label='Submit' primary={true} fullWidth={true} containerElement={<button action='submit'/>}/>
      </form>
    )
  }

}


// Decorate the form component
const  SigninForm  = reduxForm({
  form: 'signin', // a unique name for this form
  validate
})(Signin);
export default SigninForm;
