import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import HomeScreen from '../screens/HomeScreen'
import CollectSampleHomeScreen from '../screens/CollectSample'
import EnterFormScreen from '../screens/CollectSample/EnterFormScreen'
import SignatureCanvas from '../screens/CollectSample/SignatureCanvas'
import MapScreenn from '../screens/MapScreenn'

const Stack = createNativeStackNavigator()

const MainStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name='HomeScreen'
        component={HomeScreen}
        options={{
          headerShown: false,
        }}
      />

    </Stack.Navigator>
  )
}

const CollectSampleNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name='CollectSampleHomeScreen'
        component={CollectSampleHomeScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name='EnterFormScreen'
        component={EnterFormScreen}
        // options={{
        //   headerShown: false,
        // }}
      />
      <Stack.Screen
        name='SignatureCanvas'
        component={SignatureCanvas}
        // options={{
        //   headerShown: false,
        // }}
      />

    </Stack.Navigator>
  )
}
const MapStackNavigator = () => {
  return(
    <Stack.Navigator>
      <Stack.Screen 
        name='MapScreenn'
        component={MapScreenn}
        // options={{
        //   headerShown: false,
        // }}
      />
    </Stack.Navigator>
  )
}



export { MainStackNavigator, CollectSampleNavigator ,MapStackNavigator }

const styles = StyleSheet.create({})