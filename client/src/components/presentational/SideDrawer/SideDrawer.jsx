import React from 'react';
import { connect } from 'react-redux';

import './SideDrawer.css';

import { sideDrawerToggle } from '../../../actions/sideDrawer';

const SideDrawer = (props) => {
    return (
        <nav className="side-drawer shadow-sm">
            <div className="side-drawer__top-box">
                <div className="side-drawer__close"onClick={() => props.dispatch(sideDrawerToggle(false))}>
                    <i class="fas fa-times"></i>
                </div>
            </div>
            <ul>
                <li>
                    <a href="#">
                        <i class="fas fa-sign-in-alt mr-3"></i>
                        Login
                    </a>
                </li>
                <li>
                    
                    <a href="#">
                        <i class="fas fa-user-plus mr-3"></i>
                        Signup
                    </a>
                </li>
            </ul>
        </nav>
    );
};

const mapStateToProps = (state) => {
    return {
      modal: state.modals,
    };
};

export default connect(mapStateToProps)(SideDrawer);
// export default SideDrawer;