const userReducerDefaultState = {
    visible: false
};

export default (state = userReducerDefaultState, action) => {
  switch (action.type) {
    case 'SIDE_DRAWER_TOGGLE':
      return {
        visible: !state.visible
      };
    default:
      return state;
  }
};