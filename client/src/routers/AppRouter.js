import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Profile from '../components/pages/Profile.jsx';
import Login from '../components/pages/Login.jsx';
import ManageFood from '../components/pages/ManageFood.jsx';
import Data from '../components/pages/Data.jsx';
import Error from '../components/pages/Error.jsx';

const AppRouter = () => (
  <div>
    <Router>
      <Switch>
        <Route path='/' component={ Login } exact={ true } />
        <Route path='/profile' component={ Profile } />
        <Route path='/food' component={ ManageFood } />
        <Route path='/data' component={ Data } />
        <Route component={ Error } />
      </Switch>
    </Router>
  </div>
);

export default AppRouter;