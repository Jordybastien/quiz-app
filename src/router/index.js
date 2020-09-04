import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Church from '../views/church';
import Homepage from '../views/homepage';
import Dashboard from '../views/dashboard';
import NotFound from '../views/notFound';
import Login from '../views/login';

const Routing = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Homepage} />
        <Route path="/church/:slug" component={Church} />
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/login" component={Login} />
        <Route component={NotFound} />
      </Switch>
    </Router>
  );
};

export default Routing;
