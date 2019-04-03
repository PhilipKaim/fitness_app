import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import uuid from 'uuid';
import moment from 'moment';

import { DateRangePicker } from 'react-dates';

import { getNutritionTotal } from '../actions/foods';
import { setStartAndEndCalenderDates } from '../actions/foods';
import { setFocusedInput } from '../actions/foods';

class DatePicker extends Component {

    componentDidMount() {
        this.setNutrition();
    }

    setNutrition = () => {
        let { startDate, endDate } = this.props.foods;
        let token = window.localStorage.getItem('jwt')

        axios.get(`/api/getNutrition/${moment(startDate).format('MM-DD-YYYY')}/${moment(endDate).format('MM-DD-YYYY')}/${token}`)
            .then(res => {
                this.props.dispatch(getNutritionTotal(res.data));
            })
            .catch(err => console.log(err));
    }

    onDateChange = ({startDate, endDate}) => {
            this.props.dispatch(setStartAndEndCalenderDates(startDate, endDate));
            setTimeout(() => {
                this.setNutrition();
            }, 500);
    };
    
    onFocusChange = (focusedInput) => {
        this.props.dispatch(setFocusedInput(focusedInput));
    };

    render() {

        let { startDate, endDate, focusedInput } = this.props.foods;

        if (!startDate && !endDate) {
            startDate = moment();
            endDate = moment().add(7, 'days');
        }

        return (
            <div>
                <DateRangePicker
                    startDate={ startDate }
                    startDateId={ uuid() }
                    endDate={ endDate }
                    endDateId={ uuid() }
                    onDatesChange={ this.onDateChange }
                    focusedInput={ focusedInput }
                    onFocusChange={ this.onFocusChange }
                    isOutsideRange={ () => false }
                />
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
      user: state.user,
      foods: state.foods,
      modal: state.modals
    };
};

export default connect(mapStateToProps)(DatePicker);