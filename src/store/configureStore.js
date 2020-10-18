import { createStore, combineReducers } from 'redux';
import userDataReducer from '../reducers/userData';

export default () => {
  const store = createStore(
    combineReducers({
      userData: userDataReducer
    })
  );
  return store;
}
