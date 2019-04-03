import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

import { addFoodModal } from '../../actions/modals';
import { datePickerFoods } from '../../actions/foods';

import '../../styles/components/FoodServingModal.css';


class FoodServingModal extends Component {

    render() {
        return (
            <div className='food-serving-modal'>
            <span className='sign-in-modal__close' onClick={() => this.props.dispatch(addFoodModal(false))}>x</span>
    
            <div><b>{this.props.foodItem}</b></div>
            <img src={this.props.image} alt={this.props.foodItem}/>
    
           <form className='food-serving-modal__form'>
                <div className='food-serving-modal__quantity'>
                    <label htmlFor='quantity'>Quantity: </label>
                    <select name="quantity" id="quantity">
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                        <option value="7">7</option>
                        <option value="8">8</option>
                        <option value="9">9</option>
                        <option value="10">10</option>
                    </select>
                </div>
    
                <div className='food-serving-modal__weight'>
                    <label htmlFor='weight'>Weight In Ounces: </label>
                    <input type="number" name='weight' id='weight' step='0.1' placeholder={this.props.foods.selectedFoodWeight} required />
                </div>
    
                <input type="submit" value='+ Add Food' className='food-serving-modal__submit' onClick={(e) => {
                    let quantity = document.querySelector('#quantity').value;
                    let weightInput = document.querySelector('#weight');
                    let weight = weightInput.value ? weightInput.value : this.props.foods.selectedFoodWeight;
                    
                    e.preventDefault();
                    this.props.calculateFood(
                        quantity,
                        weight
                    )

                    let token = window.localStorage.getItem('jwt');
                    
                    this.props.dispatch(addFoodModal(false));
                    this.props.dispatch(datePickerFoods(moment(), token));
                } }/>
           </form>
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

export default connect(mapStateToProps)(FoodServingModal);