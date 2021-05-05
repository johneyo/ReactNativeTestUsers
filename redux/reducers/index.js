import {combineReducers} from 'redux';
import errorReducers from './errorReducers';
import userReducers from './userReducers';

export default combineReducers({
  errors: errorReducers,
  user: userReducers,
});
