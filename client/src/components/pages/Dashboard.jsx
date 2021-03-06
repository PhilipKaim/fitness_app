import React from 'react'
import DatePicker from '../DatePicker'

import { connect } from 'react-redux'
import PieChartUser from '../PieChartUser';
import PieChartLoseWeight from '../PieChartLoseWeight';
import PieChartGainMuscle from '../PieChartGainMuscle';
import Layout from './Layout/Layout';

const Dashboard = (props) => {
    
    return (
        <Layout>
            <div>
                <div className='d-flex flex-column align-items-center justify-content-center'>
                    <DatePicker />
                    <div>
                        <PieChartUser />
                        { props.user.goal === 'Lose Weight' ? 
                            <PieChartLoseWeight /> : <PieChartGainMuscle /> }
                    </div>
                </div>
            </div>
        </Layout>
    );
};

const mapStateToProps = (state) => {
    return {
      user: state.user
    };
};

export default connect(mapStateToProps)(Dashboard);