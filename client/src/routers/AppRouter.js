import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from '../components/pages/Login.jsx';
import ManageFood from '../components/pages/ManageFood.jsx';
import Error from '../components/pages/Error.jsx';
import Main from '../components/pages/Main.jsx';
import Form from '../components/pages/Form.jsx';

const AppRouter = () => (
  <div>
    <Router>
      <Switch>
        <Route path='/' component={ Login } exact={ true } />
        <Route path='/form' component={ Form } />
        <Route path='/home' component={ Main } />
        <Route path='/food' component={ ManageFood } />
        <Route component={ Error } />
      </Switch>
    </Router>
  </div>
);

export default AppRouter;
