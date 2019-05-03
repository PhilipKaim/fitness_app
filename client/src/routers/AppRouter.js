import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import queryString from 'query-string'
import axios from 'axios'
import { connect } from 'react-redux';

import Login from '../components/pages/Login.jsx';
import ManageFood from '../components/pages/ManageFood.jsx';
import Error from '../components/pages/Error.jsx';
import Form from '../components/pages/Form.jsx';
import Dashboard from '../components/pages/Dashboard.jsx';
import Settings from '../components/pages/Settings';

import { getUser } from '../actions/user'


const AppRouter = (props) => {

  useEffect(() => {
      let query = queryString.parse(window.location.search)
      
      if (query.token) {
          window.localStorage.setItem("jwt", query.token);
      }
      
      if (window.localStorage.getItem('jwt') === null) {
          window.location.href = '/home'
      } else {
          const token = window.localStorage.getItem('jwt');

          async function fetchUser() {
              let user = await axios.get(`/api/getUser/${token}`);

              props.dispatch(getUser(user.data[0]))
          }

          fetchUser();
      }
  }, [])

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

const mapStateToProps = (state) => {
  return {
    user: state.user
  };
};

export default connect(mapStateToProps)(AppRouter);
