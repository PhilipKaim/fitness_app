const foodReducerDefaultState = { foods: [], datePickerFoods: [] };

export default (state = foodReducerDefaultState, action) => {
  switch (action.type) {
    case 'GET_SEARCHED_FOOD':
      return {
        ...state,
        foods: action.foods
      };
    case 'GET_NUTRITION_TOTAL':
      let totalProteins = 0;
      let totalCarbs = 0;
      let totalFats = 0;
      let totalCalories = 0;

      for (let i = 0; i < action.foodsArray.length; i++) {
        let foodsArray = action.foodsArray[i];

        totalProteins += foodsArray.protein;
        totalCarbs += foodsArray.carbs;
        totalFats += foodsArray.fats;
        totalCalories += foodsArray.calories;
      }

      return {
        ...state,
        totalProteins,
        totalCarbs,
        totalFats,
        totalCalories
      };

    case 'SELECTED_FOOD_TO_EDIT':
      return {
        ...state,
        editFoodImage: action.image,
        editFoodName: action.foodName
      };

    case 'SELECTED_FOOD':
      return {
        ...state,
        selectedFoodName: action.foodName,
        selectedFoodImage: action.image,
        selectedFoodWeight: action.weight,
        selectedFoodProtein: action.protein,
        selectedFoodCarbs: action.carbs,
        selectedFoodFats: action.fats,
        selectedFoodCalories: action.calories,
        selectedFoodDateAdded: action.dateAdded
      }
    case 'DATE_PICKER_FOODS':

      return {
        ...state,
        datePickerFoods: action.foodArray
      }

    case 'SET_START_AND_END_CALENDER_DATES':

      return {
        ...state,
        startDate: action.startDate,
        endDate: action.endDate
      }

    case 'SET_FOCUSED_INPUT':

      return {
        ...state,
        focusedInput: action.focusedInput
      }

    case 'SET_SINGLE_DATE_PICKER_DATE':

      return {
        ...state,
        singleDatePickerDate: action.date
      }

    case 'SET_SINGLE_DATE_PICKER_FOCUSED':

      return {
        ...state,
        singleDatePickerFocused: action.focused
      }

    case 'SET_ALL_SELECTED_FOODS_TO_EDIT':

      return {
        ...state,
        allFoodsToBeEdited: action.foodsArray
      }

    default:
      return state
  }
};