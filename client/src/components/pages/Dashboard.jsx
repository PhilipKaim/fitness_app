import React from 'react'
import DatePicker from '../DatePicker'
import NavBar from '../presentational/NavBar'

import { connect } from 'react-redux'
import Aside from '../presentational/Aside';
import PieChartUser from '../PieChartUser';
import PieChartLoseWeight from '../PieChartLoseWeight';
import PieChartGainMuscle from '../PieChartGainMuscle';

const Dashboard = (props) => {
    
    return (
        <div>
            <NavBar signout={ true } />
            <div className="row">
                <Aside  />
                <div className='d-flex flex-column align-items-center col-md-9'>
                    <DatePicker />
                    <div>
                        <PieChartUser />
                        { props.user.goal === 'Lose Weight' ? 
                            <PieChartLoseWeight /> : <PieChartGainMuscle /> }
                    </div>
                </div>
            </div>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
      user: state.user
    };
};

export default connect(mapStateToProps)(Dashboard);