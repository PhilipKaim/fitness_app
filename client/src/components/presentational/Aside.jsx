import React, { Fragment } from 'react';
import User from '../presentational/User'
import GoalStatusAlert from './GoalStatusAlert';

import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';

const Aside = (props) => {

    const { image, firstName, lastName } = props.user;

    return (
        <React.Fragment>
            <div className='shadow-sm rounded' style={{backgroundColor: 'white', height: '87vh', position: 'relative'}}>
                <User image={ image } firstName={ firstName } lastName={ lastName } />
                <hr/>
                <div className='d-flex flex-column justify-content-between pl-4 pt-2' style={{height: '20vh'}}>
                    <div>
                        <i className="fas fa-chart-line pr-2"></i>
                        <NavLink activeClassName='is-active' to='/dashboard'>Dashboard</NavLink>
                    </div>
                    <div>
                        <i className="fas fa-utensils pr-2"></i>
                        <NavLink activeClassName='is-active' to='/food'>Manage Food</NavLink>
                    </div>
                    <div>
                        <i className="fas fa-cog pr-2"></i>
                        <NavLink activeClassName='is-active' to='/#'>Settings</NavLink>
                    </div>
                </div>
                <GoalStatusAlert />            
            </div>
        </React.Fragment>
    );
};

const mapStateToProps = (state) => {
    return {
      user: state.user
    };
};

export default connect(mapStateToProps)(Aside);