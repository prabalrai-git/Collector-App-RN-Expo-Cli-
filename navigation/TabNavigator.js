import { Dimensions, ImageBackground, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import AcceptedTask from '../screens/Tasks/AcceptedTask';
import AssignedTask from '../screens/Tasks/AssignedTask';
import CompletedTask from '../screens/Tasks/CompletedTask';
import RejectedTask from '../screens/Tasks/RejectedTask';
import HamMenu from '../components/ui/HamMenu';
import BackBtn from '../components/ui/BackBtn';
import Header from '../components/Header';
import { dummyData } from '../dumyData';
import { useDispatch } from 'react-redux';
import { GetSampleRequestListByCollector } from '../Services/appServices/AssignPatient';




const TabNavigator = () => {
  const Tab = createMaterialTopTabNavigator();
  return (
    
    <View style={styles.mainContainer}>
      <Header title={'Tasks'}></Header>
      <Tab.Navigator
        screenOptions={{
          tabBarLabelStyle: { fontSize: 12 },
          tabBarItemStyle: { width: 100 },
          tabBarStyle: { backgroundColor: '#8ED1FC' },
          tabBarActiveTintColor: '#fefefe',
        }}
        initialRouteName='AssignedTask'
        // keyboardDismissMode='none'
      >
        <Tab.Screen
          name="AssignedTask"
          component={AssignedTask}
          options={{ title: 'Asigned Task' }}
         
        />
        <Tab.Screen
          name="AcceptedTask"
          component={AcceptedTask}
          options={{ title: 'Accepted Task' }}
        />
        <Tab.Screen
          name="CompletedTask"
          component={CompletedTask}
          options={{ title: 'Completed Task' }}
          data={'potato'}
        />

        <Tab.Screen
          name="RejectedTask"
          component={RejectedTask}
          options={{ title: 'Rejected Task' }}
        />
      </Tab.Navigator>
    </View>

  )
}

export default TabNavigator

const styles = StyleSheet.create({

  mainContainer: {
    width: Dimensions.get('window').width,
    flex: 1,
    // paddingTop: 90,
    backgroundColor: '#8ED1FC'
  },

})