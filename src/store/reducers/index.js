import { combineReducers } from 'redux';
import details from './users';
import chatData from './chat';

const rootReducer = combineReducers({
  user: details,
  chat: chatData,
});

export default rootReducer;
