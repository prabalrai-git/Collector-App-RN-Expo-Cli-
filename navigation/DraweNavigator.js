import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer'
import { AddPatietNavigator, BookTestNavigator, CollectSampleNavigator, MainStackNavigator, SampleCollectionNavigator, TaskNavigator } from './StackNavigator'
import { useSelector } from 'react-redux'
import CostomeDrawerContent from '../components/ui/CostomeDrawerContent'
import LocationTrackingHomeScreen from '../screens/LocationTracking/LocationTrackingHomeScreen'
import { useNavigation } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage';

const DraweNavigator = () => {
  const Drawer = createDrawerNavigator()
  const user = useSelector(state => state.storeUserData);
  // console.log("user role", user.userData.usrUserId);
  // console.log('user', user.userData);
  let data = user.userData
  const navigation = useNavigation()


  // user.userData === undefined ?
  //   navigation.navigate('LoginScreen')
  // : ''

  // useEffect(() => {
  //   getData()
  // }, [])

  // // console.log('asc storeage', UserStore);
  // // if (UserStore !== null) {
  // //   // dispatch(storeUserData(UserStore))
  // //   // setUserStore(UserStore)
  // // }

  // const getData = async () => {
  //   try {
  //     const jsonValue = await AsyncStorage.getItem('@userData')
  //     if (jsonValue == null) {
  //       navigation.navigate('LoginScreen')
  //       // setIsSignedIn(true)
  //     }
  //     else {
       
  //     }
  //   } catch (e) {
  //   }

  // }


  return (

    <Drawer.Navigator
      drawerPosition="right"
      // screenOptions={{
      //   tabBarActiveTintColor: '#FF7F00',
      // }}
      // initialRouteName='Home'
      drawerContent={(props) =>
      (
        <CostomeDrawerContent {...props} data={data} />
      )}
    >

      <Drawer.Screen
        name='Home'
        component={MainStackNavigator}
        options={{
          headerShown: false,
          // headerShadowVisible: false,
          title: 'Home',
          tabBarIcon: ({ size, color }) => (
            <Icon
              name='home'
              color={'#FF7F00'}
              type='entypo'
              style={styles.icon}
            ></Icon>
          )
        }}
      />
      {/* <Drawer.Screen
        name='CollectSample'
        component={CollectSampleNavigator}
        options={{
          headerShown: false,
          tabBarLabel: 'Collect Sample',
          tabBarIcon: ({ size, color }) => (
            <Icon
              name='lab-flask'
              color={'#FF7F00'}
              type='entypo'
              style={styles.icon}
            ></Icon>
          )
        }}
      /> */}
      <Drawer.Screen
        name='AddPatient'

        component={AddPatietNavigator}
        options={{
          headerShown: false,
          title: 'Add Patient',
          tabBarIcon: ({ size, color }) => (
            <Icon
              name='new-message'
              color={'#FF7F00'}
              type='entypo'
              style={styles.icon}
            ></Icon>
          )
        }}
      />


      <Drawer.Screen
        name='BookTest'
        component={BookTestNavigator}
        options={{
          // tabBarHideOnKeyboard: true,

          headerShown: false,
          title: 'Patient',
          tabBarIcon: ({ size, color }) => (
            <Icon
              name='new-message'
              color={'#FF7F00'}
              type='entypo'
              style={styles.icon}
            ></Icon>
          )
        }}
      />

      <Drawer.Screen
        name='SampleHome'
        component={SampleCollectionNavigator}
        options={{
          // tabBarHideOnKeyboard: true,
          headerShown: false,
          title: 'Total Sample',
          tabBarIcon: ({ size, color }) => (
            <Icon
              name='new-message'
              color={'#FF7F00'}
              type='entypo'
              style={styles.icon}
            ></Icon>
          )
        }}
      />
      {/* {
        user.userData.usrrole !== 3 && */}
      <Drawer.Screen
        name='task'
        component={TaskNavigator}
        options={{
          headerShown: false,
          title: 'Task',
          tabBarIcon: ({ size, color }) => (
            <Icon
              name='list'
              color={'#FF7F00'}
              type='entypo'
              style={styles.icon}
            ></Icon>
          )
        }}
      />
      {/* } */}
      <Drawer.Screen
        name='locationTracking'
        component={LocationTrackingHomeScreen}
        options={{
          headerShown: false,
          title: 'Location Tracking',
          tabBarIcon: ({ size, color }) => (
            <Icon
              name='list'
              color={'#FF7F00'}
              type='entypo'
              style={styles.icon}
            ></Icon>
          )
        }}
      />

    </Drawer.Navigator>
  )
}

export default DraweNavigator

const styles = StyleSheet.create({})