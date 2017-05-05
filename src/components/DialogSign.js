import React, { Component } from 'react';
import {Tabs, Tab} from 'material-ui/Tabs';
import Signin from '../containers/Signin.js';
import Signup from '../containers/Signup.js';

const highlightTabStyle= {
  backgroundColor: 'white',
  color: '#00BCD4'
}

const normalTabStyle= {

  backgroundColor: '#E0E0E0',
  color: 'black'  
}

class Sign extends Component {

  constructor(props) {
    super(props);
    this.state = {
      value: 'Sign In',
    };
  }

  handleChange = (value) => {
    this.setState({
      value: value,
    });
  };

  render(){
    return (
      <div>
        <Tabs
          value={this.state.value}
          onChange={this.handleChange}
        >
          <Tab label='Sign Up' value='Sign Up' style={this.state.value==='Sign Up'?highlightTabStyle:normalTabStyle} >
            <Signup />
          </Tab>
          <Tab label='Sign In' value='Sign In' style={this.state.value==='Sign In'?highlightTabStyle:normalTabStyle}>
            <Signin />
           </Tab> 
        </Tabs>
        
      </div>
    );
  }
}


export default Sign;