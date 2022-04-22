import { createSlice } from "@reduxjs/toolkit"
import AsyncStorage from '@react-native-async-storage/async-storage';

const initialState = {
  userData: undefined,
  authToken: undefined,
}

const profile = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    storeUserData: (state, action) => {
      // console.log('reducer', action.payload)
      state.userData = action.payload
      storeData(action.payload)
      // console.log();
    },
    storeAuthToken: (state, action) => {

    },
    logout: (state, action) => {
      state.userData = undefined
      AsyncStorage.removeItem('@userData')
      // console.log('json val logout');
    }
  }
})

const storeData = async (value) => {
  try {
    const jsonValue = JSON.stringify(value)
    // console.log('json val', jsonValue);
    await AsyncStorage.setItem('@userData', jsonValue)
  } catch (e) {
    // saving error
  }
}

export const {
  storeUserData,
  storeAuthToken,
  logout
} = profile.actions;

export default profile.reducer;