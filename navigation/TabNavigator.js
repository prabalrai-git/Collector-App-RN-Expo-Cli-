import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AddPatietNavigator, BookTestNavigator, CollectSampleNavigator, MainStackNavigator, SampleCollectionNavigator, TaskNavigator } from './StackNavigator';
import { Icon } from 'react-native-elements';
import SampleHomeScreen from '../screens/Sample/SampleHomeScreen';



const TabNavigator = () => {
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: '#FF7F00',
      }}
    >
      <Tab.Screen
        name='Home'
        component={MainStackNavigator}
        options={{
          headerShown: false,
          tabBarLabel: 'Home',
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
      {/* <Tab.Screen
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
      <Tab.Screen
        name='task'
        component={TaskNavigator}
        options={{
          headerShown: false,
          tabBarLabel: 'Task',
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
      <Tab.Screen
        name='AddPatient'
        component={AddPatietNavigator}
        options={{
          headerShown: false,
          tabBarLabel: 'Add Patient',
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
      <Tab.Screen
        name='BookTest'
        component={BookTestNavigator}
        options={{
          // tabBarHideOnKeyboard: true,
          headerShown: false,
          tabBarLabel: 'Boook test',
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

      <Tab.Screen
        name='SampleHome'
        component={SampleCollectionNavigator}
        options={{
          // tabBarHideOnKeyboard: true,
          headerShown: false,
          tabBarLabel: 'Total Sample',
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
    </Tab.Navigator>
  )
}

export default TabNavigator

const styles = StyleSheet.create({})