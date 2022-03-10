import { combineReducers } from 'redux';
import profileSlice, { logout, storeAuthToken, storeUserData } from './slices/profileSlice';

const rootReducer = combineReducers({
  storeUserData: profileSlice,
  // storeAuthToken: storeAuthToken,
  // logout: logout,
})

export default rootReducer