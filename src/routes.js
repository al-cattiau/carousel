import React from 'react';
import { Route } from 'react-router';
import App from './components/App';
import Inbox from './containers/Inbox';



export default (
  <Route path="/" component={App} >
    <Route path='Inbox' component={Inbox} />
  </Route>

);
