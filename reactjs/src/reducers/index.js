import { combineReducers } from 'redux';
import selectedReducer from './selectedReducer';
import updateModelReducer from './updateModelReducer';

const globalReducer = combineReducers({
  selectedReducer: selectedReducer,
  updateModelReducer: updateModelReducer
});

export default globalReducer;