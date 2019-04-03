import React from 'react';
import { connect } from 'react-redux';

import { editFoodModal } from '../../actions/modals';
import { selectedFoodToEdit } from '../../actions/foods';

import '../../styles/components/DatePickerFoods.css'

const PickedDateFoods = (props) => {
    return (
        <div className='d-flex justify-content-center'>
            <div className='mb-2 datePickerFood'>
                <img src={ props.image } alt={ props.foodName }/>
                <p>{ props.foodName } x{ props.quantity }</p>
                <div>
                    <button className='btn btn-primary' onClick={() => {
                        props.dispatch(editFoodModal(true, 'edit'));
                        props.dispatch(selectedFoodToEdit(props));            
                    }}>Edit</button>
                </div>
            </div>
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
      modal: state.modals,
      foods: state.foods
    };
};

export default connect(mapStateToProps)(PickedDateFoods);