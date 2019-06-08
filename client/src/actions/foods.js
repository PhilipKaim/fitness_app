import axios from 'axios';
import moment from 'moment';

export const getSearchedFood = (foods) => ({
    type: 'GET_SEARCHED_FOOD',
    foods
});

export const getNutritionTotal = (foodsArray) => ({
    type: 'GET_NUTRITION_TOTAL',
    foodsArray
});

export const selectedFood = ({foodName, image, weight, protein, fats, carbs, calories, dateAdded}) => ({
    type: 'SELECTED_FOOD',
    foodName,
    image,
    weight,
    protein,
    fats,
    carbs,
    calories,
    dateAdded
});

export const selectedFoodToEdit = ({image, foodName, quantity}) => ({
    type: 'SELECTED_FOOD_TO_EDIT',
    image,
    foodName,
    quantity
});

export const setStartAndEndCalenderDates = (startDate, endDate) => ({
    type: 'SET_START_AND_END_CALENDER_DATES',
    startDate,
    endDate
});

export const setFocusedInput = (focusedInput) => ({
    type: 'SET_FOCUSED_INPUT',
    focusedInput
});

export const setSingleDatePickerDate = (date) => ({
    type: 'SET_SINGLE_DATE_PICKER_DATE',
    date
});

export const setSingleDatePickerFocused = (focused) => ({
    type: 'SET_SINGLE_DATE_PICKER_FOCUSED',
    focused
});

export const selectedEditFood = (date, foodName) => {
    return async (dispatch) => {
        try {
            let formattedDate = moment(date._d).format('MM-DD-YYYY');
            let food = await axios.get(`/api/editFood/${formattedDate}/${foodName}`);

            console.log(food.data);
            
            
            dispatch({
                type: 'SELECTED_EDIT_FOOD',
                editFoods: food.data
            });
        } catch (e) {
            console.log(e);
        }                             
    }
}

export const datePickerFoods = (date, token) => {
    return async (dispatch) => {
        // prevents app from crashing on manual date change in input
        if (date === null) {
            return;
        } else {
            try {
                let formattedDate = moment(date._d).format('MM-DD-YYYY');
                
                let food = await axios.get(`/api/datePicker/${formattedDate}/${token}`);
            

                dispatch({
                    type: 'DATE_PICKER_FOODS',
                    foodArray: food.data
                });
            } catch (e) {
                console.log(e);
            }   
        } 
    }                            
}

export const setAllSelectedFoodsToEdit = (token, date, foodName) => {
    return async (dispatch) => {
        let formattedDate = moment(date._d).format('MM-DD-YYYY');

        let food = await axios.get(`/api/editFoods/${formattedDate}/${token}/${foodName}`);

        dispatch({
            type: 'SET_ALL_SELECTED_FOODS_TO_EDIT',
            foodsArray: food.data
        });
    }      
}