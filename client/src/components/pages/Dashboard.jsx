import React from 'react';
import DatePicker from '../DatePicker';
import UserPieChart from '../UserPieChart';
import NavBar from '../presentational/NavBar'

const Dashboard = () => {
    return (
        <div>
            <NavBar  />
            <div>
                
                <div className='d-flex flex-column align-items-center'>
                    <DatePicker />
                    <UserPieChart />
                </div>
            </div>
        </div>
    );
};

export default Dashboard;