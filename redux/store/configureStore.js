import {createStore, combineReducers} from 'redux';
import authReducer from '../reducers/AuthReducer';

const rootReducer = combineReducers(
  {auth: authReducer}
);
const configureStore = () => {
  return createStore(rootReducer);
}
const store = configureStore();
export default store;