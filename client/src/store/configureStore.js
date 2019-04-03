import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import user from '../reducers/user';
import modals from '../reducers/modals';
import foods from '../reducers/foods';

export default () => {
  const store = createStore(
    combineReducers({
      user,
      modals,
      foods
    }),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
    applyMiddleware(thunk)
  );

  return store;
};