import React, { Component } from 'react';
import Divider from 'material-ui/Divider';
import RaisedButton from 'material-ui/RaisedButton';
import { Field, reduxForm } from 'redux-form';
import TextField from 'material-ui/TextField';


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

const renderTextField = ({ input, label, meta: { touched, error }, ...custom }) => (
  <TextField hintText={label}
    errorText={touched && error}
    {...input}
    {...custom}
  />
)


class Signup extends Component{
  state = { error: null }
  handleFormSubmit({email, password}){

  }

  render(){
    const { handleSubmit, invalid } = this.props;
    return (
      <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
        <Field  name='email' hintText='email address' component={renderTextField} underlineShow={false} style={inputStyle}/>
        <Divider />
        <Field type={'password'} name='password' hintText='password' component={renderTextField} underlineShow={false} style={inputStyle}/>
        <Divider />
        <Field type={'password'} name='confirm'  hintText='confirm password' component={renderTextField} underlineShow={false} style={inputStyle}/>
        <RaisedButton disabled={invalid} label='Submit' primary={true} fullWidth={true}/>
      </form>
    )
  }
}
// Decorate the form component
const  SignupForm  = reduxForm({
  form: 'signup', // a unique name for this form
  validate,
})(Signup);
export default SignupForm;





