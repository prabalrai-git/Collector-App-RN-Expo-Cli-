import { combineReducers } from 'redux';
import { logout, storeAuthToken, storeUserData } from './slices/profileSlice';

const rootReducer = combineReducers({
  storeUserData: storeUserData,
  storeAuthToken: storeAuthToken,
  logout: logout,
})

export default rootReducer