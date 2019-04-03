import React from 'react';

import '../../styles/components/User.css';

const User = (props) => (
    <div className='user'>
        {props.image !== undefined
            &&
        <img src={ props.image }
        alt={ `${props.firstName} ${props.lastName}` }
        className='user__image' />}
        
        <div className='user__name'>{ props.firstName !== undefined && `Welcome ${props.firstName}!` }</div>
    </div>
);

export default User;