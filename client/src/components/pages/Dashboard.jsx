import React from 'react';
import DatePicker from '../DatePicker';
import UserPieChart from '../UserPieChart';

const Dashboard = () => {
    return (
        <div className='d-flex flex-column align-items-center'>
            <DatePicker />
            <UserPieChart />
        </div>
    );
};

export default Dashboard;