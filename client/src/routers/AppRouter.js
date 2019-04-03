import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from '../components/pages/Login.jsx';
import ManageFood from '../components/pages/ManageFood.jsx';
import Error from '../components/pages/Error.jsx';
import Dashboard from '../components/pages/Dashboard.jsx';

const AppRouter = () => (
  <div>
    <Router>
      <Switch>
        <Route path='/' component={ Login } exact={ true } />
        <Route path='/dashboard' component={ Dashboard } />
        <Route path='/food' component={ ManageFood } />
        <Route component={ Error } />
      </Switch>
    </Router>
  </div>
);

export default AppRouter;