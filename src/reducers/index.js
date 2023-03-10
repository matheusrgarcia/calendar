import { combineReducers} from 'redux';

import { calendarReducer } from './calendarReducer';

const reducers = {
  calendar: calendarReducer
};

export default combineReducers(reducers);