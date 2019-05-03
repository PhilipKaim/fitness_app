import React from 'react';
import User from '../presentational/User'
import GoalStatusAlert from './GoalStatusAlert';

import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';

import '../../styles/components/NavBar.css'

const Aside = (props) => {

    const { image, firstName, lastName, token } = props.user;
    
    return (
        <div id="dashboard__side-panel" className='col-md-3'>
            <div className='shadow-sm rounded' style={{height: '90vh', position: 'relative'}}>
                <User image={ image } token={ token } firstName={ firstName } lastName={ lastName } />
                <hr/>
                <div className='d-flex flex-column justify-content-between pt-4' style={{height: '25vh'}}>
                    <div>
                        <NavLink activeClassName='is-active' to='/home'>
                            <i className="fas fa-chart-line pr-2"></i>
                            Dashboard
                        </NavLink>
                    </div>
                    <div>
                        <NavLink activeClassName='is-active' to='/food'>
                            <i className="fas fa-utensils pr-2"></i>
                            Manage Food
                        </NavLink>
                    </div>
                    <div>
                        <NavLink activeClassName='is-active' to='/settings'>
                            <i className="fas fa-cog pr-2"></i>                        
                            Settings
                        </NavLink>
                    </div>
                </div>
                <GoalStatusAlert />            
            </div>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
      user: state.user
    };
};

export default connect(mapStateToProps)(Aside);