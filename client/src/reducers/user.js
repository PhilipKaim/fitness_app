const userReducerDefaultState = {};

export default (state = userReducerDefaultState, action) => {
  switch (action.type) {
    case 'GET_USER':
      return {
        ...state,
        firstName: action.firstName,
        image: action.image,
        token: action.token,
        goal: action.goal
      };
    case 'SHOW_ALERT':
      return {
        ...state,
        message: action.message
      }
    case 'SINGLE_DATE_PICKER':
    return {
      ...state,
      focused: action.focused
    }
    default:
      return state;
  }
};