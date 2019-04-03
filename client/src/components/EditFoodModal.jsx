import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import axios from 'axios';

import { editFoodModal } from '../actions/modals';
import { setAllSelectedFoodsToEdit } from '../actions/foods';
import { showAlert } from '../actions/user';
import { editFoodModal as editModal } from '../actions/modals';

class EditFoodModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loaded: false,
            selectedValue: undefined,
            editFoodId: undefined,
            weight: undefined
        }
    }

    async componentDidMount() {
        const token = window.localStorage.getItem('jwt');
        let { editFoodName, singleDatePickerDate } = this.props.foods;

        if (!singleDatePickerDate) {
            singleDatePickerDate = moment();
        }

        await this.props.dispatch(setAllSelectedFoodsToEdit(token, singleDatePickerDate, editFoodName));
        
        this.setState({ loaded: true });

        // sets first value in select element
        if (this.state.loaded) {
            const selectElement = document.querySelector('.food-selection');
            let selectedValue = selectElement.options[0].value;
            let editFoodId = selectElement.options[selectElement.selectedIndex].getAttribute('data_id');
            let lastIndex = selectedValue.indexOf('oz');
            let weight = selectedValue.substr(0, lastIndex);
            
            this.setState({ selectedValue, editFoodId, weight });
        }
    }

    handleSelectionChange = (e) => {
        let selectedValue = e.target.value;
        let editFoodId = e.target.options[e.target.selectedIndex].getAttribute('data_id');
        
        this.setState({selectedValue, editFoodId});
    }

    handleInputChange = (e) => {
        this.setState({ weight: e.target.value });
    }

    handleUpdate = async () => {
        let { weight, editFoodId } = this.state;
        let { editFoodName } = this.props.foods;
        
        let updateData = await axios.patch(`/api/editFoods/update/${editFoodId}/${weight}/${editFoodName}`)
        let message = updateData.data;
        
        this.props.dispatch(editModal(false));
        this.props.dispatch(showAlert(message));
    }

    handleDelete = async () => {
        let { editFoodName } = this.props.foods;
        let { editFoodId } = this.state;

        let deleteData = await axios.delete(`/api/editFoods/delete/${editFoodId}/${editFoodName}`);
        let message = deleteData.data;
        
        this.props.dispatch(editModal(false));
        this.props.dispatch(showAlert(message));
    }

    content = () => {
        const { editFoodImage, editFoodName, allFoodsToBeEdited } = this.props.foods;

        const foods = allFoodsToBeEdited.map(food => {
            let weight = !food.inputWeight ? food.nutritionixWeight : food.inputWeight;
            let optionValue = `${weight}oz | ${food.timeAdded}`;
            
            return <option key={food._id} data_id={food._id}>{ optionValue }</option>;
        });

        return (
            <div className='d-flex justify-content-center flex-column'>
                <span className='sign-in-modal__close' onClick={() => this.props.dispatch(editFoodModal(false, 'edit'))}>x</span>
                <div className='text-center'>{editFoodName}</div>
                <div>
                    <img src={editFoodImage} alt={editFoodName}/>
                </div>
                <div>
                <select className='food-selection' onChange={(e) => this.handleSelectionChange(e)}>
                    { foods }
                </select>
                </div>
                <div>
                    <p style={{display: 'inline'}}>Editing: { this.state.selectedValue || 'Select food to edit' }</p>
                </div>
                <div>
                    <label htmlFor="weight">Weight:</label>
                    <input type="number" step='0.1' onChange={(e) => this.handleInputChange(e)} />
                </div>
                <button className='btn btn-primary btn-block' onClick={() => this.handleUpdate()}>Update</button>
                <button className='btn btn-danger btn-block' onClick={() => this.handleDelete()}>Delete</button>
            </div>
        );
    }

    render() {

        return (
            <div className='food-serving-modal'>
                { this.state.loaded ? this.content() : null }
            </div>
        );
    }
}


const mapStateToProps = (state) => {
    return {
      modal: state.modals,
      foods: state.foods
    };
};

export default connect(mapStateToProps)(EditFoodModal);