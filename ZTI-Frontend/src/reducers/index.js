import { combineReducers } from 'redux';
import auth from './auth';
import errors from './errors';
import messages from './messages';
import data from './data';
import loading from './loading';

export default combineReducers({
    auth,
    errors,
    messages,
    data,
    loading
});