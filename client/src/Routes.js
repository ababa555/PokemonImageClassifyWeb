import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Main from './pages/Main';

const Routes = () => (
  <Switch>
    <Route exact path="/" render={(props) => <Main {...props} />} />
  </Switch>
);

export default Routes;