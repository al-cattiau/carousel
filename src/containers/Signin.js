import React, { Component } from 'react';
import Divider from 'material-ui/Divider';
import RaisedButton from 'material-ui/RaisedButton';
import { SubmissionError } from 'redux-form';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import {
  TextField,
} from 'redux-form-material-ui';
import axios from 'axios';
const ROOT_URL = 'http://162.243.152.84';
import * as signActions from '../actions/SignActions';
import persistor from '../persistor';



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
    return axios.post(`${ROOT_URL}/signin`,{email, password})
      .then((res)=>{
        localStorage.setItem('token', res.data.token); 
        this.props.signInAndCloseDialog();
        this.rehydrate();
        persistor.resume();
      })
      .catch((err)=>{
        if(err.response.status === 401){
          throw new SubmissionError({ password: 'invalid password or email.' })
        }
      });
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

  rehydrate(){
    axios.get(`${ROOT_URL}/All`, {
        headers: {
          authorization: localStorage.getItem('token')
        },
        transformResponse: []
      })
        .then((res)=>{
          persistor.rehydrate(res.data);
        })
  }

}


// Decorate the form component
const  SigninForm  = reduxForm({
  form: 'signin', // a unique name for this form
  validate
})(Signin);
const SigninFormWithReducer = connect(null, signActions)(SigninForm);
export default SigninFormWithReducer;
