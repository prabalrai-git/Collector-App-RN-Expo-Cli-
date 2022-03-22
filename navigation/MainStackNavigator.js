import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import DraweNavigator from './DraweNavigator'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import LoginScreen from '../screens/LogInScreen/LoginScreen'
import AddPatientMap from '../screens/AddPatient/AddPatientMap'
import TabNavigator from './TabNavigator'

const MainStackNavigator = () => {
  const Stack = createNativeStackNavigator()
  return (
    <Stack.Navigator>
      
      <Stack.Screen
        name='LoginScreen'
        component={LoginScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name='DraweNavigator'
        component={DraweNavigator}
        options={{
          headerShown: false,
        }}
      />
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