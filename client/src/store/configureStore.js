import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import user from '../reducers/user';
import modals from '../reducers/modals';
import foods from '../reducers/foods';
import sideDrawer from '../reducers/sideDrawer';

export default () => {
  const store = createStore(
    combineReducers({
      user,
      modals,
      foods,
      sideDrawer
    }),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
    applyMiddleware(thunk)
  );

  return store;
};