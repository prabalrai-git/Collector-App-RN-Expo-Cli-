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
    },
    storeAuthToken: (state, action) => {

    },
    logout: async (state, action) => {
      state.userData = undefined
      await AsyncStorage.removeItem('@userData')
    }
  }
})

const storeData = async (value) => {
  try {
    const jsonValue = JSON.stringify(value)
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