import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from '../components/pages/Login.jsx';
import ManageFood from '../components/pages/ManageFood.jsx';
import Error from '../components/pages/Error.jsx';
import Form from '../components/pages/Form.jsx';
import Dashboard from '../components/pages/Dashboard.jsx';
import Settings from '../components/pages/Settings';

const AppRouter = (props) => {

    return (
      <div>
        <Router>
          <Switch>
            <Route path='/' component={ Login } exact={ true } />
            <Route path='/form' component={ Form } />
            <Route path='/home' component={ Dashboard } />
            <Route path='/food' component={ ManageFood } />
            <Route path='/settings' component={ Settings } />
            <Route component={ Error } />
          </Switch>
        </Router>
      </div>
    )

};

export default AppRouter;
