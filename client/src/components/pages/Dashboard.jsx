import React, { useEffect } from 'react'
import DatePicker from '../DatePicker'
import NavBar from '../presentational/NavBar'

import { getUser } from '../../actions/user'

import queryString from 'query-string'
import axios from 'axios'
import { connect } from 'react-redux'
import Aside from '../presentational/Aside';
import PieChartUser from '../PieChartUser';
import PieChartLoseWeight from '../PieChartLoseWeight';
import PieChartGainMuscle from '../PieChartGainMuscle';

const Dashboard = (props) => {

    useEffect(() => {
        let query = queryString.parse(window.location.search)
        
        if (query.token) {
            window.localStorage.setItem("jwt", query.token);
        }
        
        if (window.localStorage.getItem('jwt') === null) {
            window.location.href = '/home'
        } else {
            const token = window.localStorage.getItem('jwt');

            async function fetchUser() {
                let user = await axios.get(`/api/getUser/${token}`);

                props.dispatch(getUser(user.data[0]))
            }

            fetchUser();
        }
    }, [])
    

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