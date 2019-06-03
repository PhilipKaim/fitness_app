import React from 'react';

import '../../styles/components/SignInModal.css';

const SignInModal = (props) => (
    <div className='sign-in-modal' style={{zIndex: '99999'}}>
        <span className='sign-in-modal__close' onClick={props.closeModal}>x</span>

    </div>
);

export default SignInModal;