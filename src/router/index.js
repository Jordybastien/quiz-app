import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Homepage from '../views/homepage';
import Dashboard from '../views/dashboard';
import NotFound from '../views/notFound';
import Login from '../views/login';
import ProtectedRoute from '../components/protectedRoute';

const Routing = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Homepage} />
        <ProtectedRoute path="/dashboard" component={Dashboard} />
        <Route path="/login" component={Login} />
        <Route component={NotFound} />
      </Switch>
    </Router>
  );
};

export default Routing;
