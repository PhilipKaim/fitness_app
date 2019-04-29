import React from 'react';
import Aside from '../presentational/Aside';
import NavBar from '../presentational/NavBar';

const Settings = () => {
    return (
        <div>
            <NavBar signout={ true } />
            <div className='row'>
                <Aside />
                <div className="col-md-9">
                    
                </div>
            </div>
        </div>
    );
};

export default Settings;