import React, { Component } from 'react';
import NavBar from '../presentational/NavBar';
import { connect } from 'react-redux';

import SignInModal from '../presentational/SignInModal.jsx';

import { signinModal } from '../../actions/modals';

class Login extends Component {

    componentDidMount() {
        if (window.localStorage.getItem('jwt')) {
            this.props.history.push('/home');
        }
    }

    handleModalOpen = () => {
        this.props.dispatch(signinModal(true, 'signin'));
    }

    handleModalClose = () => {
        this.props.dispatch(signinModal(false, 'signin'));
    }

    render() {
        const { visability, modal } = this.props.modal;

        return (
            <div className='login'>
                <NavBar openModal={ () => this.handleModalOpen() } />
                { visability && modal === 'signin' && <SignInModal closeModal={ () => this.handleModalClose() } />  }
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
      modal: state.modals,
    };
};

export default connect(mapStateToProps)(Login);