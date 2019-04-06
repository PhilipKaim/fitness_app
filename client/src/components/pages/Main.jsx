import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import queryString from 'query-string';
import { NavLink } from 'react-router-dom';

import NavBar from '../presentational/NavBar.jsx';
import User from '../presentational/User.jsx';

import { getUser } from '../../actions/user';

import '../../styles/components/Profile.css';
import GoalStatusAlert from '../presentational/GoalStatusAlert.jsx';
import Dashboard from './Dashboard.jsx';

class Profile extends Component {

    componentDidMount() {
        let query = queryString.parse(this.props.location.search);
            
        if (query.token) {
            window.localStorage.setItem("jwt", query.token);
        }

        if (window.localStorage.getItem('jwt') === null) {
            this.props.history.push("/");
        } else {
            const token = window.localStorage.getItem('jwt');

            axios.get(`/api/getUser/${token}`)
                .then(res => this.props.dispatch(getUser(res.data[0])));
        }
              
    }

    render() {

        const { image, firstName, lastName } = this.props.user;
        
        return (
            <div>
                <NavBar signout={ true } />
                <div className=''>
                    <div id="dashboard__side-panel" className='col-md-4 p-2'>
                        <div className='shadow-sm rounded' style={{backgroundColor: 'white', height: '87vh', position: 'relative'}}>
                            <User image={ image } firstName={ firstName } lastName={ lastName } />
                            <hr/>
                            <div className='d-flex flex-column justify-items-space-around pl-4' style={{height: '40vh'}}>
                                <div>
                                    <NavLink activeClassName='is-active' to='/dashboard'>Dashboard</NavLink>
                                </div>
                                <div>
                                    <NavLink activeClassName='is-active' to='/food'>Manage Food</NavLink>
                                </div>
                            </div>
                            <GoalStatusAlert />            
                        </div>
                    </div>
                    <div id="dashboard__main" className='col-md-8 shadow-sm rounded' style={{backgroundColor: 'white', height: '87vh'}}>
                        <Dashboard />
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
      user: state.user,
      foods: state.foods,
      modal: state.modals
    };
};

export default connect(mapStateToProps)(Profile);