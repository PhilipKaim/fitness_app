import React from 'react';

const User = (props) => (
    <div className='user d-flex justify-content-center align-items-center flex-column p-3'>
        {props.image !== undefined
            &&
            <div>
                <img src={ props.image }
                alt={ `${props.firstName} ${props.lastName}` }
                className='user__image' />
            </div>
        }
        
        <div className='user__name'>{ props.firstName !== undefined && `Welcome ${props.firstName}!` }</div>
    </div>
);

export default User;