import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import DraweNavigator from './DraweNavigator'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import LoginScreen from '../screens/LogInScreen/LoginScreen'
import AddPatientMap from '../screens/AddPatient/AddPatientMap'
import TabNavigator from './TabNavigator'
import { useSelector } from 'react-redux'

const MainStackNavigator = () => {
  const Stack = createNativeStackNavigator();
  const user = useSelector(state => state.storeUserData);
  console.log(user.userData);
  return (
    <Stack.Navigator>
      {
        user.userData !== undefined
          ?
          <Stack.Screen
            name='DraweNavigator'
            component={DraweNavigator}
            options={{
              headerShown: false,
            }}
          /> :
          <Stack.Screen
            name='LoginScreen'
            component={LoginScreen}
            options={{
              headerShown: false,
            }}
          />
      }


      {/* <Stack.Screen
        name='TabNavigator'
        component={TabNavigator}
        options={{
          headerShown: false,
        }}
      /> */}
    </Stack.Navigator>
  )
}

export default MainStackNavigator

const styles = StyleSheet.create({})