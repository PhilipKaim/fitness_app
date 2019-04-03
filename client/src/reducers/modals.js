const modalReducerDefaultState = {};

export default (state = modalReducerDefaultState, action) => {
  switch (action.type) {
    case 'SIGNIN_MODAL':
      return {
        ...state,
        visability: action.visible,
        modal: action.modal
      };
      case 'EDIT_FOOD_MODAL':
      return {
        ...state,
        visability: action.visible,
        modal: action.modal
      };
      case 'ADD_FOOD_MODAL':
      return {
        ...state,
        visability: action.visible,
        modal: action.modal
      };
    default:
      return state;
  }
};