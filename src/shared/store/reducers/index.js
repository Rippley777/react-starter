import { combineReducers } from 'redux';
import details from './users';
import chatData from './chat';
import themeData from './theme';

const rootReducer = combineReducers({
  user: details,
  chat: chatData,
  theme: themeData,
});

export default rootReducer;
