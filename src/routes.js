import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './components/App';
import Inbox from './containers/Inbox';
import Wizard from './components/Wizards';



export default (
  <Route path="/" component={App} >
    <IndexRoute component={Wizard}/>
    <Route path='Inbox' component={Inbox} />
    <Route path='Archive' component={Wizard} />
  </Route>

);
