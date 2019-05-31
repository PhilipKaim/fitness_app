import React from 'react';
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux';

import { sideDrawerToggle } from '../../actions/sideDrawer';

const NavBar = (props) => (
    <nav className='navbar shadow-sm'>
        <div className="container">
            <div><img style={{width: '41px', height: 'auto'}} src={ require('../../images/leaf.svg') } /><span style={{fontSize: '20px', verticalAlign: 'center'}}>NutriTrack</span></div>
            <div onClick={() => props.dispatch(sideDrawerToggle(true))}><i className="fas fa-bars pr-2"></i><span>MENU</span></div>
            {/* <div className='navbar__links'>
                {
                props.signout
                    ?
                <a href='/auth/logout' onClick={ () => window.localStorage.removeItem('jwt') }><button className='navbar__sign-in btn btn-secondary'>Sign Out <i className="fas fa-sign-out-alt"></i></button></a>
                    :
                <a><button className='navbar__sign-in btn btn-secondary' onClick={ props.openModal }>Sign In</button></a>
                }
            </div> */}
        </div>
    </nav>
);

const mapStateToProps = (state) => {
    return {
      sideDrawer: state.sideDrawer,
    };
};

export default connect(mapStateToProps)(NavBar);