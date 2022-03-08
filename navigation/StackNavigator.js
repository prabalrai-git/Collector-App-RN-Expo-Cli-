import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import HomeScreen from '../screens/HomeScreen'
import CollectSampleHomeScreen from '../screens/CollectSample'
import EnterFormScreen from '../screens/CollectSample/EnterFormScreen'
import SignatureCanvas from '../screens/CollectSample/SignatureCanvas'
// import MapScreenn from '../screens/Tasks/MapScreenn'
import TaskHomeScreen from '../screens/Tasks/TaskHomeScreen'
import TaskInfoScreen from '../screens/Tasks/TaskInfoScreen'
import MapScreen from '../screens/Tasks/MapScreen'
import LoginScreen from '../screens/LogInScreen/LoginScreen'
import AddPatietHomeScreen from '../screens/AddPatient/AddPatietHomeScreen'

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
// const MapStackNavigator = () => {
//   return(
//     <Stack.Navigator>
//       <Stack.Screen 
//         name='MapScreenn'
//         component={MapScreenn}
//         // options={{
//         //   headerShown: false,
//         // }}
//       />
//     </Stack.Navigator>
//   )
// }

const TaskNavigator = () => {
  return(
    <Stack.Navigator>
      <Stack.Screen 
        name='TaskScreen'
        component={TaskHomeScreen}
      />
    
    <Stack.Screen 
      name='TaskInfoScreen'
      component={TaskInfoScreen}
    />
    <Stack.Screen 
      name='MapScreen'
      component={MapScreen}
    />
  </Stack.Navigator>
  )
}

const AddPatietNavigator = () => {
  return(
    <Stack.Navigator>
      <Stack.Screen 
        name='AddPatietHomeScreen'
        component={AddPatietHomeScreen}
      />
    </Stack.Navigator>
  )
}



export { MainStackNavigator, CollectSampleNavigator ,TaskNavigator, AddPatietNavigator}

const styles = StyleSheet.create({})