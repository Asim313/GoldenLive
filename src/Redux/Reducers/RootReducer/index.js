import { combineReducers } from 'redux';
import authReducer from '../WhiteListReds/authRed';
import homeReducer from '../WhiteListReds/homeRed';
import hostReducer from '../WhiteListReds/hostRed';

export const rootReducer = combineReducers({
  auth: authReducer,
  homeRed: homeReducer,
  hostRed: hostReducer,
  // userLevelR : userLevelReducerr
});
