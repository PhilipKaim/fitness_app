import React from 'react';

const goalStatusStyle = {
    position: 'absolute',
    bottom: '10px',
    background: 'linear-gradient(to left, #00b4db, #0083b0)',
    color: 'white',
    padding: '10px',
    textAlign: 'center'
}

const GoalStatusAlert = () => {
    return (
        <div style={goalStatusStyle} className='rounded ml-2 mr-2'>
           <h5>CONGRAGUALTIONS!</h5>
           <p style={{opacity: '0.9'}}>This week you are on track to reaching your fitness goal of <b>loosing weight</b>.</p>
        </div>
    );
};

export default GoalStatusAlert;