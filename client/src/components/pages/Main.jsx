import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import queryString from 'query-string';
import { NavLink } from 'react-router-dom';

import NavBar from '../presentational/NavBar.jsx';
import User from '../presentational/User.jsx';
import ManageFood from './ManageFood';

import { getUser } from '../../actions/user';

import '../../styles/components/Profile.css';
import GoalStatusAlert from '../presentational/GoalStatusAlert.jsx';
import Dashboard from './Dashboard.jsx';
import Aside from '../presentational/Aside.jsx';

class Profile extends Component {

    async componentDidMount() {
        let query = queryString.parse(this.props.location.search);
            
        if (query.token) {
            window.localStorage.setItem("jwt", query.token);
        }

        if (window.localStorage.getItem('jwt') === null) {
            this.props.history.push("/");
        } else {
            const token = window.localStorage.getItem('jwt');

            let user = await axios.get(`/api/getUser/${token}`)

            console.log(user.data);
            
            this.props.dispatch(getUser(user.data[0]))
        }
              
    }

    render() {
        
        return (
            <div>
                <NavBar signout={ true } />
                <div className='p-2'>
                    <div id="dashboard__side-panel" className='col-md-3 p-2' style={{position: 'fixed', top: '70px'}}>
                        <Aside />
                    </div>
                    <div id="dashboard__main" className='col-md-9 shadow-sm rounded p-2' style={{backgroundColor: 'white', height: '87vh', transform: 'translate(34%, 70px)'}}>
                        {/* <Router>
                            <Switch>
                                <Route path='/dashboard' component={ Dashboard } />
                                <Route path='/home/food' component={ ManageFood } />
                            </Switch>
                        </Router> */}
                        <Dashboard />
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
      foods: state.foods,
      modal: state.modals
    };
};

export default connect(mapStateToProps)(Profile);