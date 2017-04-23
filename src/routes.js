import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './containers/App';
import Inbox from './containers/Inbox';
import Wizard from './components/Wizards';
import Tag from './containers/Tag';
import Forecast from './containers/Forecast';
import Trash from './containers/Trash';
import Archive from './containers/Archive';
import AddTag from './containers/AddTag';


export default (
  <Route path="/" component={App} >
    <IndexRoute component={Wizard}/>
    <Route path='Inbox' component={Inbox} />
    <Route path='Archive' component={Archive} />
    <Route path='Tag' component={Tag} >
      <Route path='add' component={AddTag}/>
    </Route>
    <Route path='Forecast' component={Forecast} />
    <Route path='Trash' component={Trash} />
  </Route>

);

