import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer'
import { AddPatietNavigator, BookTestNavigator, CollectSampleNavigator, MainStackNavigator, SampleCollectionNavigator, TaskNavigator } from './StackNavigator'

const DraweNavigator = () => {
  const Drawer = createDrawerNavigator()
  return (
    <Drawer.Navigator

      drawerPosition="right"
      screenOptions={{
        tabBarActiveTintColor: '#FF7F00',
      }}
    >
      <Drawer.Screen
        name='Home'
        component={MainStackNavigator}
        options={{
          // headerShown: false,
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
          // headerShown: false,
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
          // headerShown: false,
          title: 'Boook test',
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
          // headerShown: false,
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
      <Drawer.Screen
        name='task'
        component={TaskNavigator}
        options={{
          // headerShown: false,
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
    </Drawer.Navigator>
  )
}

export default DraweNavigator

const styles = StyleSheet.create({})