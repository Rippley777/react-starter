import { combineReducers } from 'redux';
import userData from './users';


const rootReducer = combineReducers({
    user: userData
});

export default rootReducer;