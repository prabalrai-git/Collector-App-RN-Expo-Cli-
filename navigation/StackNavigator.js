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
import AddPatietHomeScreen from '../screens/AddPatient/AddPatietHomeScreen'
import AddPatientMap from '../screens/AddPatient/AddPatientMap'
import BookTestHomeScreen from '../screens/BookTest/BookTestHomeScreen'
import SelectTest from '../screens/BookTest/SelectTest'

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
      <Stack.Group>
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
      </Stack.Group>
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
  return (
    <Stack.Navigator>
      <Stack.Group>
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
      </Stack.Group>
    </Stack.Navigator>
  )
}

const AddPatietNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Group>
        <Stack.Screen
          name='AddPatietHomeScreen'
          component={AddPatietHomeScreen}
          options={{
            headerShown: false
          }}

        />
        <Stack.Screen
          name='AddPatientMap'
          component={AddPatientMap}
        />
      </Stack.Group>
    </Stack.Navigator>
  )
}
const BookTestNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Group>
        <Stack.Screen
          name='BookTestHomeScreen'
          component={BookTestHomeScreen}
          options={{
            headerShown: false
          }}
        />
        <Stack.Screen
          name='SelectTest'
          component={SelectTest}
          options={{
            headerShown: false
          }}
        />
      </Stack.Group>
    </Stack.Navigator>
  )
}





export { MainStackNavigator, CollectSampleNavigator, TaskNavigator, AddPatietNavigator, BookTestNavigator }

const styles = StyleSheet.create({})