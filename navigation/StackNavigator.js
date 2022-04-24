import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
// import HomeScreen from '../screens/HomeScreen'
// import CollectSampleHomeScreen from '../screens/CollectSample'
// import EnterFormScreen from '../screens/CollectSample/EnterFormScreen'
// import SignatureCanvas from '../screens/CollectSample/SignatureCanvas'
// import MapScreenn from '../screens/Tasks/MapScreenn'
import TaskHomeScreen from '../screens/Tasks/TaskHomeScreen'
import TaskInfoScreen from '../screens/Tasks/TaskInfoScreen'
import MapScreen from '../screens/Tasks/MapScreen'
import AddPatietHomeScreen from '../screens/AddPatient/AddPatietHomeScreen'
import BookTestHomeScreen from '../screens/BookTest/BookTestHomeScreen'
import SelectTest from '../screens/BookTest/SelectTest'
import BilligScreen from '../screens/BookTest/BilligScreen'
import SampleHomeScreen from '../screens/Sample/SampleHomeScreen'
import AddPatientSelectTest from '../screens/AddPatient/AddPatientSelectTest'
import AddTestBillingScreen from '../screens/AddPatient/AddTestBillingScreen'
import HomeScreen from '../screens/HomeScreen'
import TabNavigator from './TabNavigator'
import PrevioiusRequest from '../screens/BookTest/PrevioiusRequest'
import AddPatientDetals from '../screens/AddPatient/AddPatientDetals'
import AddRefReq from '../screens/AddPatient/AddRefReq'
import LocationTrackingHomeScreen from '../screens/LocationTracking/LocationTrackingHomeScreen'
import CollectorMapScreen from '../screens/LocationTracking/CollectorMapScreen'

const Stack = createNativeStackNavigator()

const MainStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Group>
        <Stack.Screen
          name='HomeScreen'
          component={HomeScreen}
          options={{
            headerShown: false,
          }}
        />
        {/* <Stack.Screen
          name='SampleHomeScreen'
          component={SampleHomeScreen}
          options={{
            headerShown: false,
          }}
        /> */}
      </Stack.Group>
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
        {/* <Stack.Screen
          name='TaskScreen'
          component={TaskHomeScreen}
          options={{
            headerShown: false
          }}
        /> */}
        <Stack.Screen
          name='TaskScreen'
          component={TabNavigator}
          options={{
            headerShown: false
          }}
        />

        {/* <Stack.Screen
          name='TaskInfoScreen'
          component={TaskInfoScreen}
          options={{
            headerShown: false
          }}
        /> */}
        {/* <Stack.Screen
          name='MapScreen'
          component={MapScreen}
          options={{
            headerShown: false
          }}
        /> */}
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
          name='AddPatientDetals'
          component={AddPatientDetals}
          options={{
            headerShown: false
          }}
        />
        <Stack.Screen
          name='AddRefReq'
          component={AddRefReq}
          options={{
            headerShown: false
          }}
        />
        <Stack.Screen
          name='AddPatientSelectTest'
          component={AddPatientSelectTest}
          options={{
            headerShown: false
          }}
        />
        <Stack.Screen
          name='AddTestBillingScreen'
          component={AddTestBillingScreen}
          options={{
            headerShown: false
          }}
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
          name='PrevioiusRequest'
          component={PrevioiusRequest}
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
        
        <Stack.Screen
          name='BilligScreen'
          component={BilligScreen}
          options={{
            headerShown: false
          }}
        />
      </Stack.Group>
    </Stack.Navigator>
  )
}

const SampleCollectionNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Group>
        <Stack.Screen
          name='SampleHomeScreen'
          component={SampleHomeScreen}
          options={{
            headerShown: false,
          }}
        />
        {/* <Stack.Screen
          name='PatietInfoScreen'
          component={PatietInfoScreen}
          options={{
            headerShown: false,
          }}
        /> */}
      </Stack.Group>
    </Stack.Navigator>
  )
}

const CollectorLocation = () => {
  return (
    <Stack.Navigator>
      <Stack.Group>
        <Stack.Screen
          name='CollectorLocationHomeScreen'
          component={LocationTrackingHomeScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name='CollectorMapScreen'
          component={CollectorMapScreen}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Group>
    </Stack.Navigator>
  )
}







export { MainStackNavigator, CollectSampleNavigator, TaskNavigator, AddPatietNavigator, BookTestNavigator, SampleCollectionNavigator, CollectorLocation }

const styles = StyleSheet.create({})