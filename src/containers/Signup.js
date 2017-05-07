import React, { Component } from 'react';
import Divider from 'material-ui/Divider';
import RaisedButton from 'material-ui/RaisedButton';
import { Field, reduxForm } from 'redux-form';
import { SubmissionError } from 'redux-form';
import { connect } from 'react-redux';
import {
  TextField,
} from 'redux-form-material-ui';
import axios from 'axios';
const ROOT_URL = 'http://localhost:3090';
import * as signActions from '../actions/SignActions';
import persistor from '../persistor';

const inputStyle = {
  margin: '0px 20px',
}


  const validate = ({email, password, confirm})=>{
    let error={};
    if(!confirm){
      error.confirm = 'not match to password.';
    }
    if (confirm !==password ){
      error.confirm = 'not match to password.';
    }
    if(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)){
      error.email = 'Invalid email';
    }
    if(!password){
      error.password = 'required';
    }
    return error;
    
  }

/*const renderTextField = ({ input, label, meta: { touched, error }, ...custom }) => (
  <TextField hintText={label}
    errorText={touched && error}
    {...input}
    {...custom}
  />
)*/


class Signup extends Component{
  handleFormSubmit({email, password}){
    return axios.post(`${ROOT_URL}/signup`,{email, password})
      .then((res)=>{
        localStorage.setItem('token', res.data.token); 
        this.props.signInAndCloseDialog();
        persistor.resume();

      })
      .catch((err)=>{
        if(err.response.status===422){
          throw new SubmissionError({ email: 'email is in used.' });
        }else{
          throw new SubmissionError({ email: 'some thing\'s happen.' });
        }

      });

  }

  render(){
    const { handleSubmit, invalid, submitting } = this.props;
    return (
      <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
        <Field  name='email' hintText='email address' component={TextField} underlineShow={false} style={inputStyle}/>
        <Divider />
        <Field type={'password'} name='password' hintText='password' component={TextField} underlineShow={false} style={inputStyle}/>
        <Divider />
        <Field type={'password'} name='confirm'  hintText='confirm password' component={TextField} underlineShow={false} style={inputStyle} />
        <RaisedButton containerElement={<button action='submit'/>} disabled={invalid ||submitting} label='Submit' primary={true} fullWidth={true}/>
      </form>
    )
  }
}
// Decorate the form component
const  SignupForm  = reduxForm({
  form: 'signup', // a unique name for this form
  validate,
}, null,signActions )(Signup);

const SignupFormWithReducer = connect(null, signActions)(SignupForm);
export default SignupFormWithReducer;





