import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { SingleDatePicker } from 'react-dates';
import moment from 'moment';

import FoodSearch from '../FoodSearch.jsx';
import EditFoodModal from '../EditFoodModal.jsx';
import PickedDateFoods from '../presentational/PickedDateFoods.jsx';

import FoodServingModal from '../presentational/FoodServingModal.jsx';
import Alert from '../presentational/Alert.jsx';

import { showAlert } from '../../actions/user';
import { datePickerFoods } from '../../actions/foods';
import { setSingleDatePickerDate } from '../../actions/foods';
import { setSingleDatePickerFocused } from '../../actions/foods';
import Aside from '../presentational/Aside.jsx';
import Layout from './Layout/Layout';

class ManageFood extends Component {

    componentDidMount() {
        if (window.localStorage.getItem('jwt') === null) {
            this.props.history.push("/");
        }
        let token = window.localStorage.getItem('jwt');

        this.props.dispatch(datePickerFoods(moment(), token));
    }

    handleCalculateSelectedFoodNutrition = (quantitiy, inputWeight) => {
        
        let calories = this.props.foods.selectedFoodCalories;
        let carbs = this.props.foods.selectedFoodCarbs;
        let fats = this.props.foods.selectedFoodFats;
        let image = this.props.foods.selectedFoodImage;
        let foodName = this.props.foods.selectedFoodName;
        let protein = this.props.foods.selectedFoodProtein;
        let nutritionixWeight = this.props.foods.selectedFoodWeight;
        let dateAddedFull = this.props.foods.selectedFoodDateAdded;

        let dateAdded = dateAddedFull.substring(0, dateAddedFull.indexOf('T'));


        let foodInfo = {
            quantitiy: +quantitiy,
            inputWeight: +inputWeight,
            calories,
            carbs,
            fats,
            image,
            foodName,
            protein,
            nutritionixWeight: +nutritionixWeight,
            dateAdded: moment(dateAdded).format('MM-DD-YYYY'),
            timeAdded: moment().format('hh:mm a')
        }
        
        const token = window.localStorage.getItem('jwt');

        axios.post(`/api/saveFood/${token}`, foodInfo)
            .then(res => {
                return this.props.dispatch(showAlert(res.data));
            })
            .catch(err => console.log(err));
        
    }

    handleResetAlert = () => {
        this.props.dispatch(showAlert(null));
    }

    onDateChange = (date) => {
        if (date) {
            this.props.dispatch(setSingleDatePickerDate(date));
        }

        let token = window.localStorage.getItem('jwt');

        this.props.dispatch(datePickerFoods(date, token));
    };
    
    onFocusChange = ({ focused }) => {
        this.props.dispatch(setSingleDatePickerFocused(focused));
    };

    render() {
        const { message } = this.props.user;
        const { visability, modal } = this.props.modal;
        let { datePickerFoods, singleDatePickerFocused, singleDatePickerDate } = this.props.foods;

        if (!singleDatePickerDate) {
            singleDatePickerDate = moment();
        }
    
        const pickedDateFoods = datePickerFoods.map(el => <PickedDateFoods key={ el._id } image={ el.image } foodName={ el._id } quantity={ el.quantity } />);
        
        return (
            <Layout>
                <div>
                    <div className="row">
                        <Aside />
                        <div className="col-md-9">
                            { message && <Alert message={message} resetAlert={ () => this.handleResetAlert() } /> }
                            <div >
                                <div className='d-flex justify-content-center' style={{width: '100%'}}>
                                    <SingleDatePicker
                                        date={ singleDatePickerDate }
                                        onDateChange={ this.onDateChange }
                                        focused={ singleDatePickerFocused }
                                        onFocusChange={ this.onFocusChange }
                                        numberOfMonths={ 1 }
                                        isOutsideRange={ () => false }
                                    />
                                    <FoodSearch />
                                </div>
                                { pickedDateFoods }
                            </div>
                        </div>
                    </div>
                    {
                    visability
                        &&
                    modal === 'add'
                        &&
                    <FoodServingModal
                    foodItem={ this.props.foods.selectedFoodName }
                    image={ this.props.foods.selectedFoodImage }
                        calculateFood={ this.handleCalculateSelectedFoodNutrition }
                    />
                    }

                    

                    { visability && modal === 'edit' && <EditFoodModal /> }
                </div>
            </Layout>
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

export default connect(mapStateToProps)(ManageFood);