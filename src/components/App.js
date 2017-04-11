import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
import './App.css';
import Leftlist from '../containers/LeftList';


injectTapEventPlugin();


export default (props) => (
   <MuiThemeProvider>
        <div className="container">
          <div className="leftList">
            <Leftlist />
          </div>
          <div className="right">
            <div className="content">
              {props.children}
            </div>
          </div>
        </div>
      </MuiThemeProvider>
)
    
     
