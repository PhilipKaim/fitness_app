import React from 'react';

const Alert = (props) => {
    return (
        <div className='col-md-12 d-flex justify-content-center'>
            <div className="alert alert-info alert-dismissible col-md-10" role="alert">
                { props.message }
                <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                    <span aria-hidden="true" onClick={props.resetAlert} >&times;</span>
                </button>
            </div>
        </div>
    );
}

export default Alert;