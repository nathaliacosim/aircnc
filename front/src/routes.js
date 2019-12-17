import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Login from './pages/Auth/Login';
import CreateLogin from './pages/Auth/CreateLogin';
import Dashboard from './pages/Dashboard';
import New from './pages/New';

export default function Routes(){
  return(
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Login} />
          <Route path="/signup" component={CreateLogin} />
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/new" component={New} />
        </Switch>
      </BrowserRouter>
  );
}