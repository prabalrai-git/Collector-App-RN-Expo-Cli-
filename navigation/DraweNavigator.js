import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer'
import { AddPatietNavigator, BookTestNavigator, CollectorLocation, CollectSampleNavigator, MainStackNavigator, SampleCollectionNavigator, TaskNavigator } from './StackNavigator'
import { useSelector } from 'react-redux'
import CostomeDrawerContent from '../components/ui/CostomeDrawerContent'
import LocationTrackingHomeScreen from '../screens/LocationTracking/LocationTrackingHomeScreen'
import { useNavigation } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Icon } from 'react-native-elements'
import NotificationHomeScreen from '../screens/NotificationScreen/NotificationHomeScreen'

const DraweNavigator = () => {
  const Drawer = createDrawerNavigator()
  const user = useSelector(state => state.storeUserData);
  console.log("user role", user.userData.UserRole);
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
          drawerIcon: ({ size, color }) => (
            <Icon
              name='home'
              color={'#FF7F00'}
              type='antdesign'
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
          drawerIcon: ({ size, color }) => (
            <Icon
              name='addusergroup'
              color={'#FF7F00'}
              type='antdesign'
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
          drawerIcon: ({ size, color }) => (
            <Icon
              name='user'
              color={'#FF7F00'}
              type='antdesign'
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
          drawerIcon: ({ size, color }) => (
            <Icon
              name='test-tube-alt'
              color={'#FF7F00'}
              type='fontisto'
              style={styles.icon}
            ></Icon>
          )
        }}
      />
      <Drawer.Screen
        name='NotificationHome'
        component={NotificationHomeScreen}
        options={{
          // tabBarHideOnKeyboard: true,
          headerShown: false,
          title: 'Notification',
          drawerIcon: ({ size, color }) => (
            <Icon
              name='bells'
              color={'#FF7F00'}
              type='antdesign'
              style={styles.icon}
            ></Icon>
          )
        }}
      />
      {
        user.userData.UserRole === 3 &&
        <Drawer.Screen
          name='task'
          component={TaskNavigator}
          options={{
            headerShown: false,
            title: 'Task',
            drawerIcon: ({ size, color }) => (
              <Icon
                name='notification'
                color={'#FF7F00'}
                type='entypo'
                style={styles.icon}
              ></Icon>
            )
          }}
        />
      }
      {
        user.userData.UserRole === 2 &&
        <Drawer.Screen
          name='CollectorLocation'
          component={CollectorLocation}
          options={{
            headerShown: false,
            title: 'Location Tracking',
            drawerIcon: ({ size, color }) => (
              <Icon
                name='find'
                color={'#FF7F00'}
                type='antdesign'
                style={styles.icon}
              ></Icon>
            )
          }}
        />
      }


    </Drawer.Navigator>
  )
}

export default DraweNavigator

const styles = StyleSheet.create({})