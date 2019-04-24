import React from 'react';
import { NavLink } from 'react-router-dom'

const navBar = {
    height: '70px',
    backgroundColor: 'white',
    width: '100vw',
    zIndex: '9999'
}

const NavBar = (props) => (
    <nav className='navbar shadow-sm' style={navBar}>
        <span><NavLink to='/home'>LOGO</NavLink></span>
        <div className='navbar__links'>
            {
            props.signout
                ?
            <a href='/auth/logout' onClick={ () => window.localStorage.removeItem('jwt') }><button className='navbar__sign-in btn btn-secondary'>Sign Out <i className="fas fa-sign-out-alt"></i></button></a>
                :
            <a><button className='navbar__sign-in btn btn-secondary' onClick={ props.openModal }>Sign In</button></a>
            }
        </div>
    </nav>
);

export default NavBar;