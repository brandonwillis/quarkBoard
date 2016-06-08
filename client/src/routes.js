import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './components/app';
import Dashboard from './components/dashboard';
import SignIn from './containers/signin';
import SignUp from './containers/signup';

export default (
  <Route name="app" path="/" component={App}>
    <Route name="signin" path="signin" component={SignIn}/>
    <Route name="signup" path="signup" component={SignUp}/>
    <Route name="dashboard" path="dashboard" component={Dashboard}/>
  </Route>
)
