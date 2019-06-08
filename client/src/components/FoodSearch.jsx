import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import uuid from 'uuid';
import moment from 'moment';

import ListItem from './presentational/ListItem.jsx';

import { getSearchedFood } from '../actions/foods'; 
import { selectedFood } from './../actions/foods';

import '../styles/components/FoodSearch.css';

class FoodSearch extends Component {

    handleBlur = () => {
        // allows request to be made to get nutrition without clearing first
        setTimeout(() => {
            this.props.dispatch(getSearchedFood([]));
        }, 100);
    }
    
    handleSetSelectedFood = (item) => {

        axios.get(`/api/nutritionInfo/${item}`)
            .then(res => {
                const allNutritionData = res.data.foods[0];

                let foodInfo = {
                    weight: (allNutritionData.serving_weight_grams / 28).toFixed(2),
                    image: allNutritionData.photo.thumb,
                    foodName: allNutritionData.food_name,
                    protein: allNutritionData.nf_protein,
                    carbs: allNutritionData.nf_total_carbohydrate,
                    fats: allNutritionData.nf_total_fat,
                    calories: allNutritionData.nf_calories,
                    dateAdded: moment().format('MM-DD-YYYY')
                };

                this.props.dispatch(selectedFood(foodInfo));

                document.querySelector('.search__input').value = '';
            });
    }

    handleChange = (e) => {

        if (e.target.value !== '') {
            axios.get(`/api/getFood/${e.target.value}`)
            .then(res => {
            
                if (res.data === 404) {
                    this.props.dispatch(getSearchedFood([]));                   
                } else {
                    this.props.dispatch(getSearchedFood(res.data));
                }
                
            })
            .catch(err => console.log(err));

            return;
        }

        this.props.dispatch(getSearchedFood([]));
            
    }

    render() {

        const listItems = this.props.foods.foods.map(el => {
            
            return <ListItem
                        setSelectedFood={this.handleSetSelectedFood}
                        item={el.food_name}
                        key={uuid()}
                    />
        });

        return (
            <div className='search'>
                <input
                       type="text"
                       name='search'
                       onChange={this.handleChange}
                       className='search__input'
                       placeholder='   Search Food . . .' 
                       autoComplete='off'
                       onBlur={this.handleBlur}
                />
                <ul className='search__list'>
                    { listItems }
                </ul>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
      foods: state.foods
    };
};

export default connect(mapStateToProps)(FoodSearch);