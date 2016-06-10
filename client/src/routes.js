import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './components/app';

import Dashboard from './components/dashboard';
import requireAuth from './components/hoc/require_auth';
import SignIn from './containers/authentication/signin';
import SignUp from './containers/authentication/signup';
import NoteShow from './containers/notes/note_show';

export default (
  <Route name="app" path="/" component={App}>
    <IndexRoute component={SignIn} />
    <Route name="signup" path="signup" component={SignUp} />
    <Route name="dashboard" path="dashboard" component={requireAuth(Dashboard)} >
    </Route>
      <Route name="note" path="note/:id" component={requireAuth(NoteShow)} />
  </Route>
)
