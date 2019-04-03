import React from 'react';
import { NavLink } from 'react-router-dom';

import '../../styles/components/NavBar.css'

const NavBar = (props) => (
    <nav className='navbar'>
        <span><a href='/'>LOGO</a></span>
        <div className='navbar__links'>
            {
            props.signout
                &&
            <span>
                <NavLink activeClassName='is-active' to='/dashboard'>Dashboard</NavLink>
                <NavLink activeClassName='is-active' to='/food'>Manage Food</NavLink>
            </span>
            }
            {
            props.signout
                ?
            <a href='/auth/logout' onClick={ () => window.localStorage.removeItem('jwt') }><button className='navbar__sign-in'>Sign Out</button></a>
                :
            <a><button className='navbar__sign-in' onClick={ props.openModal }>Sign In</button></a>
            }
        </div>
    </nav>
);

export default NavBar;