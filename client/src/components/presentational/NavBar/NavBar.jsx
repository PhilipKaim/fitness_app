import React from 'react';
import { connect } from 'react-redux';

import { sideDrawerToggle } from '../../../actions/sideDrawer';

import './NavBar.css';

const NavBar = (props) => (
    <nav className='navbar shadow-sm'>
        <div className="container">
            <div><img style={{width: '41px', height: 'auto'}} src={ require('../../../images/leaf.svg') } /><span style={{fontSize: '20px', verticalAlign: 'center'}}>NutriTrack</span></div>
            <div className='navbar__menu-btn' onClick={() => props.dispatch(sideDrawerToggle(true))}><i className="fas fa-bars pr-2"></i><span>MENU</span></div>
        </div>
    </nav>
);

const mapStateToProps = (state) => {
    return {
      sideDrawer: state.sideDrawer,
    };
};

export default connect(mapStateToProps)(NavBar);